/*
 * @desc: 菜单配置项
 */

import home from './home';
import product from './product';
import asset from './asset';
import init from './init';
import DApp from './dApp'
const menus: any[] = [...init, ...home, ...product, ...asset, ...DApp];

export default menus;
