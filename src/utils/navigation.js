import React from 'react';
import {View, Button} from 'react-native';

const StackOptions = ({navigation}, headerTitle, headerBackTitle) => {
  console.log(navigation);
  let {state, goBack} = navigation;

  // 用来判断是否隐藏或显示header
  // const visible = state.params.isVisible;
  // let header;
  // if (visible === true) {
  //   header = null;
  // }
  const headerStyle = {backgroundColor: '#ffffff'};
  const headerTitleStyle = {
    fontSize: 18,
    color: '#000000',
    fontWeight: '800',
    //居中显示
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  };
  const headerRight = headerBackTitle ? <View /> : null;
  return {
    headerStyle,
    headerTitle,
    headerTitleStyle,
    headerBackTitle,
    headerRight,
  };
};

export {StackOptions};
