import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const Input = props => {
  return (
    <TextInput
      {...props}
      style={{...styles.input, ...props.style}}
      placeholderTextColor={'#6e6e6e'}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 2,
    color: 'white',
    paddingVertical: 2,
  },
});

export default Input;
