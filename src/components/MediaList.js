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
			this.state = {
			selectedItem: undefined,
			modalVisible: false,
			results: {
				items: []
			}
		}
	}

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
		return fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&q=cats&type=video&videoCaption=closedCaption&key=AIzaSyAcJCm3tEjtFVZ-jxyHrdIJtIQ4gt2lm6g')
			.then((response) => response.json())
			.then((responseJson) => {
				// Store the results in the state variable results and set loading to 
				// false to remove the spinner and display the list of videos
				that.setState({
				 results: responseJson,
				 loading: false
				});
				console.log(responseJson);

				return responseJson.items;
				})
			.catch((error) => {
				that.setState({
				 loading: false
				});

				console.error(error);
			});
	}

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
							<Thumbnail square size={100} source={{ uri: item.snippet.thumbnails.high.url }} />
							<Text style={{ fontWeight: '600' }}>Title: { item.snippet.title }</Text>
							<Text style={{ color: '#007594' }}>{ item.snippet.description.substring(0, 70) + '...' }</Text>
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
								<H3 style={styles.header}> {this.state.selectedItem.snippet.title}
									</H3>
									{/*<Image style={styles.modalImage} source={{uri: this.state.selectedItem.snippet.thumbnails.high.url}}  />*/}
									<Text>
									 {this.state.selectedItem.snippet.description}
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