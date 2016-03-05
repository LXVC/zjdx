'use strict'
import React,{
  View,Text,Component,StyleSheet
} from 'react-native';
import NavBar from 'react-native-navbar';

class Sign extends Component{

  constructor(props) {
    super(props);
  }

  render() {

    let titleConfig = {
      title : '注册'
    }

    let leftButtonConfig = {
      title: '返回',
      handler: () => this.props.navigator.pop(),
    };

    return (
      <View style={styles.flex}>
        <NavBar title={titleConfig} leftButton={leftButtonConfig}/>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  flex : {
    flex : 1,
    backgroundColor : '#d59912'
  }
})

module.exports = Sign;
