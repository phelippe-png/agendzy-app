import * as React from 'react';
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import ProgressBar from 'react-native-progress/Bar';

export default function Register() {
  enum Screen {
    Email = 'Qual é o seu e-mail?',
    Senha = 'Qual será a sua senha?',
    Telefone = 'Qual o número do seu telefone?'
  }

  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')
  const passwordValidationTextColor = useThemeColor({light: 'gray', dark: 'rgb(105, 103, 103)'}, 'text')
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const inputPhoneRef = useRef<TextInput>(null)
  const valuePhoneRef = useRef('')
  const [passwordValidationStatus, setPasswordValidationStatus] = useState({letter: false, number: false, character: false})
  const screenIndex = useRef(0)
  const progressProgressBar = useRef( (100/Object.values(Screen).length) / 100 )
  const [currentScreen, setCurrentScreen] = useState(Object.values(Screen).find((e, i) => i == screenIndex.current))

  const dividirEmPartes = (valorTotal: number, divisor: number) => {
    const partes = [];
    const quociente = Math.floor(valorTotal / divisor);
    const resto = valorTotal % divisor;
  
    for (let i = 0; i < divisor; i++)
      partes.push(quociente);
  
    if (resto > 0)
      partes[partes.length - 1] += resto;
  
    return partes;
  }

  const calculateProgressBar = (screenIndex: number) => {
    var stateValuesProgressBar = dividirEmPartes(100, Object.values(Screen).length)
    stateValuesProgressBar = stateValuesProgressBar.map((e) => e/100)

    progressProgressBar.current = stateValuesProgressBar.filter((e, i) => i <= screenIndex).reduce((t, n) => t + n, 0)
    return progressProgressBar.current
  }

  const nextScreen = () => {
    if (screenIndex.current == Object.values(Screen).length-1)
      return null

    screenIndex.current += 1;
    calculateProgressBar(screenIndex.current)
    setCurrentScreen(Object.values(Screen).find((e, i) => i == screenIndex.current))
  }

  const previousScreen = () => {
    if (screenIndex.current == 0)
      return null

    screenIndex.current -= 1;
    calculateProgressBar(screenIndex.current)
    setCurrentScreen(Object.values(Screen).find((e, i) => i == screenIndex.current))
  }
  
  const viewPassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  const onChangePassword = (e) => {
    const containsLetter = (str: string) => /[a-zA-Z]/.test(str)
    const containsNumber = (str: string) => /\d/.test(str)

    setPasswordValidationStatus({
      letter: containsLetter(e.nativeEvent.text),
      number: containsNumber(e.nativeEvent.text),
      character: String(e.nativeEvent.text).length >= 8
    })
  }

  const onChangeInputPhone = (text) => {
    const onlyNumbers = text.replace(/[^0-9]/g, '');

    // Atualiza se houver mudança
    if (onlyNumbers !== valuePhoneRef.current) {
      valuePhoneRef.current = onlyNumbers;

      // Atualiza visualmente
      if (inputPhoneRef.current) {
        inputPhoneRef.current.setNativeProps({ text: onlyNumbers });
      }
    }
  };

  return (
    <ThemedView lightColor="#f4f4f4" style={styles.container}>
      <View style={styles.panelModalHeaderContainer} onLayout={(e) => { setProgressBarWidth(e.nativeEvent.layout.width) }}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={previousScreen}>
            <MaterialIcons name='arrow-back' color={color} size={25}/>
          </TouchableOpacity>
        </View>

        <ProgressBar 
          borderColor={'#c4a853'}
          color={'#c4a853'}
          borderRadius={3}
          progress={progressProgressBar.current}
          useNativeDriver
          width={progressBarWidth / 2}
          style={{marginVertical: 30}}
        />

        <ThemedView lightColor="rgb(197, 197, 197)" darkColor="rgb(47, 46, 46)" style={{width: '100%', height: 0.5}}/>
      </View>

      <View style={{alignItems: 'center', margin: 30}}>
        <ThemedText type="title" style={{fontSize: 28, textAlign: 'center'}}>Cadastro</ThemedText>
        <ThemedText type="default" style={{fontSize: 15, lineHeight: 20, textAlign: 'center'}}>Só alguns passos para</ThemedText>
        <ThemedText type="default" style={{fontSize: 15, lineHeight: 15, textAlign: 'center'}}>tirar sua barbearia do papel</ThemedText>
      </View>


      <View style={styles.inputsContainer}>
        <ThemedText type="subtitle" style={styles.titleHeader}>{currentScreen}</ThemedText>

        {currentScreen == Screen.Email && (
          <>
            <ThemedInput
              inputType='PaperInput'
              mode='outlined'
              styleInputContainer={[styles.inputContainer, {marginBottom: 0}]}
              styleInput={styles.input}
              fontFamily='GilroyMedium'
              label='E-mail'
              lightColor="white"
              darkColor="#222223"
              outlineColor={color}
              activeOutlineColor={color}
            />

            <ThemedText type='default' style={{fontSize: 11, marginLeft: 15}}>Iremos enviar um e-mail de confirmação para a ativação da conta.</ThemedText>
          </>
        )}

        {currentScreen == Screen.Senha && (
          <>
            <ThemedInput
              inputType='PaperInput'
              mode='outlined'
              styleInputContainer={[styles.inputContainer, {marginBottom: 7}]}
              styleInput={styles.input}
              fontFamily='GilroyMedium'
              label='Senha'
              lightColor="white"
              darkColor="#222223"
              outlineColor={color}
              activeOutlineColor={color}
              secureTextEntry={visiblePassword}
              onChange={onChangePassword}
              RightIcon={() => (
                <TouchableOpacity style={{padding: 12, paddingRight: 17}} onPress={viewPassword}>
                  <Ionicons name={visiblePassword ? 'eye' : 'eye-off'} color={color} size={18}/>
                </TouchableOpacity>
              )}
            />

            <ThemedText type='default' style={{fontSize: 13, marginLeft: 15}}>A senha deve conter:</ThemedText>

            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
              <Feather name='check' color={passwordValidationStatus.letter ? 'rgb(30, 226, 0)' : passwordValidationTextColor} size={13}/>
              <ThemedText style={[styles.passwordValidationText, {color: passwordValidationStatus.letter ? 'rgb(30, 226, 0)' : passwordValidationTextColor}]}>ao menos uma letra</ThemedText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
              <Feather name='check' color={passwordValidationStatus.number ? 'rgb(30, 226, 0)' : passwordValidationTextColor} size={13}/>
              <ThemedText style={[styles.passwordValidationText, {color: passwordValidationStatus.number ? 'rgb(30, 226, 0)' : passwordValidationTextColor}]}>ao menos um número</ThemedText>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
              <Feather name='check' color={passwordValidationStatus.character ? 'rgb(30, 226, 0)' : passwordValidationTextColor} size={13}/>
              <ThemedText style={[styles.passwordValidationText, {color: passwordValidationStatus.character ? 'rgb(30, 226, 0)' : passwordValidationTextColor}]}>8 caracteres ou mais</ThemedText>
            </View>
          </>
        )}

        {currentScreen == Screen.Telefone && (
          <>
            {/* <TextInput 
              style={{width: 300, height: 100}} 
              ref={inputPhoneRef}
              keyboardType="numeric"
              onChangeText={onChangeInputPhone}
            >

            </TextInput> */}

            <ThemedInput
              // ref={phoneText}
              inputType='PaperInput'
              mode='outlined'
              onChangeText={onChangeInputPhone}
              styleInputContainer={styles.inputContainer}
              styleInput={styles.input}
              fontFamily='GilroyMedium'
              label='Celular'
              placeholder='(00) 0 0000-0000'
              keyboardType='numeric'
              lightColor="white"
              darkColor="#222223"
              outlineColor={color}
              activeOutlineColor={color}
            />
          </>
        )}
      </View>

      <View style={styles.continueButtonContainer}>
        <ThemedButton 
          lightColor='#c4a854' darkColor='#c4a854'
          disabled={(currentScreen == Screen.Senha && (!passwordValidationStatus.character || !passwordValidationStatus.letter || !passwordValidationStatus.number))} 
          style={styles.continueButton} 
          onPress={nextScreen}
        >
          <ThemedText style={styles.continueButtonText}>CONTINUAR</ThemedText>
        </ThemedButton>
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center'
  },

  loginLogo: {
    height: 170,
    // width: '100%',
    bottom: 0,
    left: 0,
    position: 'relative',
    resizeMode: 'center'
  },

  input: {
    height: 50,
    fontSize: 15
  },

  inputContainer: {
    margin: 15
  },

  inputsContainer: {
    flex: 0.99,
    width: '100%',
  },

  continueButtonText: {
    fontFamily: 'GilroySemiBold'
  },

  continueButton: {
    // backgroundColor: '#c4a854',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    height: 43,
    margin: 7,
    elevation: 3
  },

  continueButtonContainer: {
    width: '100%',
    alignItems: 'center'
  },

  panelModalHeaderContainer: {
    width: '100%',
    alignItems: 'center'
  },

  backButtonContainer: {
    width: '100%',
    margin: 21,
    position: 'absolute'
  },

  backButton: {
    marginLeft: 20,
    width: '10%'
  },

  titleHeader: {
    marginLeft: 15,
    fontSize: 17
  },

  passwordValidationText: {
    fontSize: 13,
    marginLeft: 5
  }
})