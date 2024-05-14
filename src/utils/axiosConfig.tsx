import axios from 'axios'

axios.interceptors.request.use(request => {
  console.log('Request Interceptor', request)
  return request
})


axios.interceptors.response.use(response => {
  console.log('Response Interceptor', response)
  return response
})