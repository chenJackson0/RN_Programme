import React, { Component } from 'react';
import {Alert, Text, View, StyleSheet, TextInput, Button, TouchableHighlight, AsyncStorage } from 'react-native';
import LoginScene from './loginScene';
import Storage from 'react-native-storage';
import Constants from './globalStorage.js'
import Header from './header.js';
global.flag = false;
// 读取
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
  Constants.array = ret
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
export default class RegisterScene extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hasLogin:'',
      username:'',
      password:'',
      confirmPassword:'',
      title:'注册'
    }
  };
  onUsernameChanged = (newUsername) => {
    this.setState({
      username:newUsername,
    })
  };
  onPasswordChanged = (newpassword) => {
    this.setState({
      password:newpassword,
    })
  };
  onConfirmPasswordChanged = (newConfirmPassword) => {
    this.setState({
      confirmPassword:newConfirmPassword,
    })
  };
  componentDidMount(){

  };
  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  register = () => {
    if (this.state.username != '' && this.state.password != '') {
        if(Constants.array.length == 0){
          flag = true;
        }else{
          for(var i = 0;i<Constants.array.length;i++){
            if(this.state.username != Constants.array[i].username){
                flag = true;
            }else{
                flag = false;
                break;
            }
          }
        }
        if (flag) {
            if (this.state.password === this.state.confirmPassword) {
              const {navigator} = this.props;
              var datas = {
                username:this.state.username,
                password:this.state.password
              }
              Constants.array = Constants.array.concat(datas)
              Constants.storage.save({
                key: 'username',  // 注意:请不要在key中使用_下划线符号!
                data: Constants.array,
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: 1000 * 24 * 3600
              });
              navigator.push({
                name:'LoginScene',
                component:LoginScene,
                params:{
                  userList:Constants.array
                }
              })
            } else {
                Alert.alert("注册失败","密码与确认密码不同");
            }
        } else {
            Alert.alert("注册失败","此用户名已经被注册");
        }
    } else {
        Alert.alert("注册失败","用户名或密码不能为空");
    }
  };
  reseat = () => {
    this.setState({
      username:'',
      password:'',
      confirmPassword:''
    })
  };
  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.headers}>
            <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
            <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
            <Text style={styles.left} onPress={this.goHome.bind(this)}>首页</Text>
        </View>
        <View style={styles.line}></View>
        <View style={[styles.vie,styles.vieL]}>
          <Text style={[styles.tet]}>用户名:</Text>
          <TextInput
              style={styles.inp}
              placeholder="请输入用户名"
              onChangeText={this.onUsernameChanged}
              ref = "username"
              value = {this.state.username}
              clearButtonMode = "while-editing"
              autoCapitalize = "none"
            />
        </View>
        <View style={[styles.vie,styles.vieL]}>
          <Text style={[styles.tet]}>密码:</Text>
          <TextInput
              style={styles.inp}
              placeholder="请输入密码"
              onChangeText={this.onPasswordChanged}
              password="true"
              secureTextEntry={true}
              maxLength={6}
              ref = "password"
              value = {this.state.password}
              autoCapitalize = "none"
              clearButtonMode = "while-editing"
            />
        </View>
        <View style={[styles.vie,styles.vieL]}>
          <Text style={[styles.tet]}>确认密码:</Text>
          <TextInput
              style={styles.inp}
              placeholder="请确认密码:"
              secureTextEntry={true}
              maxLength={6}
              password = "true"
              onChangeText={this.onConfirmPasswordChanged}
              ref = "confirmPassword"
              value = {this.state.confirmPassword}
              autoCapitalize = "none"
              clearButtonMode = "while-editing"
            />
        </View>
        <View style={[styles.vie,styles.vieL,styles.b]}>
          <TouchableHighlight onPress={this.reseat.bind(this)} underlayColor="white">
            <View style={styles.buts}>
              <Text style={styles.but}>重置</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.register.bind(this)} underlayColor="white">
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
    justifyContent:"space-between",
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
