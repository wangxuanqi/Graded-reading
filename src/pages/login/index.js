import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {NetPost} from '../../utils/request';
import EditView from '../../components/login/EditView';
import LoginButton from '../../components/login/LoginButton';
import storage from '../../store/storage';
import {connect} from 'react-redux';
import {setLoginState} from '../../actions/actions';

class LoginActivity extends Component {
  constructor(props) {
    super(props);
    this.userName = '';
    this.password = '';
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      console.log(this.props.navigation.state.params.from);
    }
    // load
    storage
      .load({
        key: 'loginState',
        autoSync: true,
        syncInBackground: true,
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
        NetPost(
          '/auth/validate',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + ret.token,
            },
          },
        )
          .then((res) => {
            this.props.dispatch && this.props.dispatch(setLoginState(ret));
            this.props.navigation.navigate('HomePage', {key: '传递的标题'});
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
  }

  //跳转到第二个页面去
  onLoginSuccess = (res) => {
    this.props.dispatch && this.props.dispatch(setLoginState(res.data));
    storage.save({
      key: 'loginState', // Note: Do not use underscore("_") in key!
      data: res.data,

      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.from
    ) {
      this.props.navigation.goBack();
    } else {
      this.props.navigation.navigate('HomePage', {});
    }
  };

  onPressCallback = () => {
    NetPost('/auth/login', {
      password: this.password,
      userName: this.userName,
    })
      .then((res) => {
        console.log(res);
        this.onLoginSuccess(res);
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: index.js ~ line 139 ~ LoginActivity ~ err',
          JSON.stringify(err),
        );
        let errMsg = '';
        if (err.response.status === 401) {
          errMsg = err.response.data.message;
        } else if (err.response.status === 400) {
          errMsg = err.response.data.data[0].msg;
        }
        Alert.alert('登录失败', errMsg);
      });
  };

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
            name="输入用户名"
            onChangeText={(text) => {
              this.userName = text;
            }}
          />
          <EditView
            name="输入密码"
            onChangeText={(text) => {
              this.password = text;
            }}
            secureTextEntry={true}
          />
          <LoginButton name="登录" onPressCallback={this.onPressCallback} />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('RegisterPage', {
                from: 'loginPage',
              });
            }}>
            <Text
              style={{color: '#4A90E2', textAlign: 'center', marginTop: 10}}>
              注册
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const LoginStyles = StyleSheet.create({
  loginview: {
    flex: 1,
    padding: 30,
    backgroundColor: '#ffffff',
  },
});

export default connect()(LoginActivity);
