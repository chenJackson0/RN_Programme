'use strict'

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Animated,
    TouchableOpacity,
    findNodeHandle,
    UIManager,
    Alert,
    Easing
} from 'react-native'
import LoginScene from './loginScene';
// import Icon from 'react-native-vector-icons/Ionicons'

let {width, height} = Dimensions.get('window')
export default class BuyCar extends Component{
    constructor(props){
        super(props)
        this.state = {
            title:'购物车列表',
            animateBtnX: 0,
            animateBtnY: -999,
            addBtnY: -999,
            addBtnX:0,
            runAnim: new Animated.Value(0),
            endX: 40,// 购物车的位置 在距屏幕的左侧26像素
            endY: height-44, // 购物车的位置 在距屏幕的底部44像素
            curvature: .003, // 动画抛高系数，值越大抛的越高
            duration: 800, // 动画运动时间
            springValue: new Animated.Value(0),
            number: 0,
            change:"",
            flag:0
        }
    };
    componentDidMount(i = 0){

    };
    // 获取点击坐标XY
    getScreenXY(i,item){
        const self = this;
        const handle = findNodeHandle(this.refs[i]);
        UIManager.measure(handle, (x,y,width,height,pageX,pageY) => {
            console.log(x,y,width,height,pageX,pageY)
            let data=item
            let pos= [pageX, pageY, self.state.endX, self.state.endY]
            self.setState({
                addBtnY: pageY,
                addBtnX: pageX
            })
            self.run(pos,data)
        })
    }
    //运行动画
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
            this.state.runAnim.setValue(0)
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
                number: this.state.number + 1
            })
        })
    }
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
    changeList(i,item){
      const handle = findNodeHandle(this.refs[i]);
      // this.refs[i].viewConfig.validAttributes.style.backgroundColor = "#dddddd"
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

    render(){
      const springBig = this.state.springValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.5, 1]
      });
      // var data = ['西红柿1','西红柿2','西红柿3','西红柿4','西红柿5','西红柿6','西红柿7','西红柿18','西红柿15','西红柿12','西红柿13','西红柿143','西红柿14']
      var data=[
          {title: '橘汁',name:['橘汁1','橘汁2','橘汁3','橘汁4']},
          {title: '西瓜',name:['西瓜1','西瓜2','西瓜2','西瓜2','西瓜2']},
          {title: '苹果',name:['苹果','苹果']},
          {title: '香蕉',name:['香蕉','香蕉','香蕉']},
          {title: '火龙果',name:['火龙果','火龙果','火龙果']},
          {title: '栗子',name:['香蕉','香蕉','香蕉']},
          {title: '西红柿',name:['西红柿','西红柿','香蕉']},
          {title: '红烧肉面',name:['红烧肉面','红烧肉面','红烧肉面']},
          {title: '大米饭',name:['大米饭','大米饭','大米饭']},
          {title: '小炒肉',name:['小炒肉','小炒肉','小炒肉']},
          {title: '红烧鱼',name:['红烧鱼','红烧鱼','红烧鱼']},
          {title: '火锅鸡',name:['火锅鸡','火锅鸡','火锅鸡']},
          {title: '鸡蛋炒火腿',name:['鸡蛋炒火腿','鸡蛋炒火腿','鸡蛋炒火腿']},
          {title: '大肠',name:['香大肠蕉','大肠','大肠']},
          {title: '酸炒土豆',name:['酸炒土豆','酸炒土豆','酸炒土豆']},
          {title: '辣子鸡',name:['辣子鸡','辣子鸡','辣子鸡']},
      ];
      var leftData=[
          {title: '全部'},
          {title: '橘汁'},
          {title: '西瓜'},
          {title: '苹果'},
          {title: '香蕉'},
          {title: '火龙果'},
          {title: '栗子'},
          {title: '西红柿'},
          {title: '红烧肉面'},
          {title: '大米饭'},
          {title: '小炒肉'},
          {title: '红烧鱼'},
          {title: '火锅鸡'},
          {title: '鸡蛋炒火腿'},
          {title: '大肠'},
          {title: '酸炒土豆'},
          {title: '辣子鸡'},
      ];
        return(
            <View style={styles.fullScreen}>
                <View style={styles.headers}>
                    <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
                    <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
                    <Text style={styles.left} onPress={this.goHome.bind(this)}></Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.MaxConts}>
                  <View style={styles.maxLeft}>
                    <ScrollView style={styles.scrone}>
                      {
                        leftData.map((item,i) => {
                          return(
                            <Text ref = {i} style={[styles.texts]} onPress={this.changeList.bind(this,i,item)}>
                              {item.title}
                            </Text>
                          )
                        })
                      }

                    </ScrollView>
                  </View>
                  <View style={styles.maxRight}>
                    <ScrollView>
                      <View style={styles.scrollView}>
                        {
                            data.map((item, i) => {
                                return(
                                        <View style={styles.addBtn}>
                                            <Text style={styles.rightT}>{item.title}</Text>
                                            <Text ref={i} style={styles.rightTtext} onPress={this.getScreenXY.bind(this,i,item)}>加入购物车</Text>
                                        </View>
                                )
                            })
                        }
                      </View>
                    </ScrollView>
                  </View>
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
                <View style={{position:'absolute',bottom:0, left:0,width:width,height:60,flexDirection:'row'}}>
                    <View style={{flex:2,backgroundColor:'#dddddd'}}>
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
                    <View style={{flex:8,backgroundColor:'#f2f2f2'}}></View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fullScreen: {
        flex:1,
        // alignItems: "center",
        // justifyContent: "center",
        backgroundColor:"#ffffff"
    },
    addBtn:{
        // backgroundColor: "pink",
        // alignItems: "center",
        // justifyContent: "center",
        // flexDirection: 'row',
        // paddingVertical: 10,
        flex:0,
        width:120
    },
    rightT: {
      fontSize:15,
      color:"#333333",
      textAlign:"center",
      paddingTop:10,
      paddingBottom:10,
      height:100,
      lineHeight:100,
      backgroundColor:"#cccccc"
    },
    rightTtext: {
      fontSize:15,
      color:"#333333",
      textAlign:"center",
      paddingTop:10,
      paddingBottom:10
    },
    scrollView:{
        marginBottom:120,
        flexWrap:"wrap",
        flexDirection: 'row',
        justifyContent: "space-between",
    },
    scrone: {
      marginBottom:120,
    },
    tmpBtn: {
        position: "absolute",
        backgroundColor:'red',
        width:20,
        height:20,
        borderRadius:20
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
    MaxConts: {
      flexDirection:"row",
      justifyContent:"space-between",
    },
    maxLeft: {
      flex:3,
      borderRightColor:"#dddddd",
      borderRightWidth:1
    },
    maxRight: {
      flex:7,
      paddingLeft:10,
      paddingRight:10,
      flexDirection:"row",
    },
    texts: {
      fontSize:16,
      color:"#898989",
      height:50,
      textAlign:"center",
      lineHeight:50
    },
    numberText: {
        color: 'white',
        textAlign: 'center',
        padding: 0,
        includeFontPadding: false
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
})
