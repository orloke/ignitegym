import { UserDTO } from '@dtos/UserDTO'
import { api } from '@services/api'
import { storageAuthTokenSave } from '@storage/storageAuthToken'
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from '@storage/storageUser'
import { ReactNode, createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
  signIn: (email: string, password: string) => Promise<void>
  isLoadingUserStorageData: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type Props = {
  children: ReactNode
}

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true)

  const storageUserAndToken = async (userData: UserDTO, token: string) => {
    try {
      setIsLoadingUserStorageData(true)

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      await storageUserSave(userData)
      await storageAuthTokenSave(token)

      setUser(userData)
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        storageUserAndToken(data.user, data.token)
      }
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      setIsLoadingUserStorageData(true)
      setUser({} as UserDTO)
      await storageUserRemove()
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  const loadUserData = async () => {
    try {
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadingUserStorageData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoadingUserStorageData,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
