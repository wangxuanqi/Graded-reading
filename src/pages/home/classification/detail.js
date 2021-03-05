import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PDFView from 'react-native-pdf-view';
import {StackOptions} from '../../../utils/navigation';

const {height, width} = Dimensions.get('window');

export default class DetailPage extends Component {
  static navigationOptions = ({navigation, screenProps}) =>
    StackOptions({navigation}, navigation.state.params.title, true);

  constructor(props) {
    super(props);
    this.state = {
      pageCount: 10,
      pdfIndex: 1,
    };
    this.pdfView = null;
    this.interval = null;
  }
  componentDidMount() {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.setState((prevState) => {
          return {pdfIndex: prevState.pdfIndex + 1};
        });

        if (this.state.pdfIndex >= this.state.pageCount - 1) {
          clearInterval(this.interval);
        }
        //do whatever here..
      }, 5000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {pdfPath} = this.props.navigation.state.params;
    const {pdfIndex} = this.state;

    return (
      <ScrollView style={styles.pdfcontainer}>
        <PDFView
          ref={(pdf) => {
            this.pdfView = pdf;
          }}
          key="sop"
          path={pdfPath}
          pageNumber={pdfIndex}
          onLoadComplete={(pageCount) => {
            this.setState({pageCount: pageCount});
          }}
          style={styles.pdf}
        />
      </ScrollView>
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
