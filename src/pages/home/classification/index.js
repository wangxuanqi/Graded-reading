import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {NetGet} from '../../../utils/request';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import storage from '../../../store/init';
import * as storageText from '../../../data/storage';

const TITLE = '分类';

/*最热页面*/
export default class IndexPage extends Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: TITLE,
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
    this.state = {
      bookClassifyList: [],
    };
  }
  componentDidMount() {
    // load
    storage
      .load({
        key: storageText.bookClassify,

        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,

        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then((ret) => {
        // found data go to then()
        this.setState({bookClassifyList: ret});
        console.log('storage', ret);
      })
      .catch((err) => {
        // any exception including data not found
        // goes to catch()
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            this.getBook();
            break;
          case 'ExpiredError':
            this.getBook();
            break;
        }
      });
  }
  getBook() {
    NetGet('/book')
      .then((res) => {
        console.log('api', res);
        this.setState({bookClassifyList: res.data});
        storage.save({
          key: storageText.bookClassify, // Note: Do not use underscore("_") in key!
          data: res.data,

          // if expires not specified, the defaultExpires will be applied instead.
          // if set to null, then it will never expire.
          expires: 1000 * 3600,
        });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }
  handlePress() {
    console.log('press');
  }

  handleLongPress() {
    console.log('long press');
  }
  render() {
    const {bookClassifyList} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <ScrollView style={{flex: 1}}>
          <View style={styles.boxContainer}>
            {Array.isArray(bookClassifyList.pdf_cover) &&
              bookClassifyList.pdf_cover.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imgContainer}
                  onPress={() => {
                    this.props.navigation.navigate('ListPage', {
                      title: item.name,
                      parentTitle: TITLE,
                    });
                  }}
                  onLongPress={this.handleLongPress}>
                  {item.urlNames.map((o, i) => (
                    <Image source={{uri: o}} key={i} style={styles.img} />
                  ))}
                  <Text style={styles.title}>{item.name}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#e5e6e7',
  },
  headerStyle: {
    backgroundColor: '#ffffff',
  },
  headerTitleStyle: {
    //标题的文字颜色
    color: 'black',
    //设置标题的大小
    fontSize: setSpText(35),
    //居中显示
    alignSelf: 'center',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imgContainer: {
    width: scaleSizeW(210),
    height: scaleSizeW(250),
    margin: scaleSizeW(15),
    borderRadius: scaleSizeW(20),
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: scaleSizeW(80),
    height: scaleSizeW(80),
    borderRadius: scaleSizeW(10),
    margin: scaleSizeW(10),
  },
  title: {
    fontSize: setSpText(25),
  },
});
