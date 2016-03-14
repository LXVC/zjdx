/* auto-toggle TextInput */

import React, {
	Component,
	Platform,
	TextInput,
	View,
	Text,
	DeviceEventEmitter,
	StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

var NavBar = require('react-native-navbar');
const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').Width;
const url = 'http://api.dev.yszjdx.com/feedback/add';

class SoftInput extends Component {
	constructor(props) {
		super(props)
		this.state = {
			keyboardSpace: 0,
		};
		this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this);
		this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this);
	}
	updateKeyboardSpace(frames) {
		if (!frames.endCoordinates)
		    	return ;
		this.setState({
		    	keyboardSpace: frames.endCoordinates.height
		});
	}
	resetKeyboardSpace() {
		this.setState({
			keyboardSpace: 0
		});
	}
	componentDidMount() {
		this._listeners = [
			DeviceEventEmitter.addListener('keyboardWillShow', this.updateKeyboardSpace),
			DeviceEventEmitter.addListener('keyboardWillHide', this.resetKeyboardSpace),
		];
	}
	componentWillUnmount() {
		this._listeners.forEach(function(listener) {
		    	listener.remove();
		});
	}
  /*
    this.props.scroll: Scroll method with scrollview : (offset) => { this.refs.scrollView.scrollTo(offset) }
  */
	onFocus() {
		const { scroll } = this.props;
		this.textInput.measure((ox, oy, width, height, px, py) => {
      // alert(this.state.keyboardSpace)
			scroll(py - this.state.keyboardSpace + -25)
		});
	}
	onBlur() {
		const { scroll } = this.props;
		scroll(0);
	}

	render() {
		const {
			keyboardType,
			onChangeText,
			placeholder,
			secureTextEntry,
			multiline,
			value,
			style,
      onSubmitEditing
		} = this.props;

		if(Platform.OS == 'android') {
			return (
				<TextInput
					ref={textInput => this.textInput = textInput}
					onFocus={this.onFocus.bind(this)}
					onBlur={this.onBlur.bind(this)}
					style={[styles.inputAndroid, style]}
					value={value}
					secureTextEntry={secureTextEntry}
					multiline={multiline}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor={"#CCCCCC"}
					underlineColorAndroid={"transparent"}/>
			)
		}else if(Platform.OS == 'ios') {
			return (
				<TextInput
					ref={textInput => this.textInput = textInput}
					onFocus={this.onFocus.bind(this)}
					onBlur={this.onBlur.bind(this)}
					style={[styles.inputIOS, style]}
					value={value}
          returnKeyType={'send'}
					secureTextEntry={secureTextEntry}
					multiline={multiline}
					keyboardType={keyboardType}
					onChangeText={onChangeText}
					placeholder={placeholder}
          onSubmitEditing={onSubmitEditing}/>
			)
		}
	}
}


const styles = StyleSheet.create({
	inputAndroid: {
		flex: 1,
		height: 40,
		fontSize: 16,
		backgroundColor: '#FFFFFF',
	},
	inputIOS: {
		flex: 1,
		height: 40,
		fontSize: 14,
		backgroundColor: '#FFFFFF',
    width : Width*0.6
	},
  input :{
    height:40,
    top:Height-64-40,
    backgroundColor:'#fff',
  },
})

class Feedback extends Component{

  constructor(props) {
    super(props)
    this.state = {
      text : ''
    }

  }

  _onSubmitEditing(){
    fetch(url,{
      method: 'POST',
      body:'content='+this.state.text
    }).then((response)=>response.json())
        .then((responseData)=>{
          if (responseData.ok) {
            alert('反馈提交成功');
            this.setState({text:''});
          }else {
            alert(responseData.message)
          }
        })
  }

  render(){
    let title = {title:'问题反馈'};
    let leftButton = {
      title : '返回',
      handler : ()=>this.props.navigator.pop()
    }
    return(
      <View style={{flex:1}}>
        <NavBar title={title} leftButton={leftButton}/>
        <ScrollView ref={scrollView => this.scrollView = scrollView} style={{flex:1,backgroundColor:'#5e0e34'}}>
          <SoftInput
            style={styles.input}
            scroll={(offset) => this.scrollView.scrollTo({ y: offset })}
            placeholder='反馈内容'
            onSubmitEditing={()=>this._onSubmitEditing()}
            value={this.state.text?this.state.text:''}
            onChangeText={(value)=>this.setState({text:value})}/>
        </ScrollView>
      </View>
    )
  }
}

module.exports = Feedback;
