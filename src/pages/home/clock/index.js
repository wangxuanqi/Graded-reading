import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class ClockPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '打卡',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => null,
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });

  render() {
    return (
      <View>
        <Text>TrendingPage</Text>
        <Button title="改变主题颜色--绿色" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 240,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4398ff',
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    //标题的文字颜色
    color: '#000000',
    //设置标题的大小
    fontSize: 18,
    //居中显示
    alignSelf: 'center',
  },
});

export default ClockPage;
