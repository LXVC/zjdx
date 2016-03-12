'use strict'
import React,{
  View,TextInput,Component,StyleSheet,Dimensions
} from 'react-native';

import NavBar from 'react-native-navbar';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

class Feedback extends Component{

  constructor(props) {
    super(props)

  }

  render(){
    let title = {title:'问题反馈'};
    let leftButton = {
      title : '返回',
      handler : ()=>this.props.navigator.pop()
    }
    return (
        <View style={styles.flex}>
          <NavBar title={title} leftButton={leftButton}/>
          <View style={styles.inputWarp}>
            <TextInput style={styles.input}
              placeholder="请输入文字..."
              multiline={true}
              autoCapitalize="none"
              selectionColor="blue"/>
          </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  flex:{
    flex:1,
    backgroundColor:'#ddb483'
  },
  inputWarp : {
    height : 48,
    top : Height-64-48,
    backgroundColor : '#666'
  },
  input : {
      height : 30,
      width : Width*0.7,
      marginTop : 9,
      marginLeft : 10,
      backgroundColor : '#fff',
      borderWidth : 1,
  }
})

module.exports = Feedback;
