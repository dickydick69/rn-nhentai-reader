import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import {View} from 'react-native';

const StatusBlock = props => {
  return (
    <View
      style={{
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Icon name={props.name} size={72} color={props.color} />
      <Text style={{textAlign: 'center'}}>{props.message}</Text>
    </View>
  );
};

export default StatusBlock;
