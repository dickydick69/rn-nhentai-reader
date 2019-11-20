// eslint-disable-next-line no-unused-vars
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import SearchQuery from '../screens/SearchQuery';
import Doujin from '../screens/Doujin';
import Colors from '../constants/Colors';

const SearchQueryStackNavigator = createStackNavigator(
  {
    SearchQuery: {
      screen: SearchQuery,
    },
    DoujinSearch: {
      screen: Doujin,
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

export default SearchQueryStackNavigator;
