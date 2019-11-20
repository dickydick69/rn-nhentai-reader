import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Settings from '../screens/Settings';
import Colors from '../constants/Colors';

const SettingStackNavigator = createStackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
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

export default SettingStackNavigator;
