import { createContext, useContext, useEffect, useState } from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies'

import { api } from '@lib/axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

type User = {
  name: string
  email: string
}

type Tokens = {
  access: string
  refresh: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface SignUpCredentials {
  name: string
  email: string
  password: string
}

interface AuthContextProps {
  user?: User
  tokens?: Tokens
  signIn: (data: SignInCredentials) => Promise<void>
  signUp: (data: SignUpCredentials) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface AuthContextProviderProps {
  children: React.ReactNode
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/token/', { email, password })

      const { access, refresh, user } = response.data

      setCookie(undefined, 'enem-calculator.access', access, {
        maxAge: 60 * 5,
        path: '/',
      })

      setCookie(undefined, 'enem-calculator.refresh', refresh, {
        maxAge: 60 * 60 * 24,
        path: '/',
      })

      setUser(user)
      navigate('/')
    } catch (err: any) {
      throw new Error(err.response.data.detail)
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      const response = await api.post('/users/', { name, email, password })

      const { access, refresh, user } = response.data

      setCookie(undefined, 'enem-calculator.access', access, {
        maxAge: 60 * 5,
        path: '/',
      })

      setCookie(undefined, 'enem-calculator.refresh', refresh, {
        maxAge: 60 * 60 * 24,
        path: '/',
      })

      setUser(user)
    } catch (err: any) {
      throw new Error(err.response.data.detail)
    }
  }

  async function signOut() {
    destroyCookie(undefined, 'enem-calculator.access')
    destroyCookie(undefined, 'enem-calculator.refresh')
    navigate('/login')
  }

  const refreshToken = async () => {
    const { 'enem-calculator.refresh': refresh } = parseCookies()

    if (refresh) {
      if (location.pathname.startsWith('/login')) {
        navigate('/')
      }

      if (!user?.name) {
        await getUserFullData()
      }
    } else {
      if (location.pathname !== '/login') {
        navigate('/login')
      }
    }
  }

  async function getUserFullData() {
    try {
      const response = await api.get('/users/me')
      setUser(response.data)
    } catch (err: any) {
      if (err.response) {
        toast({
          title: 'Erro ao buscar dados de usuário',
          description: err.response.data.detail,
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        })
      }
    }
  }

  useEffect(() => {
    refreshToken()
  }, [location.pathname])

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
