import React from 'react';
import Colors from '../constants/Colors';
import Text from './Text';
import {View, TouchableOpacity} from 'react-native';

const ButtonBadge = props => {
  return (
    <View
      style={{
        margin: 2,
        borderRadius: 25,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
      }}>
      <TouchableOpacity onPress={props.onPressItem}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            padding: 5,
            borderRightColor: 'rgba(0,0,0,0.5)',
            borderRightWidth: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            {props.children}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={props.onPressButton}>
        <View
          style={{
            backgroundColor: Colors.primaryColor,
            padding: 5,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 12}}>x</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBadge;
