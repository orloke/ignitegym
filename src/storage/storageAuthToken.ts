import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_TOKEN_STORAGE } from './storageConfig'

export const storageAuthTokenSave = async (token: string) => {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token)
}

export const storageAuthTokenGet = async () => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE)

  return token
}
