'use strict'
import React,{
  View,Text,Component,StyleSheet,Dimensions
} from 'react-native';
import Camera from 'react-native-camera';
import NavBar from 'react-native-navbar';
import Web from '../me/Web';

class ScanQRCode extends Component{

  constructor(props) {
    super(props);
    this.state ={
      flag : true
    }
  }

  _onBarCodeRead(code){
      if (this.state.flag) {
        // alert(this.state.flag)
        alert(code.data);
        this.setState({flag:false})
        // alert(this.state.flag);
      }else {
        console.log(this.state.flag);
      }
  }

  render(){
      let title = {title:'扫描二维码'};
      let leftButton = {
        title : '返回',
        handler : ()=>this.props.navigator.pop()
      }
      return (
        <View style={{flex:1,backgroundColor:'#55112b'}}>
          <NavBar title={title} leftButton={leftButton}/>
          <Camera style={styles.preview} onBarCodeRead={(code)=>this._onBarCodeRead(code)}></Camera>
        </View>
      )
  }

}

var styles = StyleSheet.create({
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : (Dimensions.get('window').height-64-250)/2,
    marginLeft : (Dimensions.get('window').width-250)/2,
    height: 250,
    width: 250
  },
})

module.exports = ScanQRCode;
