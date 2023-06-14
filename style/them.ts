import { darkColors, lightColors } from '@rneui/base';

const customTheme = {
  primary: '#3B28CC',
  success: '#48AE60',
};

export const defineTheme = {
  // dark 模式下的样式定义
  darkColors: {
    ...darkColors,
    // ...Platform.select({
    //   default: darkColors.platform.android,
    //   ios: darkColors.platform.ios,
    // }),
    ...customTheme,
  },
  lightColors: {
    ...lightColors,
    // ...Platform.select({
    //   default: lightColors.platform.android,
    //   ios: lightColors.platform.ios,
    // }),
    ...customTheme,
  },
  components: {
    Button: {
      radius: 6, // 自定义圆角大小
    },
    Input: {
      containerStyle: {
        paddingHorizontal: 0,
      },
      // inputStyle: {
      //   paddingHorizontal: 100,
      // },
      inputContainerStyle: {
        height: 58,
        paddingHorizontal: 12,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: '#D7D7FA',
        backgroundColor: '#F8F8FF',
      },
    },
  },
  mode: 'light',
};
