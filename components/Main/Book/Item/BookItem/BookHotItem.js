import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../../../../setting/color'
import global from '../../../../global'
import bookApi from '../../../../../api/bookApi'

export default function BookHotItem({ navigation, Id }) {
	const [data, setData] = useState({})
	useEffect(() => {
		let mounted = true

		const fetchData = async () => {
			const res = await bookApi.get(Id)

			if (mounted) setData(res.data)
		}

		fetchData()

		return () => {
			mounted = false
		}
	}, [])

	const gotoBookDetail = () => {
		navigation.navigate('BookDetail', { data })
	}

	return (
		<>
			{data.Authors && (
				<TouchableOpacity activeOpacity={0.9} onPress={gotoBookDetail}>
					<View style={styles.container}>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: global.url + data.Image }}
								style={styles.image}
							/>
						</View>
						<View style={styles.info}>
							<Text style={styles.name}>{data.Title}</Text>
							<Text style={styles.hot}>Sách Hot</Text>
							<Text style={styles.description}>Tác giả: {data.Authors}</Text>
							<Text style={styles.description}>
								Thể loại: {data.CategoryName}
							</Text>
							<Text style={styles.description}>
								Nhà xuất bản: {data.PublisherName}
							</Text>
						</View>
					</View>
				</TouchableOpacity>
			)}
		</>
	)
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	container: {
		height: 150,
		width: width - 20,
		backgroundColor: color.primary,
		borderRadius: 10,
		marginRight: 10,
		flexDirection: 'row'
	},
	imageContainer: {
		backgroundColor: '#e4e4e4',
		width: 80,
		height: 126,
		margin: 12,
		marginRight: 0,
		alignItems: 'stretch',
		elevation: 10,
		borderColor: '#000',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.9
	},
	image: {
		flex: 1,
		borderRadius: 10
	},
	info: {
		margin: 0,
		flex: 1,
		justifyContent: 'space-around',
		padding: 10
	},
	name: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#fff'
	},
	hot: {
		backgroundColor: 'red',
		color: 'white',
		alignSelf: 'flex-start',
		paddingVertical: 1,
		paddingHorizontal: 7,
		borderRadius: 2,
		marginRight: 5,
		fontSize: 10
	},
	description: {
		fontSize: 14,
		color: '#fff'
	}
})
