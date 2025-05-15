import { DimensionValue, KeyboardTypeOptions, SafeAreaView, StyleProp, StyleSheet, TextInput, TextProps, TextStyle, TouchableOpacity, View, ViewStyle, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { LegacyRef } from 'react';
import { ThemedText } from './ThemedText';

export type ThemedViewProps = ViewProps & TextProps & {
  ref?: LegacyRef<any> | undefined;
  styleInput?: StyleProp<TextStyle>;
  styleInputContainer?: StyleProp<ViewStyle>;
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
  errorMessage?: string;
  bottomText?: string;
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
  errorMessage,
  bottomText,
  inputType = 'DefaultInput',
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  const errorColor = useThemeColor({ light: '#d32f2f', dark: '#ef5350' }, 'text');

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
        <>
          <View style={[styleInputContainer, styles.input, (errorMessage || bottomText) && {marginBottom: 0}]}>
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
              outlineColor={errorMessage ? errorColor : outlineColor}
              activeOutlineColor={errorMessage ? errorColor : activeOutlineColor}
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

          <View style={[styleInputContainer, styles.input, {marginTop: 0, marginBottom: 0}]}>
            {errorMessage && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0, marginBottom: 0, marginLeft: 1 }}>
                <Feather name="alert-circle" size={12} color={errorColor} style={{ marginRight: 4 }} />
                <ThemedText type="default" style={{ color: errorColor, fontSize: 11, marginTop: 2 }}>
                  {errorMessage}
                </ThemedText>
              </View>
            )}

            {bottomText && <ThemedText type='default' style={styles.bottomText}>{bottomText}</ThemedText>}
          </View>
        </>
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

  bottomText: {
    fontSize: 11,
    marginLeft: 1
    // marginLeft: 15
  }
});