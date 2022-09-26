import Camada from '../components/Camada'
import { useState, useEffect } from 'react'
import { getUsers } from '../services/api'

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch((_err) => setUsers([]))
  }, [])

  return <Camada users={users} />
}

export default Home
