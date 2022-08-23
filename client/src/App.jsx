import { Routes, Route } from 'react-router-dom'
import  mainPage  from './pages/main-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={mainPage()} />
      <Route path="profile" element={<h1>Profile</h1>} />
    </Routes>
  )
}

export default App
