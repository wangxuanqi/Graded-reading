import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {View, Text, StyleSheet} from 'react-native';
import NavigationUtil from '../../navigation/NavigationUtil';

/*最热页面*/
export default class PopularPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '主页',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });
  constructor(props) {
    super(props);
    this.tabNames = [
      'Java',
      'Android',
      'PHP',
      'IOS',
      'JavaScript',
      'React',
      'ReactNative',
    ];
  }
  genTabs() {
    const tabs = {};
    this.tabNames.forEach((item, i) => {
      tabs[`tab${i}`] = {
        screen: (props) => <PopularTab {...props} tabLabel={item} />, // 动态路由传参
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }
  render() {
    const TabNavigator = createAppContainer(
      createMaterialTopTabNavigator(this.genTabs(), {
        tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false, // 标签是都全是大写，默认是true
          scrollEnabled: true, // 是否支持滚动，默认是false
          style: {
            backgroundColor: '#678', // tabBar的背景颜色
          },
          indicatorStyle: styles.indicatorStyle, // 标签指示器的样式， 地下切换的那个条
          labelStyle: styles.labelStyle, // 文字样式
        },
      }),
    );
    return <TabNavigator />;
  }
}
class PopularTab extends Component {
  render() {
    const {tabLabel} = this.props;
    return (
      <View>
        <Text>{tabLabel}</Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage({}, 'DetailPage');
          }}>
          跳转到详情页
        </Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage({}, 'ResquestPage');
          }}>
          网络请求
        </Text>
        <Text
          onPress={() => {
            NavigationUtil.goPage({}, 'AsyncStoragePage');
          }}>
          AsyncStorage
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  tabStyle: {
    minWidth: 50,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 13,
    marginTop: 6,
    marginBottom: 6,
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    //标题的文字颜色
    color: 'black',
    //设置标题的大小
    fontSize: 18,
    //居中显示
    alignSelf: 'center',
  },
});
