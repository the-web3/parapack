import DB from '@common/utils/sqlite';
import { INIT_ACCOUNT, INIT_ACCOUNT_ASSET, INIT_ASSET, INIT_WALLET, INIT_WALLET_ASSET } from '@common/constants';

export const createTable = (type: 'chain' | 'asset' | 'wallet' | 'walletAsset' | 'account' | 'accountAsset') => {
	const TABLE_MAP = {
		//is_del (0:not deleted 1:delete)
		//chain table - support(0:nonsupport 1:support)
		chain:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "name" varchar, "chain" varchar, "symbol" varchar, "logo" varchar, "active_logo" varchar, "is_del" int, "support" int',
		//asset table
		asset:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "chain_id" bigInt, "name" varchar, "logo" varchar, "active_logo" varchar, "contract_addr" varchar, "unit" int, "is_del" int',
		//wallet table mnemonic_code is encode
		wallet:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "chain_id" bigInt, "wallet_name" varchar, "device_id" varchar, "wallet_uuid" varchar, "mnemonic_code" varchar, "password" varchar, "asset_usd" varchar, "asset_cny" varchar, "has_submit" int, "is_del" int',
		//wallet asset table
		walletAsset:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "wallet_id" bigInt, "asset_id" bigInt, "balance" varchar, "asset_usd" varchar, "asset_cny" varchar, "is_del" int',
		//account table (account is equivalent to address) priv_key is encode
		account:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "wallet_id" bigInt, "index" int, "address" varchar, "pub_key" varchar, "priv_key" varchar, "is_del" int',
		//account asset table (account is equivalent to address)
		accountAsset:
			'"id" INTEGER PRIMARY KEY AUTOINCREMENT, "address_id" bigInt, "asset_id" bigInt, "balance" varchar, "asset_usd" varchar, "asset_cny" varchar, "is_del" int',
	};
	return DB.createTable(type, TABLE_MAP[type])
		.then((res) => {
			console.log(`创建${type}表成功`);
			return res;
		})
		.catch((error) => {
			console.log(`创建${type}表失败`, error);
			uni.showToast({
				title: `创建${type}表失败`,
				icon: 'none',
			});
			return error;
		});
};

export const insertOrReplaceTableData = async (
	tableName: 'asset' | 'wallet' | 'walletAsset' | 'account' | 'accountAsset',
	value: Record<string, any>
) => {
	const table_map = {
		asset: INIT_ASSET,
		wallet: INIT_WALLET,
		walletAsset: INIT_WALLET_ASSET,
		account: INIT_ACCOUNT,
		accountAsset: INIT_ACCOUNT_ASSET,
	};
	const data = {
		...table_map[tableName],
		...value,
	};
	const res = await DB.insertOrReplaceData(
		tableName,
		`'${Object.values(data || []).join("','")}'`,
		`'${Object.keys(data || []).join("','")}'`
	).catch((error) => {
		console.log(`创建or更新${tableName}数据失败`, error);
	});
	return res;
};
