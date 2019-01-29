/**
 * Created by 卓原 on 2017/8/17.
 * zhuoyuan93@gmail.com
 */
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
    Easing
} from 'react-native';
export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            heightValue: new Animated.Value(0),
            widthValue: new Animated.Value(0),
            //   fontValue: new Animated.Value(0),
            springValue: new Animated.Value(0),
        }
    }

    render() {

        const aheight = this.state.heightValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [25, 75, 100, 75, 25]
        });
        const awidth = this.state.heightValue.interpolate({
            inputRange: [0, 0.25, 0.5, 0.75, 1],
            outputRange: [75, 95, 115, 135, 155]
        });
        /*const font = this.state.fontValue.interpolate({
         inputRange: [0, 0.5, 1],
         outputRange: [16, 22, 16]
         });*/
        const springBig = this.state.springValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.5, 1]
        });
        return (
            <View style={styles.container}>
                <Text>购物车动画</Text>
                <Animated.Image
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    style={{width: 20, height: 20, position: 'absolute', bottom: aheight, right: awidth}}/>
                <View style={styles.shopcart}>
                      <View style={styles.bottomItem}>
                          <Text>客服</Text>
                      </View>
                      <View style={styles.bottomItem}>
                          <Text>购物车</Text>
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
                      <View style={[styles.bottomItem, {backgroundColor: 'red'}]} >
                          <Text style={styles.numberText} onPress={() => {
                              this.startAnimated();
                          }}>加入购物车</Text>
                      </View>
                </View>
            </View>
        )
    }

    startAnimated() {
        this.state.heightValue.setValue(0);
        this.state.widthValue.setValue(0);
        // this.state.fontValue.setValue(0);
        // Animated.sequence([
        Animated.parallel([
            Animated.timing(this.state.heightValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.state.heightValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,// 线性的渐变函数
            }),
            // ]),
            // Animated.timing(this.state.fontValue, {
            //     toValue: 1,
            //     duration: 500,
            //     easing: Easing.linear,// 线性的渐变函数
            // }),
        ]).start(() => this.spring());


    }

    spring() {
        this.state.springValue.setValue(0);
        Animated.spring(
            this.state.springValue,
            {
                toValue: 1,
                firction: 1
            }).start();
            this.setState({
                number: this.state.number + 1
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 22,
        backgroundColor: '#F5FCFF',
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
    }
});
