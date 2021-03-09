import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import PDFView from 'react-native-pdf-view';
import Sound from 'react-native-sound';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackOptions} from '../../../utils/navigation';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';

const image = require('../../../images/book-detail-bg.jpg');
export default class DetailPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, navigation.state.params.title, true);

  constructor(props) {
    super(props);
    this.state = {
      pageCount: 20,
      pdfIndex: 1,
      canOperate: false,
      everyTime: 0,
      totalTime: 0,
      pause: false,
    };
    this.pdfView = null;
    this.interval = null;
    this.sound = null;

    Sound.setCategory('Playback', true);
    this.audioPlay = this.audioPlay.bind(this);
    this.pdfPlay = this.pdfPlay.bind(this);
    this.playBack = this.playBack.bind(this);
    this.playForward = this.playForward.bind(this);
    this.playContinue = this.playContinue.bind(this);
    this.playPause = this.playPause.bind(this);
  }
  componentDidMount() {
    this.audioPlay();
  }
  componentWillUnmount() {
    this.quit();
  }

  quit() {
    clearInterval(this.interval);
    this.sound.release();
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
        this.playPause();
        this.setState({
          pdfIndex: 1,
        });
      }
    }, time);
  }
  audioPlay() {
    console.log('play');
    const {Mp3Path} = this.props.navigation.state.params;
    const testInfo = {
      url: Mp3Path,
    };
    const {pageCount} = this.state;
    const callback = (error, sound) => {
      if (error) {
        console.log('error', error.message);
        return;
      }
      console.log(
        'duration in seconds: ' +
          sound.getDuration() +
          'number of channels: ' +
          sound.getNumberOfChannels(),
      );
      const everyTime = (sound.getDuration() / (pageCount - 2)) * 1000;
      console.log('every time', everyTime);
      this.pdfPlay(everyTime);

      this.setState({
        canOperate: true,
        everyTime: everyTime / 1000,
        totalTime: sound.getDuration(),
      });

      sound.play(() => {
        // Success counts as getting to the end
        console.log('success');
        // Release when it's done so we're not using up resources
        sound.release();
      });
    };

    // If the audio is a 'require' then the second parameter must be the callback.
    this.sound = new Sound(testInfo.url, testInfo.basePath, (error) =>
      callback(error, this.sound),
    );
  }

  playBack() {
    const {canOperate, everyTime, totalTime} = this.state;
    if (!canOperate) {
      return;
    }
    this.sound.getCurrentTime((seconds) => {
      console.log('at ' + seconds);
      if (seconds - everyTime >= 0) {
        this.sound.setCurrentTime(seconds - everyTime);
        this.setState((prevState) => {
          return {
            pdfIndex: prevState.pdfIndex - (prevState.pdfIndex === 3 ? 2 : 1),
          };
        });
      }
    });
  }

  playForward() {
    const {canOperate, everyTime, totalTime} = this.state;
    if (!canOperate) {
      return;
    }
    this.sound.getCurrentTime((seconds) => {
      console.log('at ' + seconds);
      if (totalTime - seconds >= everyTime) {
        this.sound.setCurrentTime(seconds + everyTime);
        this.setState((prevState) => {
          return {
            pdfIndex: prevState.pdfIndex + (prevState.pdfIndex === 1 ? 2 : 1),
          };
        });
      }
    });
  }

  playPause() {
    const {canOperate, everyTime, totalTime} = this.state;
    if (!canOperate) {
      return;
    }
    this.setState({pause: true});
    clearInterval(this.interval);
    this.sound.pause();
  }

  playContinue() {
    const {canOperate, everyTime, pdfIndex} = this.state;
    if (!canOperate) {
      return;
    }
    this.setState({pause: false});
    this.pdfPlay(everyTime * 1000);
    this.sound.play();
    if (pdfIndex >= 3) {
      this.sound.setCurrentTime((pdfIndex - 2) * everyTime);
    } else {
      this.sound.setCurrentTime((pdfIndex - 1) * everyTime);
    }
  }

  render() {
    const {navigation} = this.props;
    const {pdfPath, title} = navigation.state.params;
    const {pdfIndex, pause} = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <Text style={styles.headerTitle}>{title}</Text>
            <TouchableOpacity
              onPress={() => {
                this.playPause();
                navigation.navigate('PublicPage', {
                  share: true,
                  coverPath: navigation.state.params.coverPath,
                  class: navigation.state.params.class,
                  title: navigation.state.params.title,
                });
              }}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name="share-social"
                  size={scaleSizeW(60)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={this.playBack}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name="play-back"
                  size={scaleSizeW(50)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (pause) {
                  this.playContinue();
                } else {
                  this.playPause();
                }
              }}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name={!pause ? 'pause' : 'play'}
                  size={scaleSizeW(50)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.playForward}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name="play-forward"
                  size={scaleSizeW(50)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.quit();
                navigation.navigate('RecordPage', {
                  title: title,
                  pdfPath: pdfPath,
                  isVisible: false,
                  keys: {
                    ...this.props.navigation.state.params.keys,
                    detail_key: this.props.navigation.state.key,
                  },
                });
              }}>
              <ImageBackground
                style={styles.btnBg}
                source={require('../../../images/btn-bg.jpg')}
                imageStyle={{borderRadius: scaleSizeW(50)}}>
                <Ionicons
                  name="mic"
                  size={scaleSizeW(60)}
                  style={{color: '#ffffff'}}
                />
              </ImageBackground>
            </TouchableOpacity>
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
