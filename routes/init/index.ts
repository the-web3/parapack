import ScannerScreen from '@screen/Common/ScannerScreen';
import Guide from '@screen/Guide';
import SplashScreen from '@screen/SplashScreen';
const menus = [
  {
    name: 'splashScreen',
    options: {
      // title: 'SplashScreen',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: SplashScreen,
  },
  {
    name: 'guide',
    options: {
      title: 'Guide',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: Guide,
  },
  {
    name: 'scannerScreen',
    options: {
      headerShown: false,
      headerShadowVisible: false,
    },
    component: ScannerScreen,
  },
];

export default menus;
