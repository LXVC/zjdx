'use strict'
import React,{
  View,Text,Component,Navigator,StyleSheet,Image,TouchableHighlight,TouchableOpacity
} from 'react-native';

var NavBar = require('react-native-navbar');
var Web = require('./Web');
var Setting = require('./Setting');

const url = 'http://api.dev.yszjdx.com/app/user/ios'

class Me extends Component{

  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      auth_btn : {},
      list_menu : [],
      sub_title : '',
      title : '',
      top_menu : [],
      dataIsWell : false
    }
  }

  componentDidMount(){
    this._getData()
  }

  _getData(){
      fetch(url)
        .then((response)=>response.json())
        .then((responseData)=>{
          if (responseData.ok) {
            this.setState({
              auth_btn : responseData.data.auth_btn,
              list_menu : responseData.data.list_menu,
              sub_title : responseData.data.sub_title,
              title : responseData.data.title,
              top_menu : responseData.data.top_menu,
              dataIsWell : true
              })
          }
        })
  }

  urlOnClick(item){
      this.props.navigator.push({
        component : Web,
        params :{
          url : item.url
        }
      })
  }

  renderTopMenu(){
    return (
      this.state.top_menu.map((item,index)=>{
        return (
          <TouchableOpacity key={index} style={styles.top_menu_item} onPress={()=>this.urlOnClick(item)}>
          <View>
            <Text style={{textAlign:'center',paddingTop:10,paddingBottom:10}}>
              {item.number}{'\n'}
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
        )
      })
    )
  }

  rendeListMenu(){
    return (
      this.state.list_menu.map((item,index)=>{
        return (
          <TouchableHighlight key={index} onPress={()=>this.urlOnClick(item)}>
            <View style={styles.list_menu_item}>
              <Image source={{uri:item.icon}} style={styles.icon}/>
                <Text style={{flex:1,paddingLeft :20}}>
                  {item.title}
                </Text>
            </View>
          </TouchableHighlight>
        )
      })
    )
  }

  render() {
    if (!this.state.dataIsWell) {
      // console.log(this.state);
      return <View/>
    }

    let rightButton = {
      title : '设置',
      handler : ()=>this.props.navigator.push({
          component : Setting
      })
    }
    return (
      <View style={styles.flex}>
        <NavBar title={{title:this.props.item.text}}
                rightButton={rightButton}/>
        <View style={styles.preson}>
          <Text>
            {this.state.title}{'\n'}
            {this.state.sub_title}
          </Text>
        </View>
        <View style={styles.top_menu}>
          {this.renderTopMenu()}
        </View>
        <View style={styles.list_menu}>
          {this.rendeListMenu()}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  flex :{
    flex : 1,
    // flexDirection : 'column',
    backgroundColor : '#c37d1a'
  },
  preson : {
    height : 50,
    backgroundColor : '#41daf4'
  },
  top_menu : {
    height : 80,
    backgroundColor : '#aa9f90',
    flexDirection : 'row',
    alignItems : 'center'
  },
  top_menu_item : {
    backgroundColor : '#0eaa94',
    flex : 1,
  },
  list_menu:{
    flex : 1,
    // backgroundColor :'#fff'
  },
  list_menu_item :{
    flexDirection : 'row',
    height : 40,
    alignItems : 'center',
    backgroundColor : '#fff',
    paddingLeft : 20,
    borderBottomWidth : 1
  },
  icon : {
    height : 20,
    width : 20,
    // flex : 2
  }
})


module.exports = Me;
