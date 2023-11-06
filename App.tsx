import { StatusBar, Text, View } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoaded] =useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
      {!fontLoaded ? <View/>: <Loading/>}
    </NativeBaseProvider>
  )
}
