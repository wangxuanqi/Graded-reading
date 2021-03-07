// EditScreen.js
import React from 'react';
import {View, Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {changeName} from '../../../actions/actions';

class EditScreen extends React.Component {
  constructor() {
    super();
    this.state = {postText: ''};
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'gray'}}>
        <TextInput
          multiline
          placeholder="请输入新用户名"
          value={this.state.postText}
          onChangeText={(text) => this.setState({postText: text})}
        />
        <Button
          title="提交修改"
          onPress={() => {
            console.log(
              '🚀 ~ file: index.js ~ line 30 ~ EditScreen ~ render ~ this.props.dispatch',
              this.props.dispatch,
            );
            this.props.dispatch &&
              this.props.dispatch(
                changeName(
                  this.props.navigation.state.params.post,
                  this.state.postText,
                ),
              );
          }}
        />
      </View>
    );
  }
}

export default connect()(EditScreen);
