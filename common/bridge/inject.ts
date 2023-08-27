import { Platform } from 'react-native';

import RNFS from 'react-native-fs';
const copyAssetToStorage = async (assetPath, destPath) => {
  try {
    await RNFS.copyFileAssets(assetPath, destPath);
    console.log(`Asset ${assetPath} copied to ${destPath}`);
  } catch (error) {
    console.error(`Error copying asset: ${error.message}`);
  }
};

if (Platform.OS === 'android') {
  const assetPath = 'inject_metamask_ext.js';
  const destPath = `${RNFS.DocumentDirectoryPath}/${assetPath}`;
  copyAssetToStorage(assetPath, destPath);
}
export const rootPath = Platform.OS === 'ios' ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
// const readFile = Platform.OS === 'ios' ? RNFS.readFile : RNFS.readFileAssets;
const loadExtFile = (path: string) => RNFS.readFile(path, 'utf8');
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
