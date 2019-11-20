import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';

const HamburgerButton = props => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName="ios-menu"
        onPress={() => props.navigation.navigation.openDrawer()}
      />
    </HeaderButtons>
  );
};

export default HamburgerButton;
