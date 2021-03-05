import React, {Component} from 'react';
import RNFS from 'react-native-fs';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scaleSizeH, scaleSizeW, setSpText} from '../../utils/screen';

export default class BookItem extends Component {
  constructor(props) {
    super(props);
    const {item} = this.props;

    this.state = {
      downloaded: false,
      loading: false,
    };
    this.spinValue = new Animated.Value(0);
    this.pdfPath = `${RNFS.DocumentDirectoryPath}/${item.title}.pdf`;

    RNFS.exists(this.pdfPath).then((exists) => {
      if (exists) {
        console.log('File EXISTS');
        this.setState({
          downloaded: true,
        });
      } else {
        console.log('File DOES NOT EXIST');
      }
    });
  }

  componentDidMount() {
    console.log(
      '🚀 ~ file: bookItem.js ~ line 47 ~ BookItem ~ componentDidMount ~ RNFS.exists(this.pdfPath)',
      RNFS.exists(this.pdfPath),
    );
  }
  componentWillUnmount() {
    this.setState({loading: false});
  }
  //旋转方法
  spin = () => {
    const {loading} = this.state;

    this.spinValue.setValue(0);
    if (loading) {
      Animated.timing(this.spinValue, {
        toValue: 1, // 最终值 为1，这里表示最大旋转 360度
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => this.spin());
    }
  };
  handlePress() {
    console.log('press');
    const {item, navigation} = this.props;
    const {loading, downloaded} = this.state;

    if (downloaded) {
      console.log(
        '🚀 ~ file: bookItem.js ~ line 69 ~ BookItem ~ handlePress ~ navigation',
        navigation,
      );
      navigation.navigate('DetailPage', {
        title: item.title,
        pdfPath: this.pdfPath,
      });
      return;
    }
    if (!loading) {
      setTimeout(() => {
        this.setState({
          downloaded: true,
          loading: true,
        });
        this.spin();
      });
    }

    const DownloadFileOptions = {
      fromUrl: item.downloadPdfUrl, // URL to download file from
      toFile: this.pdfPath, // Local filesystem path to save the file to
    };
    console.log(DownloadFileOptions);
    const result = RNFS.downloadFile(DownloadFileOptions);
    console.log(result);
    result.promise
      .then(
        (val) => {
          this.setState({
            downloaded: true,
            loading: false,
          });
        },
        (val) => {
          this.setState({
            downloaded: false,
            loading: false,
          });
          console.log('Error Result:' + JSON.stringify(val));
        },
      )
      .catch(function (error) {
        console.log(error.message);
      });
  }
  handleLongPress() {
    console.log('long Press');
  }

  render() {
    const {item} = this.props;
    const {downloaded, loading} = this.state;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1], //输入值
      outputRange: ['0deg', '360deg'], //输出值
    });

    return (
      <TouchableOpacity
        style={styles.boxContainer}
        onPress={this.handlePress.bind(this)}
        onLongPress={this.handleLongPress}>
        <View style={styles.imgContainer}>
          <Image
            source={{uri: item.coverUrl}}
            style={styles.img}
            resizeMode="contain"
          />
          {!downloaded && <View style={styles.mask} />}
          {loading && (
            <Animated.View
              style={[styles.loading, {transform: [{rotate: spin}]}]}>
              <AntDesign
                name="loading2"
                size={scaleSizeW(80)}
                style={{color: '#4398ff'}}
              />
            </Animated.View>
          )}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        {!downloaded && (
          <Ionicons
            style={styles.icon}
            name="md-cloud-download"
            size={scaleSizeW(60)}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  boxContainer: {
    width: scaleSizeW(200),
    position: 'relative',
  },
  imgContainer: {
    borderRadius: scaleSizeW(30),
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    lineHeight: scaleSizeH(60),
    fontSize: scaleSizeW(25),
  },
  img: {
    width: scaleSizeW(200),
    height: scaleSizeW(200),
  },
  icon: {
    position: 'absolute',
    right: scaleSizeW(20),
    top: 0,
    opacity: 0.8,
    color: '#4398ff',
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
    opacity: 0.2,
  },
  loading: {
    position: 'absolute',
    top: scaleSizeW(60),
    left: scaleSizeW(60),
    color: '#4398ff',
  },
});
