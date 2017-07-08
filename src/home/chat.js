
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';

export default class ChatScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '聊天',
      headerRight: (
        <View style={{flexDirection: 'row'}}>
          <Button title="setParams" onPress={()=>{
            navigation.setParams({name: 'ZDD'})
          }}/>
          <Button title="详情" onPress={()=>{
            navigation.navigate('Detail')
            // navigation.navigate('Chat',{name: 'QQQ'})
            //
            //
          }}/>
        </View>
      ),
      headerLeft: (
        <Button title="关闭" onPress={()=>{
          navigation.goBack()
        }}/>
      )
    }
  }
  componentDidMount() {
    const {state} = this.props.navigation
    console.log("===== state in chat ",state);
  }

  render() {
  	const { navigate,state } = this.props.navigation;
    const { params } = state;
    return (
      <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
        <Text>和{params.name}聊天</Text>
        <Button title="关闭" onPress={()=>{
          this.props.navigation.goBack('Home')
        }}/>
      </View>
    );
  }
}