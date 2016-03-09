'use strict'
import React,{
  View,Text,Component,WebView
} from 'react-native';


class Snack extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <WebView
          source={{uri:this.props.item.url}}
          contentInset={{top:20}}/>
      </View>
    )
  }

}

module.exports = Snack;
