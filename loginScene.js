import React, { Component } from 'react';
import {Alert, Text, View, StyleSheet, TextInput, Button, TouchableHighlight } from 'react-native';
import HomeScene from './homeScene';
import RegisterScene from './registerScene';
import Constants from './globalStorage.js';
import UserService from './service/userService.js'
import loginModel from './Model/loginModel.js'
global.list = [];
global.flag = false;
global.servieData = [];
global.listItem = []
export default class LoginScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '登陆',
    }
  }
  username = '';
  password = '';
  onUsernameChanged = (newUsername) => {
    this.username = newUsername;
  };
  onPasswordChanged = (newpassword) => {
    this.password = newpassword;
  };
  componentDidMount() {        //这里获取从上一个页面传递过来的参数: id
    // UserService.getSet.then(function(data){
    //   listItem = data
    // })

    Constants.storage.load({
      key: 'username',
      autoSync: true,
      syncInBackground: true,
    	syncParams: {
    	  extraFetchOptions: {
    	    // 各种参数
    	  },
    	  someFlag: true,
    	},
    }).then(ret => {
      list = ret
    }).catch(err => {
    	// Alert.alert(err.message);
    	switch (err.name) {
    	    case 'NotFoundError':
    	        // TODO;
    	        break;
            case 'ExpiredError':
                // TODO
                break;
    	}
    })
  };
  _onPressButton = () => {
    for(var i = 0;i<list.length;i++){
      if(this.username == list[i].username){
          if(this.password == list[i].password){
            flag = true;
            break;
          }else{
            flag = false;
            break;
          }
      }else {
        flag = false;
      }
    }
    if(flag){
      const {navigator} = this.props;
      // servieData = UserService.Set()
      // let modelDate = loginModel.userItem(listItem)
      // alert(JSON.stringify(modelDate))
      // UserService.getSet
      let dataItem = UserService.Set()
      let modelDate = loginModel.userItem(dataItem)
      alert(JSON.stringify(modelDate))
      Constants.username = this.username
      Constants.storage.save({
        key: 'loaginUsername',  // 注意:请不要在key中使用_下划线符号!
        data: Constants.username,
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        expires: 1000 * 300
      });
			navigator.push({
				name:'HomeScene',
				component:HomeScene,
				params:{
					username:this.username
				}
			})
    }else{
        Alert.alert("登陆失败","用户名或密码不正确");
    }
  };
  register = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'RegisterScene',
      component:RegisterScene,
      params:{
        title:'注册',
        getLoginState:(loginState) => {
          this.setState({hasLogin:loginState});
        }
      }
    })
  }
  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.headers}>
            <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
        </View>
        <View style={styles.line}></View>
        <View style={[styles.vie,styles.vieL]}>
          <Text style={[styles.tet]}>用户名:</Text>
          <TextInput
              style={styles.inp}
              placeholder="请输入用户名"
              onChangeText={this.onUsernameChanged}
              autoCapitalize = "none"
              clearButtonMode = "while-editing"
            />
        </View>
        <View style={[styles.vie,styles.vieL]}>
          <Text style={[styles.tet]}>密码:</Text>
          <TextInput
              style={styles.inp}
              placeholder="请输入密码"
              onChangeText={this.onPasswordChanged}
              password="{true}"
              secureTextEntry={true}
              maxLength={6}
              autoCapitalize = "none"
              clearButtonMode = "while-editing"
            />
        </View>
        <View style={[styles.vie,styles.vieL,styles.b]}>
          <TouchableHighlight onPress={this.register.bind(this)} underlayColor="white">
            <View style={styles.buts}>
              <Text style={styles.but}>注册</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this._onPressButton.bind(this)} underlayColor="white">
            <View style={styles.buts}>
              <Text style={styles.but}>确定</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor:'#ffffff'
  },
  vie:{
    justifyContent: 'flex-start',
    marginTop:60,
  },
  title:{
    marginTop:50,
  },
  titl:{
    fontSize:16,
    color:'#898989',
    textAlign:'center'
  },
  vieL:{
    flex:1,
    flexDirection:'row',
    height:40
  },
  tet:{
    fontSize:16,
    color:'#898989',
    marginLeft:20,
    height:40,
    lineHeight:40,
    width:80
  },
  inp:{
    width:200,
    height:40,
    fontSize:16,
    color:'#898989',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#dddddd',
    paddingLeft:10,
  },
  but:{
    fontSize:16,
    color:'#898989',
    width:50,
    height:30,
    backgroundColor:'#dddddd',
    lineHeight:30,
    textAlign:'center'
  },
  buts:{
    margin:30,
  },
  b:{
     justifyContent: 'center',
  },
  headers: {
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    paddingLeft:20,
    paddingRight:20,
    marginTop:50,
    height:30
  },
  line: {
    height:1,
    backgroundColor:'#dddddd',
    marginTop:31
},
left: {
  fontSize:13,
  color:"#333333",
  height:30,
  lineHeight:30
},
right: {
  fontSize:18,
  color:'#000000'
}
})
