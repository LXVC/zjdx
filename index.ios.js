/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Navigator
} from 'react-native';

var Tab = require('./components/index/Tab');
var Login = require('./components/login/Login');
// AsyncStorage.clear();
class app extends Component {
  constructor(props){
    super(props);
    this.state = {
      logined : true
    };
  }

  checkLogin(){
    AsyncStorage.getItem('user',(err,result)=>{
      if (err) {
        console.warn(err);
      }else {
        if (result === null) {
          console.log('null');
          this.setState({logined:false})
        }
      }
    })
  }

  changeLoginState(){
    this.setState({logined:!this.state.logined})
  }

  componentDidMount(){
    this.checkLogin()
  }

  _renderScene(route,navigator){
    return <route.component {...route.params} route={route} navigator={navigator}/>
  }

  render() {
    if (this.state.logined) {
      let initIndexConfig = {
        component:Tab,
        changeLoginState : this.changeLoginState.bind(this)
      }
      return (
        <Navigator
          initialRoute={initIndexConfig}
          renderScene={this._renderScene}/>
      );
    }
    return (
      <Login changeLoginState={this.changeLoginState.bind(this)}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('app', () => app);
