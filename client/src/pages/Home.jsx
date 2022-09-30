import { useState, useEffect } from 'react'
import { getUsers } from '../services/api'
import Brick from '../components/Brick'
import { getBackgroundColorByNucleo } from '../services/colors'

function Home() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch(() => setUsers([]))
  }, [])

  return (
    <div className="flex">
      {users.map((user) => (
        <Brick
          key={user.userID}
          color={getBackgroundColorByNucleo(user.nucleo)}
          avatar={user.avatar}
          userName={user.userName}
        />
      ))}
    </div>
  )
}

export default Home
