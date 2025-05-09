import { DimensionValue, KeyboardTypeOptions, SafeAreaView, StyleProp, StyleSheet, TextInput, TextProps, TextStyle, TouchableOpacity, View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { LegacyRef } from 'react';

export type ThemedViewProps = ViewProps & TextProps & {
  ref?: LegacyRef<any> | undefined;
  styleInput?: StyleProp<TextStyle>;
  styleInputContainer?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
  placeholder?: string;
  label?: string;
  onChange?: () => {};
  onChangeText?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  width?: DimensionValue | undefined;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  inputType?: 'DefaultInput' | 'PaperInput';
  mode?: 'flat' | 'outlined';
  outlineColor?: string;
  activeOutlineColor?: string;
  fontFamily?: string;
  value?: string;
  maxLength?: number;
};

export function ThemedInput({
  ref,
  styleInput,
  styleInputContainer,
  width,
  placeholder, 
  label,
  lightColor,
  darkColor,
  onChange,
  onChangeText,
  secureTextEntry,
  keyboardType,
  LeftIcon,
  RightIcon,
  mode,
  outlineColor,
  activeOutlineColor,
  fontFamily,
  value,
  maxLength,
  inputType = 'DefaultInput',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <>
      {inputType == 'DefaultInput' && (
        <View style={[styleInputContainer, styles.input]}>
          <TextInput
            style={[{ backgroundColor, color }, styleInput]}
            placeholderTextColor={color}
            onChange={onChange}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholder={placeholder}
            {...otherProps} 
          />
          {LeftIcon && (
            <View style={styles.inputIcon}>
              <LeftIcon/>
            </View>
          )}
        </View>
      )}

      {inputType == 'PaperInput' && (
        <View style={[styleInputContainer, styles.input]}>
          <TextInputPaper
            ref={ref}
            style={[{ backgroundColor }, LeftIcon && {paddingLeft: 17}, styleInput]}
            onChange={onChange}
            onChangeText={onChangeText}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            label={label}
            placeholder={placeholder}
            mode={mode}
            outlineColor={outlineColor}
            activeOutlineColor={activeOutlineColor}
            textColor={color}
            maxLength={maxLength}
            theme={{
              colors: {
                onSurfaceVariant: color,
              },
              fonts: {
                bodyLarge: {
                  fontFamily: fontFamily,
                }
              },
            }}
          />
          {LeftIcon && (
            <View style={styles.leftInputIcon}>
              <LeftIcon/>
            </View>
          )}
          {RightIcon && (
            <View style={styles.rightInputIcon}>
              <RightIcon/>
            </View>
          )}
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    justifyContent: 'center'
  },

  leftInputIcon: {
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    marginLeft: 13,
    paddingTop: 7
  },

  rightInputIcon: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    // paddingRight: 13,
    paddingTop: 7
  },
});