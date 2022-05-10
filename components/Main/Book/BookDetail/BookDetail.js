import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useSelector } from 'react-redux';
import bookApi from '../../../../api/bookApi';
import borrowHistoryApi from '../../../../api/borrowHistoryApi';
import global from '../../../global';
import color from '../../../setting/color';
import InforItem from './InforItem';

export default function BookDetail(params) {
	const { navigation, route } = params;
	const { data } = route.params;
	const [isDesc, setIsDesc] = useState(false);

	// Loading
	const [loading, setLoading] = useState(true);
	const [loadingTimmer, setLoadingTimmer] = useState(0.5);
	useEffect(() => {
		const loading = setTimeout(() => {
			if (loadingTimmer > 0) setLoadingTimmer(loadingTimmer - 0.1);
		}, 100);

		return () => clearTimeout(loading);
	});

	const user = useSelector(state => state.user);

	const [quantityInStock, setQuantityInStock] = useState(0);
	useEffect(() => {
		let mounted = false;

		const fetchData = async () => {
			const res = await bookApi.getQuantityInStock(data.Id);
			if (!mounted) {
				setLoading(false);
				setQuantityInStock(res.data || {});
			}
		};

		fetchData();

		return () => {
			mounted = true;
		};
	});

	const registerBorrow = async () => {
		if (quantityInStock >= 1) {
			const res = await borrowHistoryApi.add({
				Id: 0,
				StaffId: 'NV001',
				StudentId: user.Id,
				BookId: data.Id,
				Status: -1
			});

			let status = res.status;

			if (status == 1) {
				Alert.alert(
					'',
					'Đăng ký mượn thành công! Bạn có 24 giờ để hoàn thành thủ tục mượn!'
				);
			} else if (status == 0) {
				Alert.alert('', 'Đăng ký mượn không thành công!');
			} else if (status == -1) {
				Alert.alert(
					'',
					'Đăng ký mượn không thành công! Bạn đang mượn và chưa trả cuốn sách này!'
				);
			} else {
				Alert.alert(
					'',
					'Đăng ký mượn không thành công! Số lượng trong kho không đủ!'
				);
			}
		} else {
			Alert.alert(
				'',
				'Đăng ký mượn không thành công! Số lượng trong kho không đủ!'
			);
		}
	};

	const onRegisterBorrow = () => {
		Alert.alert('', 'Đăng ký mượn cuốn sách này?', [
			{ text: 'Huỷ', type: 'cancel' },
			{ text: 'Đồng ý', onPress: registerBorrow }
		]);
	};

	const descJSX = (
		<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
			<HTML
				html={
					data.Description == null
						? 'Không có mô tả'
						: data.Description
				}
			/>
		</ScrollView>
	);

	const inforJSX = (
		<>
			<InforItem
				iconName="note"
				title="Được viết bởi"
				value={data.Authors}
			/>
			<InforItem
				iconName="user"
				title="Nhà xuất bản"
				value={data.PublisherName}
			/>
			<InforItem
				iconName="calendar"
				title="Năm xuất bản"
				value={data.PublishYear}
			/>
			<InforItem
				iconName="docs"
				title="Số lượng bản sao"
				value={data.Quantity}
			/>
			<InforItem
				iconName="book-open"
				title="Số trang"
				value={data.PageNumber}
			/>
			<InforItem
				iconName="size-fullscreen"
				title="Kích thước"
				value={data.Size + ' cm'}
			/>
			<InforItem
				iconName="drop"
				title="Trọng lượng"
				value={data.Weight + ' gr'}
			/>
		</>
	);

	const descStyle = isDesc
		? styles.inforHeaderItemActive
		: styles.inforHeaderItem;
	const inforStyle = isDesc
		? styles.inforHeaderItem
		: styles.inforHeaderItemActive;

	return loadingTimmer > 0 || loading ? (
		<View></View>
	) : (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.headerButton}
					onPress={() => navigation.goBack()}
				>
					<Icon name="arrow-left" color="black" size={20} />
				</TouchableOpacity>
				<View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
					<View style={styles.bookImageContainer}>
						<Image
							style={styles.bookImage}
							source={{ uri: global.url + data.Image }}
						/>
					</View>
					<View
						style={{
							paddingLeft: 10,
							flex: 1,
							justifyContent: 'space-between'
						}}
					>
						<Text style={styles.bookTitle}>{data.Title}</Text>
						<Text style={{ fontSize: 15, marginTop: 5 }}>
							Thể loại: {data.CategoryName}
						</Text>
						<Text style={{ fontSize: 15, marginTop: 5 }}>
							Số lượng trong kho: {quantityInStock}
						</Text>
						<TouchableOpacity
							style={{
								padding: 5,
								flexDirection: 'row',
								alignItems: 'center'
							}}
							onPress={onRegisterBorrow}
						>
							<Icon name="book-open" size={20} />
							<Text style={{ marginLeft: 5 }}>Đăng ký mượn</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
			<View style={styles.body}>
				<View style={styles.inforHeader}>
					<TouchableOpacity onPress={() => setIsDesc(false)}>
						<Text style={inforStyle}>Thông Tin Sách</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setIsDesc(true)}>
						<Text style={descStyle}>Mô tả</Text>
					</TouchableOpacity>
				</View>
				{isDesc ? descJSX : inforJSX}
			</View>
		</SafeAreaView>
	);
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	body: {
		marginTop: 20,
		borderTopWidth: 0.5,
		borderTopColor: '#e4e4e4',
		marginHorizontal: 15,
		paddingVertical: 10,
		flex: 1
	},

	// Header
	headerButton: {
		width: 40,
		height: 40,
		borderRadius: 40,
		backgroundColor: '#efefef',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		marginLeft: 15
	},
	bookImageContainer: {
		backgroundColor: '#efefef',
		borderColor: '#000',
		borderRadius: 10,
		width: 90,
		height: 140,
		elevation: 10
	},
	bookImage: {
		flex: 1,
		borderRadius: 10
	},
	bookTitle: {
		color: '#000',
		fontSize: 16,
		fontWeight: 'bold'
	},
	inforHeader: {
		flexDirection: 'row',
		paddingBottom: 10
	},
	inforHeaderItemActive: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignSelf: 'flex-start',
		color: '#fff',
		borderRadius: 20,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
		backgroundColor: color.primary
	},
	inforHeaderItem: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		alignSelf: 'flex-start',
		color: '#333',
		borderRadius: 20,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 10,
		backgroundColor: '#e4e4e4'
	}
});
