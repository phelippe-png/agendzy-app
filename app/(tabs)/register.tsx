import * as React from 'react';
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Feather, FontAwesome, FontAwesome5, FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState, useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import { ThemedRadioGroup } from '@/components/ThemedRadioGroup';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

export default function Register() {
  enum Screen {
    Email = 'Qual é o seu e-mail?',
    Password = 'Qual será a sua senha?',
    Phone = 'Qual o número do seu telefone?',
    CompleteName = 'Qual o seu nome completo?',
    BarberName = 'Qual o nome da sua barbearia?',
    TeamSize = 'Qual o tamanho da sua equipe?',
  }

  const color = useThemeColor({light: 'black', dark: 'white'}, 'text')

  const passwordValidationTextColor = useThemeColor({light: 'gray', dark: 'rgb(105, 103, 103)'}, 'text')
  const [progressBarWidth, setProgressBarWidth] = useState(0)
  const [visiblePassword, setVisiblePassword] = useState(true)
  const [passwordValidationStatus, setPasswordValidationStatus] = useState({letter: false, number: false, character: false})
  const screenIndex = useRef(0)
  const [currentScreen, setCurrentScreen] = useState(Object.values(Screen).find((e, i) => i == screenIndex.current))
  const [forceUpdate, setForceUpdate] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('')
  const [completeName, setCompleteName] = useState('')
  const [barber, setBarber] = useState('')
  const [teamSize, setTeamSize] = useState('')
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const calculateProgressBar = (current: Double, total: Double) => {
    const progress = useMemo(() => {
      if (!total || total <= 0) return 0;

      const rawProgress = current / total;
      const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

      return clampedProgress;
    }, [current, total]);

    return progress;
  }
  const progressBar = calculateProgressBar(screenIndex.current, Object.values(Screen).length-1)

  const validateEmail = () => {
    const regexValidateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
      return emailRegex.test(email);
    }

    if (currentScreen === Screen.Email) {
      if (!email.trim()) {
        setEmailError('Preencha seu e-mail para continuar');
        return false;
      }

      if (!regexValidateEmail(email)) {
        setEmailError('Digite um e-mail válido para continuar');
        return false;
      }

      setEmailError('');
      return true
    }
  }

  const validatePassword = () => {
    if (currentScreen === Screen.Password) {
      if (!password.trim()) {
        setPasswordError('Preencha sua senha para continuar');
        return false;
      }

      const isValid = passwordValidationStatus.letter && passwordValidationStatus.number && passwordValidationStatus.character;
      if (!isValid) {
        setPasswordError('A senha precisa atender aos critérios mínimos abaixo');
        return false;
      }

      setPasswordError('')
      return true
    }
  }

  const nextScreen = () => {
    if (currentScreen == Screen.Email && !validateEmail())
      return

    if (currentScreen == Screen.Password && !validatePassword())
      return
    
    if (screenIndex.current == Object.values(Screen).length-1)
      return

    screenIndex.current += 1;
    setCurrentScreen(Object.values(Screen).find((e, i) => i == screenIndex.current))
  }

  const previousScreen = () => {
    if (screenIndex.current == 0)
      return

    screenIndex.current -= 1;
    setCurrentScreen(Object.values(Screen).find((e, i) => i == screenIndex.current))
  }
  
  const viewPassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  const onChangePassword = (text: string) => {
    const containsLetter = (str: string) => /[a-zA-Z]/.test(str)
    const containsNumber = (str: string) => /\d/.test(str)

    setPasswordValidationStatus({
      letter: containsLetter(text),
      number: containsNumber(text),
      character: String(text).length >= 8
    })

    setPassword(text)
    if (passwordError != '') {
      setPasswordError('')
    }
  }

  const onChangeInputPhone = (text: string) => {
    const onlyNumbers = applyPhoneMask(text)
    setPhone(onlyNumbers)
  };

  const applyPhoneMask = (text: string) => {
    const cleaned = text.replace(/\D/g, '');

    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
  };

  return (
    <ThemedView lightColor="#f4f4f4" style={styles.container}>
      <View style={styles.panelModalHeaderContainer} onLayout={(e) => { setProgressBarWidth(e.nativeEvent.layout.width) }}>
        {currentScreen != Screen.Email && (
          <View style={styles.backButtonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={previousScreen}>
              <MaterialIcons name='arrow-back' color={color} size={25}/>
            </TouchableOpacity>
          </View>
        )}

        <ProgressBar 
          borderColor={'#c4a853'}
          color={'#c4a853'}
          borderRadius={3}
          progress={progressBar}
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
          <ThemedInput
            inputType='PaperInput'
            mode='outlined'
            styleInputContainer={[styles.inputContainer]}
            styleInput={styles.input}
            fontFamily='GilroyMedium'
            label='E-mail'
            lightColor="white"
            darkColor="#222223"
            outlineColor={color}
            activeOutlineColor={color}
            value={email}
            errorMessage={emailError}
            bottomText='Iremos enviar um e-mail de confirmação para a ativação da conta.'
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) {
                setEmailError('');
              }
            }}
          />
        )}

        {currentScreen == Screen.Password && (
          <>
            <ThemedInput
              inputType='PaperInput'
              mode='outlined'
              styleInputContainer={[styles.inputContainer]}
              styleInput={styles.input}
              fontFamily='GilroyMedium'
              label='Senha'
              lightColor="white"
              darkColor="#222223"
              outlineColor={color}
              activeOutlineColor={color}
              secureTextEntry={visiblePassword}
              onChangeText={onChangePassword}
              value={password}
              errorMessage={passwordError}
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

        {currentScreen == Screen.Phone && (
          <ThemedInput
            value={phone}
            inputType='PaperInput'
            mode='outlined'
            onChangeText={onChangeInputPhone}
            styleInputContainer={[styles.inputContainer, {marginBottom: 0}]}
            styleInput={styles.input}
            fontFamily='GilroyMedium'
            label='Celular'
            placeholder='(00) 0 0000-0000'
            keyboardType='numeric'
            lightColor="white"
            darkColor="#222223"
            outlineColor={color}
            activeOutlineColor={color}
            maxLength={15}
            bottomText='Este será o número de celular associado à sua conta.'
          />
        )}

        {currentScreen == Screen.CompleteName && (
          <ThemedInput
            value={completeName}
            onChangeText={setCompleteName}
            inputType='PaperInput'
            mode='outlined'
            styleInputContainer={[styles.inputContainer, {marginBottom: 0}]}
            styleInput={styles.input}
            fontFamily='GilroyMedium'
            label='Nome completo'
            lightColor="white"
            darkColor="#222223"
            outlineColor={color}
            activeOutlineColor={color}
            bottomText='Este será o nome associado à sua conta.'
          />
        )}

        {currentScreen == Screen.BarberName && (
          <ThemedInput
            value={barber}
            onChangeText={setBarber}
            inputType='PaperInput'
            mode='outlined'
            styleInputContainer={[styles.inputContainer, {marginBottom: 0}]}
            styleInput={styles.input}
            fontFamily='GilroyMedium'
            label='Nome da barbearia'
            lightColor="white"
            darkColor="#222223"
            outlineColor={color}
            activeOutlineColor={color}
            bottomText='Este será o nome exibido para seus clientes nos agendamentos.'
          />
        )}

        {currentScreen == Screen.TeamSize && (
          <ThemedRadioGroup
            selectedValue={teamSize}
            onSelect={setTeamSize}
            options={[
              { label: '1 a 2 pessoas', value: 'ONE_TO_TWO' },
              { label: '3 a 5 pessoas', value: 'THREE_TO_FIVE' },
              { label: '6 a 10 pessoas', value: 'SIX_TO_TEN' },
              { label: '11 ou mais pessoas', value: 'ELEVEN_OR_MORE' }
            ]}
          />
        )}
      </View>

      <View style={styles.continueButtonContainer}>
        <ThemedButton 
          lightColor='#c4a854' darkColor='#c4a854'
          style={styles.continueButton} 
          onPress={nextScreen}
        >
          <ThemedText style={styles.continueButtonText}>{screenIndex.current < Object.values(Screen).length-1 ? 'CONTINUAR' : 'FINALIZAR'}</ThemedText>
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