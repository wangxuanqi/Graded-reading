import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import {StackOptions} from '../../../utils/navigation';
import MomentItem from '../../../components/common/moment';

class CommunityPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '社区',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => <View />,
    headerRight: () => (
      <TouchableOpacity
        style={{padding: scaleSizeW(10)}}
        onPress={() => {
          navigation.navigate('PublicPage', {});
        }}>
        <Ionicons
          name="add-circle"
          size={scaleSizeW(50)}
          style={{color: '#4398ff'}}
        />
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
      data: [
        {
          thumbsUp: [],
          created_at: '2021-03-07T14:32:56.961Z',
          _id: '6044e418daf9d0649013e671',
          article: '123123123',
          publicUser: {
            _id: '60459d31edc66742285f45a9',
            userName: 'test',
          },
          imagesUrl: [
            {
              _id: '6044e418daf9d0649013e672',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
            },
            {
              _id: '6044e418daf9d0649013e673',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
          ],
          commentUsers: [],
        },
        {
          thumbsUp: [],
          created_at: '2021-03-07T14:56:44.375Z',
          _id: '6044e9ac8ab332a1d4e88516',
          article: '123123123',
          publicUser: {
            _id: '60459d31edc66742285f45a9',
            userName: 'test',
          },
          imagesUrl: [
            {
              _id: '6044e9ac8ab332a1d4e88517',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
            },
            {
              _id: '6044e9ac8ab332a1d4e88518',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
          ],
          commentUsers: [],
        },
        {
          thumbsUp: [],
          created_at: '2021-03-07T15:10:37.568Z',
          _id: '6044eced5da107a910b62df8',
          article: '123123123',
          publicUser: {
            _id: '60459d31edc66742285f45a9',
            userName: 'test',
          },
          imagesUrl: [
            {
              _id: '6044eced5da107a910b62df9',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
            },
            {
              _id: '6044eced5da107a910b62dfa',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
          ],
          commentUsers: [],
        },
        {
          thumbsUp: [],
          created_at: '2021-03-08T03:36:26.625Z',
          _id: '60459bba0dcec844c4cfcf54',
          article: '123123123',
          publicUser: {
            _id: '60459d31edc66742285f45a9',
            userName: 'test',
          },
          imagesUrl: [
            {
              _id: '60459bba0dcec844c4cfcf55',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
            },
            {
              _id: '60459bba0dcec844c4cfcf56',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
          ],
          commentUsers: [],
        },
        {
          thumbsUp: ['60459d31edc66742285f45a9'],
          created_at: '2021-03-08T03:42:42.371Z',
          _id: '60459d32edc66742285f45ae',
          article: '12312312dqwdqw大苏打实打实大撒大苏打3大撒大撒',
          publicUser: {
            _id: '60459d31edc66742285f45a9',
            userName: 'test',
          },
          imagesUrl: [
            {
              _id: '60459d32edc66742285f45af',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903860.12887538821596733.jpg',
            },
            {
              _id: '60459d32edc66742285f45b0',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
            {
              _id: '60459d32edc66742285f45b0',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
            {
              _id: '60459d32edc66742285f45b0',
              url:
                'https://graded-reading.oss-cn-shenzhen.aliyuncs.com/upload/assets/202103/16151246903950.2814058852879697.jpg',
            },
          ],
          commentUsers: [
            {
              created_at: '2021-03-08T04:14:37.202Z',
              _id: '6045a4be8b399e2ae803f299',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:14:37.202Z',
              _id: '6045a4f28b399e2ae803f29a',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:19:26.896Z',
              _id: '6045a5d10187b545ac44185b',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:20:50.471Z',
              _id: '6045a6288d8f771bc856c2c6',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:23:53.540Z',
              _id: '6045a6e021324b300cf5412f',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:26:15.071Z',
              _id: '6045a7693096d119088a0337',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:26:46.276Z',
              _id: '6045a78c472a0d1ab4117d5c',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
            {
              created_at: '2021-03-08T04:28:22.212Z',
              _id: '6045a7e98fc06e0db014f3db',
              user: '60459d31edc66742285f45a9',
              content: '非常好',
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          {this.state.data.map((item, index) => (
            <MomentItem item={item} key={index} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#eeeeee',
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
});

export default CommunityPage;
