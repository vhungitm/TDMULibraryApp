import axiosClient from './axiosClient'

const borrowHistoryApi = {
	gets: params => {
		const { studentId } = params
		const url = `/borrow/gets?studentId=${studentId}&page=0`

		return axiosClient.get(url)
	},

	add: params => {
		const url = '/borrow/insert'

		return axiosClient.post(url, params)
	}
}

export default borrowHistoryApi
