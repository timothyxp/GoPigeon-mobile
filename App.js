import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import PhotoPage from "./src/pages/PhotoPage/PhotoPage";
import InfoPage from "./src/pages/infoPage/InfoPage";


const AppNavigator = createStackNavigator({
  Chooser: {
    screen: PhotoPage
  },
  Shower: {
    screen: InfoPage
  }
},{
  initialRouteName: "Chooser",
  defaultNavigationOptions: {
    headerStyle: {
      display: "none"
    },
  }
});

let AppContainer = createAppContainer(AppNavigator);

export default AppContainer;