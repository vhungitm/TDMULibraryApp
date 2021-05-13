import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const InforItem = ({ iconName, title, value }) => {
    return (
        <View style={styles.inforItem}>
            <Icon
                name={iconName}
                color="black"
                size={18}
            />
            <Text style={styles.inforTitle}>{title} </Text>
            <Text style={styles.inforValue}>{value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inforItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 5
    },
    inforTitle: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10
    },
    inforValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold'
    },
})

export default InforItem;