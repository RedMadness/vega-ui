import axios from 'axios'

function api(customHeaders = {}) {
  const defaultHeaders = {
    Charset: 'utf-8',
    Accept: 'application/json; charset=UTF-8',
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL + '/api/v1',
    headers: {
      ...defaultHeaders,
      ...customHeaders,
    },
  })

  api.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + import.meta.env.VITE_API_KEY
    return config
  })

  return api
}

export default {
  getIndicators: (params = {}) => api().get(`/indicators`, { params }),
  getOrganizations: (params = {}) => api().get(`/organizations`, { params }),
}
