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
          '@api': './api',
          '@assets': './assets',
          '@utils': './utils',
        },
      },
    ],
  ],
};
