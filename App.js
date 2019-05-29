import React from 'react';

import SplashScreen from './screens/SplashScreen';
import MapScreen from './screens/MapScreen';

import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  MapScreen: MapScreen
});

const AppContainer = createAppContainer(InitialNavigator);

class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

export default App;
