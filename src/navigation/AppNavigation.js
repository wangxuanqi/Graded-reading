import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';

// APP的启动页面必须使用createSwitchNavigator，防止按返回按钮回到启动页
const IninNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null,
    },
  },
});

const MainNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        header: null,
      },
    },
    DetailPage: {
      screen: DetailPage,
      navigationOptions: {},
    },
  },
  {
    initialRouteName: 'HomePage',
  },
);

const App = createSwitchNavigator(
  {
    Init: IninNavigator,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

const AppNavigation = createAppContainer(App); // react-navigation3.x必须使用createAppContainer包裹
export default AppNavigation;
