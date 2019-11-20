import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../constants/Colors';
import History from '../screens/History';
import Doujin from '../screens/Doujin';

const HistoryStackNavigator = createStackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        title: 'History',
      },
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

export default HistoryStackNavigator;
