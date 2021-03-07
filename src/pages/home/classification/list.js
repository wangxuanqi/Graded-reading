import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {StackOptions} from '../../../utils/navigation';
import storage from '../../../store/storage';
import {NetGet} from '../../../utils/request';
import {scaleSizeH, scaleSizeW, setSpText} from '../../../utils/screen';
import * as storageText from '../../../data/storage';
import BookItem from '../../../components/common/bookItem';
export default class ListPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions(
      {navigation},
      navigation.state.params.title,
      true,
      navigation.state.params.parentTitle,
    );
  constructor(props) {
    super(props);
    this.state = {
      bookList: {},
    };
  }
  componentDidMount() {
    const {title} = this.props.navigation.state.params;
    // load
    storage
      .load({
        key: `${storageText.bookList}-${title}`,

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
        this.setState({bookList: ret.bookList});
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
    const {title} = this.props.navigation.state.params;
    NetGet('/book/' + title)
      .then((res) => {
        this.setState({bookList: res.data.bookList});
        storage.save({
          key: `${storageText.bookList}-${title}`, // Note: Do not use underscore("_") in key!
          data: res.data,

          // if expires not specified, the defaultExpires will be applied instead.
          // if set to null, then it will never expire.
          expires: 1000 * 3600,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {bookList} = this.state;
    //console.log('names', bookList);
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.content}>
            {Array.isArray(bookList.urlNames) &&
              bookList.urlNames.map((item, index) => (
                <BookItem
                  item={item}
                  key={index}
                  navigation={this.props.navigation}
                />
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
    backgroundColor: '#e5e6e7',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: scaleSizeW(20),
  },
  boxContainer: {
    width: scaleSizeW(200),
  },
  imgContainer: {
    borderRadius: scaleSizeW(30),
    overflow: 'hidden',
    backgroundColor: '#ffffff',
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
});
