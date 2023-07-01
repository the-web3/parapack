import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

const useThemeColor = () => {
  const mode = useColorScheme() || 'light';
  const colors = mode === 'dark' ? DefaultTheme.colors : DarkTheme.colors;

  return { colors };
};
export default useThemeColor;
