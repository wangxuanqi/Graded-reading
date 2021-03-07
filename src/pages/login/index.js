import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {NetPost} from '../../utils/request';
import EditView from '../../components/login/EditView';
import LoginButton from '../../components/login/LoginButton';
import LoginSuccess from '../../components/login/LoginSuccess';
import storage from '../../store/storage';

export default class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = '';
    this.password = '';
  }

  componentDidMount() {
    // load
    storage
      .load({
        key: 'loginState',

        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,

        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then((ret) => {
        // found data go to then()
        console.log(ret);
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
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
          <Image source={require('../../images/OIP.jpg')} />
        </View>
        <View style={{marginTop: 80}}>
          <EditView
            name="输入邮箱"
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

  //跳转到第二个页面去
  onLoginSuccess = (res) => {
    storage.save({
      key: 'loginState', // Note: Do not use underscore("_") in key!
      data: res.data,

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
    this.props.navigation.navigate('HomePage', {key: '传递的标题'});
  };

  onPressCallback = () => {
    NetPost('/auth/login', {
      password: this.password,
      email: this.userName,
    })
      .then((res) => {
        console.log(res);
        this.onLoginSuccess(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
