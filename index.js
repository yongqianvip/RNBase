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

import Pages from './src/config/pages.js'
import Home from './src/home/home.js'
import Chat from './src/home/chat.js'
import MyScreen from './src/My/my.js'
import Detail from './src/home/detail.js'

const MainScreenNavigator = TabNavigator({
  Home: { screen: Home },
  My: { screen: MyScreen },
});


const RNBase = StackNavigator({
  HomeTab: { screen: MainScreenNavigator },
  Chat: { screen: Chat },
  Detail: {screen: Detail}
});

AppRegistry.registerComponent('RNBase', () => RNBase);
