import { StatusBar, Text, View } from 'react-native'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

export default function App() {
  const [fontLoaded] =useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray'}} >
      <StatusBar backgroundColor='transparent' translucent barStyle='light-content' />
      {fontLoaded ? <Text style={{fontFamily: 'Roboto_700Bold'}}>Hello world</Text> : <View/>}
    </View>
  )
}
