# parapack

## setup

1. Homebrew

```
 /bin/zsh -c "$(curl -fsSL <https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh>)"

<!-- check if success -->
$ brew --version
Homebrew 3.6.15
```

2. node

```
brew install node (MacOS)
sudo apt install node (Ubuntu)

<!-- check if success -->
$ node --version
v19.7.0
$ npm --version
9.5.0
```

3. Watchman

```
brew install watchman (MacOS)
choco install watchman (Windows)

<!-- check if success --> (MacOS)
$ watchman --version
2023.02.20.00

<!-- check if success --> (Windows)
$ watchman --version
2023.10.08.00

```

### Android need install

1. Java Development Kit（JDK

```
$ brew tap homebrew/cask-versions
$ brew install --cask zulu11

<!-- check if success -->
$ java --version
java 16.0.2 2021-07-20
$ javac --version
javac 16.0.2
```

2. Android Studio

3. Install Android Emulator

### IOS need install

1. The Ruby version that React Native 0.71 relies on is 2.7.6

```
brew install rbenv ruby-build
rbenv init
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
rbenv install 2.7.6
rbenv global 2.7.6
```

2. Xcode
3. CocoaPods

```
sudo gem install cocoapods

<!-- check if success -->
pod --version
1.11.3
```

when you install new package need go ios folder execute

```
1 - sudo xcode-select --switch /Applications/Xcode.app 
2 - sudo gem install cocoapods-clean
3 - pod deintegrate
4 - pod clean ( this is no longer available )
5 - pod install --verbose  
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
cd android
./gradlew clean
cd ../
npx react-native build-android --mode=release

```

## iconfont

change iconfont.json's symbol_url, exec shell

```
npx iconfont-rn
```

example the name no need have icon start

```
  <IconFont name="a-Group217" />
```

### other icon

<https://oblador.github.io/react-native-vector-icons/>

```
import Icon from 'react-native-vector-icons/AntDesign';
<Icon name="caretdown" style={{ marginLeft: 8 }} />
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
