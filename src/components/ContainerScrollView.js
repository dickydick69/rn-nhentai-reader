import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import Colors from '../constants/Colors';

const ContainerScrollView = props => {
  return (
    <ScrollView
      {...props}
      style={{
        ...props.style,
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        padding: 5,
      }}
      contentContainerStyle={{flexGrow: 1}}>
      {props.children}
    </ScrollView>
  );
};

export default ContainerScrollView;
