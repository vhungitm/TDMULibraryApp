import axiosClient from './axiosClient'

const bannerApi = {
	gets: () => {
		const url = '/banner/gets?status=1&page=0'

		return axiosClient.get(url)
	}
}

export default bannerApi
