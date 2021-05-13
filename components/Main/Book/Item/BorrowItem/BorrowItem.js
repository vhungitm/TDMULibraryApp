import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import color from '../../../../setting/color';
import global from '../../../../global';

export default function BorrowItem({ data, navigation }) {

    const goBack = () => {
        navigation.goBack()
    }
    
    const returnDateJSX = data.Status == 1 ? 
        (<Text style={styles.description}>Ngày trả: {data.ReturnDate}</Text>) : (null);

    const borrowingJSX = (<Text style={{...styles.status, backgroundColor: 'red'}}>Chưa trả</Text>);
    const returnedJSX = (<Text style={{...styles.status, backgroundColor: '#1e96ff'}}>Đã trả</Text>);
    const registerBorrowJSX = (<Text style={{...styles.status, backgroundColor: '#888'}}>Đăng ký mượn</Text>);

    const borrowStatusJSX = data.Status == 1 ? returnedJSX : (data.Status == 0 ? borrowingJSX : registerBorrowJSX);

    return (
        <TouchableOpacity
            activeOpacity={0.9}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: global.url + data.BookImage }} style={styles.image} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{data.BookTitle}</Text>
                    {borrowStatusJSX}
                    <Text style={styles.description}>Nhân viên: {data.StaffName}</Text>
                    <Text style={styles.description}>{data.Status == -1 ? 'Ngày đăng ký: ' : 'Ngày mượn: '} {data.BorrowDate}</Text>
                    {returnDateJSX}
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
        marginTop: 0,
        flexDirection: 'row',
    },
    imageContainer: {
        backgroundColor: '#e4e4e4',
        width: 80,
        height: 126,
        margin: 12,
        marginRight: 0,
        alignItems: 'stretch',
        elevation: 10,
        borderColor: '#000',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9
    },
    image: {
        flex: 1,
        borderRadius: 10
    },
    info: {
        margin: 0,
        flex: 1,
        justifyContent: 'space-around',
        padding: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: color.blue
    },
    status: {
        color: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        borderRadius: 2,
        paddingVertical: 2,
        fontSize: 10
    },
    description: {
        fontSize: 14,
        color: '#555'
    }
})