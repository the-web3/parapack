export const CHAIN_LIST = [
  {
    id: 1,
    logo: '/static/image/BTC_h@2x.png',
    active_logo: '/static/image/BTC@2x.png',
    name: 'BTC', //虚拟币名称
    chain: 'Bitcoin', // 链名称
    symbol: 'eBTC', // 币种名称
    support: 0,
    is_del: 0,
  },
  {
    id: 2,
    logo: '/static/image/ETH_h@2x.png',
    active_logo: '/static/image/ETH@2x.png',
    name: 'ETH',
    chain: 'Ethereum',
    symbol: 'ETH',
    support: 1,
    is_del: 0,
  },
  {
    id: 3,
    logo: '/static/image/EOS_h@2x.png',
    active_logo: '/static/image/EOS@2x.png',
    name: 'EOS',
    chain: 'EOS',
    symbol: 'EOS',
    support: 0,
    is_del: 0,
  },
  {
    id: 4,
    logo: '/static/image/ARBI-h@2x.png',
    active_logo: '/static/image/ARBI@2x.png',
    name: 'ARBI',
    chain: 'Arbitrum',
    symbol: 'ETH',
    support: 1,
    is_del: 0,
  },
];
export const INIT_ASSET = {
  chain_id: 0, //链ID
  name: '', //资产名称
  logo: '', //币Logo
  active_logo: '', //币Logo
  contract_addr: '', //合约地址
  unit: 0, //精度
  is_del: 0, //状态 0正常 1删除
};

export const INIT_WALLET = {
  chain_id: 0, //chain的ID
  wallet_name: '', // 钱包名称
  device_id: '', // 设备ID
  wallet_uuid: '', // 钱包ID
  mnemonic_code: '', // 助记词编码(加密)
  password: '', // 密码
  asset_usd: 0, //资产usd
  asset_cny: 0, //资产人民币
  has_submit: false, //是否提交
  is_del: 0, //是否删除 0：正常；1:删除
};

export const INIT_ACCOUNT = {
  wallet_id: 0, //钱包ID
  index: 0, //Bip地址索引
  address: '', //地址
  priv_key: '', //加密的私钥
  pub_key: '', //公钥
  is_del: 0, //删除
};

export const INIT_WALLET_ASSET = {
  wallet_id: 0, //钱包ID
  asset_id: 0, //资产ID
  balance: 0, //余额
  asset_usd: 0, //USD 资产
  asset_cny: 0, //CNY 资产
  is_del: 0, //状态 0正常 1删除
};

export const INIT_ACCOUNT_ASSET = {
  address_id: 0, //账户ID
  asset_id: 0, //资产ID
  balance: 0, //余额
  asset_usd: 0, //USD 资产
  asset_cny: 0, //CNY 资产
  is_del: 0, //状态 0正常 1删除
};

export const INIT_TOKEN = {
  address: '',
  balance: '0',
  chain: '',
  contract_addr: '',
  icon: '',
  network: '',
  symbol: '',
  asset_usd: 0, //资产usd
  asset_cny: 0, //资产人民币
  wallet_name: '',
  wallet_uuid: '',
};
