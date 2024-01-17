import { DAppList } from '@screen/DApp/DAppList';
import { DAppWebView } from '@screen/DApp/WebView';
import { DAppDetail } from '@screen/DApp/DAppDetail';
import DeveloperOnboarding from '@screen/DApp/DeveloperOnboarding';
import DeveloperApplication from '@screen/DApp/DeveloperApplication';
import ReportQuestion from '@screen/DApp/ReportQuestion';
import SubmitScreen from '@screen/DApp/Submit';
import Review from '@screen/DApp/Review';
import Parapack from '@screen/DApp/Parapack';
import NewsArticle from '@screen/DApp/NewsArticle';
import Setting from '@screen/DApp/Setting';
import News from '@screen/DApp/News';
import { DAppDetails } from '@screen/DApp/DAppDetails';
import Language from '@screen/DApp/Language';
import SearchDapp from '@screen/DApp/SearchDapp';
import i18next from 'i18next';

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
    options: _getOptions('dApp.reportQuestion'),
    component: ReportQuestion,
  },
  {
    name: 'DeveloperApplication',
    options: _getOptions('developerApplication.developerApplication'),
    component: DeveloperApplication,
  },
  {
    name: 'DeveloperOnboarding',
    options: _getOptions('dApp.DeveloperOnboarding'),
    component: DeveloperOnboarding,
  },
  {
    name: 'SubmitScreen',
    options: _getOptions('dApp.listingApplication'),
    component: SubmitScreen,
  },
  {
    name: 'Review',
    options: _getOptions('dApp.listingApplication'),
    component: Review,
  },
  {
    name: 'DAppDetails',
    options: _getOptions(''),
    component: DAppDetails,
  },
  {
    name: 'Parapack',
    options: _getOptions('dApp.aboutUs'),
    component: Parapack,
  },
  {
    name: 'NewsArticle',
    options: _getOptions('dApp.informationCenter'),
    component: NewsArticle,
  },
  {
    name: 'Setting',
    options: _getOptions('dApp.settings'),
    component: Setting,
  },
  {
    name: 'News',
    options: _getOptions('dApp.announcementDetails'),
    component: News,
  },
  {
    name: 'Language',
    options: _getOptions('dApp.language'),
    component: Language,
  },
  {
    name: 'SearchDapp',
    options: {
      title: '',
      headerShown: false,
      headerShadowVisible: false,
    },
    component: SearchDapp,
  },
];

export default menus;
