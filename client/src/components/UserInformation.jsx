import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

export default function UserInformation() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const firstName = user.name.split(' ')[0]

  const signoutHandler = () => {
    signout(() => {
      navigate('/', { replace: true })
    })
  }

  return user ? (
    <div className="flex items-center space-x-4">
      <Link to="profile" className="flex items-center space-x-4">
        <img
          className="w-8 h-8 rounded-full"
          src={user.picture}
          alt={`Foto de perfil de ${user.name}`}
        />
        <p className="font-normal text-slate-900 hidden sm:block">
          {firstName}
        </p>
      </Link>
      <button
        type="button"
        className="inline-block px-6 py-2.5 bg-gray-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out"
        onClick={signoutHandler}
      >
        Sair
      </button>
    </div>
  ) : (
    <></>
  )
}
