import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  Button,
  View,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import * as RouteType from '../../constant/routeType.js'
import DiancheImg from '../../../assets/img/dianche.png'
import AV from 'leancloud-storage';
import Storage from '../../utils/storage.js'
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: '首页',
    tabBarLabel: '自行车',
    tabBarIcon: ({tintColor}) => (
      <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe62d;</Text>
    )
  };
  constructor(props){
    super(props)

  }
  componentDidMount() {
    AV.User.currentAsync().then((currentUser)=>{
      if (currentUser) {
        Storage.save('user',currentUser)
      }else{
        this.props.navigation.navigate(RouteType.ROUTE_LOGIN)
      }
      console.log("----- current user ",currentUser);
    });
  }

  render() {
  	const { navigate } = this.props.navigation;
    return <View style={{backgroundColor: 'white'}}>
    	<Text>Hello, Navigation!</Text>
    	<Button onPress={() => {
        navigate(RouteType.ROUTE_CHAT,{name: 'YYQ'})
      }} title="Chat with Lucy"/>

      <Button onPress={() => {
        AV.User.logOut().then(()=>{
          console.log('user logged out.');
          navigate(RouteType.ROUTE_LOGIN)
        })
      }} title="Logout"/>
      <Button onPress={() => {
        // this._releaseGoods()
        navigate(RouteType.ROUTE_PUBLISH)
      }} title="Release Goods"/>
		</View>
  }
}
