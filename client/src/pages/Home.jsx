import Camada from '../components/Camada'

function Home() {
  const users = [
    {
      avatar: 'https://ca.slack-edge.com/T08QYLWLU-U036SJP0GS2-81e995d5bf9d-512',
      userName: 'Cassio',
      userID: '1',
      nucleo: 'NAV'
    },
    {
      avatar: 'https://ca.slack-edge.com/T08QYLWLU-U02DFL5HDL1-ee07b44b8426-512',
      userName: 'Fernando',
      userID: '2',
      nucleo: 'NDP'
    },
    {
      avatar: 'https://ca.slack-edge.com/T08QYLWLU-U02DHJU2NSD-80081d4f05df-512',
      userName: 'Lucas Sala',
      userID: '3',
      nucleo: 'NUT'
    },
    {
      avatar: 'https://ca.slack-edge.com/T08QYLWLU-UJFAPAML4-4e08c5bf0731-512',
      userName: 'Lucas Pinheiro',
      userID: '4',
      nucleo: 'NIP'
    },
  ]
  return (
    <>
      <Camada users={users}/>
    </>
  )
}

export default Home
