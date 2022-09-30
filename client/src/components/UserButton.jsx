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
      console.log(response.select_by)
      const userObject = jwtDecode(response.credential)
      // console.log(userObject)

      auth.signin(userObject, () => {
        navigate(from, { replace: true })
      })
    }

    // Comentario obrigatorio, nao apagar!
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_ID,
      callback: handleCallbackResponse,
      auto_select: true,
    })

    google.accounts.id.renderButton(document.getElementById('loginButton'), {
      type: 'standard',
      theme: 'outline',
      shape: 'circle',
    })
  }, [auth, navigate, from])

  return <div id="signInDiv" />
}
