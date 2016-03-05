'use strict'
import React,{
  View,Text,TouchableHighlight,Component
} from 'react-native';

import NavBar from 'react-native-navbar';

class Setting extends Component{

  constructor(props) {
    super(props);
  }

  render(){
      let leftButton = {
        title : '返回',
        handler : ()=>this.props.navigator.pop()
      }
      return (
        <View style={{flex:1,backgroundColor:'#ddd'}}>
          <NavBar
          title={{title:'设置'}}
          leftButton={leftButton}/>

        </View>
      )
  }

}

module.exports = Setting;
