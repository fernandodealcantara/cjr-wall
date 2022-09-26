import TijoloNUC from './TijoloNucleo'
import { getBackgroundColorByNucleo } from '../services/colors'

export default function Camada({users}) {
  return (
    <div className="flex">
      {users.map((user) => (
        <TijoloNUC
          key={user.userID}
          color={getBackgroundColorByNucleo(user.nucleo)}
          avatar={user.avatar}
          userName={user.userName}
        />
      ))}
    </div>
  )
}
