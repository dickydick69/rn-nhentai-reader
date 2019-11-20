import React from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setSfw} from '../store/actions/settingsAction';
import {
  ContainerView,
  HamburgerButton,
  Text,
  Card,
  SecondaryText,
} from '../components/Core';
import Colors from '../constants/Colors';

const SettingSwitch = props => {
  return (
    <Card>
      <View>
        <View style={styles.switchContainer}>
          <Text>{props.name}</Text>
          <Switch
            value={props.value}
            onValueChange={props.onValueChange}
            thumbColor={Colors.primaryColor}
            trackColor="white"
          />
        </View>
      </View>
      <View style={{width: '80%', marginVertical: 10}}>
        <SecondaryText style={{fontSize: 14}}>
          {props.description}
        </SecondaryText>
      </View>
    </Card>
  );
};

const Settings = props => {
  const settings = useSelector(state => state.settings);

  const onChangeSfw = () => {
    dispatch(setSfw());
  };

  const dispatch = useDispatch();
  return (
    <ContainerView>
      <SettingSwitch
        name="SFW Mode"
        description={
          'Enable this to hide all images. Why? IDK, maybe you will need it sometime?'
        }
        value={settings.sfw}
        onValueChange={onChangeSfw}
      />
    </ContainerView>
  );
};

Settings.navigationOptions = navData => ({
  headerLeft: <HamburgerButton navigation={navData} />,
});

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Settings;
