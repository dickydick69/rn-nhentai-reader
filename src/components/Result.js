import React, {useState} from 'react';
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import Colors from '../constants/Colors';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Animated,
  PermissionsAndroid,
  ToastAndroid,
  FlatList,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, deleteFavorite} from '../store/actions/favoriteAction';
import Icon from 'react-native-vector-icons/Ionicons';
import Badges from './Badges';
import {Text, SuccessButton, PrimaryButton, SecondaryText} from './Core';
import ResultModal from './ResultModal';
import ImageViewer from 'react-native-image-zoom-viewer';

const Result = props => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorite.books);
  const settings = useSelector(state => state.settings);

  const [pageModal, setPageModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);
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
    setPageModal(true);
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
      setPageModal(false);
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
          (currentPageIndex + 1) +
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

  return (
    <>
      <ResultModal
        book={book}
        setGalleryModal={setGalleryModal}
        setCurrentPageIndex={setCurrentPageIndex}
        setPageModal={setPageModal}
        galleryModal={galleryModal}
        currentPageIndex={currentPageIndex}
        pageModal={pageModal}
        saveButton={saveButton}
        settings={settings}
      />
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
            <SuccessButton onPress={() => setGalleryModal(true)}>
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
  pageImage: {
    height: Dimensions.get('window').height * 0.75,
    width: Dimensions.get('window').width * 0.9,
  },
});

export default Result;
