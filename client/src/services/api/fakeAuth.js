import jwtDecode from 'jwt-decode'

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(credentials, cb) {
    fakeAuthProvider.isAuthenticated = true
    const user = jwtDecode(credentials)
    if (!localStorage.getItem(`${user.sub}`)) {
      localStorage.setItem(
        `${user.sub}`,
        JSON.stringify({
          id: user.sub,
          name: user.name,
          picture: user.picture,
          markdown: `# Bem vindo ${
            user.name.split(' ')[0]
          }!\n## Fale sobre a sua jornada na CJR =)`,
          socialLinks: {
            github: '',
            instagram: '',
            linkedin: '',
            twitter: '',
          },
          department: '',
        })
      )
    }
    setTimeout(() => cb(user), 100) // fake async
  },
  signout(cb) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

export default fakeAuthProvider
