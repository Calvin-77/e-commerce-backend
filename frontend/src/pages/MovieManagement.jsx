import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../hooks/useToast'
import DeleteMovieModal from '../components/DeleteMovieModal'

function MovieManagement() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    movieId: null,
    movieTitle: ''
  })

  // Mock data untuk sementara
  useEffect(() => {
    setTimeout(() => {
      setMovies([
        {
          id: 1,
          title: "Pengabdi Setan 2",
          genre: "Horror",
          year: 2023,
          price: 50000,
          stock: 50,
          status: "Tersedia"
        },
        {
          id: 2,
          title: "Dilan 1991",
          genre: "Romance",
          year: 2023,
          price: 45000,
          stock: 30,
          status: "Tersedia"
        },
        {
          id: 3,
          title: "The Raid 3",
          genre: "Action",
          year: 2024,
          price: 55000,
          stock: 0,
          status: "Habis"
        },
        {
          id: 4,
          title: "Laskar Pelangi",
          genre: "Drama",
          year: 2023,
          price: 40000,
          stock: 20,
          status: "Tersedia"
        },
        {
          id: 5,
          title: "Ayat-Ayat Cinta 3",
          genre: "Romance",
          year: 2024,
          price: 48000,
          stock: 15,
          status: "Tersedia"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddMovie = () => {
    navigate('/movies/add')
  }


  const handleEditMovie = (movieId) => {
    navigate(`/movies/edit/${movieId}`)
  }

  const handleDeleteMovie = (movieId, movieTitle) => {
    setDeleteModal({
      isOpen: true,
      movieId: movieId,
      movieTitle: movieTitle
    })
  }

  const confirmDeleteMovie = async () => {
    try {
      // TODO: Replace with actual API call
      // Example: await movieApi.deleteMovie(deleteModal.movieId)
      
      console.log('Deleting movie:', deleteModal.movieId)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove movie from state
      setMovies(prevMovies => 
        prevMovies.filter(movie => movie.id !== deleteModal.movieId)
      )
      
      // Show success toast
      showToast('Film berhasil dihapus!', 'success')
      
    } catch (error) {
      console.error('Error deleting movie:', error)
      showToast('Terjadi kesalahan saat menghapus film', 'error')
    } finally {
      // Close modal
      setDeleteModal({
        isOpen: false,
        movieId: null,
        movieTitle: ''
      })
    }
  }

  const cancelDeleteMovie = () => {
    setDeleteModal({
      isOpen: false,
      movieId: null,
      movieTitle: ''
    })
  }


  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Manajemen Film
              </h1>
              <p className="text-gray-600">Kelola koleksi film Anda</p>
            </div>
            <button
              onClick={handleAddMovie}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Film
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Daftar Film Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Daftar Film</h2>
            
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Cari film..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tahun
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.map((movie) => (
                  <tr key={movie.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{movie.genre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{movie.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rp {movie.price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{movie.stock}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        movie.status === 'Tersedia' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {movie.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditMovie(movie.id)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie.id, movie.title)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m8 0H7m8 0v3a1 1 0 01-1 1H8a1 1 0 01-1-1V4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada film ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau tambah film baru.</p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Movie Modal */}
      <DeleteMovieModal
        isOpen={deleteModal.isOpen}
        onConfirm={confirmDeleteMovie}
        onCancel={cancelDeleteMovie}
        movieTitle={deleteModal.movieTitle}
      />
    </div>
  )
}

export default MovieManagement
