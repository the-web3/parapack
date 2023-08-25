import { DAppList } from "@screen/DApp/DAppList"
import { DAppWebView } from "@screen/DApp/WebView"
import { DAppDetail } from "@screen/DApp/DAppDetail"

// Just a simple option please optimize
const _getOptions = (title: string) => {
  return {
    title,
    headerShadowVisible: false
  }
}

const menus = [
  {
    name: 'DAppList',
    options: _getOptions('DApp'),
    component: DAppList
  },
  {
  name: "DAppWebView",
  options: _getOptions(''),
  component:  DAppWebView
  },
  {
    name: "DAppDetail",
    options: _getOptions(''),
    component:  DAppDetail
  }
];

export default menus