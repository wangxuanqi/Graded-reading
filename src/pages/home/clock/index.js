// DetailsScreen.js
import React from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
class DetailsScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'gray',
        }}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.props.user}
          renderItem={({item}) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.sex}</Text>
              <Text>{item.age}</Text>
              <Button
                title="修改姓名"
                onPress={() =>
                  this.props.navigation.navigate('EditPage', {
                    post: item.id,
                  })
                }
              />
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DetailsScreen);
