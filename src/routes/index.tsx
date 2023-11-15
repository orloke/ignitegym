import { useAuth } from '@hooks/useAuth'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { Box, useTheme } from 'native-base'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

type Props = {
  /* props go here */
}

export function Routes() {
  const { colors } = useTheme()
  const { user } = useAuth()

  DefaultTheme.colors.background = colors.gray['700']

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
