import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
	baseURL: 'http://tdmu.somee.com/api',
	headers: {
		'content-type': 'application/json'
	},
	paramsSerializer: params => queryString.stringify(params)
})

// axiosClient.interceptors.request.use(async config => {
// 	const token = localStorage.getItem('accessToken')
// 	if (token) {
// 		config.headers.Authorization = `Bearer ${token}`
// 	}

// 	return config
// })

axiosClient.interceptors.response.use(
	response => {
		if (response && response.data) return response.data
		return response
	},
	error => {
		if (error.response && error.response.data) return error.response.data
		return error.response
	}
)

export default axiosClient
