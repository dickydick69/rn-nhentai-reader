import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Search from '../screens/Search';
import Colors from '../constants/Colors';

const SearchStackNavigator = createStackNavigator(
  {
    Search: {
      screen: Search,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primaryColor,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
    },
  },
);

export default SearchStackNavigator;
