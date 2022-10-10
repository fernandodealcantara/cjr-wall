import fakeData from './fakeData'

function getUsers(page = 1) {
  // fake async
  return new Promise((resolve) => {
    setTimeout(() => {
      if (page < 1 || page > fakeData.pages.length)
        return { next_page: null, users: [] }

      resolve(fakeData.pages[page - 1])
    }, 100)
  })
}

function getUserInfo(userId) {
  // fake async
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem(`${userId}`))
      if (storedData) {
        resolve(storedData)
      } else {
        resolve({ ...fakeData.individualUser, id: userId })
      }
    }, 100)
  })
}

function postUserInfo(userId, markdown, socialLinks, department) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prevContent = JSON.parse(localStorage.getItem(`${userId}`))
      const content = JSON.stringify({ ...prevContent, markdown, socialLinks, department })
      localStorage.setItem(`${userId}`, content)

      resolve({ markdown, socialLinks, department })
    }, 100)
  })
}


const fakeDataProvider = {
  getUsers,
  getUserInfo,
  postUserInfo,
}

export default fakeDataProvider
