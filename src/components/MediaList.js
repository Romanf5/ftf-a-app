import React, { Component } from "react";
import { Platform, StyleSheet, Image, StatusBar } from 'react-native';

// Thirdparty
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from 'react-native-easy-grid';

import VideoFrame from './VideoFrame';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
     apiKey: "AIzaSyCNDshofwLcKbm9D3EqmTT1kT8ZT_DJVN8",
     authDomain: "ftfa-app-db.firebaseapp.com",
     databaseURL: "https://ftfa-app-db.firebaseio.com",
     storageBucket: "ftfa-app-db.appspot.com",
     messagingSenderId: "682909824696"
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
						<Title style={{ marginTop: 8 }}><Image source={require('../assets/FTF-A-logo-bar.png')} /></Title>
				</Header>
				<Content backgroundColor={'#f6f6f6'}>
					{this.state.loading ? <Spinner color={'rgb(13, 85, 100)'} /> :
					<List dataArray={this.state.results} renderRow={(item) =>

						<ListItem button onPress={() => {   console.log(item);
                                                Actions.MediaScreen({
                                                    item: item
                                                });
                                              }} >
              <Grid>
                 <Col style={{width: 80,height: 90, marginTop: 5}}>
                   <Thumbnail square style= {{marginTop: 5}} size={80} source={{uri: item.thumbnail}} />
                 </Col>
                 <Col style={{ width: 206,height: 90, margin: 5, marginLeft: 12 }}>
                    <Text style={{ fontWeight: 'normal', fontSize: 12, lineHeight: 14,marginTop: 3 }}>{item.title}</Text>
                    	<Text note style={{ color: '#0D5564', fontSize: 10, lineHeight: 12, marginTop: 7}}>{item.description}</Text>
                 </Col>
                 <Col style={{width: 25 ,height: 90, margin: 5 }}>
                   <Image style={{marginTop: 54, width: 35, height: 30 }}

                 source={(item.type == 'video') ? require('../assets/video-greyish.png') : (item.type == 'audio') ? require('../assets/audio-greyish.png') : require('../assets/FTF-A-logo-bar.png')}
                 />
                 </Col>
             </Grid>





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
	 }

});
