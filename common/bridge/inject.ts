import { pSelect } from "./styles";

import RNFS from 'react-native-fs'
export const rootPath = Platform.OS === 'ios' ? RNFS.MainBundlePath : 'raw'
const readFile = Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets

const loadExtFile = path =>  readFile(path,'utf8');

let metamaskExt = '';
export const loadMetamaskExt = () => {
  if (metamaskExt.length) return metamaskExt;
  loadExtFile(`${rootPath}/injectMetamaskExt.js`).then(content => {
    metamaskExt = content;
  }).catch(e => console.log(e));
}

const getMetamaskExt = () => metamaskExt;

export {
  getMetamaskExt
}
