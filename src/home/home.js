import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: '首页',
  };
  render() {
  	const { navigate } = this.props.navigation;
    return <View style={{backgroundColor: 'red'}}>
    	<Text>Hello, Navigation!</Text>
    	<Button onPress={() => {
        navigate('Chat',{name: 'YYQ'})
      }} title="Chat with Lucy"/>
		</View>
  }
}
