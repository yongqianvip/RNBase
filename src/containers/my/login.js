
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  View,
  StyleSheet,
  TextInput
} from 'react-native';
import AV from 'leancloud-storage';
import Toast from 'react-native-root-toast';
import Storage from '../../utils/storage.js'

export default class LoginScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '登录',
    headerRight:(
      <Button title="注册" onPress={()=>{
        navigation.state.params.signUpFunc()
      }}/>
    )
  });
  constructor(props){
    super(props)
    this.state = {
      loginName: '',
      loginPwd: ''
    }
    this._signUp = this._signUp.bind(this)
    this._login = this._login.bind(this)
  }
  componentDidMount(){
    this.props.navigation.setParams({signUpFunc: this._signUp})
  }

  _signUp(){
    const {loginName,loginPwd} = this.state
    if (!loginName) {Toast.show('登录名必需'); return}
    if (!loginPwd) {Toast.show('登录密码必需'); return}
    const user = new AV.User();
    user.setUsername(loginName)
    user.setPassword(loginPwd);

    user.signUp().then((user) => {
      console.log('User signed up:', user);
      Toast.show('注册成功')
      this.props.navigation.goBack();
    }).catch(function(error) {
      console.log("Signup Error: ", error,error.message);
      Toast.show(`注册失败\n${error.message}`)
    });
  }

  _login(){
    const {loginName, loginPwd} = this.state
    AV.User.logIn(loginName,loginPwd).then((user) => {
      console.log('User logged in:', user);
      this.props.navigation.goBack();
      Toast.show('登录成功')
      Storage.save('user',currentUser)
    }, (error) => {
      console.log("=== login failed ",error,error.fileName,error.lineNumber);
      Toast.show(`登录失败\n${error.message}`)
    });
  }

  render() {
  	const { navigate,state } = this.props.navigation;
    const {loginName,loginPwd} = this.state
    return (
      <View style={styles.container}>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput} placeholder={'登录名'} value={loginName} onChangeText={(value)=>{
            this.setState({
              loginName: value
            })
          }}/>
        </View>
        <View style={styles.textInputView}>
          <TextInput style={styles.textInput} placeholder={'登录密码'} value={loginPwd} onChangeText={(value)=>{
            this.setState({
              loginPwd: value
            })
          }}/>
        </View>
        <View style={styles.textInputView}>
          <Button title="登录" onPress={()=>{
            this._login()
          }}/>
        </View>
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
