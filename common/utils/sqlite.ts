import SQLite from 'react-native-sqlite-storage';

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
    UNIQUE (chainName) ON CONFLICT REPLACE
    `,
  //asset table :chain_id TokenName  contract_addr 联合唯一键
  asset: `
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "chain_id" BIGINT,
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
    "chain_id" BIGINT,
    "wallet_name" VARCHAR,
    "device_id" VARCHAR,
    "wallet_uuid" VARCHAR UNIQUE,
    "mnemonic_code" VARCHAR,
    "password" VARCHAR,
    "wallet_asset_usd" VARCHAR,
    "wallet_asset_cny" VARCHAR,
    "backup" INTEGER,
    "has_submit" INTEGER,
    "is_del" INTEGER,
    FOREIGN KEY (chain_id) REFERENCES chain (id)
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
                console.error(`Failed to create table: ${table_name}`, error);
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
  customExec?: (tx: SQLite.Transaction) => void;
}) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database is not open'));
      return;
    }
    db.transaction((tx) => {
      if (customExec) {
        customExec(tx);
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

// export default {
//   dbName: 'walletData',
//   dbPath: '_doc/walletData.db',

//   // 判断数据库是否打开
//   isOpen() {
//     const open = plus.sqlite.isOpenDatabase({
//       name: this.dbName,
//       path: this.dbPath,
//     });
//     return open;
//   },

//   // 创建数据库 或 有该数据库就打开
//   openSqlite() {
//     return new Promise((resolve, reject) => {
//       plus.sqlite.openDatabase({
//         name: this.dbName,
//         path: this.dbPath,
//         success(e) {
//           resolve(e); // 成功回调
//         },
//         fail(e) {
//           reject(e); // 失败回调
//         },
//       });
//     });
//   },

//   // 关闭数据库
//   closeSqlite() {
//     return new Promise((resolve, reject) => {
//       plus.sqlite.closeDatabase({
//         name: this.dbName,
//         success(e) {
//           resolve(e);
//         },
//         fail(e) {
//           reject(e);
//         },
//       });
//     });
//   },

//   // 数据库建表 sql:'CREATE TABLE IF NOT EXISTS dbTable("id" varchar(50),"name" TEXT)
//   // 创建 CREATE TABLE IF NOT EXISTS 、 dbTable 是表名，不能用数字开头、括号里是表格的表头
//   createTable(dbTable: string, data?: string) {
//     return new Promise((resolve, reject) => {
//       // executeSql: 执行增删改等操作的SQL语句
//       plus.sqlite.executeSql({
//         name: this.dbName,
//         sql: [`CREATE TABLE IF NOT EXISTS ${dbTable}(${data})`],
//         success(e) {
//           resolve(e);
//         },
//         fail(e) {
//           reject(e);
//         },
//       });
//     });
//   },

//   // 数据库删表 sql:'DROP TABLE dbTable'
//   dropTable(dbTable?: string) {
//     return new Promise((resolve, reject) => {
//       plus.sqlite.executeSql({
//         name: this.dbName,
//         sql: [`DROP TABLE ${dbTable}`],
//         success(e) {
//           resolve(e);
//         },
//         fail(e) {
//           reject(e);
//         },
//       });
//     });
//   },

//   // 向表格里添加数据 sql:'INSERT INTO dbTable VALUES('x','x','x')'   对应新增
//   // 或者 sql:'INSERT INTO dbTable ('x','x','x') VALUES('x','x','x')'   具体新增
//   // 插入 INSERT INTO  、 dbTable 是表名、根据表头列名插入列值
//   insertTableData(dbTable: string, data?: string, condition?: string) {
//     // 判断有没有传参
//     if (dbTable !== undefined && data !== undefined) {
//       // 判断传的参是否有值
//       const bol = JSON.stringify(data) == '{}';
//       let sql = '';
//       if (!bol) {
//         if (condition == undefined) {
//           sql = `INSERT INTO ${dbTable} VALUES('${data}')`;
//         } else {
//           sql = `INSERT INTO ${dbTable} (${condition}) VALUES(${data})`;
//         }
//         // console.log(sql);
//         return new Promise((resolve, reject) => {
//           // 表格添加数据
//           plus.sqlite.executeSql({
//             name: this.dbName,
//             sql: [sql],
//             success(e) {
//               resolve(e);
//             },
//             fail(e) {
//               reject(e);
//             },
//           });
//         });
//       } else {
//         return new Promise((resolve, reject) => {
//           reject('错误添加');
//         });
//       }
//     } else {
//       return new Promise((resolve, reject) => {
//         reject('错误添加');
//       });
//     }
//   },

//   // 根据条件向表格里添加数据  有数据更新、无数据插入
//   // (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
//   insertOrReplaceData(dbTable: string, data?: string, condition?: string) {
//     // 判断有没有传参
//     if (dbTable !== undefined && data !== undefined) {
//       let sql = '';
//       if (condition == undefined) {
//         sql = `INSERT OR REPLACE INTO ${dbTable} VALUES('${data}')`;
//       } else {
//         sql = `INSERT OR REPLACE INTO ${dbTable} (${condition}) VALUES(${data})`;
//       }
//       return new Promise((resolve, reject) => {
//         // 表格添加数据
//         plus.sqlite.executeSql({
//           name: this.dbName,
//           sql: [sql],
//           success(e) {
//             resolve(e);
//           },
//           fail(e) {
//             reject(e);
//           },
//         });
//       });
//     } else {
//       return new Promise((resolve, reject) => {
//         reject('错误添加');
//       });
//     }
//   },

//   // 查询获取数据库里的数据 sql:'SELECT * FROM dbTable WHERE lname = 'lvalue''
//   // 查询 SELECT * FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
//   selectTableData(dbTable: string, lname?: string, lvalue?: any, cc?: string, dd?: any): Promise<any[]> {
//     if (dbTable !== undefined) {
//       // 第一个是表单名称，后两个参数是列表名，用来检索
//       let sql = '';
//       if (lname !== undefined && cc !== undefined) {
//         // 两个检索条件
//         sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${cc} = '${dd}'`;
//       }
//       if (lname !== undefined && cc == undefined) {
//         // 一个检索条件
//         sql = `SELECT * FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
//         // console.log(sql);
//       }
//       if (lname == undefined) {
//         sql = `SELECT * FROM ${dbTable}`;
//       }
//       return new Promise((resolve, reject) => {
//         // 表格查询数据  执行查询的SQL语句
//         plus.sqlite.selectSql({
//           name: this.dbName,
//           sql: sql,
//           success(e) {
//             resolve(e);
//           },
//           fail(e) {
//             reject(e);
//           },
//         });
//       });
//     } else {
//       return new Promise((resolve, reject) => {
//         reject('错误查询');
//       });
//     }
//   },

//   // 删除表里的数据 sql:'DELETE FROM dbTable WHERE lname = 'lvalue''
//   // 删除 DELETE FROM 、 dbTable 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
//   deleteTableData(dbTable: string, lname?: string, lvalue?: string, ww?: string, ee?: string) {
//     if (dbTable !== undefined) {
//       let sql = '';
//       if (lname == undefined) {
//         sql = `DELETE FROM ${dbTable}`;
//       } else {
//         if (ww !== undefined) {
//           // 两个检索条件
//           sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}' AND ${ww} = '${ee}'`;
//         } else {
//           // 一个检索条件
//           sql = `DELETE FROM ${dbTable} WHERE ${lname} = '${lvalue}'`;
//         }
//       }
//       return new Promise((resolve, reject) => {
//         // 删除表数据
//         plus.sqlite.executeSql({
//           name: this.dbName,
//           sql: [sql],
//           success(e) {
//             resolve(e);
//           },
//           fail(e) {
//             reject(e);
//           },
//         });
//       });
//     } else {
//       return new Promise((resolve, reject) => {
//         reject('错误删除');
//       });
//     }
//   },

//   // 修改数据表里的数据 sql:"UPDATE dbTable SET 列名 = '列值',列名 = '列值' WHERE lname = 'lvalue'"
//   // 修改 UPDATE 、 dbTable 是表名, data: 要修改的列名=修改后列值, lname,lvalue 是查询条件的列名和列值
//   updateTableData(dbTable: string, data?: string, lname?: string, lvalue?: any, cc?: string, dd?: any) {
//     let sql = '';
//     if (lname == undefined) {
//       sql = `UPDATE ${dbTable} SET ${data}`;
//     } else {
//       if (lname !== undefined && cc !== undefined) {
//         // 两个检索条件
//         sql = `UPDATE ${dbTable} SET ${data} WHERE ${lname} = '${lvalue}' AND ${cc} = '${dd}'`;
//       } else {
//         sql = `UPDATE ${dbTable} SET ${data} WHERE ${lname} = '${lvalue}'`;
//       }
//     }
//     // WHERE 前面是要修改的列名、列值，后面是条件的列名、列值
//     return new Promise((resolve, reject) => {
//       // 修改表数据
//       plus.sqlite.executeSql({
//         name: this.dbName,
//         sql: [sql],
//         success(e) {
//           resolve(e);
//         },
//         fail(e) {
//           reject(e);
//         },
//       });
//     });
//   },

//   // 获取指定数据条数  sql:"SELECT * FROM dbTable ORDER BY 'id' DESC LIMIT 15 OFFSET 'num'"
//   // dbTable 表名, ORDER BY 代表排序默认正序, id 是排序的条件 DESC 代表倒序，从最后一条数据开始拿
//   // LIMIT 15 OFFSET '${num}',这句的意思是跳过 num 条拿 15 条数据, num 为跳过多少条数据是动态值
//   // 例 初始num设为0，就从最后的数据开始拿15条，下次不拿刚获取的数据，所以可以让num为15，这样就能一步一步的拿完所有的数据
//   pullSQL(dbTable: string, id?: string, num?: string) {
//     return new Promise((resolve, reject) => {
//       plus.sqlite.selectSql({
//         name: this.dbName,
//         sql: `SELECT * FROM ${dbTable} ORDER BY '${id}' DESC LIMIT 15 OFFSET '${num}'`,
//         success(e) {
//           resolve(e);
//         },
//         fail(e) {
//           reject(e);
//         },
//       });
//     });
//   },
// };
