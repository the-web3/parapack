import BackupMnemonics from '@screen/Asset/BackupMnemonics';
import CreateWallet from '@screen/Asset/CreateWallet';
import StartBackup from '@screen/Asset/StartBackup';
import VerifyMnemonics from '@screen/Asset/VerifyMnemonics';
import TransferPayment from '@screen/Asset/TransferPayment';
import CoinDetail from '@screen/Asset/CoinDetail';
import Asset from '@screen/Asset';
import AddToken from '@screen/Asset/AddToken';
import Swap from '@screen/Asset/Swap';
const menus = [
  // {
  //   name: '创建钱包',
  //   options: {
  //     title: '创建钱包',
  //   },
  //   component: CreateWallet, （完成）
  // },
  // {
  //   name: 'startBackup',
  //   options: {
  //     title: '开始备份',
  //     // headerShown: false
  //   },
  //   component: StartBackup, （完成）
  // },
  // {
  //   name: 'backupMnemonics',
  //   options: {
  //     title: '备份助记词',
  //   },
  //   component: BackupMnemonics, （完成）
  // },
  // {
  //   name: 'verifyMnemonics',
  //   options: {
  //     title: '验证助记词',
  //   },
  //   component: VerifyMnemonics, （完成）
  // },
  // {
  //   name: 'TransferPayment',
  //   options: {
  //     title: '转账',
  //   },
  //   component: TransferPayment, （完成）
  // },
  // {
  //   name: 'Asset',
  //   options: {
  //     title: '我的资产',
  //   },
  //   component: Asset, （差一部分）
  // },
  // {
  //   name: 'AddToken',
  //   options: {
  //     title: '添加币种',
  //     headerShown: false,
  //   },
  //   component: AddToken, （完成）
  // },
  // {
  //   name: 'Swap',
  //   options: {
  //     title: '闪兑',
  //   },
  //   component: Swap,//（完成）
  // },
  {
    name: 'CoinDetail',
    options: {
      title: '币种详情',
    },
    component: CoinDetail,
  },
  {
    name: 'TokenDetail',
    options: {
      title: 'Token详情',
    },
    component: CoinDetail,
  },
];

export default menus;
