import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { useGoogleAuth } from '../hooks/useGoogleAuth'

export default function LoginButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signin } = useAuth()
  const ref = useRef(null)

  const from = location.state?.from?.pathname || '/'

  useGoogleAuth(ref, (response) => {
    if (response.credential) {
      signin(response.credential, () => {
        navigate(from, { replace: true })
      })
    }
  })

  return <div ref={ref} id="googleSignIn" />
}
