import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Dimensions,
    SectionList,
    TouchableOpacity,
    Image,
    PanResponder
} from 'react-native';
import Userlist from './userlist'
import LoginScene from './loginScene';
import Constants from './globalStorage.js'
import Servie from './servie.js'
let windowsSize = {
  width: Dimensions.get('window').width,
  height: Dimensions.get("window").height
};
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


class Row extends Component {
  _rowClick(i,item){
    var cut = this.refs[i];
    // this.props.updateParentState(i,item,cut);
  };

  render(){
      return(
          <TouchableOpacity style={styles.row} ref={this.props.data.name} onPress={()=>{this._rowClick(this.props.key,this.props.data.name)}}>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={ styles.icon } source={{ uri : this.props.data.img }}/>
                  <Text>
                      {this.props.data.name}{this.props.key}
                  </Text>
              </View>
          </TouchableOpacity>
      )
  };
};

export default class HomeScene extends Component {
  constructor(props, context) {
    super(props, context);
    let data = []
    for(let i = 1;i<=10;i++){
      let item = {}
      item.img = "http://p1.meituan.net/deal/__39230311__3449301.jpg",
      item.name = "饿了吗"+i
      data.push(item)
    }
    this.state = {
      title: '首页',
      flag:false,
      username:"",
      totleMaxNum:"",
      mouthMaxNum:"",
      rowData: [
        {data: [data]}
      ],
    }
    this._panResponder = {}
  }
  componentWillMount(evt, gestureState){
    this._panResponder=PanResponder.create({
      onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder:this.onMoveShouldSetPanResponder,
      onPanResponderGrant:this.onPanResponderGrant,
      onPanResponderMove:this.onPanResponderMove,
      onPanResponderRelease:this.onPanResponderEnd,
      onPanResponderTerminate:this.onPanResponderEnd,
    });
  }
  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder(evt, gestureState){
    return true;
    }
    //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
    onMoveShouldSetPanResponder(evt, gestureState){
    return true ;
    }
    // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant(evt, gestureState){
    alert("1")
  }
  onPanResponderMove(evt, gestureState){
    alert("2")
  }

  onPanResponderEnd(evt, gestureState){
    alert("3")
  }
  onPanResponderEnd(evt, gestureState){
    alert("4")
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
  _renderItem =({item})=> {
    return (
    <View style = {{height:200,backgroundColor:'#f2f2f2'}} {...this._panResponder.panHandlers}>
    <View style={styles.list} >
        {
           item.map((val, i)=>{
                return <Row key={i} data={val} />
            })
        }
    </View>
    <View style={[styles.list,styles.lists]}>
    {
       item.map((val, i)=>{
            return <Row key={i} data={val} />
        })
    }
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
              <SectionList style={{ marginTop: 0}}
                 renderItem={this._renderItem}
                 showsVerticalScrollIndicator={false}
                 horizontal = {true}
                 sections={this.state.rowData}>
            </SectionList>
          </View>
      );
  };
}
const styles = StyleSheet.create({
  list:{
    flexDirection: 'row', //这里的属性很重要，可以学习下flex布局
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop:10
  },
  lists:{
    marginTop:16
  },
  listWrap: {
    flexWrap: 'wrap',
  },
  cont: {
    flexDirection:"row",
    justifyContent:"space-between",
    borderWidth:1,
  },
  row:{
    justifyContent: 'center',
    // alignItems: 'center',
    width: windowsSize.width/5,
    height: windowsSize.width/5,
    
  },
  icon : {
    height : windowsSize.width/7,
    width : windowsSize.width/7,
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 8,
    borderRadius:15
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
