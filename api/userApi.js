import axiosClient from './axiosClient'

const userApi = {
	login: params => {
		const url = '/User/Login'

		return axiosClient.post(url, params)
	}
}

export default userApi
