import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryView from './CategoryView';
import BookDetail from '../BookDetail/BookDetail';
import BookCategory from './BookCategory';

const Stack = createStackNavigator();

export default function Category() {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="CategoryView" component={CategoryView} />
        <Stack.Screen name="BookCategory" component={BookCategory} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
      </Stack.Navigator>
  );
}