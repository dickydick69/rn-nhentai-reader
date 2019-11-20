import React from 'react';
import Colors from '../constants/Colors';
import {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
} from 'react-native';

const PrimaryButton = props => {
  return (
    <TouchableNativeFeedback style={{flex: 1}} onPress={props.onPress}>
      <View
        style={{
          height: 32,
          ...props.style,
          backgroundColor: Colors.primaryColor,
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

{
  /*<TouchableOpacity
    style={{
        height: 32,
        ...props.style,
        backgroundColor: Colors.primaryColor,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'auto',
    }}
    onPress={props.onPress}>
    <Text style={{color: 'white', fontWeight: 'bold'}}>{props.children}</Text>
</TouchableOpacity>*/
}

export default PrimaryButton;
