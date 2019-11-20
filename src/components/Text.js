import React from 'react';
import {View, Text} from 'react-native';
const CustomText = props => {
  return (
    <Text {...props} style={{fontSize: 20, ...props.style, color: 'white'}} >
      {props.children}
    </Text>
  );
};
export default CustomText;
