import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserView from './UserView';
import BorrowHistory from '../Book/Borrow/BorrowHistory';

const Stack = createStackNavigator();

export default function User() {
    return (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="UserView" component={UserView} />
            <Stack.Screen name="BorrowHistory" component={BorrowHistory} />
          </Stack.Navigator>
      );
}