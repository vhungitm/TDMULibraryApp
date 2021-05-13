import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import color from '../../../setting/color';
import HTML from "react-native-render-html";
import Header from './Header';
import Infor from './Infor';

export default function BookDetail({ navigation, route }) {
    const { data } = route.params;
    const [isDesc, setIsDesc] = useState(false);

    const descJSX = (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <HTML html={data.Description == null ? 'Không có mô tả' : data.Description} />
        </ScrollView>
    );

    const infor = isDesc ? descJSX : <Infor data={data} />;
    const descStyle = isDesc ? styles.inforHeaderItemActive : styles.inforHeaderItem;
    const inforStyle = isDesc ? styles.inforHeaderItem : styles.inforHeaderItemActive;

    return (
        <SafeAreaView style={styles.container}>
            <Header data={data} navigation={navigation}/>
            <View style={styles.body}>
                <View style={styles.inforHeader}>
                    <TouchableOpacity onPress={() => setIsDesc(false)}>
                        <Text style={inforStyle}>Thông Tin Sách</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsDesc(true)}>
                        <Text style={descStyle}>Mô tả</Text>
                    </TouchableOpacity>
                </View>
                {infor}
            </View>
        </SafeAreaView>
    )
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    body: {
        marginTop: 20,
        borderTopWidth: 0.5,
        borderTopColor: '#e4e4e4',
        marginHorizontal: 15,
        paddingVertical: 10,
        flex: 1
    },
    inforHeader: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    inforHeaderItemActive: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        color: '#fff',
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        backgroundColor: color.primary
    },
    inforHeaderItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start',
        color: '#333',
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
        backgroundColor: '#e4e4e4',

    }
})