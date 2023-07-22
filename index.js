/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import buffer from 'buffer';
global.Buffer = buffer.Buffer;

// set node util - TextEncoder class
import { TextEncoder } from '@polkadot/x-textencoder';
global.TextEncoder = TextEncoder;

// set node crypto - getRandomValues function
import 'react-native-get-random-values';


AppRegistry.registerComponent(appName, () => App);
