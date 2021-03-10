// DetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import {connect} from 'react-redux';
import {getClockInfo} from '../../../actions/actions';
import moment from 'moment';

class ClockScreen extends React.Component {
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

  componentDidMount() {
    const {loginState, getClockInfoMap} = this.props;
    getClockInfoMap(loginState.token);
  }

  render() {
    const {clockInfo} = this.props;
    const hadClocked = !moment(
      moment(clockInfo.clock.clockTime).format('YYYY-MM-DD'),
    ).isBefore(moment().format('YYYY-MM-DD'));

    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <View style={styles.boxTop}>
            <View style={{width: scaleSizeW(120)}}>
              <Text style={styles.tabText}>已学单词</Text>
              <Text style={styles.numText}>{clockInfo.clock.learnedWord}</Text>
            </View>
            <View style={styles.line} />
            <View style={{width: scaleSizeW(120)}}>
              <Text style={styles.tabText}>打卡天数</Text>
              <Text style={styles.numText}>{clockInfo.clock.clockedDay}</Text>
            </View>
          </View>
          <View style={styles.boxBottom}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                this.props.navigation.navigate('WordPage', {});
              }}
              disabled={hadClocked}>
              <Text style={styles.btnText}>
                {hadClocked ? '今日已打卡' : '开始学习'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f1f2f3',
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
    width: scaleSizeW(650),
    height: scaleSizeH(300),
    borderRadius: scaleSizeH(20),
    backgroundColor: '#ffffff',
    elevation: 10, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: {width: 0, height: 0}, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
    marginTop: scaleSizeH(30),
    padding: scaleSizeW(30),
  },
  boxTop: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabText: {textAlign: 'center'},
  numText: {textAlign: 'center', fontSize: setSpText(55), fontWeight: 'bold'},
  line: {
    height: scaleSizeH(40),
    width: 1,
    backgroundColor: '#000',
  },
  boxBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: scaleSizeW(300),
    height: scaleSizeH(80),
    backgroundColor: 'rgb(33,150,243)',
    borderRadius: scaleSizeH(40),
  },
  btnText: {
    textAlign: 'center',
    color: '#ffffff',
    lineHeight: scaleSizeH(80),
    fontSize: setSpText(30),
  },
});

const mapStateToProps = (state) => ({
  clockInfo: state.clockInfo,
  loginState: state.loginState,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getClockInfoMap: (token) => dispatch(getClockInfo(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClockScreen);
