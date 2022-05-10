import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AllBook from './AllBook/AllBook'
import BookSearch from './Search/Book/BookSearch'

const Stack = createStackNavigator()

export default function Book() {
	return (
		<Stack.Navigator headerMode='none'>
			<Stack.Screen name='AllBook' component={AllBook} />
			<Stack.Screen name='BookSearch' component={BookSearch} />
		</Stack.Navigator>
	)
}
