import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import About from '../screens/About';
import Colors from '../constants/Colors';

const AboutStackNavigator = createStackNavigator(
  {
    About: {
      screen: About,
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

export default AboutStackNavigator;
