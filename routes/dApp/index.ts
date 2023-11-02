import { DAppList } from '@screen/DApp/DAppList';
import { DAppWebView } from '@screen/DApp/WebView';
import { DAppDetail } from '@screen/DApp/DAppDetail';
import DeveloperOnboarding from '@screen/DApp/DeveloperOnboarding';
import DevloperApplication from '@screen/DApp/DevloperApplication';
import ReportQuestion from '@screen/DApp/ReportQuestion';
import SubmitScreen from '@screen/DApp/Submit';
import Review from '@screen/DApp/Review';
import Parapack from '@screen/DApp/Parapack';
import NewsArticle from '@screen/DApp/NewsArticle';
import Settings from '@screen/DApp/Settings/Settings';
import Setting from '@screen/DApp/Setting';
import News from '@screen/DApp/News';

// Just a simple option please optimize
const _getOptions = (title: string) => {
  return {
    title,
    headerShadowVisible: false,
  };
};

const menus = [
  {
    name: 'DAppList',
    options: _getOptions('DApp'),
    component: DAppList,
  },
  {
    name: 'DAppWebView',
    options: _getOptions(''),
    component: DAppWebView,
  },
  {
    name: 'DAppDetail',
    options: _getOptions(''),
    component: DAppDetail,
  },
  {
    name: 'ReportQuestion',
    options: _getOptions('报告问题'),
    component: ReportQuestion,
  },
  {
    name: 'DevloperApplication',
    options: _getOptions('入驻申请'),
    component: DevloperApplication,
  },
  {
    name: 'DeveloperOnboarding',
    options: _getOptions('开发者入驻规则及协议'),
    component: DeveloperOnboarding,
  },
  {
    name: 'SubmitScreen',
    options: _getOptions('入驻申请'),
    component: SubmitScreen,
  },
  {
    name: 'Review',
    options: _getOptions('入驻申请'),
    component: Review,
  },
  // {
  //   name: 'Settings',
  //   options: _getOptions(''),
  //   component: Settings,
  // },
  {
    name: 'Parapack',
    options: _getOptions(''),
    component: Parapack,
  },
  {
    name: 'NewsArticle',
    options: _getOptions(''),
    component: NewsArticle,
  },
  {
    name: 'Setting',
    options: _getOptions('设置'),
    component: Setting,
  },
  {
    name: 'News',
    options: _getOptions('公告詳情'),
    component: News,
  },
];

export default menus;
