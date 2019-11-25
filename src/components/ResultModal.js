import React from 'react';
import Modal, {
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';
import Colors from '../constants/Colors';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {PrimaryButton} from './Core';
import Icon from 'react-native-vector-icons/Ionicons';
import {set} from 'react-native-reanimated';

const ResultModal = props => {
  const {
    galleryModal,
    setGalleryModal,
    setCurrentPageIndex,
    setPageModal,
    pageModal,
    book,
    currentPageIndex,
    saveButton,
    settings,
  } = props;

  const images = book.images.pages.map(page => ({
    ...page,
    url: page.link,
    ...styles.pageImage,
    props: {
      source: settings.sfw ? require('../assets/sfw.jpg') : '',
    },
  }));
  const getExtension = t => {
    switch (t) {
      case 'j':
        return '.jpg';
      case 'p':
        return '.png';
      default:
        return '.jpg';
    }
  };

  const thumbnails = book.images.pages.map((page, index) => ({
    ...page,
    url: `https://t.nhent.ai/galleries/${book.media_id}/${index +
      1}t${getExtension(page.t)}`,
  }));

  return (
    <>
      <Modal
        visible={galleryModal}
        onDismiss={() => setGalleryModal(false)}
        onTouchOutside={() => setGalleryModal(false)}
        width={0.95}
        onHardwareBackPress={() => {
          setGalleryModal(false);
          return true;
        }}
        modalStyle={{backgroundColor: Colors.backgroundColor}}
        modalAnimation={new SlideAnimation({slideFrom: 'bottom'})}
        modalTitle={
          <ModalTitle
            title={'Gallery'}
            textStyle={{color: 'white'}}
            hasTitleBar={false}
          />
        }>
        <ModalContent>
          <View
            style={{
              height: Dimensions.get('window').height * 0.75,
              justifyContent: 'center',
            }}>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
              }}
              numColumns={4}
              data={thumbnails}
              keyExtractor={item => item.url}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setCurrentPageIndex(index);
                      setPageModal(true);
                    }}>
                    <View
                      style={{
                        width: Dimensions.get('window').width * 0.2,
                        height: Dimensions.get('window').height * 0.2,
                        margin: 5,
                      }}>
                      <FastImage
                        source={
                          settings.sfw
                            ? require('../assets/sfw.jpg')
                            : {uri: item.url}
                        }
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        resizeMode={'cover'}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ModalContent>
      </Modal>
      <Modal
        onDismiss={() => setPageModal(false)}
        onTouchOutside={() => setPageModal(false)}
        visible={pageModal}
        width={0.95}
        onHardwareBackPress={() => {
          setPageModal(false);
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
            <View style={styles.pageImage}>
              {pageModal && (
                <ImageViewer
                  imageUrls={images}
                  renderImage={imgProps => (
                    <FastImage resizeMode={'contain'} {...imgProps} />
                  )}
                  backgroundColor="rgba(0,0,0,0)"
                  index={currentPageIndex}
                  onChange={index => setCurrentPageIndex(index)}
                  renderIndicator={() => {}}
                  saveToLocalByLongPress={false}
                />
              )}
            </View>
          </View>
          <PrimaryButton
            onPress={saveButton}
            style={{width: '100%', marginTop: 10}}>
            <Icon name="ios-save" size={14} color={'white'} /> Save To Gallery
          </PrimaryButton>
        </ModalContent>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  pageImage: {
    height: Dimensions.get('window').height * 0.75,
    width: Dimensions.get('window').width * 0.9,
  },
});

export default ResultModal;
