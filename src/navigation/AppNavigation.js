import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/index/HomePage';
import DetailPage from '../pages/index/community/DetailPage';
import LoginPage from '../pages/login';

// APP的启动页面必须使用createSwitchNavigator，防止按返回按钮回到启动页
const IninNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const MainNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage,
      navigationOptions: {
        headerShown: false,
      },
    },
    DetailPage: {
      screen: DetailPage,
    },
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'LoginPage',
  },
);

const App = createSwitchNavigator(
  {
    Init: IninNavigator,
    Main: MainNavigator,
  },
  {
    navigationOptions: {
      headerShown: false,
    },
  },
);

const AppNavigation = createAppContainer(App); // react-navigation3.x必须使用createAppContainer包裹
export default AppNavigation;
