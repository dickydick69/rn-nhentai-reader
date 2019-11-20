import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Nav from './src/navigation';
import store, {persistor} from './src/store';

const App = props => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Nav />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
