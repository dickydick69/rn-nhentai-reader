import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ReactWelcome from '../screens/ReactWelcome';
import MainBarNavigator from './MainBarNavigator';
import Colors from '../constants/Colors';
import SettingStackNavigator from './SettingStackNavigator';
import AboutStackNavigator from './AboutStackNavigator';

const DrawerNavigation = createDrawerNavigator(
  {
    MainBarNavigator: {
      screen: MainBarNavigator,
      navigationOptions: {
        title: 'Main',
      },
    },
    Settings: {
      screen: SettingStackNavigator,
      navigationOptions: {
        title: 'Settings',
      },
    },
    About: {
      screen: AboutStackNavigator,
    },
  },
  {
    drawerBackgroundColor: Colors.backgroundColor,
    contentOptions: {
      activeTintColor: Colors.primaryColor,
      inactiveTintColor: 'white',
    },
  },
);

export default DrawerNavigation;
