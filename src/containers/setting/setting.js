import React, { Component } from 'react';
import {
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import CountDownButton from 'react-native-smscode-count-down'
import LunchuanImg from '../../../assets/img/lunchuan.png'

export default class SettingScreen extends Component {
  static navigationOptions = {
    title: '设置',
    tabBarLabel: '小飞机',
    tabBarIcon: ({tintColor}) => <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe620;</Text>
  };
  constructor(props){
    super(props)
    this.state = {
      phoneNum: '',
      state: '这里显示状态'
    }
    this._requestAPI = this._requestAPI.bind(this)
  }
  _requestAPI(shouldStartCounting){
    this.setState({
      state: '正在请求验证码'
    })
    setTimeout(()=>{
      const requestSucc = Math.random() + 0.5 > 1
      this.setState({
        state: `（随机）模拟验证码获取${requestSucc ? '成功' : '失败'}`
      })
      shouldStartCounting && shouldStartCounting(requestSucc)
    }, 2000);

  }
  render() {
    const {phoneNum} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput} placeholder={'手机号码'} value={phoneNum} onChangeText={(value)=>{
            this.setState({
              phoneNum: value
            })
          }}/>
        </View>
        <CountDownButton
          timerTitle={'获取验证码'}
          enable={phoneNum.length > 10}
          onClick={(shouldStartCounting)=>{
            this._requestAPI(shouldStartCounting)
          }}
          timerEnd={()=>{
            this.setState({
              state: '倒计时结束'
            })
          }}/>
        <Text style={styles.stateText}>{this.state.state}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInputView:{
    borderWidth: 1,
    borderColor: 'green',
    padding: 2,
    marginBottom: 20
  },
  textInput:{
    width: 200,
    height: 44
  },
  stateText: {
    paddingTop: 50,
    color: 'gray'
  }
});
