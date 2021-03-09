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
import {NetPost} from '../../utils/request';
import {connect} from 'react-redux';
import {insertComment, thumbsUpMoment} from '../../actions/actions';
class MomentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      commentAreaVisible: false,
      myCommentText: '',
    };
  }

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

  commitComment = () => {
    const {myCommentText} = this.state;
    const {item, loginState, insertCommentMap} = this.props;
    NetPost(
      '/moment/comment',
      {content: myCommentText, momentId: item._id},
      {
        headers: {
          Authorization: 'Bearer ' + loginState.token,
        },
      },
    )
      .then((res) => {
        console.log(res.data);
        insertCommentMap(res.data);
        this.setState({myCommentText: ''});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  thumbsUpMoment = () => {
    const {item, loginState, thumbsUpMomentMap} = this.props;
    NetPost(
      '/moment/thumbs-up',
      {momentId: item._id},
      {
        headers: {
          Authorization: 'Bearer ' + loginState.token,
        },
      },
    )
      .then((res) => {
        console.log(res.data);
        thumbsUpMomentMap(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {item, loginState, thumbsUpCount, navigation} = this.props;
    const {modalVisible, commentAreaVisible, myCommentText} = this.state;
    const hadThumbsUp = item.thumbsUp.indexOf(loginState._id) !== -1;
    let shareTitle = '';
    let shareClass = '';
    if (item.share) {
      const arr = item.imagesUrl[0].url.split('/');
      shareClass = arr[arr.length - 2];
      shareTitle = arr[arr.length - 1].replace('.png', '');
    }

    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../images/head.jpg')}
            style={styles.head}
          />
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.userName}>
            {item.publicUser.userName || 'test'}
          </Text>
          <Text style={styles.articleText}>{item.article}</Text>
          {!item.share && (
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
          )}
          {item.share && (
            <View style={styles.shareContainer}>
              <TouchableOpacity
                style={{
                  width: scaleSizeW(280),
                }}
                onPress={() => {
                  navigation.navigate('ListPage', {
                    title: shareClass,
                    parentTitle: '分类',
                  });
                }}>
                <Image
                  source={{uri: item.imagesUrl[0].url}}
                  style={{
                    width: scaleSizeW(280),
                    height: scaleSizeH(340),
                  }}
                  resizeMode="stretch"
                />
                <View style={styles.shareBottom}>
                  <Text style={{textAlign: 'center'}}>{shareClass}</Text>
                  <Text style={styles.shareTitle}>{shareTitle}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.bottomContent}>
            <Text>{moment(item.created_at).format('h:mm a  MM-DD')}</Text>
            <TouchableOpacity
              style={styles.comment}
              onPress={this.toggleCommentArea}>
              <FontAwesome name="commenting-o" size={scaleSizeW(30)} />
              <Text style={{marginLeft: scaleSizeW(10)}}>
                {item.commentUsers.length === 0
                  ? '评论'
                  : item.commentUsers.length}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thumbsUp}
              onPress={this.thumbsUpMoment}
              disabled={hadThumbsUp}>
              <FontAwesome
                name={hadThumbsUp ? 'thumbs-up' : 'thumbs-o-up'}
                size={scaleSizeW(30)}
                style={hadThumbsUp ? {color: '#4398ff'} : null}
              />
              <Text
                style={[
                  {marginLeft: scaleSizeW(10)},
                  hadThumbsUp ? {color: '#4398ff'} : null,
                ]}>
                {thumbsUpCount === 0 ? '赞' : thumbsUpCount}
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
                <TouchableOpacity
                  style={styles.commitBtnContainer}
                  onPress={this.commitComment}>
                  <Text style={styles.commitBtn}>提交</Text>
                </TouchableOpacity>
              </View>
              {item.commentUsers.length > 0 && (
                <View>
                  {item.commentUsers.map((o, i) => (
                    <Text
                      style={{
                        lineHeight: scaleSizeH(40),
                        marginLeft: scaleSizeW(10),
                      }}
                      key={i}>
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
    fontWeight: 'bold',
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
    justifyContent: 'flex-end',
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
  shareContainer: {
    paddingTop: scaleSizeW(30),
  },
  shareBottom: {
    width: scaleSizeW(280),
    backgroundColor: '#eeeeee',
    padding: scaleSizeW(5),
  },
  shareTitle: {
    textAlign: 'center',
    fontSize: setSpText(40),
    fontWeight: '900',
    lineHeight: scaleSizeH(40),
  },
});
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    insertCommentMap: (val) => dispatch(insertComment(val)),
    thumbsUpMomentMap: (val) => dispatch(thumbsUpMoment(val)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MomentItem);
