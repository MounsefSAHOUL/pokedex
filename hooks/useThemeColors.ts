import { useColorScheme } from 'react-native';
import { Colors } from '~/constents/Colors';

export function useThemeColors() {
  const theme = useColorScheme() ?? 'light';
  return Colors[theme];
}
