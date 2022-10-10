export async function getUsers(page = 1) {
  const url = `${import.meta.env.VITE_MOCK_DATA_API}/users?page=${page}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()
  return data
}

function getUserInfo(userId) {
  const storedData = JSON.parse(localStorage.getItem(`${userId}`))
  return storedData
}

function postUserInfo(userId, markdown, socialLinks, department) {
  const content = JSON.stringify({ markdown, socialLinks, department })
  localStorage.setItem(`${userId}`, content)

  return { markdown, socialLinks, department }
}

async function getBrickUser(userId) {
  const url = `${import.meta.env.VITE_MOCK_DATA_API}/users/${userId}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  return data
}

const fakeDataProvider = {
  getUsers,
  getUserInfo,
  postUserInfo,
  getBrickUser,
}

export default fakeDataProvider
