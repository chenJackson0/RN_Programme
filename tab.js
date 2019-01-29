import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { CareateStackNavigator } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import Dimensions from 'Dimensions';
//引入三个界面文件，并设置引入的类
import HomeScene from './homeScene';
import LoginScene from './loginScene';
import RegisterScene from './registerScene';
import Userlist from './userlist'
const mWidth = Dimensions.get('window').width;
const mHeight = Dimensions.get('window').height;

export default class Tab extends Component{
	constructor (props){
		super(props);
		this.state = {
			selectedTab: 'subject'
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<TabNavigator >
					<TabNavigator.Item
						title="首页"
						selected={this.state.selectedTab === 'home'}
						selectedTitleStyle={styles.selectedTextStyle}
						titleStyle={styles.textStyle}
						onPress={()=>this.setState({ selectedTab:'home'})}>
						<HomeScene navigator={this.props.navigator} title='成功'/>
					</TabNavigator.Item>
					<TabNavigator.Item
						title="登陆"
						selected={this.state.selectedTab === 'subject'}
						selectedTitleStyle={styles.selectedTextStyle}
						titleStyle={styles.textStyle}
						onPress={()=>this.setState({ selectedTab:'subject'})}>
						<LoginScene navigator={this.props.navigator} title='登陆'/>
					</TabNavigator.Item>
					<TabNavigator.Item
						title="注册"
						selected={this.state.selectedTab === 'discover'}
						selectedTitleStyle={styles.selectedTextStyle}
						titleStyle={styles.textStyle}
						onPress={()=>this.setState({ selectedTab:'discover'})}>
						<RegisterScene navigator={this.props.navigator} title='注册'/>
					</TabNavigator.Item>
				</TabNavigator>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		width: mWidth,
		height: 40,
		bottom: 2,
    },
	textSyle: {
		color: '#999',
	},
	selectedTextStyle: {
		color: 'black',
	}
});

module.exports = Tab;
