import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../hooks/useToast'

function Login() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password harus diisi'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      console.log('Sending login request with:', {
        username: formData.username.trim(),
        password: formData.password
      });

      const response = await fetch('http://localhost:5000/authentications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          password: formData.password
        })
      })

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.log('Error response data:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.log('Could not parse error response');
        }
        throw new Error(errorMessage);
      }

      const data = await response.json()
      console.log('Success response data:', data);

      if (data.status === 'success') {
        // Store tokens in localStorage
        localStorage.setItem('authToken', data.data.accessToken)
        localStorage.setItem('refreshToken', data.data.refreshToken)
        
        console.log('Tokens stored successfully');
        
        // Show success toast first
        showToast('Login berhasil!', 'success')
        
        // Small delay to ensure toast is shown, then navigate
        setTimeout(() => {
          // Force page reload to trigger authentication check
          window.location.href = '/dashboard'
        }, 500)
      } else {
        console.log('Login failed:', data);
        showToast(data.message || 'Login gagal', 'error')
      }
      
    } catch (error) {
      console.error('Error during login:', error)
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        showToast('Username atau password salah', 'error')
      } else if (error.message.includes('Failed to fetch')) {
        showToast('Tidak dapat terhubung ke server. Pastikan backend sudah running.', 'error')
      } else {
        showToast(`Login gagal: ${error.message}`, 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FilmHub</h1>
          <h2 className="text-xl text-gray-600">Admin Dashboard</h2>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Silakan login untuk mengakses dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.username ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sedang login...
                  </div>
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>

             <div className="mt-4 bg-gray-50 p-4 rounded-md">
               <p className="text-sm text-gray-600 mb-2">Gunakan kredensial berikut untuk testing:</p>
               <div className="text-sm">
                 <p><span className="font-medium">Username:</span> admin</p>
                 <p><span className="font-medium">Password:</span> admin</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
