import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class MyScreen extends Component {
  static navigationOptions = {
    title: '我的',
  };
  render() {
  	const { navigate } = this.props.navigation;
    return <View>

    	<Button onPress={() => {
        navigate('Chat',{name: 'YYQ'})
      }} title="I am button in my"/>
		</View>
  }
}
