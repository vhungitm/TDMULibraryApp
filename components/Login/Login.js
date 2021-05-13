import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../../assets/logo_tdmu.png';
import avatar from '../../assets/no-avatar.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import color from '../setting/color';
import { connect } from 'react-redux';
import global from '../global';
import * as userAction from '../../store/actions/userAction';

const Login = ({ navigation, login }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const axios = require('axios');

    const onLogin = () => {
        if (!!username.trim() & !!password.trim()) {
            axios.post(global.urlLogin, { username: username, password: password })
                .then((res) => {
                    let status = res.data.status;

                    if (status == 1) {
                        let data = res.data.data;

                        login(data);
                        Alert.alert('', 'Đăng nhập thành công!');
                        navigation.navigate('Main');
                    } else if (status = 0) {
                        Alert.alert('', 'Đăng nhập không thành công! Tài khoản của bạn đã bị khoá!');
                    } else {
                        Alert.alert(
                            'Đăng Nhập Thất Bại',
                            'Sai tên tài khoản hoặc mật khẩu',
                            [{ text: 'Đồng ý' },]
                        );
                    }
                })
                .catch(error => Alert.alert('', 'Lỗi! Kết nối với máy chủ không thành công!'));
        } else {
            Alert.alert(
                'Đăng Nhập Thất Bại',
                'Vui lòng nhập đầy đủ thông tin',
                [{ text: 'Đồng ý' }]
            );
        }
    }

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
                    <TextInput style={styles.inputValue}
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
                    <TextInput style={styles.inputValue}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => setPassword(text)} />
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    activeOpacity={0.9}
                    onPress={onLogin}
                >
                    <Text style={styles.loginButtonTitle}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

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
        backgroundColor: '#efefef',
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
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: (user) => {
            dispatch(userAction.login(user));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);