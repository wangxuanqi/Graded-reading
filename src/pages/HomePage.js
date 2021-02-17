import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {View, Text} from 'react-native';
import Popular from './PopularPage';
// import Trending from '../tabPage/Trending';
import Favorite from './FavoritePage';
// import Me from '../tabPage/Me';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

class Page extends Component {
  render() {
    return (
      <View>
        <Text>FavoritePage</Text>
      </View>
    );
  }
}

export default class HomePage extends Component {
  render() {
    const Tab = this.tabNavigator();
    return <Tab />;
  }
  tabNavigator() {
    return createAppContainer(
      createBottomTabNavigator({
        Popular: {
          screen: Popular,
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
          screen: Page,
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
          screen: Favorite,
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
          screen: Page,
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
