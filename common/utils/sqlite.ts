import SQLite, { Transaction } from 'react-native-sqlite-storage';

export const databaseName = 'mydatabase.db';
export const databaseLocation = 'default';
let db: SQLite.SQLiteDatabase | null = null;

export interface PrivateWalletStructure {
  backup: boolean;
  wallet_asset_cny: string;
  wallet_asset_usd: string;
  wallet_balance?: PrivateWalletBalance[];
  wallet_name: string;
  wallet_uuid: string;
  mnemonic_code: string;
  device_id: string;
  password: string;
}

export interface PrivateWalletBalance {
  address: string;
  privateKey: string;
  publicKey: string;
  asset_cny: string;
  asset_usd: string;
  balance: string;
  chain: string;
  contract_addr: string;
  id: number;
  index: number;
  logo: string;
  symbol: string;
}

export const BLOCK_CHAIN_ID_MAP = {
  Ethereum: 1,
  BITCOIN: 0,
  Arbitrum: 42161, //Arbitrum One
  Op: 10, //OP Mainnet
  Polygon: 137,
  HECO: 128, //Huobi ECO Chain Mainnet
  MetaDot: 16000, //MetaDot Mainnet
  BSC: 56, //BNB Smart Chain Mainnet
  ETC: 61, //Ethereum Classic Mainnet
  Avalanche: 43114, //Avalanche C-Chain
  zkSync: 324, //zkSync Era Mainnet
  TRON: 1231, //Ultron Mainnet
}; // chainListId

export const TABLE_MAP = {
  //is_del (0:not deleted 1:delete)
  //chain table - support(0:nonsupport 1:support)
  chain: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "chainName" VARCHAR,
    "symbol" VARCHAR,
    "hot" INTEGER,
    "chainDefault" INTEGER,
    "logo" VARCHAR,
    "active_logo" VARCHAR,
    "is_del" INTEGER,
    block_chain_id BIGINT,
    UNIQUE (chainName) ON CONFLICT REPLACE
    `,
  //asset table :chain_id TokenName  contract_addr as Joint unique key 联合唯一键
  asset: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "chain_id" BIGINT,
    "chainListId" BIGINT, 
    "tokenName" VARCHAR,
    "tokenHot" INTEGER,
    "tokenDefault" INTEGER,
    "tokenLogo" VARCHAR,
    "activeTokenLogo" VARCHAR,
    "contract_addr" VARCHAR,
    "contractUnit" INTEGER,
    "is_del" INTEGER,
    UNIQUE (chain_id, tokenName, contract_addr) ON CONFLICT REPLACE
  `,
  //wallet table mnemonic_code is encode
  wallet: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "wallet_name" VARCHAR,
    "device_id" VARCHAR,
    "wallet_uuid" VARCHAR UNIQUE,
    "mnemonic_code" VARCHAR,
    "password" VARCHAR,
    "wallet_asset_usd" VARCHAR,
    "wallet_asset_cny" VARCHAR,
    "backup" INTEGER,
    "has_submit" INTEGER,
    "is_del" INTEGER
  `,
  //wallet asset table  wallet_id, asset_id 联合唯一键（不同钱包都有ETH） , asset表的三个联合唯一键去查 (SELECT id FROM asset WHERE chain_id = (SELECT id FROM chain WHERE chain = ?) AND contract_addr = ?)
  walletAsset: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "wallet_id" BIGINT,
    "asset_id" BIGINT,
    "balance" VARCHAR,
    "asset_usd" VARCHAR,
    "asset_cny" VARCHAR,
    "is_del" INTEGER,
    UNIQUE (wallet_id, asset_id) ON CONFLICT REPLACE,
    FOREIGN KEY (wallet_id) REFERENCES wallet (id),
    FOREIGN KEY (asset_id) REFERENCES asset (id)
  `,
  //account table (account is equivalent to address) priv_key is encode , wallet_id, address 作为联合唯一键
  account: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "wallet_id" BIGINT,
    "address_index" INTEGER,
    "address" VARCHAR,
    "pub_key" VARCHAR,
    "priv_key" VARCHAR,
    "is_del" INTEGER,
    block_chain_id BIGINT,
    UNIQUE (wallet_id, address) ON CONFLICT REPLACE,
    FOREIGN KEY (wallet_id) REFERENCES wallet (id)
    `,
  //account asset table (account is equivalent to address)  //address_id, asset_id 联合唯一, address_id 需要 wallet_id, address_index 作为联合唯一键
  accountAsset: `
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "address_id" BIGINT,
    "asset_id" BIGINT,
    "balance" VARCHAR,
    "asset_usd" VARCHAR,
    "asset_cny" VARCHAR,
    "is_del" INTEGER,
    UNIQUE (address_id, asset_id) ON CONFLICT REPLACE,
    FOREIGN KEY (address_id) REFERENCES account (id),
    FOREIGN KEY (asset_id) REFERENCES asset (id)
  `,
};

export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    db = SQLite.openDatabase(
      {
        name: databaseName,
        location: databaseLocation,
      },
      () => {
        console.log('数据库已打开');
        resolve(true);
      },
      (error) => {
        console.error('打开数据库时出错:', error);
        reject(error);
      }
    );
  });
};

export const closeDatabase = () => {
  if (db) {
    db.close(() => {
      console.log('数据库连接已关闭');
    });
  }
};

export const createTable = (
  table_name: string,
  {
    query,
    params,
  }: {
    query: string;
    params?: string[];
  }
) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not open'));
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT name FROM sqlite_master WHERE type='table' AND name='${table_name}'`,
        [],
        (_, result) => {
          if (result.rows.length === 0) {
            // 表不存在，执行创建表的操作
            tx.executeSql(
              query,
              params,
              (tx, result) => {
                console.log(`Table ${table_name} created successfully`);
                resolve(result);
              },
              (tx, error) => {
                console.error(`Failed to create table: ${table_name}`, JSON.stringify(tx));
                reject(error);
              }
            );
          } else {
            // 表已经存在，无需执行任何操作
            // console.log(`Table ${table_name} already exists`);
            resolve(result);
          }
        },
        (error) => {
          console.error('Failed to check table existence:', error);
        }
      );
    });
  });
};

export const deleteTable = (table_name: string) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not open'));
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${table_name}`,
        [],
        (tx, result) => {
          console.log(`Table ${table_name} delete successfully`);
          resolve(result);
        },
        (tx, error) => {
          console.error('Failed to delete table:', error);
          reject(error);
        }
      );
    });
  });
};

export const executeQuery = ({
  query,
  params = [],
  customExec,
}: {
  query?: string;
  params?: string[];
  customExec?: (tx: SQLite.Transaction, resolve: (value: unknown) => void, reject: (value: unknown) => void) => void;
}) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not open'));
      return;
    }
    db.transaction((tx) => {
      if (customExec) {
        customExec(tx, resolve, reject);
      } else if (query) {
        tx.executeSql(
          query,
          params,
          (tx, result) => {
            resolve(result);
          },
          (tx, error) => {
            reject(error);
          }
        );
      }
    });
  });
};

export const executeSql = (tx: Transaction, sql: string, params: any) => {
  return new Promise<SQLite.ResultSet>((resolve, reject) => {
    tx.executeSql(
      sql,
      params,
      (txObj, resultSet) => resolve(resultSet),
      (txObj, error) => reject(error)
    );
  });
};
