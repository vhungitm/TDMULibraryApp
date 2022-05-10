import * as React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home/Home'
import Category from './Book/Category/Category'
import Book from './Book/Book'
import User from './User/User'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import color from '../setting/color'

const Tab = createBottomTabNavigator()

export default function Main() {
	const tabBarOptions = {
		activeTintColor: color.primary,
		inactiveTintColor: 'black'
	}

	const setScreenOptions = (title, iconName) => {
		return {
			tabBarLabel: title,
			tabBarIcon: ({ color }) => (
				<Icon name={iconName} color={color} size={18} />
			),
			activeTintColor: 'red',
			inactiveTintColor: '#999'
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Tab.Navigator tabBarOptions={tabBarOptions}>
				<Tab.Screen
					name='Home'
					component={Home}
					options={setScreenOptions('Trang chủ', 'home')}
				/>
				<Tab.Screen
					name='Category'
					component={Category}
					options={setScreenOptions('Thể loại sách', 'list')}
				/>
				<Tab.Screen
					name='Book'
					component={Book}
					options={setScreenOptions('Sách', 'grid')}
				/>
				<Tab.Screen
					name='User'
					component={User}
					options={setScreenOptions('Tài khoản', 'user')}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1
	}
})
