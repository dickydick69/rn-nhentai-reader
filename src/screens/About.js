import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {
  ContainerView,
  HamburgerButton,
  Text,
  SecondaryText,
} from '../components/Core';

const About = props => {
  return (
    <ContainerView style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('../assets/nhentai_logo.png')}
        style={{
          width: Dimensions.get('window').width * 0.5,
          height: Dimensions.get('window').height * 0.2,
        }}
        resizeMode={'contain'}
      />
      <View>
        <Text style={{textAlign: 'center'}}>NHentai Reader</Text>
        <SecondaryText style={{textAlign: 'center', fontSize: 14}}>
          version 0.0.1
        </SecondaryText>
        <SecondaryText style={{textAlign: 'center', fontSize: 10}}>
          Made by dickydick69 aka Paul
        </SecondaryText>
        <Text style={{textAlign: 'center'}}>Big Thanks To:</Text>
        <Text style={{fontSize: 10, textAlign: 'center'}}>
          - React Native Community {'\n'}- py7hon (without his mirror, this
          project is almost impossible){'\n'}- Friends {'\n'}- And Many More...
        </Text>
      </View>
    </ContainerView>
  );
};

About.navigationOptions = navData => ({
  title: 'About',
  headerLeft: <HamburgerButton navigation={navData} />,
});

export default About;
