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
import ShoppingCard from './shoppingCardPerect.js';
let windowsSize = {
    width: Dimensions.get('window').width,
    height: Dimensions.get("window").height
};
class Row extends Component {
    _rowClick(i,item){
      var cut = this.refs[i];
      this.props.updateParentState(i,item,cut);
    };

    render(){
        return(
            <TouchableOpacity style={styles.row} ref={this.props.data.row} onPress={()=>{this._rowClick(this.props.data.row,this.props.data.value)}}>
                <View style={{flex:1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#dddddd",borderColor:"#cccccc",borderWidth:1}}>
                    <Text>
                        {this.props.data.value}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };
    _backColor =()=> {
        let r=Math.floor(Math.random()*256);
        let g=Math.floor(Math.random()*256);
        let b=Math.floor(Math.random()*256);
        let s = "rgb("+r+','+g+','+b+")";
        return s;//所有方法的拼接都可以用ES6新特性`其他字符串{$变量名}`替换
    };
};
export default class Demosectionlist extends Component{
    constructor(props){
        super(props);
        let data1 =  Array.from(new Array(5)).map((val, i)=>({
            value: "苹果",
            row: i,
        }));
        let data2 =  Array.from(new Array(8)).map((val, i)=>({
            value: "西瓜",
            row: i,
        }));
        let data3 =  Array.from(new Array(11)).map((val, i)=>({
            value: "香蕉",
            row: i,
        }));
        //这里面的data属性后面跟数组，是为了在布局renderItem的时候可以传入的参数item是数组，而不是data1这个对象
        this.state = {
              rowData: [
                {key: 's1', data: [data1]},
                {key: 's2', data: [data2]},
                {key: 's3', data: [data3]}
              ],
              title:"列表demo",
              animateBtnX: 0,
              animateBtnY: -999,
              addBtnY: -999,
              addBtnX:0,
              runAnim: new Animated.Value(0),
              endX: 375,// 购物车的位置 在距屏幕的左侧26像素
              endY: windowsSize.height-44, // 购物车的位置 在距屏幕的底部44像素
              curvature: .003, // 动画抛高系数，值越大抛的越高
              duration: 800, // 动画运动时间
              springValue: new Animated.Value(0),
              number: 0,
              arrayList:[]
        };
    };

    _listHeaderComponent =()=> {
        return(
            <View style={{backgroundColor: '#aaaaff'}}>
                <Text>
                    我是listHeader
                </Text>
            </View>
        )
    };
    _listFooterComponent =()=> {
         return(
             <View style={{backgroundColor: '#aaaaff'}}>
                 <Text>
                     我是listFooter
                 </Text>
             </View>
         )
    };
    //参数需要{}修饰，告诉是个对象
    _renderSectionHeader = ({section}) => {
        return(
            <View style={{flex: 1, height: 25, backgroundColor: '#11ffff', justifyContent: 'center'}}>
                <Text style={styles.sectionHeader}>{section.key}</Text>
            </View>
        )
    };
    //参数需要{}修饰，告诉是个对象
    _renderItem =({item})=> {
        return (
        <View style={styles.list}>
            {
                item.map((val, i)=>{
                    return <Row key={i} data={val} updateParentState={this.getScreenXY.bind(this)}/>
                })
            }
        </View>
        )
    };
    _extraUniqueKey =(item)=> {
        return "index"+item;
    };
    // 获取点击坐标XY
    getScreenXY = (i,item,cut) => {
      const self = this;
      // var cut = this.refs.a;
      const handle = findNodeHandle(cut);
      UIManager.measure(handle, (x,y,width,height,pageX,pageY) => {
          let data=item
          let pos= [pageX, pageY, this.state.endX, this.state.endY]
          this.setState({
              addBtnY: pageY,
              addBtnX: pageX
          })
          this.run(pos,data)
      })
      let items = {
        name:item
      }
      this.setState({
        arrayList:this.state.arrayList.concat(items)
      })
    };
    //运行动画
    run(position = [],data = {}){
        if(position.length != 4){
            return
        }
        this.state.runAnim.setValue(0)
        const { inputRange, outputX, outputY } = this.getPaths(position)
        this.setState({
            animateBtnX: this.state.runAnim.interpolate({
                inputRange:inputRange, outputRange: outputX
            }),
            animateBtnY: this.state.runAnim.interpolate({
                inputRange:inputRange, outputRange: outputY
            })
        })
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

    //跳购物车列表
    shoppingCard = () => {
      const {navigator} = this.props;
      navigator.push({
        name:'ShoppingCard',
        component:ShoppingCard,
        params:{
          list:this.state.arrayList
        }
      })
    }
    render(){
      const springBig = this.state.springValue.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 1.5, 1]
      });
        return(
          <View style={{flex: 1}}>
            <SectionList style={{backgroundColor: '#aaffaa', marginTop: 20}}
                 renderItem={this._renderItem}
                 ListFooterComponent={this._listFooterComponent}
                 // ListHeaderComponent={this._listHeaderComponent}
                 renderSectionHeader={this._renderSectionHeader}
                 showsVerticalScrollIndicator={false}
                 keyExtractor = {this._extraUniqueKey}
                 sections={
                     this.state.rowData
                 }>
            </SectionList>
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
                      <Text onPress = {this.shoppingCard.bind(this)}>购物车</Text>
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
        )
    }
}
const styles = StyleSheet.create({
    list:{
        flexDirection: 'row', //这里的属性很重要，可以学习下flex布局
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF'
    },
    row:{
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        // alignItems: 'center',
        width: windowsSize.width/4,
        height: windowsSize.width/4,
    },
    sectionHeader: {
        marginLeft: 10,
        fontSize: 12,
        color: '#787878'
    },
    shopcart: {
        // position: 'absolute',
        // bottom: 0,
        height: 50,
        // left:0,
        // right:0,
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
      lineHeight:30,
      backgroundColor:"#ffffff"
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
AppRegistry.registerComponent('Demosectionlist', ()=>Demosectionlist);
