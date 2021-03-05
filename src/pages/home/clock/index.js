import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
class ClockPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '打卡',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => null,
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });

  constructor(props) {
    super(props);
    Sound.setCategory('Playback');
  }

  componentDidMount() {
    const whoosh = new Sound(
      'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/audio/a%20brave%20girl.mp3?Expires=1614959903&OSSAccessKeyId=TMP.3KjEMJwpoybyhubiwnT671P214DSD3paepZ2sjVZVu24jnpLwC639Bk2z2nbJGQbANFuRJwRJoVjmRoSCsGiPcAowtmFoa&Signature=gPdq3UBOPNSWo7FbKR%2Btb3dqH24%3D&versionId=CAEQGxiBgMDBt6XzvxciIDQwYWUyYzI2OTMyNzRjOGNhY2IzZmQ2OTU4MjliYzIx&response-content-type=application%2Foctet-stream',
      Sound.MAIN_BUNDLE,
      (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            whoosh.getDuration() +
            'number of channels: ' +
            whoosh.getNumberOfChannels(),
        );

        // Play the sound with an onEnd callback
        whoosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );

    // Reduce the volume by half
    whoosh.setVolume(0.5);

    // Position the sound to the full right in a stereo field
    whoosh.setPan(1);

    // Loop indefinitely until stop() is called
    //whoosh.setNumberOfLoops(-1);

    // Get properties of the player instance
    console.log('volume: ' + whoosh.getVolume());
    console.log('pan: ' + whoosh.getPan());
    console.log('loops: ' + whoosh.getNumberOfLoops());
  }

  render() {
    return (
      <View>
        <Text>TrendingPage</Text>
        <Button title="改变主题颜色--绿色" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: 240,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4398ff',
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    //标题的文字颜色
    color: '#000000',
    //设置标题的大小
    fontSize: 18,
    //居中显示
    alignSelf: 'center',
  },
});

export default ClockPage;
