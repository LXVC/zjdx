'use strict'
import React,{
  View,Text,Component,WebView,StatusBar
} from 'react-native';


class Shop extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex:1}}>
        <WebView source={{uri:this.props.item.url}}/>
      </View>
    )
  }

}

module.exports = Shop;
