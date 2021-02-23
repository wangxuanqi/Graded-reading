import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import EditView from '../components/login/EditView';
import LoginButton from '../components/login/LoginButton';
import LoginSuccess from '../components/login/LoginSuccess';

export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = '';
    this.password = '';
  }

  render() {
    return (
      <View style={LoginStyles.loginview}>
        <View
          style={{
            flexDirection: 'row',
            height: 100,
            marginTop: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Image source={require('../images/OIP.jpg')} />
        </View>
        <View style={{marginTop: 80}}>
          <EditView
            name="输入用户名/注册手机号"
            onChangeText={(text) => {
              this.userName = text;
            }}
          />
          <EditView
            name="输入密码"
            onChangeText={(text) => {
              this.password = text;
            }}
          />
          <LoginButton name="登录" onPressCallback={this.onPressCallback} />
          <Text style={{color: '#4A90E2', textAlign: 'center', marginTop: 10}}>
            忘记密码？
          </Text>
        </View>
      </View>
    );
  }

  onPressCallback = () => {
    this.props.navigation.navigate('HomePage', {key: '传递的标题'});
  };

  //跳转到第二个页面去
  onLoginSuccess() {
    const {navigator} = this.props;
    if (navigator) {
      navigator.push({
        name: 'LoginSuccess',
        component: LoginSuccess,
      });
    }
  }
}

class loginLineView extends Component {
  render() {
    return <Text>没有帐号</Text>;
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  },
});
