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
// var USER;
// async function checkLogin(){
//     try {
//       var user = await AsyncStorage.getItem('user');
//       return user
//     } catch (e) {
//       console.warn(e);
//     }
// }
// checkLogin()
//   .then((user)=>{
//     if (user === null) {
//       console.log(1);
//         USER = null;
//     }else {
//       console.log(2);
//       USER = user;
//       console.log(USER);
//     }
//   }).done();
//   console.log(USER);
class app extends Component {
  constructor(props){
    super(props);
    this.state = {
      logined : true
    };
    console.log('begin');
    console.log('end');
  }

  // async _checkLogined(){
  //     try {
  //       var user = await AsyncStorage.getItem('user');
  //       if(user === null){
  //         this.setState({logined : false})
  //       }
  //     } catch (e) {
  //       console.warn(e);
  //     }
  // }
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
    console.log('change');
    this.setState({logined:true})
  }

  componentDidMount(){
    this.checkLogin()
  }
  // componentWillMount() {
  //   this._checkLogined()
  //   .then((user)=>{
  //     if(user === null){
  //       this.setState({logined:false})
  //     }
  //   }).done();
  //   // console.log(this._checkLogined());
  // }

  _renderScene(route,navigator){
    return <route.component {...route.params} route={route} navigator={navigator}/>
  }

  render() {
    console.log('render');
    if (this.state.logined) {
      let initIndexConfig = {component:Tab}
      return (
        <Navigator
          initialRoute={initIndexConfig}
          renderScene={this._renderScene}/>
      );
    }
    console.log('renderLogin');
    // let initLoginConfig = {component : Login,changePage : this.changeLoginState.bind(this)}
    return (
      // <Navigator
      //   initialRoute={initLoginConfig}
      //   renderScene={this._renderScene}/>
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
