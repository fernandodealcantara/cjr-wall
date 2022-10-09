import { useState, useMemo } from 'react'
import CardsList from '../components/CardsContainer'
import api from '../services/api'
import { useWindowSize } from '../hooks/useWindowSize'

function Home() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [nextPage, setNextPage] = useState(1)
  const { height, width } = useWindowSize()

  // calcula a altura da lista em relação ao tamanho da tela
  const listHeight = height ? height - 50 : 500
  // altura de uma linha na lista, altura maior que a altura do CardBrick
  const listItemHeight = 90
  const USERWIDTH = 250
  // calcula a quantidade maxima de elementos (usersPerRow) que vai caber em
  // cada linha da tela mantendo os elementos visiveis
  // (multiplica por 0.95 pois vamos apenas 95% do espaço disponivel)
  // 250 é a largura que um CardBrick ocupa (na solução proposta o tamanho é fixo)
  const usersPerRow = width ? Math.floor((width * 0.95) / USERWIDTH) : 1

  const loadNextPage = async () => {
    if (nextPage !== null && !isLoading) {
      setIsLoading(true)
      try {
        const response = await api.data.getUsers(nextPage)
   
        const newUsers = [...users, ...response.users]

        setUsers(newUsers)
        
        setNextPage(response.next_page)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Dado um vetor de usuarios [usuario1, usuario2, ...] e quantidade maxima de
  // elementos por linha (usersPerRow) que vai ser exibida na tela,
  // retorna um vetor de vetores de tamanho maximo usersPerRow, onde cada elemento é responsavel
  // por renderizar 1 linha da lista
  // ex: usersPerRow = 2 e users = [usuario1, usuario2, ... usuario99, usuario100]
  // retorna [ [ usuario1, usuario2 ], [ usuario3, usuario4 ] ... [ usuario99, usuario100 ] ]
  const usersRows = useMemo(() => {
    const rows = []
    for (let i = 0; i < users.length; i += usersPerRow) {
      rows.unshift(users.slice(i, i + usersPerRow))
    }

    return rows
  }, [usersPerRow, users])

  return (
    <CardsList
      hasNextPage={nextPage}
      isNextPageLoading={isLoading}
      usersRows={usersRows}
      loadNextPage={loadNextPage}
      columnsQtd={usersPerRow}
      listHeight={listHeight}
      listItemHeight={listItemHeight}
    />
  )
}

export default Home
