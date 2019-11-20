import React from 'react';
import Colors from '../constants/Colors';
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const SuccessButton = props => {
  return (
    <TouchableNativeFeedback style={{flex: 1}} onPress={props.onPress}>
      <View
        style={{
          height: 32,
          ...props.style,
          backgroundColor: Colors.successColor,
          padding: 10,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'auto',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          {props.children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default SuccessButton;
