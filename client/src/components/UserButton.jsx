import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

export default function UserButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    function handleCallbackResponse(response) {
      const userObject = jwtDecode(response.credential)

      auth.signin(userObject, () => {
        navigate(from, { replace: true })
      })
    }

    // Comentario obrigatorio, nao apagar!
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCallbackResponse
    })

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      type: 'standard',
      theme: 'outline',
      shape: 'circle',
    })
  }, [auth, navigate, from])

  return <div id="signInDiv" />
}
