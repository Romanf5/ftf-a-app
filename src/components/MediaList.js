import React, { Component, PropTypes } from "react";

import { AppRegistry, StyleSheet, View, Image, Navigator, Modal, Platform } from 'react-native';

import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';

import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWi7iPeSRuXEzC9m6UIv7vu70DXpwhuYo",
    authDomain: "ftf-a-a8f5a.firebaseapp.com",
    databaseURL: "https://ftf-a-a8f5a.firebaseio.com",
    storageBucket: "ftf-a-a8f5a.appspot.com",
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class MediaList extends Component {
	constructor(props) {
			super(props);
			this.itemsRef = firebaseApp.database().ref();
			this.state = {
			selectedItem: undefined,
			modalVisible: false,
			results: {
				items: []
			}
		}
	}

	// // Firebase
	componentDidMount() {
		var that = this;
		this.getVideos();
	}

	setModalVisible(visible, x) {
		this.setState({
			modalVisible: visible,
			selectedItem: x
		});
	}

	getVideos() {
	// Set loading to true when the search starts to display a Spinner
		this.setState({
			loading: true
		});
		var that = this;
		return 	this.itemsRef.on("value", function(snapshot) {
					console.log(snapshot.val());
					that.setState({
						results: snapshot.val(),
						loading: false
					});
				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
				});
	

	render() {
		var that = this;
		return (
			<Container>
				<Header backgroundColor={'rgb(13, 85, 100)'}>
						<Title><Image source={require('../assets/FTF-A-logo-bar.png')} /></Title>
				</Header>
				<Content backgroundColor={'#f6f6f6'}>
					{this.state.loading ? <Spinner color={'rgb(13, 85, 100)'} /> :
					<List dataArray={this.state.results.items} renderRow={(item) => 
						<ListItem button onPress={()=>this.setModalVisible(true, item)}>
							<Thumbnail square size={100} source={{ uri: item.thumbnail}} />
							<Text style={{ fontWeight: '600' }}>Title: { item.title }</Text>
							<Text style={{ color: '#007594' }}>{ item.description.substring(0, 70) + '...' }</Text>
						</ListItem>
					}/>}
					<Modal
						animationType="slide"
						transparent={false}
						visible={this.state.modalVisible}
						onRequestClose={() => {alert("Modal has been closed.")}}
						>
						<Header backgroundColor={'rgb(13, 85, 100)'}>
							<Button transparent onPress={() => {this.setModalVisible(!this.state.modalVisible, this.state.selectedItem)}}>
								<Image source={require('../assets/arrow-back.png')} />
							</Button>
							<Title><Image source={require('../assets/FTF-A-logo-bar.png')} /></Title>
						</Header>
						<Card style={{paddingTop: 20}}>
							{!this.state.selectedItem ? <View /> :
							<CardItem cardBody style={{justifyContent: 'flex-start'}}>
								<H3 style={styles.header}> {this.state.title}
									</H3>
									{/*<Image style={styles.modalImage} source={{uri: this.state.selectedItem.snippet.thumbnails.high.url}}  />*/}
									<Text>
									 {this.state.description}
									</Text>
							</CardItem>}
						</Card>
					</Modal>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
		header : {
				marginLeft: -5,
				marginTop: 5,
				marginBottom: (Platform.OS==='ios') ? -7 : 0,
				lineHeight: 24,
				color: '#5357b6'
		},
		modalImage: {
				resizeMode: 'contain',
				height: 200
		},
		bold: {
				fontWeight: '600'
		},
		negativeMargin: {
				marginBottom: -10
		},
		backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	 },

});