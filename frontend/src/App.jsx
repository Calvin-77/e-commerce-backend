import Sidebar from './components/Sidebar'
import MovieManagement from './pages/MovieManagement'

function App() {
  return (
    <div className="App w-full flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <MovieManagement />
      </div>
    </div>
  )
}

export default App
