import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    AsyncStorage,
    FlatList
} from 'react-native';
import Constants from './globalStorage.js'
import HomeScene from './homeScene';
global.list = [];
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
export default class Userlist extends Component {
  static navigationOptions = {
      title: '用户列表',
  };
  constructor(props, context) {
      super(props, context);
      this.state = {
        title:'用户列表',
        parim:'提示',
        message:' 您确定用此账号登陆吗?',
        show:false,
        username:""
      }
    }
  componentDidMount(){
    this.setState({
      show:false
    })
  };
  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  render() {
      changeUser = (username) => {
        this.setState({
          show:!this.state.show,
          username:username,
          message:"您确定用"+username+"账号登陆吗?"
        })
      };
      close = () => {
        this.setState({
          show:!this.state.show
        })
      };
      quick = () => {
        const {navigator} = this.props;
        this.setState({
          show:false
        })
        navigator.push({
  				name:'HomeScene',
  				component:HomeScene,
  				params:{
  					username:this.state.username
  				}
  			})
      };
      let v = this.state.show ? <View style={styles.content}>
          <Text style={styles.title}>{this.state.parim}</Text>
          <Text style={styles.message}>{this.state.message}</Text>
          <View style={styles.button}>
            <Text style={styles.lefts} onPress={close}>取消</Text>
            <Text style={styles.rights} onPress={quick}>确定</Text>
          </View>
      </View>: null;
      let bg = this.state.show ? <View style={styles.alertUser}></View> : null
      return (
          <View style={styles.Maxcont}>
            <View style={styles.headers}>
                <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
                <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
                <Text style={styles.left} onPress={this.goHome.bind(this)}>首页</Text>
            </View>
            <View style={styles.line}></View>
            <View style = {[styles.container,styles.containerbg]}>
              <Text style={styles.username}>用户名</Text>
              <Text style={styles.password}>密码</Text>
            </View>
            <FlatList
              data={Constants.array}
              renderItem={this.renderMovie}
              keyExtractor={(item, index) => index}
              />
              {bg}
              {v}
          </View>
      );
  };

  renderMovie({item}) {
    return (
      <View style = {styles.container}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.password}>{item.password}</Text>
        <Text style={styles.ok} onPress={() => {
          changeUser(item.username)}
          }>登录</Text>
      </View>
    )
  };

  addAlert(){
    return (
      <View style={styles.alertUser}>
          <View style={styles.content}>
              <Text style={styles.title}>{this.state.parim}</Text>
              <Text style={styles.message}>{this.state.message}</Text>
              <View style={styles.button}>
                <Text style={styles.left} onPress = {close}>取消</Text>
                <Text style={styles.right} onPress = {quick}>确定</Text>
              </View>
          </View>
      </View>
    )
  };
  addAlerts(){
    return (
      <Text>1111</Text>
    )
  }
}

const styles = StyleSheet.create({
  alertUser: {
    flex:1,
    backgroundColor:"#000000",
    opacity:0.5,
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    zIndex:99,
  },
  content: {
    backgroundColor:"#ffffff",
    width:270,
    borderRadius:6,
    position:"absolute",
    top:"50%",
    left:"50%",
    marginTop:-100,
    marginLeft:-135,
    zIndex:99999999,
  },
  title: {
    fontSize:16,
    color:"#000000",
    height:40,
    lineHeight:40,
    textAlign:"center",
    borderBottomColor:"#dddddd",
    borderBottomWidth:1
  },
  message: {
    fontSize:16,
    color:"#666666",
    paddingTop:10,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:15,
    textAlign:"center",
    borderColor:"#dddddd",
    borderWidth:1
  },
  button: {
    flexDirection:"row",
    justifyContent:"space-between",
  },
  lefts: {
    flex:1,
    fontSize:14,
    color:"red",
    textAlign:"center",
    paddingTop:15,
    paddingBottom:15,
    borderRightColor:"#dddddd",
    borderRightWidth:1,
  },
  rights: {
    flex:1,
    fontSize:14,
    color:"red",
    textAlign:"center",
    paddingTop:15,
    paddingBottom:15,
    borderLeftColor:"#dddddd",
    borderLeftWidth:1,
    backgroundColor:"#dddddd"
  },
  Maxcont: {
   flex: 1,
   // paddingTop: 10,
   backgroundColor:'#efefef',
  },
  container: {
    marginBottom:10,
    backgroundColor:"#ffffff",
    paddingLeft:30,
    paddingRight:30,
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:0
  },
  containerbg: {
    backgroundColor:"#dddddd"
  },
  username: {
    fontSize:20,
    color:"#898989",
    paddingTop:5,
    paddingBottom:5
  },
  password: {
    fontSize:20,
    color:"#898989",
    paddingTop:5,
    paddingBottom:5
  },
  ok: {
    fontSize:20,
    color:"#898989",
    paddingTop:5,
    paddingBottom:5
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
    backgroundColor:'#898989',
    marginTop:6
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
});
