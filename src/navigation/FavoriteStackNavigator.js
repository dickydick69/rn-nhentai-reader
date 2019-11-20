import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Favorites from '../screens/Favorites';
import Colors from '../constants/Colors';
import Doujin from '../screens/Doujin';

const FavoriteStackNavigator = createStackNavigator(
  {
    Favorites: {
      screen: Favorites,
    },
    Doujin: {
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

export default FavoriteStackNavigator;
