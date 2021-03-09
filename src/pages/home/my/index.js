import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';

const dpWidth = Dimensions.get('window').width;

class MyPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '我的',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => null,
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });

  render() {
    const {loginState} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../images/head.jpg')}
            style={styles.head}
          />
          <View style={{marginLeft: scaleSizeW(20)}}>
            <Text style={{fontSize: setSpText(45), fontWeight: 'bold'}}>
              {loginState.userName}
            </Text>
            <Text>email: {loginState.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('LoginPage', {from: 'MyPage'})
          }
          style={styles.btn}>
          <Text style={styles.text}>重新登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f1f2f3',
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
  headerContainer: {
    width: dpWidth - scaleSizeW(70),
    backgroundColor: '#ffffff',
    padding: scaleSizeW(30),
    paddingLeft: scaleSizeW(50),
    paddingRight: scaleSizeW(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scaleSizeW(30),
    marginTop: scaleSizeW(30),
  },
  head: {
    width: scaleSizeW(100),
    height: scaleSizeW(100),
    borderRadius: scaleSizeW(50),
  },
  btn: {
    width: dpWidth - scaleSizeW(70),
    lineHeight: scaleSizeH(100),
    backgroundColor: 'rgb(33,150,243)',
    borderRadius: scaleSizeW(30),
    marginTop: scaleSizeH(30),
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: setSpText(45),
    lineHeight: scaleSizeH(100),
  },
});

const mapStateToProps = (state) => ({
  loginState: state.loginState,
});

export default connect(mapStateToProps)(MyPage);
