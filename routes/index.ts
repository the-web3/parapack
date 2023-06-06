/*
 * @desc: 菜单配置项
 */

import home from './home';
import product from './product';
import asset from './asset';
// import init from './init';
const menus: any[] = [
  // ...init,
  ...home,
  ...product,
  ...asset,
];

export default menus;
