import React from 'react';
import Colors from '../constants/Colors';
import Text from './Text';
import {View} from 'react-native';

const Badge = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.primaryColor,
        margin: 2,
        padding: 5,
        borderRadius: 25,
        alignSelf: 'flex-start',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 12}}>{props.children}</Text>
    </View>
  );
};

export default Badge;
