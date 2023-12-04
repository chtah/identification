import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
import Navbar from './components/Navbar'
import All from './pages/All'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/all" element={<All />} />
      </Routes>
    </div>
  )
}

export default App
