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
  Modal,
  TextInput,
  Button,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {scaleSizeH, scaleSizeW, setSpText} from '../../utils/screen';

export default class MomentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      commentAreaVisible: false,
      myCommentText: '',
    };
  }

  componentDidMount() {}

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  toggleCommentArea = () => {
    this.setState({
      commentAreaVisible: !this.state.commentAreaVisible,
    });
  };

  onChangeText = (val) => {
    this.setState({
      myCommentText: val,
    });
  };

  render() {
    const {item} = this.props;
    const {modalVisible, commentAreaVisible, myCommentText} = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../images/head.jpg')}
            style={styles.head}
          />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.userName}>{item.publicUser.userName}</Text>
          <Text style={styles.articleText}>{item.article}</Text>
          <View style={styles.photoContainer}>
            {item.imagesUrl.map((o, index) => (
              <TouchableOpacity key={index} onPress={this.openModal}>
                <Image
                  source={{uri: o.url}}
                  style={{
                    width: scaleSizeW(180),
                    height: scaleSizeW(180),
                    marginRight: scaleSizeW(15),
                    marginTop: scaleSizeW(15),
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottomContent}>
            <Text>{moment(item.created_at).format('h:mm a  MM-DD')}</Text>
            <TouchableOpacity
              style={styles.comment}
              onPress={this.toggleCommentArea}>
              <FontAwesome name="commenting-o" size={scaleSizeW(30)} />
              <Text>评论</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.thumbsUp}>
              <FontAwesome name="thumbs-o-up" size={scaleSizeW(30)} />
              <Text style={{marginLeft: scaleSizeW(10)}}>
                {item.thumbsUp.length === 0 ? '赞' : item.thumbsUp.length}
              </Text>
            </TouchableOpacity>
          </View>
          {commentAreaVisible && (
            <View style={styles.commentArea}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder="请输入评论内容"
                  onChangeText={this.onChangeText}
                  value={myCommentText}
                  multiline={true}
                  style={styles.commentInput}
                />
                <TouchableOpacity style={styles.commitBtnContainer}>
                  <Text style={styles.commitBtn}>提交</Text>
                </TouchableOpacity>
              </View>
              {item.commentUsers.length > 0 && (
                <View>
                  {item.commentUsers.map((o, i) => (
                    <Text style={{lineHeight: scaleSizeH(40)}}>
                      {o.user.userName || 'test'}: {o.content}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
        <Modal visible={modalVisible} transparent={true}>
          <ImageViewer
            imageUrls={item.imagesUrl}
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
    marginTop: scaleSizeH(10),
    padding: scaleSizeW(20),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  head: {
    width: scaleSizeW(50),
    height: scaleSizeW(50),
    borderRadius: scaleSizeW(25),
  },
  rightContent: {
    padding: scaleSizeW(20),
    paddingTop: 0,
  },
  userName: {
    color: '#000',
    fontSize: setSpText(30),
    fontWeight: '800',
    lineHeight: setSpText(30),
  },
  articleText: {
    color: '#000',
    fontSize: setSpText(30),
    fontWeight: '800',
    lineHeight: setSpText(40),
    width: scaleSizeW(600),
    marginTop: scaleSizeH(20),
  },
  photoContainer: {
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bottomContent: {
    flexDirection: 'row',
    marginTop: scaleSizeH(20),
  },
  comment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: scaleSizeW(160),
    width: scaleSizeW(90),
  },
  thumbsUp: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: scaleSizeW(60),
    width: scaleSizeW(90),
  },
  commentArea: {
    backgroundColor: '#eeeeee',
    width: scaleSizeW(575),
    padding: scaleSizeW(20),
    paddingTop: scaleSizeH(10),
    paddingBottom: scaleSizeH(10),
    marginTop: scaleSizeH(20),
  },
  commentInput: {
    flex: 4,
    lineHeight: scaleSizeH(30),
    padding: scaleSizeW(10),
  },
  commitBtnContainer: {
    flex: 1,
    height: scaleSizeH(50),
    backgroundColor: '#2396F3',
  },
  commitBtn: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: scaleSizeH(50),
  },
});
