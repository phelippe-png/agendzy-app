import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from '@/components/ThemedInput';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedButton } from '@/components/ThemedButton';

export default function Login() {
  const router = useRouter()
  const color = useThemeColor({ light: 'black', dark: 'white' }, 'text');
  
  return (
    <ThemedView lightColor='#f4f4f4' style={styles.container}>
      <View style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 40}}>
        <Image source={require('@/assets/images/logo_a_agendzy.png')} style={styles.loginLogo}/>

        <ThemedText type='title'>Bem-vindo(a)</ThemedText>
        <ThemedText style={{fontSize: 13}}>A gestão da sua barbearia na palma da mão</ThemedText>
      </View>

      <View style={{flex: 1.2, width: '100%', alignItems: 'center'}}>
        <ThemedInput
          inputType='PaperInput'
          mode='outlined'
          styleInputContainer={{width: '75%', margin: 7}}
          styleInput={styles.input}
          fontFamily='Gilroy'
          label='E-mail'
          lightColor="white"
          darkColor="#222223"
          outlineColor={color}
          activeOutlineColor={color}
          LeftIcon={() => <MaterialIcons name='email' color={color}/>}
        />

        <ThemedInput
          inputType='PaperInput'
          mode='outlined'
          styleInputContainer={{width: '75%', margin: 7}}
          styleInput={styles.input}
          fontFamily='Gilroy'
          label='Senha'
          lightColor="white"
          darkColor="#222223"
          outlineColor={color}
          activeOutlineColor={color}
          secureTextEntry
          LeftIcon={() => <FontAwesome name='lock' color={color} style={{paddingLeft: 2}}/>}
        />

        <View style={{width: '74%'}}>
          <ThemedButton style={{backgroundColor: 'transparent'}}>
            <ThemedText darkColor='#c4a853' lightColor='#c4a853' style={{fontFamily: 'GilroyMedium', fontSize: 14}}>Esqueceu a senha?</ThemedText>
          </ThemedButton>
        </View>

        <ThemedButton style={[styles.loginButton, {marginBottom: 7}]}>
          <ThemedText darkColor='black' lightColor='white' style={{fontFamily: 'GilroyBold', fontSize: 15}}>Entrar</ThemedText>
        </ThemedButton>

        <View style={{flexDirection: 'row'}}>
          <ThemedText>Não possui uma conta?</ThemedText>
          <ThemedButton style={{backgroundColor: 'transparent'}}>
            <ThemedText darkColor='#c4a853' lightColor='#c4a853' style={{fontFamily: 'GilroyMedium'}}> Cadastre-se</ThemedText>
          </ThemedButton>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loginLogo: {
    height: 170,
    width: '30%',
    bottom: 0,
    left: 0,
    position: 'relative',
  },

  input: {
    height: 43,
    borderRadius: 7,
  },

  loginButton: {
    width: '75%',
    height: 43,
    backgroundColor: '#c4a853',
    borderRadius: 7,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  }
});