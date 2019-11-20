import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const TouchableCard = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...styles.container}}>{props.children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    padding: 5,
    margin: 5,
  },
});

export default TouchableCard;
