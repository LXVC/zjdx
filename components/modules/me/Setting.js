'use strict'
import React,{
  View,Text,TouchableOpacity,Component,StyleSheet,AsyncStorage
} from 'react-native';

import NavBar from 'react-native-navbar';

class Setting extends Component{

  constructor(props) {
    super(props);
    console.log(this.props.changeLoginState);
  }

  exit(){
      AsyncStorage.clear();
      this.props.changeLoginState();
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
        <TouchableOpacity style={styles.button} onPress={()=>this.exit()}>
          <Text style={styles.text}>
            退出登录
          </Text>
        </TouchableOpacity>
        </View>
      )
  }

}

var styles = StyleSheet.create({
  button:{
    backgroundColor : 'red',
    marginTop : 20,
    height : 40,
    marginLeft : 20,
    marginRight : 20,
    paddingTop : 10
  },
  text : {
    fontSize : 20,
    color : '#fff',
    textAlign : 'center',
  },
})
module.exports = Setting;
