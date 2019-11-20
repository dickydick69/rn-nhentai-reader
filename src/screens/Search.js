import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {searchID, emptyBook} from '../store/actions/bookAction';
import {
  ContainerView,
  ContainerScrollView,
  Result,
  StatusBlock,
  FloatingReset,
  Input,
  PrimaryButton,
  HamburgerButton,
} from '../components/Core';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const LOADING = 'LOADING';
const NOTHING = 'NOTHING';
const FAILED = 'FAILED';
const SUCCESS = 'SUCCESS';

const ComponentSwitcher = props => {
  switch (props.status) {
    case FAILED:
      return (
        <StatusBlock
          name={'ios-close-circle'}
          color={Colors.primaryColor}
          message={'Error. ID not found or the connection is shitty!'}
        />
      );
    case LOADING:
      return (
        <StatusBlock
          name={'ios-hourglass'}
          color={Colors.blue}
          message={'Loading....'}
        />
      );
    case SUCCESS:
      return <Result book={props.book} />;
    default:
      return (
        <StatusBlock
          name={'ios-search'}
          color={Colors.blue}
          message={'Try to search a nuclear ID up there!'}
        />
      );
  }
};

const Search = props => {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState(NOTHING);

  const dispatch = useDispatch();
  const book = useSelector(state => state.books.book);

  const onChangeCode = code => {
    setCode(code);
  };

  const onSubmit = async () => {
    if (code.length < 1) {
      return;
    }
    setStatus(LOADING);
    try {
      await dispatch(searchID(code));
      setStatus(SUCCESS);
    } catch (e) {
      setStatus(FAILED);
    }
  };

  const onReset = () => {
    dispatch(emptyBook());
    setStatus(NOTHING);
    setCode('');
  };

  return (
    <View style={{flex: 1}}>
      <FloatingReset onPress={onReset} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContainerScrollView>
          <View style={styles.inputContainer}>
            <View style={{width: '70%', paddingRight: 5}}>
              <Input
                placeholder="ID"
                onChangeText={onChangeCode}
                value={code}
                maxLength={6}
                keyboardType={'numeric'}
                style={{height: '100%', fontSize: 48}}
              />
            </View>
            <View style={{width: '30%'}}>
              <PrimaryButton style={{height: '100%'}} onPress={onSubmit}>
                <Icon name="ios-search" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
          <ComponentSwitcher status={status} book={book} />
        </ContainerScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
};

Search.navigationOptions = navData => ({
  title: 'Search (ID)',
  headerLeft: <HamburgerButton navigation={navData} />,
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 72,
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export default Search;
