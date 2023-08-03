# parapack

when you install new package need go ios folder execute

```
 pod install
```

## start

when have cache ,such as set babel or install something,u can start with

```
yarn run start  --reset-cache
```

- ios

```
npx react-native run-ios
```

- android

```
 npx react-native run-android 

```

clean android cache
go to android folder,exec

```
./gradlew clean
```

## build

- android

```
npx react-native build-android --mode=release  

```

## iconfont

change iconfont.json's symbol_url, exec shell

```
npx iconfont-rn
```

## savourlabs-wallet-sdk/wallet

when use `savourlabs-wallet-sdk/wallet` need chain is our symbol.toLowerCase()
demo

```
import { CreateAddress, DecodeMnemonic, EncodeMnemonic, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
const account = CreateAddress({
    chain: supportChian.symbol.toLowerCase(),
    seedHex: seed.toString('hex'),
    index: 0,
    receiveOrChange: 0,
    network: 'mainnet',
});

```
