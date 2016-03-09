'use strict'
import React,{
  View,Text,Component,ScrollView,RefreshControl
} from 'react-native';
import NavBar from 'react-native-navbar';

class Message extends Component{

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing : false
    }
  }

  _onRefresh(){
    this.setState({isRefreshing:true});
    setTimeout(()=>{this.setState({isRefreshing:false}),clearTimeout()},2000)
  }
  render(){
    let title = {title:'消息中心'}
    let leftButton = {
      title : '返回',
      handler : ()=> this.props.navigator.pop()
    }
    let refreshConfig = <RefreshControl
      refreshing={this.state.isRefreshing}
      onRefresh={()=>this._onRefresh}
      tintColor='#06b8f2'
      title="loading...">
    </RefreshControl>

    return (
      <View style={{backgroundColor:'#83e0d0',flex:1}}>
      <NavBar title={title} leftButton={leftButton}/>
      <ScrollView refreshControl={refreshConfig}>
      </ScrollView>
      </View>
    )
  }
}

module.exports = Message;
