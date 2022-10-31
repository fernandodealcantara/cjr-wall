import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // guarda o usuario logado

  const signin = async (credential, callback) => {
    try {
      const { user, expires_in } = await api.login(credential)
      const TIMETOREFRESH = expires_in * 1000 - 5000 // tempo para atualizar o token

      setUser(user)
      setTimeout(refreshToken, TIMETOREFRESH)
      callback()
    } catch (error) {
      console.error(error)
      alert('Falha no login, tente novamente')
    }
  }

  const signout = async (callback) => {
    try {
      await api.logout()
      setUser(false)
      callback()
    } catch (error) {
      console.error(error)
    }
  }

  const refreshToken = async () => {
    try {
      const { expires_in } = await api.refreshToken()
      const user = await api.getCurrentUser()
      const TIMETOREFRESH = expires_in * 1000 - 5000 // tempo para atualizar o token

      setUser(user)
      setTimeout(refreshToken, TIMETOREFRESH)
    } catch (error) {
      console.error(error)
      setUser(false)
    }
  }

  useEffect(() => {
    refreshToken()
  }, [])

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
