import TijoloNUC from './TijoloNucleo'

export default function Camada() {
  const users = [
    {
      avatar: 'https://avatars.githubusercontent.com/u/62450919',
      userName: 'Cassio',
      userID: '1',
      nucleo: 'NOE',
    },
  ]

  return (
    <div className="flex">
      {users.map((user) => (
        <TijoloNUC
          key={user.userID}
          color={getNucleoColor(user.nucleo)}
          avatar={user.avatar}
          userName={user.userName}
        />
      ))}
    </div>
  )
}

function getNucleoColor(nucleo) {
  switch (nucleo) {
    case 'NAV':
      return 'bg-tijNAV'
    case 'NOE':
      return 'bg-tijNOE'
    case 'NIP':
      return 'bg-tijNIP'
    case 'NDP':
      return 'bg-tijNDP'
    default:
      return 'bg-tijNUT'
  }
}
