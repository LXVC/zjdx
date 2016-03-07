'use strict'
import React,{
  View,Text,Component,WebView
} from 'react-native';


class Job extends Component{

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <View style={{flex:1,marginTop:20}}>
        <WebView
          source={{uri:this.props.item.url}}
          contentInset={{top:-20}}/>
      </View>
    )
  }

}

module.exports = Job;
