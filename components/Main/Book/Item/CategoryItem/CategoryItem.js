import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import global from '../../../../global';

export default function CategoryItem({ data, navigation }) {
    const gotoCategoryBook = () => {
        navigation.navigate('BookCategory', {data: data});
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={gotoCategoryBook}
        >
            <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: global.url + data.Image }} style={styles.image} />
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{data.Name}</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 10,
        marginTop: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageContainer: {
        width: 20,
        height: 25,
        margin: 12,
        marginRight: 0,
        backgroundColor: '#e4e4e4',
        alignItems: 'stretch',
        elevation: 5,
        borderColor: '#000',
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.9
    },
    image: {
        flex: 1,
        borderRadius: 2
    },
    info: {
        margin: 0,
        flex: 1,
        padding: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#002EB8'
    },
    hot: {
        backgroundColor: 'red',
        color: 'white',
        alignSelf: 'flex-start',
        paddingHorizontal: 5,
        fontSize: 10
    },
    description: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20
    }
})