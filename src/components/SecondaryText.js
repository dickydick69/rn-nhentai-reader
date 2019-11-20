import React from 'react';
import {Text} from 'react-native';
const SecondaryText = props => {
  return (
    <Text {...props} style={{fontSize: 20, ...props.style, color: '#727272'}}>
      {props.children}
    </Text>
  );
};
export default SecondaryText;
