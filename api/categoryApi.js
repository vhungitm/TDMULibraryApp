import axiosClient from './axiosClient'

const categoryApi = {
	gets: () => {
		const url = '/category/gets?page=0'

		return axiosClient.get(url)
	}
}

export default categoryApi
