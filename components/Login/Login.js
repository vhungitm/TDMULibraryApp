import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/logo_tdmu.png';
import avatar from '../../assets/no-avatar.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../setting/color';
import userApi from '../../api/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../app/userSlice';

const Login = ({ navigation, login }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const checkLoggedIn = async () => {
			const userLogged = JSON.parse(await AsyncStorage.getItem('user'));

			if (userLogged && userLogged.username) navigation.navigate('Main');
		};

		checkLoggedIn();
	}, []);

	const dispatch = useDispatch();

	const onLogin = async () => {
		try {
			if (!!username.trim() & !!password.trim()) {
				const res = await userApi.login({ username, password });

				if (res.status === 1) {
					Alert.alert('', 'Đăng nhập thành công');
					await AsyncStorage.setItem(
						'user',
						JSON.stringify(res.data)
					);
					dispatch(setUser(res.data));
					navigation.navigate('Main');
				} else if (res.status === 0) {
					Alert.alert('', 'Tài khoản của bạn đã bị khóa');
				} else if (res.status === -1) {
					Alert.alert('', 'Sai tên tài khoản hoặc mật khẩu');
				} else {
					Alert.alert('', 'Lỗi hệ thống');
				}
			} else {
				Alert.alert(
					'Đăng Nhập Thất Bại',
					'Vui lòng nhập đầy đủ thông tin',
					[{ text: 'Đồng ý' }]
				);
			}
		} catch (error) {
			Alert.alert('', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Image source={logo} style={styles.logo} />
				<Image source={avatar} style={styles.avatar} />
			</View>
			<View style={styles.body}>
				<View style={styles.input}>
					<Icon
						iconStyle={{ fontWeight: 'bold' }}
						name="shield-account-outline"
						color="#000"
						size={25}
					/>
					<TextInput
						style={styles.inputValue}
						placeholder="Mã số sinh viên"
						onChangeText={text => setUsername(text)}
					/>
				</View>
				<View style={styles.input}>
					<Icon
						style={{ paddingBottom: 3 }}
						color="#000"
						name="lock-outline"
						size={25}
					/>
					<TextInput
						style={styles.inputValue}
						placeholder="Mật khẩu"
						secureTextEntry={true}
						value={password}
						onChangeText={text => setPassword(text)}
					/>
				</View>
				<TouchableOpacity
					style={styles.loginButton}
					activeOpacity={0.9}
					onPress={onLogin}
				>
					<Text style={styles.loginButtonTitle}>Đăng nhập</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	header: {
		height: 220,
		padding: 50,
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderBottomColor: '#e4e4e4'
	},
	logo: {
		width: 100,
		height: 100
	},
	avatar: {
		marginTop: 20,
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: '#efefef'
	},
	body: {
		flex: 1,
		padding: 60,
		marginTop: 80
	},
	input: {
		borderBottomColor: '#999',
		borderBottomWidth: 0.5,
		padding: 5,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	inputValue: {
		paddingLeft: 5,
		fontSize: 18,
		flex: 1
	},
	loginButton: {
		backgroundColor: color.primary,
		padding: 10,
		borderRadius: 5,
		marginTop: 20
	},
	loginButtonTitle: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff'
	}
});

export default Login;
