import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BorrowItem from '../Item/BorrowItem/BorrowItem';
import global from '../../../global';
import Axios from 'axios';
import { connect } from 'react-redux';

const BorrowHistory = ({ navigation, user }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let mounted = true;

        const loadData = () => {
            var link = global.urlBorrow + user.Id;

            Axios.get(link)
                .then(res => { if (mounted) { setData(res.data.data) } })
                .catch(error => console.log(error))
        }

        loadData();

        return () => { mounted = false }
    });

    const goBack = () => {
        navigation.goBack()
    }

    const header = (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={goBack}
            >
                <MaterialCommunityIcons
                    style={styles.headerButton}
                    name="keyboard-backspace"
                    size={30}
                />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Lịch Sử Mượn</Text>
            <View style={{ width: 40 }} />
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
                renderItem={({ item }) => <BorrowItem data={item} navigation={navigation} />}
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
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    flatList: {
        paddingTop: 10
    }
})

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(BorrowHistory);