import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {View, Text} from 'react-native';
import classification from './classification/index';
import list from './classification/list';
import clock from './clock';
import community from './community';
import communityDetail from './community/DetailPage';
import bookDetail from './classification/detail';
import My from './my';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation-stack';

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
});
const CommunityPage = createStackNavigator({
  FavoritePage: {
    screen: community,
  },
  DetailPage: {
    screen: communityDetail,
  },
});

const MyPage = createStackNavigator({
  MyPage: {
    screen: My,
  },
});
export default class HomePage extends Component {
  render() {
    const Tab = this.tabNavigator();
    return <Tab />;
  }
  tabNavigator() {
    return createAppContainer(
      createBottomTabNavigator({
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
      }),
    );
  }
}
