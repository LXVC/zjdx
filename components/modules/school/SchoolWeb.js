'use strict'
import React,{
  Component,View,WebView,StyleSheet
} from 'react-native';

import NavBar from 'react-native-navbar';

class SchoolWeb extends Component{

  constructor(props) {
    super(props);
    this.state = {
      title : this.props.title,
      url : this.props.url
    }
  }

  render() {
    let title = {title:this.state.title};
    let leftButton = {
      title : '返回',
      handler : ()=>this.props.navigator.pop()
    };
    return (
      <View style={{flex:1}}>
        <NavBar title={title} leftButton={leftButton} style={styles.navbar}/>
        <WebView source={{uri:this.state.url}}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  navbar : {
    borderBottomWidth: 0.5,
    borderBottomColor : '#999'
  }
})
module.exports = SchoolWeb;
