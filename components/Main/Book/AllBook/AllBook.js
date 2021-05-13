import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BookItem from '../Item/BookItem/BookItem';
import global from '../../../global';
import Axios from 'axios';

export default function AllBook({ navigation }) {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        Axios.get(global.urlBook)
            .then(res => {
                let data = res.data.data;
                setBooks(data);
            })
            .catch(error => console.log(error))
    }, [])

    const goToSearch = () => {
        navigation.navigate('BookSearch')
    }

    const header = (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Sách</Text>
            <TouchableOpacity
                style={styles.headerButton}
                onPress={goToSearch}
            >
                <MaterialCommunityIcons
                    style={styles.headerButtonIcon}
                    name="magnify"
                    size={30}
                />
            </TouchableOpacity>
        </View>
    )

    return (
        <View style={styles.container}>
            {header}
            <FlatList
                contentContainerStyle={styles.flatList}
                keyExtractor={item => item.Id.toString()}
                showsVerticalScrollIndicator={false}
                data={books}
                renderItem={({ item }) => <BookItem data={item} navigation={navigation} />}
                horizontal={false}
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
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    flatList: {
        paddingTop: 10
    }
})