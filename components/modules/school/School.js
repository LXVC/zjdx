'use strict'
import React,{
  View,Text,Component,StyleSheet,Image,
  TouchableHighlight,Dimensions,TouchableOpacity,WebView
} from 'react-native';

const Width = Dimensions.get('window').width;
var NavBar = require('react-native-navbar');
var Swiper = require('react-native-swiper');
import Setting from '../me/Setting';
import Web from '../me/Web';
import SchoolWeb from './SchoolWeb';

var url ='http://api.dev.yszjdx.com/app/campus';

class School extends Component{

  constructor(props) {
    super(props);
    this.state = {
      banner : [],
      module : [],
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
          console.log(responseData);
          if (responseData.ok) {
            this.setState({
              banner:responseData.data.banner,
              module:responseData.data.module,
              dataIsWell:true
            })
          }
        })
  }

  _renderSwiper(){
    return this.state.banner.map(
      (item,index)=>{
        return (
          <TouchableHighlight key={index} onPress={()=>this._urlOnClick(item)}>
            <Image source={{uri:item.pic}} style={styles.swiperItem}/>
          </TouchableHighlight>
        )
      }
    )
  }

  _urlOnClick(item){
    // alert(Object.keys(item))
    this.props.navigator.push({
      component : SchoolWeb,
      params : {
        url : item.url,
        title : item.title
      }
    })
  }

  _renderSecond(){
      let second = this.state.module.slice(3,5)
      return second.map(
        (item,index)=>{
          return (
            <TouchableOpacity key={index} style={[styles.secondItem,{backgroundColor:item.background},styles.center]}>
              <View>
                <Image source={{uri:item.pic}} style={styles.pic}/>
                <Text style={[styles.text,{marginLeft:5}]}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )
        }
      )
  }

  render() {
    if (!this.state.dataIsWell) {
      return <View/>
    }
    let rightButton = {
      title: '设置',
      handler: ()=>this.props.navigator.push({
        component : Setting,
        params : {
          changeLoginState : this.props.route.changeLoginState
        }
      })
    }
    let module = this.state.module;
    return (
      <View style={{flex:1,backgroundColor:'#ddd'}}>
        <NavBar
          title={{title:this.props.item.text}}
          rightButton={rightButton}/>
        <Swiper height={130}>
            {this._renderSwiper()}
        </Swiper>

        <View style={styles.main}>

          <View style={styles.first}>
            <TouchableOpacity style={[styles.center,{backgroundColor:module[0].background,marginRight:5}]}>
              <View>
                <Image source={{uri:module[0].pic}} style={styles.pic}/>
                <Text style={[styles.text,{marginLeft:-9}]}>{module[0].title}</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.center,]}>
                <TouchableOpacity style={[styles.center,{backgroundColor:module[1].background,width:(Width-25)/2,marginBottom:5}]}>
                  <View>
                    <Image source={{uri:module[1].pic}} style={styles.pic}/>
                    <Text style={[styles.text,{marginLeft:5}]}>
                      {module[1].title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.center,{backgroundColor:module[2].background,width:(Width-25)/2}]}>
                  <View>
                    <Image source={{uri:module[2].pic}} style={styles.pic}/>
                    <Text style={[styles.text,{marginLeft:5}]}>
                      {module[2].title}
                    </Text>
                  </View>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.second}>
            {this._renderSecond()}
            <TouchableOpacity style={[styles.secondItem,{backgroundColor:module[5].background},styles.center,{marginRight:0}]}>
              <View>
                <Image source={{uri:module[5].pic}} style={styles.pic}/>
                <Text style={[styles.text,{marginLeft:5}]}>{module[5].title}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.second}>
            <TouchableOpacity style={[styles.secondItem,{backgroundColor:module[6].background},styles.center]}>
              <View>
                <Image source={{uri:module[6].pic}} style={styles.pic}/>
                <Text style={[styles.text,{marginLeft:5}]}>{module[6].title}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondItem,{backgroundColor:module[7].background},styles.center,{marginRight:0}]}>
              <View>
                <Image source={{uri:module[7].pic}} style={styles.pic}/>
                <Text style={[styles.text,{marginLeft:5}]}>{module[7].title}</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    )
  }
}

var styles = StyleSheet.create({
  swiperItem : {
    height : 120,
    width : Width
  },
  main : {
    flex : 1,
    marginTop : -5,
    marginLeft : 10,
    marginRight :10,
    marginBottom : 55,
    // backgroundColor :'#413f53'
  },
  first : {
    flexDirection : 'row',
    height : (Width-25)/2,
    // backgroundColor : '#664922',
    marginBottom:5
  },
  center : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  pic : {
    width : 40,
    height : 40
  },
  text: {
    textAlign : 'center',
    color :'#fff',
    fontWeight:"900"
  },
  second : {
    flexDirection : 'row',
    marginBottom : 5,
    height :(Width-25)/3.5
  },
  secondItem : {
    flex : 1,
    marginRight : 5
  }
})

module.exports = School;
