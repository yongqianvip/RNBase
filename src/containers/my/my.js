import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Button,
  Image,
  View,
  RefreshControl,
  ListView
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {PullView} from 'react-native-pull';
import LancheImg from '../../../assets/img/lanche.png'
import * as RouteType from '../../constant/routeType.js'
import AV from 'leancloud-storage';
import Storage from '../../utils/storage.js'

export default class MyScreen extends Component {
  constructor(props){
    super(props)

    this._queryAll = this._queryAll.bind(this)
    this.state = {
      dataSource: [],
      isRefreshing: false
    };
  }

  static navigationOptions = {
    title: '我的',
    tabBarLabel: '小汽车',
    tabBarIcon: ({tintColor}) => {
      return <Text style={{fontFamily: 'iconfont',fontSize: 25, color: tintColor}}>&#xe621;</Text>
    }
  };
  componentDidMount(){
    this._queryAll()
    Storage.get('user').then((user)=>{
      this.setState({
        user
      })
    })
  }
  _queryAll(){
    Storage.get('user').then((user)=>{
      console.log("======= get use from storage ",user);
      this.setState({
        user
      })
    })
    console.log("===== query all");
    this.setState({
      isRefreshing: true
    })
    const query = new AV.Query('Product');
    query.include('owner');
    query.include('image');
    query.descending('createdAt');
    query.find().then((products) => {
         console.log("-====== 查询结果 ",products);
         this.setState({
          dataSource: products,
          isRefreshing: false
         })
    }).catch((error) => {
      console.log("----- error 56 ",JSON.stringify(error));
      alert('56798');
    });
  }
  _renderRow(rowData,SectionId,rowID){

    const {user} = this.state
    const currentUserId = user ? user.objectId : ''
    const rowDataOwnerId = rowData.attributes.owner.id
    console.log(" owner id ",rowDataOwnerId, currentUserId);
    return <View style={{flex: 1,marginTop: 10,padding:10,flexDirection: 'row'}}>
      <Image source={{uri: rowData.attributes.image.attributes.url}} style={{width: 50,height:50,borderWidth: 2,borderColor: currentUserId === rowDataOwnerId ? 'red' : 'green'}}/>
      <View style={{paddingLeft: 10,flex: 1}}>
        <Text>{rowData.attributes.title}</Text>
        <Text style={{color: 'gray'}}>{rowData.attributes.content}</Text>
      </View>
    </View>
  }
  _onRefresh(){
    console.log("======refreshsi ng ");
    this._queryAll()
  }
  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const {dataSource,isRefreshing} = this.state
  	const { navigate } = this.props.navigation;
    return <View style={{flex: 1}}>
      <ListView
        dataSource={ ds.cloneWithRows(dataSource || []) }
        renderRow={this._renderRow.bind(this)}
        onEndReachedThreshold={10}
        enableEmptySections={true}
        refreshControl={
          <RefreshControl
            refreshing={ isRefreshing }
            onRefresh={ this._onRefresh.bind(this) }
            tintColor="gray"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="gray"/>
        }/>

		</View>
  }
}
