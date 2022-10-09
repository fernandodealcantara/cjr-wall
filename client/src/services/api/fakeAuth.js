import jwtDecode from 'jwt-decode'

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(credentials, cb) {
    fakeAuthProvider.isAuthenticated = true
    const user = jwtDecode(credentials)
    setTimeout(() => cb(user), 100) // fake async
  },
  signout(cb) {
    fakeAuthProvider.isAuthenticated = false
    setTimeout(cb, 100)
  },
}

export default fakeAuthProvider
