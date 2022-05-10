import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import bookApi from '../../../../../api/bookApi';
import BookItem from '../../Item/BookItem/BookItem';

export default function BookSearch({ navigation }) {
	const [data, setData] = useState([]);

	const goBack = () => {
		navigation.goBack();
	};

	const onSearch = async key => {
		if (key.trim() !== '') {
			const res = await bookApi.gets({
				key,
				category: '',
				status: 1,
				page: 0
			});
			setData(res.data);
			return;
		}

		setData([]);
	};

	const header = (
		<View style={styles.header}>
			<TouchableOpacity style={styles.back} onPress={goBack}>
				<MaterialCommunityIcons
					style={styles.backIcon}
					name="keyboard-backspace"
					size={30}
				/>
			</TouchableOpacity>
			<TextInput
				style={styles.inputValue}
				placeholder="Nhập từ khóa tìm kiếm"
				autoFocus={true}
				onChangeText={onSearch}
			/>
		</View>
	);

	return (
		<View style={{ flex: 1 }}>
			{header}
			<FlatList
				contentContainerStyle={styles.flatList}
				keyExtractor={item => item.Id.toString()}
				showsVerticalScrollIndicator={false}
				data={data}
				renderItem={({ item }) => (
					<BookItem data={item} navigation={navigation} />
				)}
				horizontal={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#fff',
		height: 60,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	back: {
		backgroundColor: '#e4e4e4',
		borderRadius: 40
	},
	backIcon: {
		backgroundColor: '#fff',
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
	input: {
		padding: 5,
		flexDirection: 'row'
	},
	inputValue: {
		paddingVertical: 5,
		paddingHorizontal: 20,
		fontSize: 18,
		flex: 1,
		backgroundColor: '#f4f4f4',
		marginLeft: 5,
		borderRadius: 20
	},
	flatList: {
		paddingTop: 10
	}
});
