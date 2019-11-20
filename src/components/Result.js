import React, {useState} from 'react';
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import Colors from '../constants/Colors';
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, deleteFavorite} from '../store/actions/favoriteAction';
import Text from './Text';
import SuccessButton from './SuccessButton';
import Icon from 'react-native-vector-icons/Ionicons';
import PrimaryButton from './PrimaryButton';
import Badges from './Badges';

const Result = props => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite.books);
  const settings = useSelector(state => state.settings);

  const [slideAnimationModal, setSlideAnimationModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [arrowOpacity] = useState(new Animated.Value(1));

  const {book} = props;

  const animateArrow = () => {
    Animated.timing(arrowOpacity, {
      toValue: 1,
      duration: 1,
    }).start(() => {
      Animated.timing(arrowOpacity, {
        toValue: 0,
        duration: 2000,
      }).start();
    });
  };

  const openReaderModal = () => {
    animateArrow();
    if (currentPage === book.images.pages.length) {
      setCurrentPage(1);
    }
    setSlideAnimationModal(true);
  };

  const prevPage = () => {
    animateArrow();
    if (currentPage === 1) {
      setCurrentPage(book.images.pages.length);
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    animateArrow();
    if (currentPage === book.images.pages.length) {
      setSlideAnimationModal(false);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const onAddToFavorite = () => {
    dispatch(addFavorite(book));
  };

  const onDeleteFavorite = () => {
    Alert.alert('Delet dis', `Delete ${book.title.pretty} from favorites ?`, [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => dispatch(deleteFavorite(book.id))},
    ]);
  };

  const favoriteButton = () => {
    const isExists = favorites.find(fav => fav.id === book.id);
    if (isExists) {
      return (
        <PrimaryButton onPress={onDeleteFavorite}>
          {' '}
          <Icon name="ios-close" color={'white'} size={14} /> Remove From
          Favorite
        </PrimaryButton>
      );
    }
    return (
      <PrimaryButton onPress={onAddToFavorite}>
        {' '}
        <Icon name="ios-heart" color={'white'} /> Add To Favorite
      </PrimaryButton>
    );
  };

  return (
    <>
      <Modal
        onDismiss={() => setSlideAnimationModal(false)}
        onTouchOutside={() => setSlideAnimationModal(false)}
        visible={slideAnimationModal}
        width={0.95}
        onHardwareBackPress={() => {
          setSlideAnimationModal(false);
          return true;
        }}
        modalTitle={
          <ModalTitle
            title={`${currentPage} of ${book.images.pages.length}`}
            textStyle={{color: 'white'}}
            hasTitleBar={false}
          />
        }
        modalStyle={{backgroundColor: Colors.backgroundColor}}
        modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
        <ModalContent>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.8,
                width: Dimensions.get('window').width * 0.9,
                position: 'absolute',
                zIndex: 1,
              }}>
              <Animated.View
                style={[
                  {
                    flexDirection: 'row',
                    flex: 1,
                  },
                  {
                    opacity: arrowOpacity,
                  },
                ]}>
                <TouchableWithoutFeedback onPress={prevPage}>
                  <View
                    style={{
                      backgroundColor: 'rgba(255,255,255,0)',
                      width: '50%',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="ios-arrow-dropleft"
                      color={'rgba(255,255,255,0.5)'}
                      size={72}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={nextPage}>
                  <View
                    style={{
                      backgroundColor: 'rgba(255,255,255,0)',
                      width: '50%',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name="ios-arrow-dropright"
                      color={'rgba(255,255,255,0.5)'}
                      size={72}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>
            <FastImage
              source={
                settings.sfw
                  ? require('../assets/sfw.jpg')
                  : {
                      uri: book.images.pages[currentPage - 1].link,
                      priority: FastImage.priority.normal,
                    }
              }
              style={{
                height: Dimensions.get('window').height * 0.8,
                width: Dimensions.get('window').width * 0.9,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </ModalContent>
      </Modal>

      <View style={styles.imageContainer}>
        <Image
          source={
            settings.sfw
              ? require('../assets/sfw.jpg')
              : {
                  uri: book.images && book.images.cover.link,
                }
          }
          resizeMode={'contain'}
          style={{height: 250, width: 150}}
        />
      </View>
      <View>
        <Text numberOfLines={4}>{book.title && book.title.english}</Text>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '49%'}}>
            <SuccessButton onPress={openReaderModal}>
              {' '}
              <Icon name="ios-book" color={'white'} /> Read
            </SuccessButton>
          </View>
          <View style={{width: '49%'}}>{favoriteButton()}</View>
        </View>
      </View>
      <Badges name="Tags" data={book.tags} />
      <Badges name="Categories" data={book.category} />
      <Badges name="Artist" data={book.artist} />
      <Badges name="Parody" data={book.parody} />
      <Badges name="Character" data={book.character} />
      <Badges name="Language" data={book.language} />
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 72,
  },
  imageContainer: {
    alignItems: 'center',
  },
});

export default Result;
