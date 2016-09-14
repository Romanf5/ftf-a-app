import React, { Component } from "react";
import { Platform, StyleSheet, Image, StatusBar } from 'react-native';

// Thirdparty
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';

import VideoFrame from './VideoFrame';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCWi7iPeSRuXEzC9m6UIv7vu70DXpwhuYo",
    authDomain: "ftf-a-a8f5a.firebaseapp.com",
    databaseURL: "https://ftf-a-a8f5a.firebaseio.com",
    storageBucket: "ftf-a-a8f5a.appspot.com",
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
});

export default class MediaList extends Component {
	constructor(props) {
			super(props);
			this.itemsRef = firebaseApp.database().ref();
      this.storageRef = firebase.storage().ref();
			this.state = {
			selectedItem: undefined,
			results: {
				items: []
			}
		}
	}

	componentWillMount() {
		var that = this;
		that.getVideos();
	}

	showItem(x) {
		this.setState({
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
          var items = snapshot.val().items;
          var storage = [];
          for (x in items) {
            storage[x] = {
              description: items[x].description,
              thumbnail: items[x].thumbnail,
              title: items[x].title,
              type: items[x].type,
              uri: that.storageRef.child(snapshot.val().items[x].uri).getMetadata().then(function(metadata) {
                      return metadata.downloadURLs[0];
                    }).catch(function(error) {
                      return null
                    })
            }
          }
          //console.log(storage);
					that.setState({
						results: storage,
						loading: false,
					});
				}, function (errorObject) {
					console.log("The read failed: " + errorObject.code);
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
					<List dataArray={this.state.results} renderRow={(item) =>

						<ListItem button onPress={() => {   console.log(item);
                                                Actions.MediaScreen({
                                                    item: item
                                                });
                                              }} >
							<Thumbnail size={80} source={{uri: item.thumbnail}} />
							<Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
							<Text note style={{ color: '#007594' }}>{item.description}</Text>
						</ListItem>
					}/>}
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
