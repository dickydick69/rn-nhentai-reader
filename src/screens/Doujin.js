import React from 'react';
import {ViewrScrollView, Text, ContainerScrollView} from '../components/Core';
import Result from '../components/Result';

const Doujin = props => {
  const book = props.navigation.getParam('book');
  return (
    <ContainerScrollView>
      <Result book={book} />
    </ContainerScrollView>
  );
};

Doujin.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('book').title.pretty,
});

export default Doujin;
