import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {View, Text} from 'react-native';
import Popular from './index';
// import Trending from '../tabPage/Trending';
import community from './community';
import Detail from './community/DetailPage';
import My from '../my';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createStackNavigator} from 'react-navigation-stack';

class Page extends Component {
  render() {
    return (
      <View>
        <Text>FavoritePage</Text>
      </View>
    );
  }
}
const MainPage = createStackNavigator({
  PopularPage: {
    screen: Popular,
    navigationOptions: {
      headerTitle: '主页',
      headerBackTitle: null,
    },
  },
});

const TrendingPage = createStackNavigator({
  TrendingPage: {
    screen: Page,
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
    screen: Detail,
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
            tabBarLabel: '主页',
            tabBarIcon: ({tintColor, focused}) => (
              <Ionicons
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        Trending: {
          screen: TrendingPage,
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
