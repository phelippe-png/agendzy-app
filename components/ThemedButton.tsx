import { TouchableOpacity, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function ThemedButton({ style, lightColor, darkColor, onPress, disabled, ...otherProps }: ThemedViewProps) {
  const backgroundColor = disabled ? useThemeColor({ light: 'rgb(64, 62, 62)', dark: 'rgb(64, 62, 62)' }, 'background') : useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <TouchableOpacity disabled={disabled} style={[{ backgroundColor }, style]} onPress={onPress} {...otherProps} />;
}