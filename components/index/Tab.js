'use strict'
import React,{
  TabBarIOS,Component,Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
var Item = TabNavigator.Item;

var School = require('../modules/school/School');
var Shop = require('../modules/shop/Shop');
var Job = require('../modules/job/Job');
var Snack = require('../modules/snack/Snack');
var Me = require('../modules/me/Me');


class Tab extends Component{

  constructor(props) {
    super(props);
    this.state = {
      selectedKey : 0,
      data : []
    }
  }

  _getData(){
    fetch('http://api.dev.yszjdx.com/app/menu')
      .then((response) =>response.json())
      .then((responseData)=>{
        if (responseData.ok) {
          this.setState({data:responseData.data});
        }else {
          alert('网络错误！');
        }
      })
  }

  componentDidMount() {
    this._getData()
  }

  _renderItem(item){
      switch (this.state.selectedKey) {
        case 0:
          return <School item={item} route={this.props.route} navigator={this.props.navigator}/>;
          break;
        case 1:
          return <Shop item={item} route={this.props.route} navigator={this.props.navigator}/>;
          break;
        case 2:
          return <Job item={item} route={this.props.route} navigator={this.props.navigator}/>;
          break;
        case 3:
          return <Snack item={item} route={this.props.route} navigator={this.props.navigator}/>;
          break;
        case 4:
          return <Me item={item} route={this.props.route} navigator={this.props.navigator}/>;
          break;
      }
  }

  render(){
    let data = this.state.data;
    // console.log(data);
    return (
      <TabNavigator tabBarStyle={{height:48}}>
        {
          data.map(
          (item,index) => {
          return (
            <Item
              renderIcon={()=><Image source={{uri:item.icon[0]}} style={{height:25,width:25}}/>}
              renderSelectedIcon={()=><Image source={{uri:item.icon[1]}} style={{height:25,width:25}}/>}
              titleStyle={{color:item.font.color[0]}}
              selectedTitleStyle={{color:item.font.color[1]}}
              title={item.text}
              key={index}
              selected={this.state.selectedKey === index}
              onPress={() => {
                this.setState({selectedKey:index})
              }}>
              {this._renderItem(item)}
            </Item>
          )
        })
      }
      </TabNavigator>
    )
}
}

module.exports = Tab;
