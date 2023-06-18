import Guide from '../../screen/Guide';
import SplashScreen from '../../screen/SplashScreen';
const menus = [
  {
    name: 'SplashScreen',
    options: {
      // title: 'SplashScreen',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: SplashScreen,
  },
  {
    name: 'Guide',
    options: {
      title: 'Guide',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: Guide,
  },
];

export default menus;
