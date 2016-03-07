'use strict'
import React,{
  WebView,Component,View,ProgressViewIOS,Navigator
} from 'react-native';

var WebViewBridge = require('react-native-webview-bridge');
import NavBar from 'react-native-navbar';


const injectScript =
  `
  if(WebViewBridge){
    var Youjia = new Object();
    var title = document.getElementsByTagName('title')[0].innerText;
    WebViewBridge.send(title)
    Youjia.pushUrl = function(url){
        WebViewBridge.send(url);
    }
  }`;

class Web extends Component{

  constructor(props) {
    super(props);
    this.state = {
      load : 0,
      url : this.props.url,
      title : '加载中...'
    }
  }

  _onBridgeMessage(message){
      if (message.startsWith('http')) {
        this.props.navigator.push({
          component : Web,
          params : {
            url : message
          }
        })
      }else {
        var title = '';
        let titles = message.split(' ');
        for(let i in titles){
          if(titles[i].length>=2){
            title = titles[i].replace('\n','');
          }
        };
        this.setState({title:title})
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
