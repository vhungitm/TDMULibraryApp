import axiosClient from './axiosClient'

const bookApi = {
	gets: params => {
		const { key, category, status, page } = params
		const url = `/book/gets?key=${key}&category=${category}&status=${status}&page=${page}`

		return axiosClient.get(url)
	},

	getTopHot: () => {
		const url = '/borrow/gettopbook'

		return axiosClient.get(url)
	},

	get: params => {
		const url = `/book/get?id=${params}`

		return axiosClient.get(url)
	},

	getQuantityInStock: params => {
		const url = `/book/getquantityinstock?id=${params}`

		return axiosClient.get(url)
	}
}

export default bookApi
