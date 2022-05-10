import React from 'react'
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import About from './components/About/About'
import BookDetail from './components/Main/Book/BookDetail/BookDetail'
import { Provider } from 'react-redux'
import store from './app/store'

const Stack = createStackNavigator()

const App = () => {
	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<NavigationContainer>
					<Stack.Navigator headerMode='false'>
						<Stack.Screen name='Login' component={Login} />
						<Stack.Screen name='Main' component={Main} />
						<Stack.Screen name='BookDetail' component={BookDetail} />
						<Stack.Screen name='About' component={About} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
	}
})

export default App
