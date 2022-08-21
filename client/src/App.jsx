import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="profile" element={<h1>Profile</h1>} />
    </Routes>
  );
}

export default App;
