import { DAppList } from "@screen/DApp/DAppList"
import { DAppWebView } from "@screen/DApp/WebView"

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
  // TODO temp title is uniswap
  options: _getOptions('UniSwap'),
  component:  DAppWebView
  }
];

export default menus