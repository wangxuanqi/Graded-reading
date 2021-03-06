import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setSpText, scaleSizeW} from '../utils/screen';

const StackOptions = (
  {navigation},
  headerTitle,
  headerBackTitle,
  headerLeftTitle,
) => {
  let {state, goBack} = navigation;

  //用来判断是否隐藏或显示header;
  const visible = state.params.isVisible;
  let headerShown;
  if (visible === false) {
    headerShown = false;
  }
  const headerStyle = {backgroundColor: '#ffffff'};
  const headerTitleStyle = {
    fontSize: setSpText(35),
    color: '#000000',
    fontWeight: '800',
    //居中显示
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
  };
  const headerRight = headerBackTitle ? () => <View /> : null;
  const headerLeft = () => (
    <TouchableOpacity
      style={styles.headerLeft}
      onPress={() => {
        goBack();
      }}>
      <Ionicons
        name={'ios-chevron-back-sharp'}
        size={scaleSizeW(60)}
        style={{color: '#4398ff'}}
      />
      <Text style={{fontSize: setSpText(35), color: '#4398ff'}}>
        {headerLeftTitle}
      </Text>
    </TouchableOpacity>
  );
  const mode = 'card';
  const headerMode = 'screen';

  return {
    headerShown,
    headerStyle,
    headerTitle,
    headerTitleStyle,
    headerBackTitle,
    headerRight,
    headerLeft,
    mode,
    headerMode,
  };
};

const styles = StyleSheet.create({
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export {StackOptions};
