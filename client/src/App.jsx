import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { RequireAuth } from './components/RequireAuth'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Layout from './components/Layout'
import BrickProfile from './pages/BrickProfile'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile">
            <Route
              index
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route path=":userId" element={<BrickProfile />} />
          </Route>
          <Route path="*" element={<h1>Nada por aqui 😜</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
