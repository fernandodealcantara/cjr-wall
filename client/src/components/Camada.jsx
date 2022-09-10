import { TIJNAV, TIJNOE, TIJNIP, TIJNDP, TIJNUT } from '../../constantes'
import  TijoloNUC  from './TijoloNucleo'


export default function Camada() {
  const users = [{
    avatar: 'https://avatars.githubusercontent.com/u/62450919',
    userName: 'Cássio',
    userID: '1',
    nucleo: 'NAV',
  }]

  return (
    <div className="flex">
      {users.map(user => (<TijoloNUC key={user.userID} color={getNucleoColor(user.nucleo)} avatar={user.avatar} userName={user.userName} />))}
    </div>
  )
}

function getNucleoColor(nucleo) {

  switch (nucleo) {
    case 'NAV' : return TIJNAV
    case 'NOE' : return TIJNOE
    case 'NIP' : return TIJNIP
    case 'NDP' : return TIJNDP
    default : return TIJNUT
  
  }
}