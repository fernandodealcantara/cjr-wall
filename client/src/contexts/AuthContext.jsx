import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // guarda o usuario logado

  const signin = (credential, callback) => {
    api.auth.signin(credential, (user) => {
      if (user) {
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user)) // PARA FINS DIDATICOS, NAO FAÇA ISSO EM PRODUÇÃO
        callback()
      }
    })
  }

  const signout = (callback) => {
    api.auth.signout(() => {
      setUser(false)
      localStorage.removeItem('user') // PARA FINS DIDATICOS, NAO FAÇA ISSO EM PRODUÇÃO
      callback()
    })
  }

  useEffect(() => {
    const user = localStorage.getItem('user') // PARA FINS DIDATICOS, NAO FAÇA ISSO EM PRODUÇÃO
    if (user) {
      setUser(JSON.parse(user))
    } else {
      setUser(false)
    }
  }, [])

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
