import { Platform } from 'react-native';
//
import RNFS from 'react-native-fs';

export const rootPath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.MainBundlePath + '/res/raw';
const readFile = Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets;
//
const loadExtFile = (path: string) => readFile(path, 'utf8');
console.log(rootPath);
let metamaskExt = '';
const loadMetamaskExt = () => {
  if (metamaskExt.length) return metamaskExt;
  const fileName = Platform.OS === 'ios' ? `injectMetamaskExt.js` : `inject_metamask_ext.js`;
  loadExtFile(`${rootPath}/${fileName}`)
    .then((content) => {
      metamaskExt = content;
    })
    .catch((e) => console.log(e));
};

const getMetamaskExt = () => metamaskExt;

export { loadMetamaskExt, getMetamaskExt };
