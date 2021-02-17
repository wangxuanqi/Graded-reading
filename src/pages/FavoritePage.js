import React, {Component} from 'react';
import {View, Text, Button, StatusBar} from 'react-native';

class FavoritePage extends Component {
  static navigationOptions = {
    title: '社区',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    return (
      <View>
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <Text>FavoritePage</Text>
        <Button title="改变主题颜色--绿色" onPress={() => {}} />
      </View>
    );
  }
}

export default FavoritePage;
