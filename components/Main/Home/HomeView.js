import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import BookHotItem from '../Book/Item/BookItem/BookHotItem';
import BookItem from '../Book/Item/BookItem/BookItem';
import logo from '../../../assets/logo_tdmu.png';
import global from '../../global';
import Axios from 'axios';

export default function HomeView({ navigation }) {
    const [hotBooks, setHotBooks] = useState([]);
    useEffect(() => {
        Axios.get(global.urlTopBook)
            .then((res) => {
                setHotBooks(res.data.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const [newBooks, setNewBooks] = useState([]);
    useEffect(() => {
        Axios.get(global.urlNewBook)
            .then((res) => {
                setNewBooks(res.data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const [banners, setBanners] = useState([]);
    useEffect(() => {
        Axios.get(global.urlBanner)
            .then((res) => {
                setBanners(res.data.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const goToSearch = () => {
        navigation.navigate('BookSearch')
    }

    const header = (
        <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.headerTitle}>Thư Viện TDMU</Text>
            </View>
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

    const getBanners = () => {
        return (
            <View style={{ width: width - 20, borderRadius: 10, margin: 10 }}>
                <SwiperFlatList
                    paginationStyleItem={{ width: 5, height: 5 }}
                    paginationDefaultColor="#efefef"
                    paginationActiveColor="#1e96ff"
                    autoplay
                    autoplayDelay={5}
                    autoplayLoop
                    index={0}
                    showPagination
                    data={banners}
                    renderItem={({ item }) => (
                        <Image source={{ uri: global.url + item.Image }} style={{ borderRadius: 10, width: width - 20, height: (width - 20) / 2 }} />
                    )}
                />
            </View>
        )
    }

    const getTopHot = () => {
        return (
            <View>
                {getBanners()}
                <Text style={styles.categoryTitle}>Top Hot</Text>
                <FlatList
                    contentContainerStyle={{ paddingLeft: 10 }}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    keyExtractor={item => item.Id.toString()}
                    data={hotBooks}
                    renderItem={({ item }) => <BookHotItem id={item.Id} navigation={navigation} />} />
                <Text style={styles.categoryTitle}>Sách Mới</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            {header}
            <FlatList
                horizontal={false}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={getTopHot}
                keyExtractor={item => item.Id.toString()}
                data={newBooks}
                renderItem={({ item }) => <BookItem data={item} navigation={navigation} />}
                horizontal={false}
            />
        </View>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: '#fff',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2
    },
    logo: {
        marginTop: 5,
        width: 40,
        height: 40,
    },
    headerTitle: {
        fontSize: 20,
        margin: 10,
        fontWeight: 'bold',
        color: '#000'
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryTitle: {
        margin: 10,
        fontSize: 18
    },
    headerButton: {
        backgroundColor: '#e4e4e4',
        borderRadius: 40
    },
    headerButtonIcon: {
        backgroundColor: '#e4e4e4',
        paddingLeft: 5,
        paddingTop: 5,
        width: 40,
        height: 40,
        borderRadius: 40
    },
})