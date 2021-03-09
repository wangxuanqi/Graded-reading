import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
export default class EditView extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const {name, secureTextEntry, onChangeText, value} = this.props;

    return (
      <View style={LoginStyles.TextInputView}>
        <TextInput
          style={LoginStyles.TextInput}
          placeholder={name}
          onChangeText={(text) => {
            this.setState({text});
            onChangeText(text);
          }}
          secureTextEntry={secureTextEntry}
          value={value}
        />
      </View>
    );
  }
}

const LoginStyles = StyleSheet.create({
  TextInputView: {
    marginTop: 10,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#000000',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  TextInput: {
    backgroundColor: '#ffffff',
    height: 45,
    margin: 18,
  },
});
