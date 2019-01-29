import React, {Component} from 'react';
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
  Easing,
  Button,
  FlatList,
  SectionList
} from 'react-native';
import LoginScene from './loginScene';
import Addcard from './addcard';
import Project from './project';
import ParcelPage from './parcelPage';
import Demosectionlist from './demosectionlist';
const {width,height}=Dimensions.get('window')
export default class Servie extends Component{
  // 构造
  _flatList
  addcard
  constructor(props) {
    super(props);
    this.state = {
      title:"列表demo",
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
    }
  }

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
  leftRight = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'ParcelPage',
      component:ParcelPage,
    })
  };
  project = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'Project',
      component:Project,
    })
  };
  demosectionlist = () => {
    const {navigator} = this.props;
    navigator.push({
      name:'Demosectionlist',
      component:Demosectionlist,
    })
  };
  // 获取点击坐标XY
  getScreenXY(i,item){
    var cut = this.refs.sss
    // const self = this;
    // const handle = findNodeHandle(this.refs[i]);
    // UIManager.measure(handle, (x,y,width,height,pageX,pageY) => {
    //     console.log(x,y,width,height,pageX,pageY)
    //     let data=item
    //     let pos= [pageX, pageY, self.state.endX, self.state.endY]
    //     self.setState({
    //         addBtnY: pageY,
    //         addBtnX: pageX
    //     })
    //     self.run(pos,data)
    // })
    alert(cut)
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
    var datas=[
      {title: '橘汁',data:['橘汁1','橘汁2','橘汁3','橘汁4']},
      {title: '西瓜',data:['西瓜1','西瓜2','西瓜2','西瓜2','西瓜2']},
      {title: '苹果',data:['苹果','苹果']},
      {title: '香蕉',data:['香蕉','香蕉','香蕉']},
      {title: '火龙果',data:['火龙果','火龙果','火龙果']},
      {title: '栗子',data:['香蕉','香蕉','香蕉']},
      {title: '西红柿',data:['西红柿','西红柿','香蕉']},
      {title: '红烧肉面',data:['红烧肉面','红烧肉面','红烧肉面']},
      {title: '大米饭',data:['大米饭','大米饭','大米饭']},
      {title: '小炒肉',data:['小炒肉','小炒肉','小炒肉']},
      {title: '红烧鱼',data:['红烧鱼','红烧鱼','红烧鱼']},
      {title: '火锅鸡',data:['火锅鸡','火锅鸡','火锅鸡']},
      {title: '鸡蛋炒火腿',data:['鸡蛋炒火腿','鸡蛋炒火腿','鸡蛋炒火腿']},
      {title: '大肠',data:['香大肠蕉','大肠','大肠']},
      {title: '酸炒土豆',data:['酸炒土豆','酸炒土豆','酸炒土豆']},
      {title: '辣子鸡',data:['辣子鸡','辣子鸡','辣子鸡']},
    ];
    addcard = () => {
      const {navigator} = this.props;
      navigator.push({
        name:'Addcard',
        component:Addcard,
      })
    };
    // const aheight = this.state.heightValue.interpolate({
    //     inputRange: [0, 0.25, 0.5, 0.75, 1],
    //     outputRange: [25, 75, 100, 75, 25]
    // });
    // const awidth = this.state.heightValue.interpolate({
    //     inputRange: [0, 0.25, 0.5, 0.75, 1],
    //     outputRange: [120, 140, 160, 180, 200]
    // });
    /*const font = this.state.fontValue.interpolate({
     inputRange: [0, 0.5, 1],
     outputRange: [16, 22, 16]
     });*/
    const springBig = this.state.springValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.5, 1]
    });
    return (
      <View style={{flex:1,backgroundColor:"#ffffff"}}>
        <View style={styles.headers}>
            <Text style={styles.left} onPress={this.goBack.bind(this)}>返回</Text>
            <Text style={[styles.left,styles.right]}>{this.state.title}</Text>
            <Text style={styles.left} onPress={this.leftRight.bind(this)}>左右联动</Text>
        </View>
        <View style={styles.line}></View>
        <Button title='喵点' onPress={()=>{
          this._flatList.scrollToOffset({animated: true, offset: 30});
        }}/>
        <SectionList style={styles.sectionLists}
          ref={(flatList)=>this._flatList = flatList}
          // ListHeaderComponent={this._header}
          // ListFooterComponent={this._footer}
          // ItemSeparatorComponent={this._separator}
          renderItem={this._renderItem}
          renderSectionHeader = {this._renderSectionHeader}
          keyExtractor={(item, index) => index}
          // onRefresh={this.refreshing}
          // refreshing={false}
          // onEndReachedThreshold={0}
          // onEndReached={
          //   this._onload
          // }
          numColumns ={2}
          // columnWrapperStyle={{borderWidth:2,borderColor:'black',paddingLeft:20}}

          //horizontal={true}

          // getItemLayout={(data,index)=>(
          // {length: 100, offset: (100+2) * index, index}
          // )}

          sections={datas} />
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
                    <Text onPress = {() => {
                      this.demosectionlist()
                    }}>客服</Text>
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
  };
  _renderItem = ({item}) => {
    var txt = '加入购物车';
    var marginRight = item.index % 2 == 0 ? 15 : 0;
    return <View style={styles.list}><Text style={[{flex:1,backgroundColor:"#cccccc",marginRight:marginRight,marginTop:15},
    styles.txt]} onPress={addcard}>{item}</Text><Text style={styles.but}  ref= {"ssss"} onPress={this.getScreenXY.bind(this,item.index,item)}>加入购物车</Text></View>
  };
  _renderSectionHeader = ({section}) => {
    return <Text style = {styles.titlesing}>{section.title}</Text>
  }
}
const styles=StyleSheet.create({
  list: {
    // flexDirection:"row",
    // justifyContent:"space-between",
    // flexWrap:"wrap"
    // width:width/4
  },
  sectionLists: {
    // flexWrap:"wrap",
    // flexDirection:"row"
  },
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 14,
    textAlign:"center",
    lineHeight:100,
    height:100,
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
  container: {
      flex: 1,
      marginTop: 22,
      backgroundColor: '#F5FCFF',
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
})
