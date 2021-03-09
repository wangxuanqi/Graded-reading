import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil.js';

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.imgage}
          source={{
            uri:
              'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F05%2F07%2Faa15add71843929eb6931f10d5836ad2.jpg%21%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617875589&t=6cf122912695481ec47f7ce675a45607',
          }}
        />
      </View>
    );
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      // const { navigation } = this.props;
      // navigation.navigate('Main')
      NavigationUtil.resetToHomePage({
        navigation: this.props.navigation,
      });
    }, 3000);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
