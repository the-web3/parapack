import { Platform } from 'react-native';
//
import RNFS from 'react-native-fs';

export const rootPath = Platform.OS === 'ios' ? RNFS.MainBundlePath : 'raw';
const readFile = Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets;
//
const loadExtFile = (path: string) => readFile(path, 'utf8');
console.log(rootPath);
let metamaskExt = '';
const loadMetamaskExt = () => {
  if (metamaskExt.length) return metamaskExt;
  loadExtFile(`${rootPath}/inject_metamask_ext.js`)
    .then((content) => {
      metamaskExt = content;
    })
    .catch((e) => console.log(e));
};

const getMetamaskExt = () => metamaskExt;

export { loadMetamaskExt, getMetamaskExt };
