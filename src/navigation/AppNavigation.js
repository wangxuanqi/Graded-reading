import React, {Component} from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login';
import RegisterPage from '../pages/login/register';
import {Provider} from 'react-redux';
import store from '../store/store';

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
    LoginPage: {
      screen: LoginPage,
      navigationOptions: {
        headerShown: false,
      },
    },
    RegisterPage: {
      screen: RegisterPage,
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
export default class AppPage extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }
}
