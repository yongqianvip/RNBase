
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';

export default class ChatScreen extends Component {
  static navigationOptions = {
    title: '他的详情',
    headerRight:(
      <Button title="完成" onPress={()=>{

      }}/>
    )
  };
  render() {
  	const { navigate,state } = this.props.navigation;

    return (
      <View>

      </View>
    );
  }
}