import React from 'react';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native';

const FloatingReset = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 100,
        zIndex: 1,
      }}
      onPress={props.onPress}>
      <Icon name="ios-refresh" size={24} color={'white'} />
    </TouchableOpacity>
  );
};

export default FloatingReset;
