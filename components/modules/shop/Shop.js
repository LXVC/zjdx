'use strict'
import React,{
  View,Text,Component,WebView,Navigator
} from 'react-native';

import WebViewBridge from 'react-native-webview-bridge';
import Web from '../me/Web';
// import Camera from 'react-native-camera';
// import QRCodeScreen from './QRCodeScreen';

var injectScript = `
var Youjia = new Object();
Youjia.scanQRCode = function(){
    WebViewBridge.send('open');
};
Youjia.pushUrl = function(url){
    WebViewBridge.send(url);
};
var is_app = "undefined" != typeof Youjia;
`

class Shop extends Component{

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  _onBridgeMessage(message){
      if (message.startsWith('http')) {
        this.props.navigator.push({
          component : Web,
          params : {
            url : message
          }
        })
      }
      if (message === 'open') {
        console.log(message);
      }
  }

  render() {
    return (
      <View style={{flex:1,marginTop:20}}>
        <WebViewBridge
          url={this.props.item.url}
          onBridgeMessage={this._onBridgeMessage.bind(this)}
          injectedJavaScript={injectScript}/>
      </View>
    )
  }
}


module.exports = Shop;
