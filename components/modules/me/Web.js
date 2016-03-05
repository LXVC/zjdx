'use strict'
import React,{
  WebView,Component,View,ProgressViewIOS,Navigator
} from 'react-native';

var WebViewBridge = require('react-native-webview-bridge');
import NavBar from 'react-native-navbar';


const injectScript =
  `
  function trim(str){
    return str.replace(/\s|\xA0/g,"");
  }//去title里面的空格
  if(WebViewBridge){
    var Youjia = new Object();
    var title = document.getElementsByTagName('title')[0].innerText;
    WebViewBridge.send(trim(title))
    Youjia.pushUrl = function(url){
        WebViewBridge.send(url);
    }
  }`;

class Web extends Component{

  constructor(props) {
    super(props);
    console.log(1);
    console.log(this.props);
    this.state = {
      load : 0,
      url : this.props.url,
      title : '加载中...'
    }
  }

  _onBridgeMessage(message){
    console.log('message1');
    console.log(message);
      if (message.startsWith('http')) {
        this.props.navigator.push({
          component : Web,
          params : {
            url : message
          }
        })
      }else {
        this.setState({title:message})
      }
  }

  render(){
    let leftButton = {
      title : '返回',
      handler : ()=>this.props.navigator.pop()
    }
    return (
      <View style={{backgroundColor:'#0dd244',flex:1}}>
        <NavBar
          title={{title:this.state.title}}
          leftButton={leftButton}/>
        <WebViewBridge
          onBridgeMessage={this._onBridgeMessage.bind(this)}
          injectedJavaScript={injectScript}
          url={this.state.url}/>
      </View>
    )
  }
}

module.exports = Web;
