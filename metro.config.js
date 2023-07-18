/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('metro-react-native-babel-transformer'),
    experimentalImportSupport: false,
    enableBabelRuntime: true,
    babelrc: false,
    config: {
      // Rest of your Babel configuration
    },
    // Rest of your transformer configuration
  },
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('react-native-crypto'),
    },
  },
};
