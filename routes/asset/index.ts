import BackupMnemonics from '@screen/Asset/BackupMnemonics';
import CreateWallet from '@screen/Asset/CreateWallet';
import StartBackup from '@screen/Asset/StartBackup';
import VerifyMnemonics from '@screen/Asset/VerifyMnemonics';
import TransferPayment from '@screen/Asset/TransferPayment';
import CoinDetail from '@screen/Asset/CoinDetail';
import Asset from '@screen/Asset';
import AddToken from '@screen/Asset/AddToken';
import Swap from '@screen/Asset/Swap';
import TokenDetail from '@screen/Asset/TokenDetail';
import Collection from '@screen/Asset/Collection';
const menus = [
  {
    name: 'tokenDetail',
    options: {
      title: 'Token详情',
      headerStyle: {
        backgroundColor: '#3251EA', // 设置导航条的背景颜色
        // borderBottomWidth: 0,
      },
      headerShadowVisible: false,
      headerTintColor: 'white', // 设置导航条文字的颜色
      headerTitleStyle: {
        // fontWeight: 'bold', // 设置导航条标题的样式
      },
    },
    component: TokenDetail,
  },
  {
    name: 'createWallet',
    options: {
      title: '创建钱包',
      headerShadowVisible: false,
    },
    component: CreateWallet, //（完成）
  },
  {
    name: 'asset',
    options: {
      title: '我的资产',
      headerShadowVisible: false,
    },
    component: Asset, //（差一部分）
  },
  {
    name: 'startBackup',
    options: {
      title: '开始备份',
      // headerShown: false
      headerShadowVisible: false,
    },
    component: StartBackup, //（完成）
  },
  {
    name: 'backupMnemonics',
    options: {
      title: '备份助记词',
      headerShadowVisible: false,
    },
    component: BackupMnemonics, //（完成）
  },

  {
    name: 'transferPayment',
    options: {
      title: '转账',
      headerShadowVisible: false,
    },
    component: TransferPayment, //（完成）
  },
  {
    name: 'addToken',
    options: {
      title: '添加币种',
      // headerShown: false,
      headerShadowVisible: false,
    },
    component: AddToken, //（完成）
  },
  {
    name: 'swap',
    options: {
      title: '闪兑',
      headerShadowVisible: false,
    },
    component: Swap, //（完成）
  },
  {
    name: 'verifyMnemonics',
    options: {
      title: '验证助记词',
      headerShadowVisible: false,
    },
    component: VerifyMnemonics, //（完成）
  },
  {
    name: 'coinDetail',
    options: {
      title: '币种详情',
      headerShadowVisible: false,
    },
    component: CoinDetail,
  },
  {
    name: 'collection',
    options: {
      title: '',
      headerShadowVisible: false,
      // headerShown: false,
      headerStyle: {
        backgroundColor: '#3B28CC',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        color: 'white',
      },
    },
    component: Collection, //（完成）
  },
];

export default menus;
