import axios from 'axios';

const api = axios.create({
  baseURL: 'https://djangorest-etpk.onrender.com/api',
});



// Interceptor para adjuntar el access token en cada request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor para manejar expiración del token
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const refresh = localStorage.getItem('refresh')
        console.log('refresh: ', refresh);
        const res = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
          refresh: refresh,
        })

        const newAccessToken = res.data.access
        localStorage.setItem('access', newAccessToken)

        // Reintenta la solicitud original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token inválido. Redirigiendo al login.')
        // Podés redirigir al login
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api
