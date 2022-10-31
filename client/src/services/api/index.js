import axios from 'axios'

class CJRWallApi {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_CJR_WALL_API_URL,
      withCredentials: true,
    })
  }

  setAccessToken(token) {
    this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeAccessToken() {
    delete this.api.defaults.headers.common['Authorization']
  }

  async refreshToken() {
    const response = await this.api.get('/auth/refresh')

    this.setAccessToken(response.data.access_token)

    return { expires_in: response.data.expires_in }
  }

  async login(token) {
    const response = await this.api.post('/auth/google', { token })

    this.setAccessToken(response.data.access_token)

    return { user: response.data.user, expires_in: response.data.expires_in }
  }

  async logout() {
    const response = await this.api.post('/auth/logout')

    this.removeAccessToken()

    return response.data
  }

  async getProfile(id) {
    const response = await this.api.get(`/profile/${id}`)
    return response.data
  }

  async saveProfile(profile) {
    const response = await this.api.post('/profile', profile)
    return response.data
  }

  async getCurrentUser() {
    const response = await this.api.get('/users/me')
    return response.data
  }

  async getUsers() {
    const response = await this.api.get('/users')
    return response.data
  }
}

const cjrWallApi = new CJRWallApi()

export default cjrWallApi
