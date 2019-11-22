import React, {useState} from 'react';
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  Alert,
  Animated,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, deleteFavorite} from '../store/actions/favoriteAction';
import Icon from 'react-native-vector-icons/Ionicons';
import Badges from './Badges';
import {Text, SuccessButton, PrimaryButton, SecondaryText} from './Core';
import ImageViewer from 'react-native-image-zoom-viewer';

const Result = props => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite.books);
  const settings = useSelector(state => state.settings);

  const [slideAnimationModal, setSlideAnimationModal] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
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
    if (currentPageIndex === book.images.pages.length) {
      setCurrentPageIndex(1);
    }
    setSlideAnimationModal(true);
  };

  const prevPage = () => {
    animateArrow();
    if (currentPageIndex === 1) {
      setCurrentPageIndex(book.images.pages.length);
      return;
    }
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const nextPage = () => {
    animateArrow();
    if (currentPageIndex === book.images.pages.length) {
      setSlideAnimationModal(false);
      return;
    }
    setCurrentPageIndex(currentPageIndex + 1);
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

  const saveButton = async () => {
    try {
      const {link, t} = book.images.pages[currentPageIndex];
      const extension = () => {
        switch (t) {
          case 'j':
            return '.jpg';
          case 'p':
            return '.png';
          default:
            return '.jpg';
        }
      };
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to storage',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const dirs = RNFetchBlob.fs.dirs;
        const path =
          dirs.DownloadDir +
          '/nhrd/' +
          book.id +
          '/' +
          currentPageIndex +
          extension();
        const fetchBlob = RNFetchBlob.config({
          path,
        });
        const res = await fetchBlob.fetch('GET', link);
        await RNFetchBlob.fs.scanFile([
          {
            path,
          },
        ]);
        ToastAndroid.show(
          `The file saved to: ${res.path()}`,
          ToastAndroid.SHORT,
        );
      } else {
        Alert.alert(
          'Permission Denied!',
          'You need to give storage permission to save the file',
        );
        throw 'No Permission';
      }
    } catch (e) {
      ToastAndroid.show('Error while saving file.', ToastAndroid.SHORT);
      console.log(e);
    }
  };

  const images = book.images.pages.map(page => ({
    ...page,
    url: page.link,
    ...styles.pageImage,
  }));

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
            title={`${currentPageIndex + 1} of ${book.images.pages.length}`}
            textStyle={{color: 'white'}}
            hasTitleBar={false}
          />
        }
        modalStyle={{backgroundColor: Colors.backgroundColor}}
        modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}>
        <ModalContent>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/*<View style={styles.absoluteButtons}>
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
                  <View style={styles.leftAbsoluteButton}>
                    <Icon
                      name="ios-arrow-dropleft"
                      color={'rgba(255,255,255,0.5)'}
                      size={72}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={nextPage}>
                  <View style={styles.rightAbsoluteButton}>
                    <Icon
                      name="ios-arrow-dropright"
                      color={'rgba(255,255,255,0.5)'}
                      size={72}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </View>*/}
            <View style={styles.pageImage}>
              {slideAnimationModal && (
                <ImageViewer
                  imageUrls={images}
                  renderImage={imgProps => (
                    <FastImage resizeMode={'contain'} {...imgProps} />
                  )}
                  failImageSource={'kenthu'}
                  backgroundColor="rgba(0,0,0,0)"
                  index={currentPageIndex}
                  onChange={index => setCurrentPageIndex(index)}
                  renderIndicator={() => {}}
                  saveToLocalByLongPress={false}
                />
              )}
            </View>
            {/*<FastImage
              source={
                settings.sfw
                  ? require('../assets/sfw.jpg')
                  : {
                      uri: book.images.pages[currentPageIndex - 1].link,
                      priority: FastImage.priority.normal,
                    }
              }
              style={styles.pageImage}
              resizeMode={FastImage.resizeMode.contain}
              onProgress={e =>
                console.log(e.nativeEvent.loaded / e.nativeEvent.total)
              }
            />*/}
          </View>
          <PrimaryButton
            onPress={saveButton}
            style={{width: '100%', marginTop: 10}}>
            <Icon name="ios-save" size={14} color={'white'} /> Save To Gallery
          </PrimaryButton>
        </ModalContent>
      </Modal>

      <View style={styles.imageContainer}>
        <FastImage
          source={
            settings.sfw
              ? require('../assets/sfw.jpg')
              : {
                  uri: book.images && book.images.cover.link,
                }
          }
          resizeMode={'contain'}
          style={styles.coverImage}
        />
      </View>
      <View>
        <Text numberOfLines={4}>{book.title && book.title.english}</Text>
        <SecondaryText>{book.id}</SecondaryText>
        <View style={styles.buttonContainer}>
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
  coverImage: {
    height: Dimensions.get('window').height * 0.4,
    width: Dimensions.get('window').width * 0.85,
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  absoluteButtons: {
    height: Dimensions.get('window').height * 0.75,
    width: Dimensions.get('window').width * 0.9,
    position: 'absolute',
    zIndex: 1,
  },
  leftAbsoluteButton: {
    backgroundColor: 'rgba(255,255,255,0)',
    width: '50%',
    justifyContent: 'center',
  },
  rightAbsoluteButton: {
    backgroundColor: 'rgba(255,255,255,0)',
    width: '50%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  pageImage: {
    height: Dimensions.get('window').height * 0.75,
    width: Dimensions.get('window').width * 0.9,
  },
});

export default Result;
