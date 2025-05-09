import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation, useRouter } from 'expo-router';
import { ThemedButton } from '@/components/ThemedButton';

export default function HomeScreen() { 
  const router = useRouter()

  return (
    <ThemedView lightColor='#f4f4f4' style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('@/assets/images/logo-agendzy.png')} style={styles.loginLogo}/>

      <ThemedButton style={styles.registerButton} onPress={() => { router.navigate('/register') }}>
        <ThemedText darkColor='black' lightColor='white' style={{fontFamily: 'GilroyBold', fontSize: 18}}>Cadastre-se e faça seu teste grátis</ThemedText>
      </ThemedButton>

      <ThemedButton style={{margin: 10, backgroundColor: 'transparent'}} onPress={() => { router.navigate('/login') }}>
        <ThemedText darkColor='#c4a853' lightColor='#c4a853' style={{fontFamily: 'GilroyBold', fontSize: 18}}>Já sou cadastrado</ThemedText>
      </ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loginLogo: {
    height: 300,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'relative',
  },

  registerButton: {
    width: '80%',
    height: 40,
    backgroundColor: '#c4a853',
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
});
