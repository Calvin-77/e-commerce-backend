import Sidebar from './components/Sidebar'
import Reports from './pages/Reports'

function App() {
  return (
    <div className="App w-full flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Reports />
      </div>
    </div>
  )
}

export default App
