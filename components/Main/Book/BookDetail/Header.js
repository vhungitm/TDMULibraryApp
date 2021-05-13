import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { connect } from 'react-redux';
import global from '../../../global';

const Header = ({ data, navigation, user }) => {
    const [quantityInStock, setQuantityInStock] = useState(0);
    useEffect(() => {
        Axios.get(global.urlBookQuantityInStock + data.Id)
            .then(res => setQuantityInStock(res.data.data))
            .catch(error => console.log(error))
    })

    const registerBorrow = () => {
        if (quantityInStock >= 1) {
            Axios.post(global.urlRegisterBorrow, {
                Id: 0,
                StaffId: 'NV001',
                StudentId: user.Id,
                BookId: data.Id,
                Status: -1
            })
                .then(res => {
                    let status = res.data.status;

                    if (status == 1) {
                        Alert.alert('', 'Đăng ký mượn thành công! Bạn có 24 giờ để hoàn thành thủ tục mượn!');
                    } else if (status == 0) {
                        Alert.alert('', 'Đăng ký mượn không thành công!');
                    } else if (status == -1) {
                        Alert.alert('', 'Đăng ký mượn không thành công! Bạn đang mượn và chưa trả cuốn sách này!');
                    } else {
                        Alert.alert('', 'Đăng ký mượn không thành công! Số lượng trong kho không đủ!')
                    }
                })
                .catch(error => {
                    console.log(error);
                    Alert.alert('', 'Đăng ký mượn không thành công!');
                })
        } else {
            Alert.alert('', 'Đăng ký mượn không thành công! Số lượng trong kho không đủ!')
        }
    }

    const onRegisterBorrow = () => {
        Alert.alert('', 'Đăng ký mượn cuốn sách này?',
            [
                { text: 'Huỷ', type: 'cancel' },
                { text: 'Đồng ý', onPress: registerBorrow }
            ]
        )
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerButton}
                onPress={() => navigation.goBack()}
            >
                <Icon
                    name="arrow-left"
                    color="black"
                    size={20}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginHorizontal: 15 }}>
                <View style={styles.bookImageContainer}>
                    <Image style={styles.bookImage} source={{ uri: global.url + data.Image }} />
                </View>
                <View style={{ paddingLeft: 10, flex: 1, justifyContent: 'space-between' }}>
                    <Text style={styles.bookTitle}>{data.Title}</Text>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Thể loại: {data.CategoryName}</Text>
                    <Text style={{ fontSize: 15, marginTop: 5 }}>Số lượng trong kho: {quantityInStock}</Text>
                    <TouchableOpacity
                        style={{ padding: 5, flexDirection: 'row', alignItems: 'center' }}
                        onPress={onRegisterBorrow}
                    >
                        <Icon name="book-open" size={20} />
                        <Text style={{ marginLeft: 5 }}>Đăng ký mượn</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
})

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps, null)(Header);