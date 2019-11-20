import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from './Core';

const NothingsHere = props => {
  return (
    <View style={styles.container}>
      <Text>¯\_(ツ)_/¯</Text>
      <Text>Nothing to see here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default NothingsHere;
