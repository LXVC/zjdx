'use strict'
import React,{
  View,Text,Component
} from 'react-native';
var NavBar = require('react-native-navbar');

class School extends Component{

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{marginTop:20}}>
        <Text>
          我是校园模块
        </Text>
      </View>
    )
  }

}

module.exports = School;
