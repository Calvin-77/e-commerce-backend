import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import MovieManagement from './pages/MovieManagement'
import AddMovie from './pages/AddMovie'
import Reports from './pages/Reports'

function App() {
  return (
    <Router>
      <div className="App w-full flex">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/movies" element={<MovieManagement />} />
            <Route path="/movies/add" element={<AddMovie />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
