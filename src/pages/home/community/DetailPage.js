import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackOptions} from '../../../utils/navigation';

export default class DetailPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, '细节', true);

  render() {
    return (
      <View>
        <Text>DetailPage</Text>
      </View>
    );
  }
}
