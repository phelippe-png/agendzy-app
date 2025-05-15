import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

type Option = {
  label: string;
  value: string;
};

type Props = ViewProps & {
  options: Option[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
};

export function ThemedRadioGroup({
  options,
  selectedValue,
  onSelect,
  ...rest
}: Props) {
  const borderColor = useThemeColor({ light: '#ccc', dark: '#555' }, 'text');
  const selectedColor = useThemeColor({ light: '#c4a854', dark: '#c4a854' }, 'tint');
  const backgroundColor = useThemeColor({ light: 'white', dark: '#222223' }, 'background');
  const textColor = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  return (
    <View style={{ paddingTop: 15 }} {...rest}>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.8}
            style={[
              styles.option,
              {
                borderColor: isSelected ? selectedColor : borderColor,
                backgroundColor: isSelected ? `${selectedColor}20` : backgroundColor,
              },
            ]}
          >
            <View style={[styles.radio, { borderColor: isSelected ? selectedColor : '#888' }]}>
              {isSelected && <View style={[styles.dot, { backgroundColor: selectedColor }]} />}
            </View>
            <ThemedText style={[styles.label, { color: textColor }]}>{option.label}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 7,
    marginHorizontal: 15,
    marginVertical: 6,
  },
  radio: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'GilroyMedium',
  },
});