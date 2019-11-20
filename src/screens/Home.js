import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Alert,
  ToastAndroid,
} from 'react-native';
import HamburgerButton from '../components/HamburgerButton';
import Colors from '../constants/Colors';
import PrimaryButton from '../components/PrimaryButton';
import ListCard from '../components/ListCard';
import Icon from 'react-native-vector-icons/Ionicons';
import List from '../models/List';

const Home = props => {
  const [input, setInput] = useState('');
  const [lists, setLists] = useState([]);

  const onChange = text => {
    setInput(text);
  };

  const onSubmit = () => {
    if (input.length < 1) {
      Alert.alert('Type something!', '......????');
      return;
    }
    setLists([...lists, new List(input)]);
    setInput('');
  };

  const onDelete = id => {
    const name = lists.find(list => list.id === id).name;
    ToastAndroid.showWithGravity(
      `${name} Deleted!`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    setLists(ls => {
      return ls.filter(l => l.id !== id);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '70%', paddingRight: 10}}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.primaryColor,
                height: 32,
                paddingVertical: 0,
                color: 'white',
              }}
              placeholder="Just Insert Sumthin'"
              onChangeText={onChange}
              value={input}
            />
          </View>

          <View style={{width: '30%'}}>
            <PrimaryButton onPress={onSubmit}>Test</PrimaryButton>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <FlatList
            data={lists}
            renderItem={({item}) => (
              <ListCard item={item} onDelete={onDelete} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    padding: 10,
  },
});

Home.navigationOptions = navData => ({
  headerLeft: <HamburgerButton navigation={navData} />,
});

export default Home;
