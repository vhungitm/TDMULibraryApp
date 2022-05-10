import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import BookHotItem from '../Book/Item/BookItem/BookHotItem';
import BookItem from '../Book/Item/BookItem/BookItem';
import logo from '../../../assets/logo_tdmu.png';
import global from '../../global';
import bookApi from '../../../api/bookApi';
import bannerApi from '../../../api/bannerApi';

export default function HomeView({ navigation }) {
	const [hotBooks, setHotBooks] = useState([]);

	useEffect(() => {
		let isMounted = false;

		const getHotBooks = async () => {
			try {
				const res = await bookApi.getTopHot();

				if (!isMounted) {
					const data = res.data || [];
					setHotBooks(data);
				}
			} catch (error) {
				Alert.alert('', 'Lỗi hệ thống');
			}
		};

		getHotBooks();

		return () => {
			isMounted = true;
		};
	}, []);

	const [newBooks, setNewBooks] = useState([]);
	useEffect(() => {
		let isMounted = false;

		const getNewBooks = async () => {
			const res = await bookApi.gets({
				key: '',
				category: '',
				status: 1,
				page: 1,
				pageSize: 5
			});

			if (!isMounted) {
				setNewBooks(res.data || []);
			}
		};

		getNewBooks();

		return () => {
			isMounted = true;
		};
	}, []);

	const [banners, setBanners] = useState([]);
	useEffect(() => {
		let isMounted = false;

		const getBanners = async () => {
			const res = await bannerApi.gets();
			if (!isMounted) {
				setBanners(res.data || []);
			}
		};

		getBanners();

		return () => {
			isMounted = true;
		};
	}, []);

	const goToSearch = () => {
		navigation.navigate('BookSearch');
	};

	const header = (
		<View style={styles.header}>
			<View style={{ flexDirection: 'row' }}>
				<Image source={logo} style={styles.logo} />
				<Text style={styles.headerTitle}>Thư Viện TDMU</Text>
			</View>
			<TouchableOpacity style={styles.headerButton} onPress={goToSearch}>
				<Icon
					style={styles.headerButtonIcon}
					name="magnifier"
					size={20}
				/>
			</TouchableOpacity>
		</View>
	);

	const getBanners = () => {
		return (
			<View style={{ width: width - 20, borderRadius: 10, margin: 10 }}>
				<SwiperFlatList
					paginationStyleItem={{ width: 5, height: 5 }}
					paginationDefaultColor="#efefef"
					paginationActiveColor="#1e96ff"
					autoplay
					autoplayDelay={5}
					autoplayLoop
					index={0}
					showPagination
					data={banners}
					renderItem={({ item }) => (
						<Image
							source={{ uri: global.url + item.Image }}
							style={{
								borderRadius: 10,
								width: width - 20,
								height: (width - 20) / 2
							}}
						/>
					)}
				/>
			</View>
		);
	};

	const getTopHot = () => {
		return (
			<View>
				{getBanners()}
				<Text style={styles.categoryTitle}>Top Hot</Text>
				<FlatList
					contentContainerStyle={{ paddingLeft: 10 }}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					keyExtractor={item => item.Id.toString()}
					data={hotBooks}
					renderItem={({ item }) => (
						<BookHotItem Id={item.Id} navigation={navigation} />
					)}
				/>
				<Text style={styles.categoryTitle}>Sách Mới</Text>
			</View>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			{header}
			<FlatList
				horizontal={false}
				showsVerticalScrollIndicator={false}
				ListHeaderComponent={getTopHot}
				keyExtractor={item => item.Id.toString()}
				data={newBooks}
				renderItem={({ item }) => (
					<BookItem data={item} navigation={navigation} />
				)}
				horizontal={false}
			/>
		</View>
	);
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		backgroundColor: '#fff',
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		elevation: 2
	},
	logo: {
		marginTop: 5,
		width: 40,
		height: 40
	},
	headerTitle: {
		fontSize: 20,
		margin: 10,
		fontWeight: 'bold',
		color: '#000'
	},
	categoryHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	categoryTitle: {
		margin: 10,
		fontSize: 18
	},
	headerButton: {
		backgroundColor: '#e4e4e4',
		padding: 10,
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerButtonIcon: {
		borderRadius: 40
	}
});
