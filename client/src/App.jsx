import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<img src="src/assets/logo.jpg" alt="" />} />
      <Route path="profile" element={<h1>Profile</h1>} />
    </Routes>
  )
}

export default App
