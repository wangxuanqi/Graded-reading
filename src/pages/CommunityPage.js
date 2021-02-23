import React, {Component} from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import {StackOptions} from '../utils/navigation';

class FavoritePage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, '社区', false);

  render() {
    return (
      <View style={styles.container}>
        {/*页面跳转*/}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => {
            this.props.navigation.navigate('DetailPage', {key: '传递的标题'});
            console.log(this.props.navigation);
          }}>
          <Text style={{color: 'white'}}>带参数 跳转至Details页面</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 10, color: 'black'}}>当前是Main页面</Text>
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
    color: 'black',
    //设置标题的大小
    fontSize: 18,
    //居中显示
    alignSelf: 'center',
  },
});

export default FavoritePage;
