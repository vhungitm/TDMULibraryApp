import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import CategoryItem from '../Item/CategoryItem/CategoryItem';
import global from '../../../global';
import Axios from 'axios';

export default function Category({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get(global.urlCategory)
            .then(res => setData(res.data.data))
            .catch(error => console.log(error))
    }, []);

    const header = (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Thể Loại Sách</Text>
        </View>
    )

    return (
        <View style={styles.container}>
            {header}
            <FlatList
                contentContainerStyle={styles.flatList}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.Id.toString()}
                data={data}
                renderItem={({ item }) => <CategoryItem data={item} navigation={navigation} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
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
})