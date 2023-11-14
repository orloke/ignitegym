import { UserDTO } from '@dtos/UserDTO'
import { ReactNode, createContext, useState } from 'react'

export type AuthContextDataProps = {
  user: UserDTO
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)

type Props = {
  children: ReactNode
}

export function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState({
    id: '1',
    name: 'Júnior Dering',
    email: 'júnior@gmail.com',
    avatar: '',
  })
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
