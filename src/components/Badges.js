import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import Colors from '../constants/Colors';
import Badge from './Badge';
import Line from './Line';

const Badges = props => {
  return (
    <View>
      {props.data && (
        <>
          <Text style={{fontWeight: 'bold', fontSize: 14}}>{props.name}</Text>
          <View style={styles.badgeContainer}>
            {props.data.map((badge, index) => (
              <Badge key={index}>{badge.name}</Badge>
            ))}
          </View>
          <Line />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  badge: {
    backgroundColor: Colors.primaryColor,
    margin: 2,
    padding: 5,
    borderRadius: 25,
  },
});

export default Badges;
