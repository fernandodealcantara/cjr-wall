import { Routes, Route } from 'react-router-dom'
import  Home  from './pages/Home'
import  Profile  from './pages/Profile'
import Layout from './components/Layout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
