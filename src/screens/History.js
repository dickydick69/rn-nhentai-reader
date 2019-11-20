import React from 'react';
import {View, StyleSheet, FlatList, Image, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteHistory} from '../store/actions/historyAction';
import {
  ContainerView,
  Text,
  SecondaryText,
  PrimaryButton,
  SuccessButton,
  TouchableCard,
  HamburgerButton,
  NothingsHere,
} from '../components/Core';
import Icon from 'react-native-vector-icons/Ionicons';

const HistoryCard = props => {
  const {book, navigation} = props;
  const settings = useSelector(state => state.settings);
  const onDelete = () => {
    Alert.alert('Delet dis', `Delete ${book.title.pretty} ?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => props.onDelete(book.id)},
    ]);
  };
  return (
    <TouchableCard
      onPress={() =>
        navigation.navigate('Doujin', {
          book,
        })
      }>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <Image
            source={
              settings.sfw
                ? require('../assets/sfw.jpg')
                : {uri: book.images.cover.link}
            }
            style={{width: 100, height: 100}}
            resizeMode={'contain'}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 14, flexWrap: 'wrap'}} numberOfLines={2}>
            {book.title.pretty}
          </Text>
          <SecondaryText style={{fontSize: 10}}>{book.id}</SecondaryText>
          <PrimaryButton onPress={onDelete}>Delete</PrimaryButton>
        </View>
      </View>
    </TouchableCard>
  );
};

const History = props => {
  const books = useSelector(state => state.history.books);
  const dispatch = useDispatch();
  const onDelete = id => {
    dispatch(deleteHistory(id));
  };
  const isEmpty = () => {
    return books.length < 1;
  };
  return (
    <ContainerView>
      {isEmpty() ? (
        <NothingsHere />
      ) : (
        <FlatList
          data={books}
          renderItem={({item}) => (
            <HistoryCard
              navigation={props.navigation}
              book={item}
              onDelete={onDelete}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </ContainerView>
  );
};

History.navigationOptions = navData => ({
  headerLeft: <HamburgerButton navigation={navData} />,
});

export default History;
