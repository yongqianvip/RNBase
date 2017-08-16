
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
  CameraRoll,
  StyleSheet
} from 'react-native';
import AV from 'leancloud-storage';
import CommonImagePicker from '../../components/common/commonImagePicker.js'
import upload_add from '../../../assets/img/upload_add.png'
import upload_del from '../../../assets/img/upload_del.png'
import Button from 'apsl-react-native-button'
import * as COLOR from '../../constant/color.js'

const { height,width } = Dimensions.get('window')

export default class PublishScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: '发布',
      tabBarVisible: false,
      headerRight: (
        <Button
          style={{borderWidth: 0,height: 34,bottom: 0,marginRight: 20,marginTop: 10}}
          textStyle={{color: COLOR.APP_THEME,fontSize: 16}}
          onPress={()=>{
            navigation.state.params.publish()
          }}>
        完成
        </Button>
      )
    }
  }
  constructor(props){
    super(props)
    this._renderImages = this._renderImages.bind(this)
    this._updateImages = this._updateImages.bind(this)
    // this._uploadSuccess = this._uploadSuccess.bind(this)
    // this._uploadFailed = this._uploadFailed.bind(this)
    this._delImageWithIndex = this._delImageWithIndex.bind(this)
    this._publish = this._publish.bind(this)

    this.state = {
      title: '',
      content: '',
      price: '',
      showImagePicker: false,
      images: ['plus'],
      blob: ''
    }
    console.log("------- CameraRoll ",CameraRoll);
  }
  componentDidMount() {
    const {state} = this.props.navigation
    this.props.navigation.setParams({publish: this._publish})

    CameraRoll.getPhotos({
      first: 9
    }).then((data)=>{
      const imagesLocal = data.edges.map((asset) => asset.node.image);
      // this.setState({imagesLocal});
      console.log("===== imagesLocal ",imagesLocal);
    }, (err) => this.log('Error: ' + err.message));
  }

  _publish(){

    const {content,title,price} = this.state;

    const currentUser = AV.User.current();

    const name = 'imageName.jpg';
    const image = this.state.imagesLocal[0]
    console.log("=?=/ image",image);
    // image.uri = 'assets-library://asset/asset.JPG?id=ED7AC36B-A150-4C38-BB8C-B6D696F4F2ED&ext=JPG'
    const avFile = new AV.File(name, {
      blob: image
    });
    // console.log("===== image url ",image.path);
    // const avFile = new AV.File.withURL(name,image.path,image.data)


    // avFile.save().then((res)=>{
    //   console.log("---- 上传成功 ",res,res.url());
    // }).catch((error)=>{
    //   console.log("---- 上传失败 ",error);
    // })

    const product = new AV.Object("Product");
    product.set('title',title)
    product.set('content', content);
    product.set('price', price);
    product.set('owner', AV.User.current());

    product.set('image', avFile);
    product.save().then(() => {
      console.log("release new product success");
      //  发布成功，跳转到商品 list 页面
      this.props.navigation.goBack()
    }, (error) => {
      console.log("===== error ",error);
      alert(JSON.stringify(error));
    });
  }

  _renderImages(){
    const box = this.state.images.map((item,index)=>{
      if (item == 'plus') {
        return(
          <TouchableOpacity style={{flex: 1,marginRight: (index % 3 == 2 ? 10 : 15)}} activeOpacity={0.8} key={index}  onPress={()=>{
            this.setState({
              showImagePicker: true
            })
          }}>
            <View key={index} style={[styles.imageView,{justifyContent:'center',alignItems: 'center'}]}>
                <Image source={upload_add} style={{width: 35,height:35}}/>
            </View>
          </TouchableOpacity>
        )
      }else{
        return (
          <View key={index} style={[styles.imageView,{marginRight: (index % 3 == 2 ? 10 : 15)}]}>
            <Image source={{uri: (Platform.OS === 'android' ? 'file://' : '') + item}} style={{flex: 1,resizeMode: 'cover'}}/>
            <TouchableOpacity style={{position: 'absolute',right: 0}} activeOpacity={0.8} key={index}  onPress={()=>{
              this._delImageWithIndex(index)
            }}>
              <Image source={upload_del}/>
            </TouchableOpacity>
          </View>
        )
      }
    })
    return box
  }
  _delImageWithIndex(index){
    const {images} = this.state
    images.splice(index,1)
    if (images.length == 9 && images[8] != 'plus') {
      images.push('plus')
    };
    this.setState({
      images
    })
  }
  _updateImages(result){
    const {images} = this.state
     // this.setState({
     //  blob: result[0].source.blob
     // })
    if (images.length + result.length > 11) {
      console.log("---- 最多10张");
      Toast.show('最多只能上传10张图片')
      return
    };
    const imagePathes = result.map((item,index)=>{
      return item.path
    })
    images.pop()
    const newImages = images.concat(imagePathes)
    if (newImages.length != 10) {
      newImages.push('plus')
    };
    this.setState({
      images: newImages
    })

  }
  render() {
  	const { navigate,state } = this.props.navigation;
    const { params } = state;
    const {title,content,price,images,showImagePicker} = this.state
    return (
      <View style={{flex:1}}>
        <View style={styles.priceView}>
          <View style={styles.backgroundView}>
            <TextInput style={styles.priceInput} placeholder={'输入Title'} value={title} onChangeText={(text)=>{
              this.setState({
                title: text
              })
            }}/>
          </View>
        </View>
        <View style={styles.contentView}>
          <View style={styles.backgroundView}>
            <TextInput multiline={true} style={styles.contentInput} placeholderTextColor='#B6B6C1' placeholder={'输入内容'} value={content} onChangeText={(text)=>{
              this.setState({
                content: text
              })
            }}/>
          </View>
        </View>

        <View style={styles.priceView}>
          <View style={styles.backgroundView}>
            <TextInput style={styles.priceInput} placeholder={'输入价格'} value={price} onChangeText={(text)=>{
              this.setState({
                price: text
              })
            }}/>
          </View>
        </View>
        <View style={styles.viewContent}>
          {this._renderImages()}
        </View>
        <CommonImagePicker show={showImagePicker} configData={{maxFiles: 10,multiple: true,includeBase64: true}}
          actionBack={(result) =>{
            console.log("====== result",result);
            this._updateImages(result)
            this.setState({
              imagesLocal: result
            })
          }}
          cancleAction={()=>{
            this.setState({showImagePicker: false})
          }}/>
      </View>
    );
  }
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  contentView:{
    height: 144,
    padding: 10
  },
  backgroundView: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.LINE,
    borderRadius: 5,
    padding: 5
  },
  contentInput: {
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 16
  },
  priceView:{
    height: 64,
    padding: 10
  },
  priceInput: {
    flex: 1,
    fontSize: 16
  },
  imageView: {
    width: (width - 20 - 30)/3,
    height: (width - 20 - 30)/3*0.75,
    backgroundColor: 'white',
    marginTop: 15
  },
  viewContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap:'wrap',
    paddingLeft: 10,
    paddingBottom: 15,
  },
})
