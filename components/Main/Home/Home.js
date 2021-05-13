import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from './HomeView';
import BookSearch from '../Book/Search/Book/BookSearch';

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomeView" component={HomeView} />
      <Stack.Screen name="BookSearch" component={BookSearch} />
    </Stack.Navigator>
  );
}