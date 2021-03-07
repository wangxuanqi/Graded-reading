import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {View, Text} from 'react-native';
import classification from './classification/index';
import list from './classification/list';

import clock from './clock';
import Edit from './clock/EditScreen.js';

import community from './community';
import communityPublic from './community/publish';
import communityDetail from './community/DetailPage';
import bookDetail from './classification/detail';
import bookRecord from './classification/record';
import My from './my';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import store from '../../store/store';

const MainPage = createStackNavigator({
  ClassificationPage: {
    screen: classification,
  },
  ListPage: {
    screen: list,
  },
  DetailPage: {
    screen: bookDetail,
  },
  RecordPage: {
    screen: bookRecord,
  },
  mode: 'card',
  headerMode: 'float',
});

const ClockPage = createStackNavigator({
  ClockPage: {
    screen: clock,
    navigationOptions: {
      headerTitle: '打卡',
      headerBackTitle: null,
    },
  },
  EditPage: {
    screen: Edit,
  },
});
const CommunityPage = createStackNavigator({
  FavoritePage: {
    screen: community,
  },
  DetailPage: {
    screen: communityDetail,
  },
  PublicPage: {
    screen: communityPublic,
  },
});

const MyPage = createStackNavigator({
  MyPage: {
    screen: My,
  },
});

const bottomTab = createBottomTabNavigator(
  {
    Popular: {
      screen: MainPage,
      navigationOptions: {
        tabBarLabel: '分类',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'grid' : 'grid-outline'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
    Trending: {
      screen: ClockPage,
      navigationOptions: {
        tabBarLabel: '打卡',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={'ios-logo-slack'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
    Favorite: {
      screen: CommunityPage,
      navigationOptions: {
        tabBarLabel: '社区',
        tabBarIcon: ({tintColor, focused}) => (
          <Ionicons
            name={focused ? 'ios-people' : 'ios-people-outline'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
    Me: {
      screen: MyPage,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: (
          {tintColor, focused}, // 这里是小括号
        ) => (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={26}
            style={{color: tintColor}}
          />
        ),
      },
    },
  },
  {tabBarOptions: {showLabel: true}},
);
// bottomTab.navigationOptions = ({navigation}) => {
//   let tabBarVisible = false;
//   // if (navigation.state.index > 1) {
//   //   tabBarVisible = false;
//   // }

//   return {
//     tabBarVisible,
//   };
// };
export default class HomePage extends Component {
  render() {
    const Tab = this.tabNavigator();
    return (
      <Provider store={store}>
        <Tab />
      </Provider>
    );
  }
  tabNavigator() {
    return createAppContainer(bottomTab);
  }
}
