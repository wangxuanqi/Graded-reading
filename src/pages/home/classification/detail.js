import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
//import Pdf from 'react-native-pdf';
import {StackOptions} from '../../../utils/navigation';

const {height, width} = Dimensions.get('window');

export default class DetailPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, navigation.state.params.title, true);

  constructor(props) {
    super(props);
    this.state = {
      pageCount: 1,
    };
    this.pdfView = null;
  }
  render() {
    // let pages = [];
    // const {pdfPath} = this.props.navigation.state.params;

    // for (var i = 2; i < this.state.pageCount + 1; i++) {
    //   pages.push(
    //     <PDFView
    //       ref={(pdf) => {
    //         this.pdfView = pdf;
    //       }}
    //       key={'sop' + i}
    //       path={pdfPath}
    //       pageNumber={i}
    //       style={styles.pdf}
    //     />,
    //   );
    // }

    // return (
    //   <ScrollView style={styles.pdfcontainer}>
    //     <PDFView
    //       ref={(pdf) => {
    //         this.pdfView = pdf;
    //       }}
    //       key="sop"
    //       path={pdfPath}
    //       pageNumber={1}
    //       onLoadComplete={(pageCount) => {
    //         this.setState({pageCount: pageCount});
    //         console.log(`pdf共有: ${pageCount}页`);
    //       }}
    //       style={styles.pdf}
    //     />

    //     {pages.map((elem, index) => {
    //       return elem;
    //     })}
    //   </ScrollView>
    // );
    return (
      <View>
        <Text>detail</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
