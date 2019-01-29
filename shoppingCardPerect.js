import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Alert,
    AsyncStorage,
    FlatList,
    TextInput
} from 'react-native';
// <TextInput
//     style={styles.inp}
//     // placeholder={this.state.number}
//     // secureTextEntry={true}
//     maxLength={2}
//     onChangeText={(number) => this.setState({number})}
//     ref = "number"
//     value = {this.state.number}
//     autoCapitalize = "none"
//     keyboardType='number-pad'
//     // clearButtonMode = "while-editing"
//   />
class Row extends Component {
  constructor(props) {
      super(props);
      this.state = {
        listData :this.props.list,
        number:1
      }
    };
  numChange = (num) => {
    const newText = num.replace(/[^\d]+/, '');
    this.setState({
      number:newText
    })
  };
  add = () => {
    this.setState({
      number:this.state.number + 1
    })
  };
  edd = () => {
    if(this.state.number == 1){
      return false
    }else{
      this.setState({
        number:this.state.number - 1
      })
    }
  };
    render(){
        return(
          <View style = {styles.container}>
            <Text style={styles.username}>{this.props.data.name}</Text>
            <Text style={styles.add} onPress={this.edd.bind(this)}>-</Text>
            <Text style={styles.inp}>{this.state.number}</Text>
            <Text style={styles.add} onPress={this.add.bind(this)}>+</Text>
          </View>
        )
    };
};

export default class ShoppingCardPerect extends Component {
  static navigationOptions = {
      title: '购物车列表',
  };
  constructor(props) {
      super(props);
      this.state = {
        title:'购物车列表',
        listData :this.props.list,
        number:1
      }
    };
  componentWillMount(){
    // alert(JSON.stringify(this.state.listData))
  };

  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.pop()
  };

  renderMovie =({item})=> {
      return (
        <Row data={item} />
      )
  };
  render() {
      return (
        <View style={styles.Maxcont}>
          <View style={styles.headers}>
              <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
              <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
              <Text style={styles.left} onPress={this.goHome.bind(this)}>首页</Text>
          </View>
          <View style={styles.line}></View>
          <FlatList
            data={this.props.list}
            renderItem={this.renderMovie}
            keyExtractor={(item, index) => index}
            />
        </View>
      );
  };
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
    justifyContent:"flex-start",
    marginTop:0
  },
  containerbg: {
    backgroundColor:"#dddddd"
  },
  username: {
    fontSize:20,
    color:"#898989",
    paddingTop:5,
    paddingBottom:5,
    width:210
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
},
inp:{
  width:20,
  height:20,
  fontSize:16,
  color:'#898989',
  borderStyle:'solid',
  borderWidth:1,
  borderColor:'#dddddd',
  lineHeight:20,
  textAlign:"center",
  marginTop:5,
  marginLeft:15,
  marginRight:15
},
add: {
  fontSize:14,
  color:"#898989",
  width:10,
  height:30,
  lineHeight:30
},
});
