import React from 'react';
import {View} from 'react-native';
import Colors from '../constants/Colors';

const ContainerView = props => {
  return (
    <View
      {...props}
      style={{
        ...props.style,
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        padding: 5,
      }}
      contentContainerStyle={{flexGrow: 1}}>
      {props.children}
    </View>
  );
};

export default ContainerView;
