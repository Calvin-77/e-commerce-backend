import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './hooks/useToast'
import Sidebar from './components/Sidebar'
import Toast from './components/Toast'
import Home from './pages/Home'
import MovieManagement from './pages/MovieManagement'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Reports from './pages/Reports'

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App w-full flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/movies" element={<MovieManagement />} />
              <Route path="/movies/add" element={<AddMovie />} />
              <Route path="/movies/edit/:id" element={<EditMovie />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
        </div>
        <Toast />
      </Router>
    </ToastProvider>
  )
}

export default App
