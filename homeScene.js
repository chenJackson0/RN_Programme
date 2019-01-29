import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button
} from 'react-native';
import Userlist from './userlist'
import LoginScene from './loginScene';
import Constants from './globalStorage.js'
import Servie from './servie.js'
Constants.storage.load({
  key: 'loaginUsername',
  autoSync: true,
  syncInBackground: true,
	syncParams: {
	  extraFetchOptions: {
	    // 各种参数
	  },
	  someFlag: true,
	},
}).then(ret => {
  Constants.username = ret
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
export default class HomeScene extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        title: '首页',
        flag:false,
        username:"",
        totleMaxNum:"",
        mouthMaxNum:""
      }
    }
  backToLogin = () => {
    const {navigator} = this.props;
    if(Constants.username != ""){
      navigator.push({
        name:'Userlist',
        component:Userlist,
      })
    }else{
      navigator.push({
        name:'LoginScene',
        component:LoginScene,
      })
    }
  };
  componentWillMount(){
    if(Constants.username != ""){
      var totleMaxNum = Math.round(Math.random()*100)
      var mouthMaxNum = Math.round(Math.random()*50)
      this.setState({
        totleMaxNum:totleMaxNum,
        mouthMaxNum:mouthMaxNum
      })
      if(typeof(this.props.username) == "undefined"){
        this.setState({
          flag:true,
          username:Constants.username
        })
      }else{
        this.setState({
          flag:true,
          username:this.props.username
        })
      }
    }
  };
  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'Servie',
      component:Servie,
    })
  };
  homePage(){
    return (
      <View style={styles.commerOrder}>
        <View style={styles.cont}>
          <View style={styles.left}>
            <Text style={styles.title}>Totle</Text>
            <Text style={styles.num}>{this.state.totleMaxNum}</Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.title}>new</Text>
            <Text style={styles.num}>{this.state.mouthMaxNum}</Text>
          </View>
        </View>
        <View style={styles.link}>
          <Text style={styles.leftTitle}>commerOrder</Text>
          <Text style={styles.more}>more</Text>
        </View>
      </View>
    )
  };
  render() {
      let v = this.state.flag ? <View style={styles.container}>
        <Text style={styles.content}>欢迎{this.state.username}登录</Text>
        <Button onPress={this.backToLogin} style={styles.button} title='返回我的列表' />
        <View style={styles.commerOrder}>
          <View style={styles.cont}>
            <View style={styles.lefts}>
              <Text style={styles.title}>Totle</Text>
              <Text style={styles.num}>{this.state.totleMaxNum}</Text>
            </View>
            <View style={styles.rights}>
              <Text style={styles.title}>new</Text>
              <Text style={styles.num}>{this.state.mouthMaxNum}</Text>
            </View>
          </View>
          <View style={styles.link}>
            <Text style={styles.leftTitle}>commerOrder</Text>
            <Text style={styles.more}>more</Text>
          </View>
        </View>
      </View>:<View style={styles.container}>
        <Text style={styles.content}>您还未登录,请点击登录按钮.</Text>
        <Button onPress={this.backToLogin} style={styles.button} title='登录' />
      </View>
      return (
          <View style={styles.bg}>
            <View style={styles.headers}>
                <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
                <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
                <Text style={styles.left} onPress={this.goHome.bind(this)}>列表</Text>
            </View>
            <View style={styles.line}></View>
              {v}
          </View>
      );
  };
}
const styles = StyleSheet.create({
  cont: {
    flexDirection:"row",
    justifyContent:"space-between",
    borderColor:"#dddddd",
    borderWidth:1,
  },
  link: {
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    paddingBottom:15
  },
  lefts: {
    flex:1,
    borderRightWidth:1,
    borderRightColor:"#dddddd"
  },
  leftTitle: {
    flex:1,
    fontSize:23,
    color:"#898989",
    textAlign:"left"
  },
  more: {
    flex:1,
    fontSize:23,
    color:"#898989",
    textAlign:"right"
  },
  rights: {
    flex:1
  },
  title: {
    textAlign:"center",
    fontSize:20,
    paddingTop:5,
    // height:25,
    color:"#898989",
  },
  num: {
    fontSize:40,
    paddingTop:20,
    paddingBottom:10,
    textAlign:"center",
    color:"#898989",
    // height:70
  },
  container: {
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop:10
  },
  bg: {
    flex:1,
    backgroundColor:"#ffffff"
  },
  content: {
      fontSize: 18,
      textAlign:'center'
  },
  headers: {
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
      // marginTop:31
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
  },

});
