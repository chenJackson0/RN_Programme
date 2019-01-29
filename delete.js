import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    SectionList,
    Text,
    Dimensions,
    TouchableOpacity,
    Animated,
    findNodeHandle,
    Easing,
    UIManager,
} from 'react-native';

let windowsSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
};
class Row extends Component {
    componentDidMount(){
      var demosectionlist = new Demosectionlist();
      demosectionlist.getScreenXY();
    };
    render(){
        return(
          <View style={{flex: 1}}>
            <Text>{this.props.data.value}</Text>
          </View>
        )
    };
};
export default class Demosectionlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            number: 0,
        };
    };
    getScreenXY = () => {
      this.setState({
        number:this.state.number + 1
      })
      alert(this.state.number)
    };
    render(){
        return(
          <View style={{flex: 1}}>
            <Row data="1" />
          </View>
        )
    }
}
const styles = StyleSheet.create({

});
