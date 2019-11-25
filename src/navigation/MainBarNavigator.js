import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import SearchStackNavigator from './SearchStackNavigator';
import FavoriteStackNavigator from './FavoriteStackNavigator';
import HistoryStackNavigator from './HistoryStackNavigation';
import SearchQueryStackNavigator from './SearchQueryStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const MainBarNavigator = createMaterialBottomTabNavigator(
  {
    SearchStackNavigator: {
      screen: SearchStackNavigator,
      navigationOptions: {
        title: 'Search (ID)',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        ),
      },
    },
    SearchQueryStackNavigator: {
      screen: SearchQueryStackNavigator,
      navigationOptions: {
        title: 'Search (Keyword)',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-search" color={tintColor} size={24} />
        ),
      },
    },
    FavoriteStackNavigator: {
      screen: FavoriteStackNavigator,
      navigationOptions: {
        title: 'Favorite',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-heart" color={tintColor} size={24} />
        ),
      },
    },
    HistoryStackNavigator: {
      screen: HistoryStackNavigator,
      navigationOptions: {
        title: 'History',
        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-time" color={tintColor} size={24} />
        ),
      },
    },
  },
  {
    shifting: true,
    sceneAnimationEnabled: false,
    barStyle: {
      backgroundColor: Colors.primaryColor,
    },
  },
);

export default MainBarNavigator;
