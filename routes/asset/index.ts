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
import SettingScreen from '@screen/Asset/SettingScreen';
import SearchToken from '@screen/Asset/SearchToken';
import SearchHistory from '@screen/Asset/SearchHistory';
import ImportWallet from '@screen/Asset/ImportWallet';
import Test from '@screen/Asset/Test';
import i18next from 'i18next';
const menus = [
  {
    name: 'tokenDetail',
    options: {
      title: 'asset.tokenDetail',
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
      title: 'asset.createWallet',
      headerShadowVisible: false,
    },
    component: CreateWallet, //（完成）
  },
  {
    name: 'importWallet',
    options: {
      title: 'asset.importWallet',
      headerShadowVisible: false,
    },
    component: ImportWallet, //（完成）
  },
  {
    name: 'asset',
    options: {
      title: 'asset.myAssets',
      headerShadowVisible: false,
    },
    component: Asset, //（差一部分）
  },
  {
    name: 'startBackup',
    options: {
      title: 'asset.startBackup',
      // headerShown: false
      headerShadowVisible: false,
    },
    component: StartBackup, //（完成）
  },
  {
    name: 'backupMnemonics',
    options: {
      title: 'asset.backupSeedPhrase',
      headerShadowVisible: false,
    },
    component: BackupMnemonics, //（完成）
  },

  {
    name: 'transferPayment',
    options: {
      title: 'asset.transferTitle',
      headerShadowVisible: false,
    },
    component: TransferPayment, //（完成）
  },
  {
    name: 'addToken',
    options: {
      title: 'asset.addAsset',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: AddToken, //（完成）
  },
  {
    name: 'searchToken',
    options: {
      title: '',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: SearchToken, //（完成）
  },
  {
    name: 'searchHistory',
    options: {
      title: '',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: SearchHistory, //（完成）
  },
  {
    name: 'swap',
    options: {
      title: 'asset.flash',
      headerShadowVisible: false,
    },
    component: Swap, //（完成）
  },
  {
    name: 'verifyMnemonics',
    options: {
      title: 'asset.verifyMnemonic',
      headerShadowVisible: false,
    },
    component: VerifyMnemonics, //（完成）
  },
  {
    name: 'coinDetail',
    options: {
      title: 'asset.tokenDetail',
      headerShadowVisible: false,
    },
    component: CoinDetail,
  },
  {
    name: 'settingScreen',
    options: {
      title: 'asset.walletSettings',
      headerShadowVisible: false,
    },
    component: SettingScreen,
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
  {
    name: 'test',
    component: Test, //（完成）
  },
];

export default menus;
