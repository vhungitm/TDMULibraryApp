import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryItem from '../Item/CategoryItem/CategoryItem';
import categoryApi from '../../../../api/categoryApi';

export default function Category({ navigation }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		let isMounted = false;

		const fetchData = async () => {
			const res = await categoryApi.gets();

			if (!isMounted) setData(res.data || []);
		};

		fetchData();

		return () => {
			isMounted = true;
		};
	}, []);

	const header = (
		<View style={styles.header}>
			<Text style={styles.headerTitle}>Thể Loại Sách</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			{header}
			<FlatList
				contentContainerStyle={styles.flatList}
				showsVerticalScrollIndicator={false}
				keyExtractor={item => item.Id.toString()}
				data={data}
				renderItem={({ item }) => (
					<CategoryItem data={item} navigation={navigation} />
				)}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		elevation: 5
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
		flex: 1,
		fontSize: 20,
		margin: 10,
		fontWeight: 'bold',
		color: '#000'
	},
	flatList: {
		paddingTop: 10
	}
});
