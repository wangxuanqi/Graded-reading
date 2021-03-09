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

export default class RegisterActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      repeatPassword: '',
      email: '',
    };
  }

  componentDidMount() {}

  //跳转到第二个页面去
  onRegisterSuccess = (res) => {
    Alert.alert('注册成功！', [
      {
        text: '取消',
        onPress: () => {
          this.props.navigation.navigate('LoginPage', {
            userName: res.data.userName,
          });
        },
      },
    ]);
  };

  onPressCallback = () => {
    const {password, userName, email, repeatPassword} = this.state;
    if (password !== repeatPassword) {
      Alert.alert('输入两次密码不一致，请重新输入');
      this.setState({
        password: '',
        repeatPassword: '',
      });
      return;
    }

    NetPost('/auth/register', {
      password: password,
      userName: userName,
      email: email,
    })
      .then((res) => {
        console.log(res);
        this.onRegisterSuccess(res);
      })
      .catch((err) => {
        let errMsg = '';
        if (err.response.status === 401) {
          errMsg = err.response.data.message;
        } else if (err.response.status === 400) {
          errMsg = err.response.data.data[0].msg;
        }
        Alert.alert('注册失败', errMsg);
      });
  };

  render() {
    const {userName, password, repeatPassword, email} = this.state;
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
        <View style={{marginTop: 20}}>
          <EditView
            name="输入用户名"
            onChangeText={(text) => {
              this.setState({userName: text});
            }}
            value={userName}
          />
          <EditView
            name="输入密码"
            onChangeText={(text) => {
              this.setState({password: text});
            }}
            secureTextEntry={true}
            value={password}
          />
          <EditView
            name="再次输入密码"
            onChangeText={(text) => {
              this.setState({repeatPassword: text});
            }}
            secureTextEntry={true}
            value={repeatPassword}
          />
          <EditView
            name="输入邮箱"
            onChangeText={(text) => {
              this.setState({email: text});
            }}
            value={email}
          />
          <LoginButton name="注册" onPressCallback={this.onPressCallback} />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('LoginPage', {
                from: 'registerPage',
              });
            }}>
            <Text
              style={{color: '#4A90E2', textAlign: 'center', marginTop: 10}}>
              登录
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
