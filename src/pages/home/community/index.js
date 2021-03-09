import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import {StackOptions} from '../../../utils/navigation';
import MomentItem from '../../../components/common/moment';
import {connect} from 'react-redux';
import {getAllMoments, thumbsUpMoment} from '../../../actions/actions';

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
          navigation.navigate('PublicPage', {share: false});
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
  }

  componentDidMount() {
    const {loginState} = this.props;
    this.props.getAllMoments(loginState.token);
  }

  render() {
    const {moment, loginState, navigation} = this.props;
    const allMomentsArr = moment.allMoments ? moment.allMoments : [];

    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          {allMomentsArr.map((item, index) => (
            <MomentItem
              item={item}
              key={index}
              loginState={loginState}
              thumbsUpCount={item.thumbsUp.length}
              navigation={navigation}
            />
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
const mapStateToProps = (state) => ({
  moment: state.moment,
  loginState: state.loginState,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMoments: (username) => dispatch(getAllMoments(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage);
