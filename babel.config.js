module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {},
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@routes': './routes',
          '@screen': './screen',
          '@hooks': './hooks',
          '@api': './api',
          '@assets': './assets',
          '@common': './common',
          '@i18n': './i18n',
          '@components': './components',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
