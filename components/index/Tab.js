'use strict'
import React,{
  TabBarIOS,Component,Image
} from 'react-native';

var Item = TabBarIOS.Item;

var School = require('../modules/School');
var Shop = require('../modules/Shop');
var Job = require('../modules/Job');
var Snack = require('../modules/Snack');
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
          return <School item={item}/>;
          break;
        case 1:
          return <Shop item={item}/>;
          break;
        case 2:
          return <Job item={item}/>;
          break;
        case 3:
          return <Snack item={item}/>;
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
      <TabBarIOS>
        {
          data.map(
          (item,index) => {
          return (
            <Item
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
      </TabBarIOS>
    )
}
}

module.exports = Tab;
