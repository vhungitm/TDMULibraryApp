import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import BookItem from '../../Item/BookItem/BookItem';
import global from '../../../../global';

const axios = require('axios');

export default function BookSearch({ navigation }) {
    const [data, setData] = useState([]);
    const axios = require('axios');

    const goBack = () => {
        navigation.goBack()
    }

    const header = (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.back}
                onPress={goBack}
            >
                <MaterialCommunityIcons
                    style={styles.backIcon}
                    name="keyboard-backspace"
                    size={30}
                />
            </TouchableOpacity>
            <TextInput style={styles.inputValue}
                placeholder="Nhập từ khóa tìm kiếm"
                autoFocus={true}
                onChangeText={text => {
                    if (text != '')
                        axios.get(global.urlBookSearch + text)
                            .then((response) => setData(response.data.data))
                            .catch(error => console.log(error))
                    else
                        setData([])
                }}
            />
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {header}
            <FlatList
                contentContainerStyle={styles.flatList}
                keyExtractor={item => item.Id.toString()}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => <BookItem data={item} navigation={navigation} />}
                horizontal={false}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        height: 60,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    back: {
        backgroundColor: '#e4e4e4',
        borderRadius: 40
    },
    backIcon: {
        backgroundColor: '#fff',
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
    input: {
        padding: 5,
        flexDirection: 'row'
    },
    inputValue: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        fontSize: 18,
        flex: 1,
        backgroundColor: '#f4f4f4',
        marginLeft: 5,
        borderRadius: 20
    },
    flatList: {
        paddingTop: 10
    }
})