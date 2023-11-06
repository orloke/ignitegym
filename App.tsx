import { StatusBar, Text, View } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { SignIn } from '@screens/SignIn';

export default function App() {
  const [fontLoaded] =useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
      {fontLoaded ? <SignIn/>: <Loading/>}
    </NativeBaseProvider>
  )
}
