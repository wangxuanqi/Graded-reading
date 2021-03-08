import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
  Image,
  Modal,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import {StackOptions} from '../../../utils/navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import {uploadOssFile} from '../../../utils/oss-upload';
import SpliteLine from '../../../components/common/spliteLine';

const options = {
  title: '选择图片',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '图片库',
  cameraType: 'back',
  mediaType: 'photo',
  videoQuality: 'high',
  durationLimit: 10,
  maxWidth: 600,
  maxHeight: 600,
  aspectX: 2,
  aspectY: 1,
  quality: 0.8,
  angle: 0,
  allowsEditing: false,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class PublicPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '发动态',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => (
      <TouchableOpacity
        style={{marginLeft: scaleSizeW(10)}}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={{fontSize: setSpText(30)}}>取消</Text>
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => {
          Alert.alert('提示', '您确定要进行配音吗', [
            {text: '取消', onPress: () => {}},
            {text: '确定', onPress: navigation.state.params.public},
          ]);
        }}>
        <Text style={styles.publicBtn}>发布</Text>
      </TouchableOpacity>
    ),
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: scaleSizeH(50),
      modalVisible: false,
      imagesPath: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({public: this.public});
  }

  onChangeText = (text) => {
    this.setState({
      text,
    });
  };

  public = () => {
    const {imagesPath, text} = this.state;
    let promises = [];

    for (let i = 0; i < imagesPath.length; i++) {
      console.log(imagesPath[i].url);
      promises.push(uploadOssFile(imagesPath[i].url));
    }
    Promise.all([...promises])
      .then((res) => {
        console.log('上传成功！', res);
        const paths = [
          'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
          'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
        ];
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  uploadImage = () => {
    ImagePicker.showImagePicker(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        console.log(source);
        this.setState((preState) => {
          return {imagesPath: [...preState.imagesPath, {url: source.uri}]};
        });
      }
    });
  };

  onContentSizeChange = (event) => {
    this.setState({height: event.nativeEvent.contentSize.height});
  };

  closeModal = () => {
    this.setState({modalVisible: false});
  };

  openModal = () => {
    this.setState({modalVisible: true});
  };

  deleteImage = (index) => {
    const {imagesPath} = this.state;
    imagesPath.splice(index, 1);
    this.setState({
      imagesPath,
    });
  };

  render() {
    const {text, height, imagesPath, modalVisible} = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={[styles.input, {height: height}]}
          placeholder="分享你的学习过程或者成就吧"
          onContentSizeChange={this.onContentSizeChange}
          onChangeText={this.onChangeText}
          value={text}
          multiline={true}
        />
        <SpliteLine
          contentStyle={{
            padding: scaleSizeW(30),
            paddingBottom: scaleSizeW(10),
            paddingTop: scaleSizeW(10),
          }}
          lineHeight={scaleSizeH(1)}
        />
        <View style={styles.photoContainer}>
          {imagesPath.map((item, index) => (
            <TouchableOpacity
              onPress={this.openModal}
              onLongPress={() => this.deleteImage(index)}
              delayLongPress={2000}
              key={index}>
              <Image
                source={{uri: item.url}}
                style={{
                  width: scaleSizeW(200),
                  height: scaleSizeW(200),
                  marginRight: scaleSizeW(30),
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
          {imagesPath.length < 9 && (
            <TouchableOpacity style={styles.photo} onPress={this.uploadImage}>
              <MaterialIcons
                name="add-photo-alternate"
                size={scaleSizeW(150)}
                style={{color: '#dadada'}}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.tipText}>(长按图片2s删除)</Text>
        <Modal visible={modalVisible} transparent={true}>
          <ImageViewer
            imageUrls={imagesPath}
            enableImageZoom={true}
            onClick={() => {
              // 图片单击事件
              this.closeModal();
            }}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: scaleSizeW(10),
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
    color: 'black',
    //设置标题的大小
    fontSize: 18,
    //居中显示
    alignSelf: 'center',
  },
  headerRight: {
    marginRight: scaleSizeW(10),
    backgroundColor: '#2396F3',
    height: scaleSizeH(60),
    width: scaleSizeW(90),
    borderRadius: scaleSizeH(30),
  },
  publicBtn: {
    fontSize: setSpText(30),
    color: '#fff',
    lineHeight: scaleSizeH(60),
    textAlign: 'center',
  },
  input: {
    width: Dimensions.get('window').width - scaleSizeW(20),
    fontSize: setSpText(30),
    padding: scaleSizeW(30),
    paddingBottom: scaleSizeW(10),
    paddingTop: scaleSizeW(10),
  },
  photoContainer: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scaleSizeW(30),
  },
  photo: {
    width: scaleSizeW(200),
    height: scaleSizeW(200),
    backgroundColor: '#eeeae8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    color: '#999999',
    marginLeft: scaleSizeW(30),
  },
});

export default PublicPage;
