import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Colors from '../constants/Colors';
import Home from '../screens/Home';

const HomeStackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Home',
      },
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

export default HomeStackNavigator;
