/*
* @author:  yinyongqian
* @createTime:  2017-07-04, 10:01:49 GMT+0800
* @description:  index.js
*/


import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Scenes from './src/constant/scenes.js'
import TabScenes from './src/constant/tabScenes.js'
import AV from 'leancloud-storage';

const APP_ID = 'g3uk1CJ5uKufnub0B7OmMa9v-gzGzoHsz';
const APP_KEY = '8XKDyrhUCaGbXeaziVzBc8Mp';
AV.initialize(APP_ID, APP_KEY);


console.log(" ---------- ",Scenes,TabScenes);
/*
tabbar
 */
const TabNavigatorConfig = {
  tabBarOptions: {
    activeTintColor: 'green',//TabBarItem 选中的颜色
    inactiveTintColor: 'gray',//TabBarItem 未选中的颜色
  },
  // swipeEnabled: true
}
const MainScreenNavigator = TabNavigator(TabScenes, TabNavigatorConfig);


/*
全部路由
 */
const RouteConfigs = {
  TabScenes: { screen: MainScreenNavigator },
  ...Scenes
}
const StackNavigatorConfig = {}
const RNBase = StackNavigator(RouteConfigs,StackNavigatorConfig);


AppRegistry.registerComponent('RNBase', () => RNBase);



// const APP_ID = 'g3uk1CJ5uKufnub0B7OmMa9v-gzGzoHsz';
// const APP_KEY = '8XKDyrhUCaGbXeaziVzBc8Mp';
// const AV = require('leancloud-storage');

// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY
// });

// const TestObject = AV.Object.extend('TestObject');
// const testObject = new TestObject();
// testObject.save({
//   words: 'Hello YYQ!'
// }).then(function(object) {
//   alert('LeanCloud Rocks YYQ!');
// })

// const point = new AV.GeoPoint(30.0, -20.0);
// const object = new AV.Object("PlaceObject");
// console.log(" ==-===== point ",point);
// object.set("location", point);
// object.save();
