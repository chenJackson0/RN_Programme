import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  FlatList,
  SectionList,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  findNodeHandle,
  UIManager,
  Alert,
  Easing,
} from 'react-native';

import ParcelData from './parcelDate.json'
import LoginScene from './loginScene';
import Project from './project';
var { width, height } = Dimensions.get('window');

let Headers = [];

const VIEWABILITY_CONFIG = {
	minimumViewTime: 300,
	viewAreaCoveragePercentThreshold: 100,
	waitForInteraction: true,
};
export default class ParcelPage extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle : '联动List',
  });
  constructor(props) {
    super(props);
    this.state = {
      cell : 0,
      title:"产品列表",
      animateBtnX: 0,
      animateBtnY: -999,
      addBtnY: -999,
      addBtnX:0,
      runAnim: new Animated.Value(0),
      endX: 375,// 购物车的位置 在距屏幕的左侧26像素
      endY: height-44, // 购物车的位置 在距屏幕的底部44像素
      curvature: .003, // 动画抛高系数，值越大抛的越高
      duration: 800, // 动画运动时间
      springValue: new Animated.Value(0),
      number: 0,
      flag:true
    };
  }
  componentDidMount() {
    ParcelData.map((item, i) => {
      Headers.push(item.section);
    });
  };

  componentWillUnmount() {
    Headers = [];
  };
  goBack = () => {
    const {navigator} = this.props;
    navigator.pop()
  };
  goHome = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'LoginScene',
      component:LoginScene,
    })
  };
  renderLRow = (item) => {
    return (
      <TouchableOpacity style={[ styles.lItem, {backgroundColor: item.index == this.state.cell ? 'white' : null} ]}
               onPress={()=>this.cellAction(item)}>
        <Text style={styles.lText}>{ item.item.section }</Text>
      </TouchableOpacity>
    )
  };

  cellAction = (item) => {
    if (item.index <= ParcelData.length) {
      if (item.index > 0) {
        var count = 0;
        for (var i = 0;
          i < item.index;
          i++) {
          count += ParcelData[ i ].data.length + 2
        }
        this.refs.sectionList.scrollToIndex({ animated : false, index : count })
        this.setState({
          cell : item.index,
        });
      } else {
        this.refs.sectionList.scrollToIndex({ animated : false, index : 0 });
      }

    }

  };

  itemChange = (info) => {
    let section = info.viewableItems[ 0 ].section.section;
    if (section) {
      let index = Headers.indexOf(section);
      if (index < 0) {
        index = 0;
      }
      this.setState({ cell : index});
    }
  };
  renderRRow = (item) => {
    return (
      <View style={ styles.rItem }>
        <Image style={ styles.icon } source={{ uri : item.item.img }}/>
        <View style={ styles.rItemDetail }>
          <Text style={ styles.foodName }>{ item.item.name }</Text>
          <View style={ styles.saleFavorite }>
            <Text style={ styles.saleFavoriteText }>{ item.item.sale }</Text>
            <Text style={ [styles.saleFavoriteText,{ marginLeft:15 }]}>{ item.item.favorite }</Text>
          </View>
          <View style={ styles.saleFavorite }>
            <Text style={ styles.moneyText }>￥{ item.item.money }</Text>
            <Text style={ styles.moneyText } ref = {item.index} onPress = {this.getScreenXY.bind(this,item.index,item.item)}>加入购物车</Text>
          </View>
        </View>
      </View>
    )
  };

  sectionComp = (section) => {
    return (
      <View style={{height:30,backgroundColor:'#DEDEDE',justifyContent:'center',alignItems:'center'}}>
        <Text >{section.section.section}</Text>
      </View>
    )
  };

  separator = () => {
    return (
      <View style={{height:1,backgroundColor:'gray'}}/>
    )
  };
  project = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'Project',
      component:Project,
    })
  };
  // 获取点击坐标XY
  getScreenXY = (i,item)=>{
    var cut = this.refs.sectionList
    const self = this;
    const handle = findNodeHandle(cut);//1053
    UIManager.measure(handle, (x,y,width,height,pageX,pageY) => {
        console.log(x,y,width,height,pageX,pageY)
        let data=item
        let pos= [pageX, pageY, self.state.endX, self.state.endY]
        self.setState({
            addBtnY: pageY,
            addBtnX: pageX
        })
        if(this.state.flag){
          self.run(pos,data)
          self.setState({
            flag:false
          })
        }
    })
  }
  //运行动
  run(position = [],data = {}){
      if(position.length != 4){
          return
      }
      this.state.runAnim.setValue(0)
      const { inputRange, outputX, outputY } = this.getPaths(position)
      // console.log(inputRange, outputX, outputY)
      this.setState({
          animateBtnX: this.state.runAnim.interpolate({
              inputRange:inputRange, outputRange: outputX
          }),
          animateBtnY: this.state.runAnim.interpolate({
              inputRange:inputRange, outputRange: outputY
          })
      })
      // console.log(this.state.animateBtnX,this.state.animateBtnY)
      Animated.timing(this.state.runAnim, {
          toValue: inputRange.length,
          duration: this.state.duration,
          easing: Easing.linear // 缓动函数
      }).start(()=>{
          this.state.runAnim.setValue(0);
          this.state.springValue.setValue(0);
          Animated.spring(
          this.state.springValue,
          {
              toValue: 1,
              firction: 1
          }).start();
          this.setState({
              addBtnY: -999,
              addBtnX: 0,
              number: this.state.number + 1,
              flag:true
          })
      })
  };
  // 获得路径
  getPaths(position){
      const [ startX, startY, endX, endY ] = position
      const { curvature } = this.state, speed = 500//166.67
      let diffX = endX - startX,
          diffY = endY - startY;
      let b = ( diffY - curvature * diffX * diffX ) / diffX,
          start_x = 0,
          rate = diffX > 0? 1: -1,
          inputRange = [], outputX = [], outputY = [];
      let step = () => {
          let tangent = 2 * curvature * start_x + b;
          start_x = start_x + rate * Math.sqrt(speed / (tangent * tangent + 1));
          if ((rate == 1 && start_x > diffX) || (rate == -1 && start_x < diffX)) {
              start_x = diffX;
          }
          let x = start_x, y = curvature * x * x + b * x;
          inputRange.push(outputX.length)
          outputX.push(x)
          outputY.push(y)
          if (start_x !== diffX) {
              step()
          }
      }
      step()
      return { inputRange, outputX, outputY }
  };
  render() {
    const springBig = this.state.springValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.5, 1]
    });
    return (
      <View style={ styles.containe}>
        <View style={styles.headers}>
            <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
            <Text style={[styles.left,styles.right]} ref={"sss"} onPress = {this.getScreenXY.bind(this)}>{this.state.title}</Text>
            <Text style={styles.left}></Text>
        </View>
      <View style={styles.line}></View>
      <View style={ styles.container }>
        <FlatList
          ref='FlatList'
          style={ styles.leftList }
          data={ ParcelData }
          renderItem={(item) => this.renderLRow(item)}
          ItemSeparatorComponent={ () => this.separator() }
          keyExtractor={ (item) => item.section }
        />
        <SectionList
          ref='sectionList'
          style={ styles.rightList }
          renderSectionHeader={ (section) => this.sectionComp(section) }
          renderItem={ (item) => this.renderRRow(item) }
          sections={ ParcelData }
          keyExtractor={ (item) => item.name }
          onViewableItemsChanged={ (info) => this.itemChange(info) }
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </View>
      <Animated.View style={[styles.tmpBtn, {
          top:this.state.addBtnY,
          left: this.state.addBtnX,
          transform: [
              { translateX: this.state.animateBtnX },
              { translateY: this.state.animateBtnY },
          ]
      }]}>
      <View style={{width:20, height:20,backgroundColor:"#000000", borderRadius: 20}}></View>
      </Animated.View>
      <View style={styles.shopcart}>
            <View style={styles.bottomItem}>
                <Text>客服</Text>
            </View>
            <View style={styles.bottomItem}>
                <Text onPress = {() => {
                  this.project()
                }}>购物车</Text>
                <Animated.View style={[styles.numberView,
                    {
                        transform: [{
                            scale: springBig
                        }]
                    }]
                  }
                     onLayout={(e) => {
                         //  alert(e.nativeEvent.layout.y);
                     }}>
                    <Text
                        style={[styles.numberText, {color: 'red'}]}>{this.state.number}</Text>
                </Animated.View>
            </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containe: {
    backgroundColor:"#ffffff",
    flex:1
  },
  container : {
    flexDirection : 'row',
    marginBottom:110
  },
  leftList : {
    width : 1 * width / 4,
    backgroundColor : '#E9E9EF'
  },
  lItem : {
    minHeight : 44,
    justifyContent : 'center',
  },
  lText : {
    marginLeft : 10,
    marginRight : 10,
    fontSize : 16,
  },
  rightList : {
    width : 3 * width / 4
  },
  rItem : {
    flexDirection : 'row',
    backgroundColor:"#ffffff"
  },
  rItemDetail : {
    flex : 1,
    marginTop : 10,
    marginLeft : 5
  },
  icon : {
    height : 60,
    width : 60,
    marginTop : 10,
    marginBottom : 10,
    marginLeft : 8,
    borderWidth : 1,
    borderColor : '#999999'
  },
  foodName : {
    fontSize : 18,
  },
  saleFavorite : {
    flexDirection : 'row',
    marginTop : 5,
    marginBottom : 5,
  },
  saleFavoriteText : {
    fontSize : 13,
  },
  moneyText : {
    color : 'orange',
    marginRight:20
  },
  headers: {
    flexDirection:"row",
    justifyContent:"space-between",
    paddingLeft:20,
    paddingRight:20,
    marginTop:30,
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
  shopcart: {
      position: 'absolute',
      bottom: 0,
      height: 50,
      left:0,
      right:0,
      backgroundColor: 'white',
      flexDirection: 'row'
  },
  bottomItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1
  },
  numberView: {
      position: 'absolute',
      right: 5,
      top: 2,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: 'red',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
  numberText: {
      color: 'white',
      textAlign: 'center',
      padding: 0,
      includeFontPadding: false
  },
  titlesing: {
    fontSize:16,
    color:"#898989",
    textAlign:"center",
    height:30,
    lineHeight:30
  },
  but: {
    fontSize:14,
    color:"#898989",
    textAlign:"center",
    marginTop:5
  },
  tmpBtn: {
      position: "absolute",
      backgroundColor:'red',
      width:20,
      height:20,
      borderRadius:20
  }
});
