import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function About({ navigation }) {
	const goBack = () => {
		navigation.goBack()
	}

	const header = (
		<View style={styles.header}>
			<TouchableOpacity onPress={goBack}>
				<MaterialCommunityIcons style={styles.headerButton} name='keyboard-backspace' size={30} />
			</TouchableOpacity>
			<Text style={styles.headerTitle}>Thông Tin Liên Hệ</Text>
			<View style={{ width: 40 }} />
		</View>
	)

	return (
		<SafeAreaView style={styles.container}>
			{header}
			<View style={styles.body}>
				<Text style={styles.inforTitle}>Dịa chỉ:</Text>
				<Text style={styles.infor}>Trường Đại Học Thủ Dầu Một, TP. Thủ Dầu Một, tỉnh Bình Dương</Text>
				<Text style={styles.inforTitle}>Số điện thoại:</Text>
				<Text style={styles.infor}>0385968197</Text>
				<Text style={styles.inforTitle}>Email:</Text>
				<Text style={styles.infor}>Vhungitm@gmail.com</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		paddingTop: 30,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	headerButton: {
		backgroundColor: '#e4e4e4',
		paddingLeft: 5,
		paddingTop: 5,
		width: 40,
		height: 40,
		borderRadius: 40
	},
	headerTitle: {
		fontSize: 20,
		margin: 10,
		fontWeight: 'bold',
		color: '#000'
	},
	body: {
		margin: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		paddingHorizontal: 20,
		paddingBottom: 20
	},
	inforTitle: {
		fontWeight: 'bold',
		fontSize: 16,
		marginTop: 15,
		marginBottom: 5
	},
	infor: {
		fontSize: 14
	}
})
