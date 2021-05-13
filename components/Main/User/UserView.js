import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import contactIcon from '../../../assets/userMenu/contact.png';
import coverPhoto from '../../../assets/coverPhoto.png';
import logoutIcon from '../../../assets/userMenu/logout.png';
import orderIcon from '../../../assets/userMenu/order.png';
import global from '../../global';
import color from '../../setting/color';
import * as userAction from '../../../store/actions/userAction';
import { connect } from 'react-redux';

const UserView = ({ navigation, user, logout }) => {
    const goToBorrowHistory = () => {
        navigation.navigate('BorrowHistory')
    }

    const goToAbout = () => {
        navigation.navigate('About')
    }

    const onLogout = () => {
        Alert.alert('', 'Đăng xuất khỏi tài khoản này?', [
            { text: 'Huỷ' },
            {
                text: 'Đồng ý', onPress: () => {
                    navigation.navigate('Login');
                    setTimeout(() => {
                        logout();
                    }, 500);
                }
            }
        ]
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={coverPhoto} style={styles.coverPhoto} />
                <View style={styles.absolute}>
                    <View style={styles.avatarContainer}>
                        <Image source={{ uri: global.url + user.Avatar }} style={styles.avatar} />
                    </View>
                    <Text style={styles.name}>{user.FullName}</Text>
                </View>
            </View>
            <View style={styles.body}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.9} onPress={goToBorrowHistory}>
                    <Image source={orderIcon} style={styles.menuIcon} />
                    <Text style={styles.menuTitle}>Lịch sử mượn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.9} onPress={goToAbout}>
                    <Image source={contactIcon} style={styles.menuIcon} />
                    <Text style={styles.menuTitle}>Liên hệ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.9} onPress={onLogout}>
                    <Image source={logoutIcon} style={styles.menuIcon} />
                    <Text style={styles.menuTitle}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window');
const avatarSize = 150;
const coverPhotoHeight = 250;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'white',
        height: 400,
        padding: 10
    },
    coverPhoto: {
        backgroundColor: 'yellow',
        height: coverPhotoHeight,
        width: width - 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    absolute: {
        width: width,
        position: 'absolute',
        top: coverPhotoHeight - (avatarSize / 2),
        alignItems: 'center'
    },
    avatarContainer: {
        backgroundColor: color.primary,
        padding: 5,
        borderRadius: 120,
        borderColor: 'white',
        borderWidth: 5,
    },
    avatar: {
        backgroundColor: '#e4e4e4',
        width: avatarSize,
        height: avatarSize,
        borderRadius: 120,
        borderColor: 'white',
        borderWidth: 5,
    },
    name: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        borderRadius: 120
    },
    body: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5
    },
    menuItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: (width / 2) - 15,
        margin: 5,
        padding: 10
    },
    menuIcon: {
        width: 30,
        height: 30,
        borderRadius: 30
    }
})

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => { dispatch(userAction.logout()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserView);