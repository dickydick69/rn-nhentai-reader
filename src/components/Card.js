import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Card = props => {
  return <View style={{...styles.container}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    padding: 5,
    margin: 5,
  },
});

export default Card;
