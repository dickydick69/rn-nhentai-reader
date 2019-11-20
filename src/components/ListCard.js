import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../constants/Colors';
import PrimaryButton from './PrimaryButton';
import Icon from 'react-native-vector-icons/Ionicons';

const ListCard = props => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
      }}>
      <View style={{paddingRight: 5}}>
        <Text style={{color: 'white'}}>{props.item.name}</Text>
      </View>
      <View>
        <PrimaryButton onPress={() => props.onDelete(props.item.id)}>
          <Icon name="ios-trash" size={24} />
        </PrimaryButton>
      </View>
    </View>
  );
};

export default ListCard;
