'use strict'
import React,{
  Component,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  AsyncStorage,
  Navigator
} from 'react-native';
import NavBar from 'react-native-navbar';

var Sign = require('./Sign');
var Forget = require('./Forget');
const LOGIN_URL = 'http://api.dev.yszjdx.com/user/login'

class _Login extends Component{

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      account : '',
      password : '',
      canPost : false
    }
  }

  _buttonOnClick(){
    fetch(
      LOGIN_URL,{
        method :'POST',
        body : 'account='+this.state.account+'&password='+this.state.password
      })
      .then((response)=>response.json())
      .then((responseData)=>{
        if (responseData.ok) {
          console.log('登录成功');
          AsyncStorage.setItem('user',JSON.stringify(responseData.data.user));
          this.props.route.changeLoginState();
        }else {
          alert(responseData.message)
        }
      })
  }

  _renderButton(){
      if (this.state.canPost) {
        return (
          <TouchableOpacity>
            <View style={styles.canButton}>
              <Text style={styles.text} onPress={this._buttonOnClick.bind(this)}>
                登录
              </Text>
            </View>
          </TouchableOpacity>
        )
      }
      return (
        <TouchableWithoutFeedback>
          <View style={styles.button}>
            <Text style={styles.text}>
              登录
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )
  }

  _changeButton(state){
    if (state.account.length >= 11 && state.password.length >= 6) {
      this.setState({canPost : true})
    }else {
      this.setState({canPost:false})
    }
  }

  _textOnClick(name){
      if (name === 'sign') {
        this.props.navigator.push({
          component : Sign
        })
      }else {
        this.props.navigator.push({
          component : Forget
        })
      }
  }

  render(){
    const titleConfig = {
      title : '登录'
    }
      return (
        <View style={styles.flex}>
          <NavBar title={titleConfig}/>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              autoFocus={true}
              placeholder="帐号"
              onChangeText={(account)=>{
                this.setState({account});
                this._changeButton(this.state)
              }}/>
              <TextInput
                style={styles.input}
                placeholder="密码"
                secureTextEntry={true}
                onChangeText={(password)=>{
                  this.setState({password});
                  this._changeButton(this.state)
                }}/>
              {this._renderButton()}
          </View>
          <View style={styles.forget}>
            <TouchableOpacity style={styles.flex}>
              <Text style={styles.textButton} onPress={()=>this._textOnClick('sign')}>
                立即注册
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flex}>
              <Text style={styles.textButton} onPress={()=>this._textOnClick('forget')}>
                忘记密码？
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
  }
}

class Login extends Component{
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  _renderScene(route,navigator){
    return (
      <route.component route={route} navigator={navigator}/>
    )
  }

  render(){
    let initLoginConfig = {component:_Login,changeLoginState:this.props.changeLoginState}
    return (
      <Navigator
        initialRoute={initLoginConfig}
        renderScene={this._renderScene}/>
    )
  }
}

var styles = StyleSheet.create({
  flex : {
    backgroundColor:'#ace660',
    flex : 1
  },
  container:{
    marginTop:20
  },
  input : {
    backgroundColor : '#49cfa2',
    borderWidth : 1,
    marginTop : 10,
    paddingLeft : 10,
    height : 40,
    marginLeft : 10,
    marginRight : 10,
    borderRadius : 6
  },
  canButton :{
    backgroundColor : 'green',
    marginTop : 20,
    height : 40,
    marginLeft : 20,
    marginRight : 20,
    paddingTop : 10
  },
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
  forget : {
    flexDirection:'row',
    marginTop : 20
  },
  textButton : {
    textAlign : 'center',
    color : '#cb19c9'
  }
})

module.exports = Login;
