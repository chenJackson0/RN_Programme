import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

export default class Header extends Component {
  constructor(props) {
      super(props);
    }
  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  render (){
    return (
      <View>
        <View style={styles.headers}>
            <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
            <Text style={styles.left}>{this.state.title}</Text>
            <Text style={styles.left} onPress={this.goHome.bind(this)}>首页</Text>
        </View>
        <View style={styles.line}></View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
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
    fontSize:20,
    color:"#000000",
    height:30,
    lineHeight:30
  }
})
