import { DAppList } from '@screen/DApp/DAppList';
import { DAppWebView } from '@screen/DApp/WebView';
import { DAppDetail } from '@screen/DApp/DAppDetail';
import DeveloperOnboarding from '@screen/DApp/DeveloperOnboarding';
import DevloperApplication from '@screen/DApp/DevloperApplication';
import ReportQuestion from '@screen/DApp/ReportQuestion';
import SubmitScreen from '@screen/DApp/Submit';

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
    options: _getOptions(''),
    component: ReportQuestion,
  },
  {
    name: 'DevloperApplication',
    options: _getOptions(''),
    component: DevloperApplication,
  },
  {
    name: 'DeveloperOnboarding',
    options: _getOptions(''),
    component: DeveloperOnboarding,
  },
  {
    name: 'SubmitScreen',
    options: _getOptions(''),
    component: SubmitScreen,
  },
];

export default menus;
