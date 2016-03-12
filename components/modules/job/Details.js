'use strict'
import React,{
  Component,View,WebView
} from 'react-native';

import NavBar from 'react-native-navbar';
import WebViewBridge from 'react-native-webview-bridge';
import Communications from 'react-native-communications';

const injectScript =
  `
  if(WebViewBridge){
    var Youjia = new Object();
    Youjia.openURL = function(url){
        WebViewBridge.send(url);
    }
  }`;

class Details extends Component{

  constructor(props) {
    super(props);
  }

  _onBridgeMessage(message){
    if (message.startsWith('tel')) {
      let tel = message.split(':')[1];
      Communications.phonecall(tel,false);
    }
  }

  render(){
    let title = {title:'兼职详情'};
    let leftButton = {
      title : '返回',
      handler : ()=>this.props.navigator.pop()
    }
    return (
        <View style={{flex:1}}>
          <NavBar title={title} leftButton={leftButton}/>
          <WebViewBridge
            url={this.props.url}
            injectedJavaScript={injectScript}
            onBridgeMessage={(message)=>this._onBridgeMessage(message)}/>
        </View>
    )
  }

}

module.exports = Details;
