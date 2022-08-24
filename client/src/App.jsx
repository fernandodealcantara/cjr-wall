import { Routes, Route } from 'react-router-dom'
import  Home  from './pages/Home'
import Layout from './components/Layout'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path="profile" element={<h1>Profile</h1>} />
      </Route>
    </Routes>
  )
}

export default App
