'use strict'
import React,{
  View,Text,Component,WebView
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';
import Details from './Details';

const injectScript =
  `
  if(WebViewBridge){
    var Youjia = new Object();
    Youjia.pushUrl = function(url){
        WebViewBridge.send(url);
    }
  }`;

class Job extends Component{

  constructor(props) {
    super(props);
    console.log(this.props);
  }

  _onBridgeMessage(message){
    if (message.startsWith('http')) {
      this.props.navigator.push({
        component : Details,
        params :{
          url : message
        }
      })
    }
  }

  render() {
    return (
      <View style={{flex:1,marginTop:20}}>
        <WebViewBridge
          url={this.props.item.url}
          injectedJavaScript={injectScript}
          onBridgeMessage={(message)=>this._onBridgeMessage(message)}/>
      </View>
    )
  }

}

module.exports = Job;
