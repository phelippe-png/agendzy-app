import { Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native"
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useState } from "react";
import moment from "moment";
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  styleText?: StyleSheet;
};

export function DateTimePickerApp({ style, styleText, lightColor, darkColor, refDate }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');

  const [forceUpdate, setForceUpdate] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const ShowDatePickerAndroid = (date, refDate) => {
    if (refDate != undefined)
      DateTimePickerAndroid.open({
        value: moment((date != undefined && date != '') ? date : moment().format('DD/MM/YYYY'), 'DD/MM/YYYY').toDate(),
        onChange: (event, selectedDate) => {
          if (event.type == 'set') {
            refDate.current = moment(selectedDate).format('DD/MM/YYYY')
            setForceUpdate(!forceUpdate)
          }
        }
      })
  }

  return (
    <View style={{width: '100%', alignItems: "center"}}>
      {Platform.OS == 'ios' ? 
        (
          <View>
            <ThemedButton style={[{ backgroundColor }, style]} onPress={() => setDatePickerVisible(true)}>
              <ThemedText style={[{ color }, styleText]} >{refDate?.current}</ThemedText>
            </ThemedButton>

            <DateTimePickerModal
              date={moment(refDate?.current, 'DD/MM/YYYY').toDate()}
              isVisible={datePickerVisible}
              mode="date"
              display="inline"
              locale="pt-BR"
              confirmTextIOS="Confirmar"
              cancelTextIOS="Cancelar"
              onConfirm={(date) => {
                refDate.current = moment(date).format('DD/MM/YYYY')
                setDatePickerVisible(false)
              }}
              onCancel={() => setDatePickerVisible(false)}
            />
          </View>
        ) : 
        (
          <ThemedButton onPress={() => { ShowDatePickerAndroid(refDate?.current, refDate) }} style={[{ backgroundColor }, style]}>
            <ThemedText style={[{ color }, styleText]} >{refDate?.current}</ThemedText>
          </ThemedButton>
        )
      }
    </View>
  )
}