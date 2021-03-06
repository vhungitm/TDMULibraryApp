import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native-gesture-handler';
import BookItem from '../Item/BookItem/BookItem';
import bookApi from '../../../../api/bookApi';

export default function BookCategory({ navigation, route }) {
	const { data } = route.params;
	const [books, setBooks] = useState([]);

	useEffect(() => {
		let isMounted = false;

		const fetchData = async () => {
			const res = await bookApi.gets({
				key: '',
				category: data.Id,
				status: 1,
				page: 0,
				pageSize: 0
			});

			if (!isMounted) setBooks(res.data || []);
		};

		fetchData();

		return () => {
			isMounted = true;
		};
	}, []);

	const goBack = () => {
		navigation.goBack();
	};

	const header = (
		<View style={styles.header}>
			<TouchableOpacity onPress={goBack}>
				<MaterialCommunityIcons
					style={styles.headerButton}
					name="keyboard-backspace"
					size={30}
				/>
			</TouchableOpacity>
			<Text style={styles.headerTitle}>{data.Name}</Text>
			<View style={{ width: 40 }} />
		</View>
	);

	return (
		<View style={styles.container}>
			{header}
			<FlatList
				keyExtractor={item => item.Id.toString()}
				contentContainerStyle={styles.flatList}
				showsVerticalScrollIndicator={false}
				data={books}
				renderItem={({ item }) => (
					<BookItem data={item} navigation={navigation} />
				)}
				horizontal={false}
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
		fontSize: 20,
		margin: 10,
		fontWeight: 'bold',
		color: '#000'
	},
	flatList: {
		paddingTop: 10
	}
});
