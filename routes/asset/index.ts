import BackupMnemonics from '@screen/Asset/BackupMnemonics';
import CreateWallet from '@screen/Asset/CreateWallet';
import StartBackup from '@screen/Asset/StartBackup';
import VerifyMnemonics from '@screen/Asset/VerifyMnemonics';
import TransferPayment from '@screen/Asset/TransferPayment';
const menus = [
  // {
  //   name: '创建钱包',
  //   options: {
  //     title: '创建钱包',
  //   },
  //   component: CreateWallet,
  // },
  // {
  //   name: 'startBackup',
  //   options: {
  //     title: '开始备份',
  //     // headerShown: false
  //   },
  //   component: StartBackup,
  // },
  // {
  //   name: 'backupMnemonics',
  //   options: {
  //     title: '备份助记词',
  //   },
  //   component: BackupMnemonics,
  // },
  // {
  //   name: 'verifyMnemonics',
  //   options: {
  //     title: '验证助记词',
  //   },
  //   component: VerifyMnemonics,
  // },
  {
    name: 'TransferPayment',
    options: {
      title: '转账',
    },
    component: TransferPayment,
  },
];

export default menus;
