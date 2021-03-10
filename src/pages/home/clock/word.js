import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import {StackOptions} from '../../../utils/navigation';
import {connect} from 'react-redux';
import data from './data';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateClockInfo} from '../../../actions/actions';

class WordScreen extends React.Component {
  //设置顶部导航栏的内容
  static navigationOptions = ({navigation, screenProps}) => ({
    //左侧标题
    headerTitle: '单词闯关',
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    headerLeft: () => (
      <TouchableOpacity
        style={styles.headerLeft}
        onPress={() => {
          Alert.alert('提示', '您确定要退出单词闯关吗，退出不会保存闯关记录', [
            {text: '取消', onPress: () => {}},
            {text: '确定', onPress: navigation.goBack},
          ]);
        }}>
        <Ionicons
          name={'ios-chevron-back-sharp'}
          size={scaleSizeW(60)}
          style={{color: '#4398ff'}}
        />
        <Text style={{fontSize: setSpText(35), color: '#4398ff'}}>打卡</Text>
      </TouchableOpacity>
    ),
    headerRight: () => <View />,
    //顶部标题栏的样式
    headerStyle: styles.headerStyle,
    //顶部标题栏文字的样式
    headerTitleStyle: styles.headerTitleStyle,
  });

  constructor(props) {
    super(props);
    this.state = {
      chosen: false,
      canChoose: true,
      chosenIndex: 0,
      currentWordCard: data,
      nextWordCard: [],
      wordCardIndex: 0,
      totalWordNum: data.length,
    };
  }

  chooseAnswer = (index, correct) => {
    const {nextWordCard, currentWordCard, wordCardIndex} = this.state;

    this.setState({
      chosen: true,
      canChoose: false,
      chosenIndex: index,
    });
    setTimeout(() => {
      if (!correct) {
        this.setState({
          nextWordCard: [...nextWordCard, currentWordCard[wordCardIndex]],
        });
      }
      if (wordCardIndex === currentWordCard.length - 1) {
        if (this.state.nextWordCard.length === 0) {
          this.clockSuccess();

          return;
        } else {
          this.setState({
            chosen: false,
            canChoose: true,
            currentWordCard: this.state.nextWordCard,
            nextWordCard: [],
            wordCardIndex: 0,
          });
        }
      } else {
        this.setState({
          chosen: false,
          canChoose: true,
          wordCardIndex: wordCardIndex + 1,
        });
      }
    }, 2000);
  };

  clockSuccess = () => {
    const {navigation, clockInfo, updateClockInfoMap, loginState} = this.props;
    const {totalWordNum} = this.state;
    console.log(
      clockInfo.clock.learnedWord + totalWordNum,
      clockInfo.clock.clockedDay + 1,
    );
    updateClockInfoMap(loginState.token, {
      learnedWord: clockInfo.clock.learnedWord + totalWordNum,
      clockedDay: clockInfo.clock.clockedDay + 1,
    });
    console.log('打卡完成');
    Alert.alert('提示', '恭喜您闯关成功！', [
      {text: '确定', onPress: navigation.goBack},
    ]);
  };

  render() {
    const {
      canChoose,
      chosen,
      chosenIndex,
      wordCardIndex,
      currentWordCard,
      nextWordCard,
      totalWordNum,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={{marginTop: scaleSizeH(30), width: scaleSizeW(600)}}>
          <Text style={{textAlign: 'right'}}>
            闯关剩余单词数：
            {currentWordCard.length - wordCardIndex + nextWordCard.length}/
            {totalWordNum}
          </Text>
        </View>
        <View style={styles.boxContainer}>
          <Text style={{fontSize: setSpText(40)}}>
            {currentWordCard[wordCardIndex].title}
          </Text>
          <Image
            source={{uri: currentWordCard[wordCardIndex].imageUrl}}
            style={styles.img}
            resizeMode="cover"
          />
        </View>
        {currentWordCard[wordCardIndex].options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.btn,
              chosen && (item.correct || index === chosenIndex)
                ? item.correct
                  ? styles.greenBorder
                  : styles.redBorder
                : styles.normalBorder,
            ]}
            disabled={!canChoose}
            onPress={() => this.chooseAnswer(index, item.correct)}>
            <Text style={styles.btnText}>{item.value}</Text>
            {chosen && (item.correct || index === chosenIndex) && (
              <Ionicons
                name={
                  item.correct
                    ? 'checkmark-circle-outline'
                    : 'close-circle-outline'
                }
                size={scaleSizeW(50)}
                style={[
                  styles.icon,
                  item.correct ? {color: 'green'} : {color: 'red'},
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
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
  headerLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    height: scaleSizeH(400),
    borderRadius: scaleSizeH(20),
    backgroundColor: '#ffffff',
    elevation: 10, //  设置阴影角度，通过这个设置有无阴影（这个是最重要的，决定有没有阴影）
    shadowColor: 'black', //  阴影颜色
    shadowOffset: {width: 0, height: 0}, // 阴影偏移
    shadowOpacity: 1, // 阴影不透明度
    shadowRadius: 10, //  圆角
    marginTop: scaleSizeH(30),
    padding: scaleSizeW(30),
    alignItems: 'center',
  },
  img: {
    width: scaleSizeW(400),
    height: scaleSizeH(200),
    borderRadius: scaleSizeW(20),
    marginTop: scaleSizeH(30),
  },
  btn: {
    width: scaleSizeH(300),
    height: scaleSizeH(80),
    backgroundColor: '#fff',
    borderRadius: scaleSizeH(40),
    marginTop: scaleSizeH(50),
    borderStyle: 'solid',
    borderWidth: scaleSizeW(1),
    position: 'relative',
  },
  greenBorder: {
    borderColor: 'green',
  },
  redBorder: {
    borderColor: 'red',
  },
  normalBorder: {
    borderColor: '#999999',
  },
  btnText: {
    textAlign: 'center',
    lineHeight: scaleSizeH(80),
    fontSize: setSpText(35),
  },
  icon: {position: 'absolute', right: 0, top: scaleSizeH(5)},
});

const mapStateToProps = (state) => ({
  loginState: state.loginState,
  clockInfo: state.clockInfo,
});
const mapDispatchToProps = (dispatch) => {
  return {
    updateClockInfoMap: (token, param) =>
      dispatch(updateClockInfo(token, param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordScreen);
