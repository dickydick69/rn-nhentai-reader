import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  addKeyword,
  deleteKeyword,
  addHistory,
} from '../store/actions/historyAction';
import {
  ContainerView,
  Text,
  Input,
  PrimaryButton,
  HamburgerButton,
  TouchableCard,
  StatusBlock,
  ButtonBadge,
  SecondaryText,
  FloatingReset,
  Badge,
} from '../components/Core';
import Search from './Search';
import Icon from 'react-native-vector-icons/Ionicons';
import NHentaiGrabber from '../libraries/NHentaiGrabber';
import Colors from '../constants/Colors';
import {add, set, sub} from 'react-native-reanimated';

const LOADING = 'LOADING';
const NOTHING = 'NOTHING';
const FAILED = 'FAILED';
const SUCCESS = 'SUCCESS';

const ComponentSwitcher = props => {
  const settings = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const onPress = item => {
    props.navigation.navigate('DoujinSearch', {
      book: item,
    });
    dispatch(addHistory(item));
  };

  const Results = (
    <View style={{flex: 1}}>
      <FlatList
        data={props.result}
        renderItem={({item}) => (
          <TouchableCard onPress={() => onPress(item)}>
            <View style={{flexDirection: 'row'}}>
              <View style={{paddingRight: 10}}>
                <FastImage
                  source={
                    settings.sfw
                      ? require('../assets/sfw.jpg')
                      : {
                          uri: item.images.cover.link,
                        }
                  }
                  style={{width: 100, height: 100}}
                  resizeMode={'contain'}
                />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{fontSize: 14, flexWrap: 'wrap'}}
                  numberOfLines={2}>
                  {item.title.pretty}
                </Text>
                <SecondaryText style={{fontSize: 10}}>{item.id}</SecondaryText>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {item.language.map(lang => (
                    <Badge key={lang.id}>{lang.name}</Badge>
                  ))}
                </View>
              </View>
            </View>
          </TouchableCard>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

  switch (props.status) {
    case FAILED:
      return (
        <StatusBlock
          name={'ios-close-circle'}
          color={Colors.primaryColor}
          message={'Error!'}
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
      return Results;
    default:
      return (
        <StatusBlock
          name={'ios-search'}
          color={Colors.blue}
          message={'Try to search something up there!'}
        />
      );
  }
};

const SearchQuery = props => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [status, setStatus] = useState(NOTHING);

  const keywordsHistory = useSelector(state => state.history.keywords);
  const dispatch = useDispatch();

  const onPressBadgeItem = async word => {
    await setQuery(word);
  };

  const onPressDelete = async word => {
    await dispatch(deleteKeyword(word));
  };

  const prevPage = () => {
    if (currentPage === 1) {
      return;
    }
    const page = currentPage - 1;
    setCurrentPage(page);
    submit(page);
  };

  const nextPage = () => {
    if (currentPage === numPages) {
      return;
    }
    const page = currentPage + 1;
    setCurrentPage(page);
    submit(page);
  };

  const submit = async (page = 1) => {
    setStatus(LOADING);
    try {
      const grabber = new NHentaiGrabber();
      const data = await grabber.search(query, page);
      setResult(data.result);
      setNumPages(parseInt(data.num_pages));
      dispatch(addKeyword(query));
      setStatus(SUCCESS);
    } catch (e) {
      console.log(e);
      setStatus(FAILED);
    }
  };

  const onSubmit = async (page = 1) => {
    if (query.length < 1) {
      return;
    }
    setCurrentPage(1);
    try {
      await submit();
    } catch (e) {
      console.log(e);
    }
  };

  const onReset = () => {
    setQuery('');
    setResult([]);
    setStatus(NOTHING);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <ContainerView>
        <FloatingReset onPress={onReset} />
        <View style={styles.inputContainer}>
          <View style={{width: '80%', paddingRight: 10}}>
            <Input
              style={{height: 32}}
              value={query}
              onChangeText={val => setQuery(val)}
              placeholder={'Search Something....'}
            />
          </View>
          <View style={{width: '20%'}}>
            <PrimaryButton onPress={onSubmit}>
              <Icon name="ios-search" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {keywordsHistory.map(word => (
            <ButtonBadge
              key={word}
              onPressItem={() => onPressBadgeItem(word)}
              onPressButton={() => onPressDelete(word)}>
              {word}
            </ButtonBadge>
          ))}
        </View>
        <ComponentSwitcher
          status={status}
          result={result}
          navigation={props.navigation}
        />
        {status === SUCCESS && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <PrimaryButton onPress={prevPage} style={{marginHorizontal: 10}}>
              Prev
            </PrimaryButton>
            <Text>
              {currentPage} of {numPages}
            </Text>
            <PrimaryButton onPress={nextPage} style={{marginHorizontal: 10}}>
              Next
            </PrimaryButton>
          </View>
        )}
      </ContainerView>
    </TouchableWithoutFeedback>
  );
};

SearchQuery.navigationOptions = navData => ({
  title: 'Search (By Keyword)',
  headerLeft: <HamburgerButton navigation={navData} />,
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SearchQuery;
