import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'
import { AuthRoutes } from './auth.routes'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'

type Props = {
  /* props go here */
}

export function Routes() {
  const { colors } = useTheme()
  DefaultTheme.colors.background = colors.gray['700']

  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  )
}
