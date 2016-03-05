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
      <View style={{marginTop:20}}>
        <WebView source={{uri:this.props.item.url}}/>
      </View>
    )
  }

}

module.exports = Job;
