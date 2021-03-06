import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import PDFView from 'react-native-pdf-view';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackOptions} from '../../../utils/navigation';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
const image = require('../../../images/book-detail-bg.jpg');
export default class RecordPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, navigation.state.params.title, true);

  constructor(props) {
    super(props);
    const {title} = this.props.navigation.state.params;

    this.state = {
      pageCount: 20,
      pdfIndex: 1,
      canOperate: false,
      everyTime: 0,
      totalTime: 0,
      playRecording: false, //是否播放录音
      currentTime: 0.0, //开始录音到现在的持续时间
      recording: false, //是否正在录音
      stoppedRecording: false, //是否停止了录音
      finished: false, //是否完成录音
      audioPath: `${AudioUtils.DocumentDirectoryPath}/${title}.aac`, //路径下的文件名
      hasPermission: undefined, //是否获取权限
    };
    this.pdfView = null;
    this.interval = null;
    this.intervalTime = 5000; //pdf播放间隔时间

    this.spinValue = new Animated.Value(0);

    this.pdfPlay = this.pdfPlay.bind(this);
    this.prepareRecordingPath = this.prepareRecordingPath.bind(this); //执行录音的方法
    this.checkPermission = this.checkPermission.bind(this); //检测是否授权
    this.record = this.record.bind(this); //录音
    this.stop = this.stop.bind(this); //停止
    this.play = this.play.bind(this); //播放
    this.pause = this.pause.bind(this); //暂停
    this.finishRecording = this.finishRecording.bind(this);
    this.stopPdfPlay = this.stopPdfPlay.bind(this); //停止并重置pdf
  }

  componentDidMount() {
    // 页面加载完成后获取权限
    this.checkPermission().then((hasPermission) => {
      this.setState({hasPermission});

      //如果未授权, 则执行下面的代码
      if (!hasPermission) {
        return;
      }
      this.prepareRecordingPath(this.state.audioPath);

      AudioRecorder.onProgress = (data) => {
        this.setState({currentTime: Math.floor(data.currentTime)});
      };

      AudioRecorder.onFinished = (data) => {
        if (Platform.OS === 'ios') {
          this.finishRecording(data.status === 'OK', data.audioFileURL);
        }
      };
    });
  }

  componentWillUnmount() {
    this.stopPdfPlay();
  }

  //旋转方法
  spin = () => {
    const {recording} = this.state;

    this.spinValue.setValue(0);
    if (recording) {
      Animated.timing(this.spinValue, {
        toValue: 1, // 最终值 为1，这里表示最大旋转 360度
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => this.spin());
    }
  };

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low', //录音质量
      AudioEncoding: 'aac', //录音格式
      AudioEncodingBitRate: 32000, //比特率
    });
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      title: '获取录音权限',
      message: 'XXX正请求获取麦克风权限用于录音,是否准许',
    };

    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then((result) => {
      // Alert(result);     //结果: granted ,    PermissionsAndroid.RESULTS.GRANTED 也等于 granted
      return result === true || PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  async record() {
    console.log('record');
    // 如果正在录音
    if (this.state.recording) {
      Alert.alert('正在录音中!');
      return;
    }

    //如果没有获取权限
    if (!this.state.hasPermission) {
      Alert('没有获取录音权限!');
      return;
    }

    //如果暂停获取停止了录音
    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({recording: true});

    try {
      this.pdfPlay(this.intervalTime);
      this.spin(); //按钮旋转
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  async stop() {
    console.log('stop');
    // 如果没有在录音
    if (!this.state.recording) {
      Alert.alert('没有录音, 无需停止!');
      return;
    }
    clearInterval(this.interval);
    this.setState({stoppedRecording: true, recording: false});
    this.stopPdfPlay(); //pdf暂停播放

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async play() {
    // 如果在录音 , 执行停止按钮
    if (this.state.recording) {
      await this.stop();
    }

    // 使用 setTimeout 是因为, 为避免发生一些问题 react-native-sound中
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });
      this.setState({
        playRecording: true,
      });
      this.pdfPlay(this.intervalTime);

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
            this.setState({
              playRecording: false,
            });
            this.stopPdfPlay();
          } else {
            console.log('playback failed due to audio decoding errors');
            this.setState({
              playRecording: false,
            });
            this.stopPdfPlay();
          }
        });
      }, 100);
    }, 100);
  }

  async pause() {
    if (!this.state.recording) {
      Alert.alert('没有录音, 无需停止!');
      return;
    }

    this.setState({stoppedRecording: true, recording: false});

    try {
      const filePath = await AudioRecorder.pauseRecording();

      // 在安卓中, 暂停就等于停止
      if (Platform.OS === 'android') {
        this.finishRecording(true, filePath);
      }
    } catch (error) {
      console.error(error);
    }
  }

  finishRecording(didSucceed, filePath) {
    this.setState({finished: didSucceed});
    console.log(
      `Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`,
    );
  }

  stopPdfPlay() {
    clearInterval(this.interval);
    this.setState({
      pdfIndex: 1,
    });
  }

  pdfPlay(time) {
    this.interval = null;
    this.interval = setInterval(() => {
      this.setState((prevState) => {
        return {
          pdfIndex: prevState.pdfIndex + (prevState.pdfIndex === 1 ? 2 : 1),
        };
      });

      if (this.state.pdfIndex >= this.state.pageCount - 1) {
        //重置pdf
        this.stopPdfPlay();
      }
    }, time);
  }

  render() {
    const {navigation} = this.props;
    const {pdfPath, title} = navigation.state.params;
    const {pdfIndex, playRecording, recording} = this.state;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ['0deg', '360deg'], //输出值
    });

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack(
                  this.props.navigation.state.params.keys.detail_key,
                );
              }}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name="ios-arrow-undo"
                  size={scaleSizeW(50)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{title}配音</Text>
            <View />
          </View>
          <View
            style={styles.pdfContainer}
            onStartShouldSetResponderCapture={(evt) => true}
            onMoveShouldSetResponderCapture={(evt) => true}>
            <PDFView
              ref={(pdf) => {
                this.pdfView = pdf;
              }}
              key="sop"
              path={pdfPath}
              pageNumber={pdfIndex}
              onLoadComplete={(pageCount) => {
                console.log(
                  '🚀 ~ file: detail.js ~ line 94 ~ DetailPage ~ render ~ pageCount',
                  pageCount,
                );
                this.setState({pageCount: pageCount});
                //this.audioPlay.bind(this)();
              }}
              style={styles.pdf}
            />
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity
              onPress={() => {
                if (!playRecording) {
                  this.play();
                }
              }}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name={playRecording ? 'play' : 'pause'}
                  size={scaleSizeW(50)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
            <Animated.View style={{transform: [{rotate: spin}]}}>
              <TouchableOpacity
                onPress={() => {
                  if (recording) {
                    this.stop();
                  } else {
                    Alert.alert('提示', '您确定要进行配音吗', [
                      {text: '取消', onPress: () => {}},
                      {text: '确定', onPress: this.record},
                    ]);
                  }
                }}>
                <ImageBackground
                  style={styles.btnBg}
                  source={require('../../../images/btn-bg.jpg')}
                  imageStyle={{borderRadius: scaleSizeW(50)}}>
                  <Ionicons
                    name="mic"
                    size={scaleSizeW(50)}
                    style={{color: '#ffffff'}}
                  />
                </ImageBackground>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    padding: scaleSizeW(20),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: setSpText(45),
    color: '#ffffff',
    fontWeight: '800',
    // //居中显示
    // alignSelf: 'center',
    // textAlign: 'center',
    // flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  pdfContainer: {
    width: scaleSizeW(600),
    height: scaleSizeH(900),
    borderRadius: scaleSizeW(50),
    marginTop: scaleSizeH(30),
    overflow: 'hidden',
  },
  pdf: {
    flex: 1,
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: scaleSizeH(50),
  },
  btn: {},
  btnBg: {
    width: scaleSizeW(100),
    height: scaleSizeW(100),
    borderRadius: scaleSizeW(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
