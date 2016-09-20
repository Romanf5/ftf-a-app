import React, { Component } from 'react';
import { StyleSheet, Image, StatusBar, View  } from 'react-native';

// Thirdparty
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import VideoPlayer from 'react-native-video-player';
import SwipeCarousel from 'react-native-swipe-carousel';
import { Actions, ActionConst, NavBar } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';



export default class MediaScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
		selectedItem: undefined,
	}
}

	_orientationDidChange(orientation) {
	    if (orientation == 'LANDSCAPE') {
				styles.create({
				  backgroundVideo: {
				    position: 'absolute',
				    top: 0,
				    left: 0,
				    bottom: 0,
				    right: 0,
				  },
				});
	      console.log('LANDSCAPE');
	    } else {
				styles.create({
					backgroundVideo: {
					},
				});
	      console.log('PORTRAIT');
	    }
	  }

	componentWillMount() {
		//The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {

    } else {

    }

		var that = this;
		that.setState({
			selectedItem: this.props.item
		})
	}

	componentDidMount() {
		Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    //Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    Orientation.addOrientationListener(this._orientationDidChange);

		//ActionConst.hideNavBar = true;
		console.log('aaa');

	}

	componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  render() {
		return (
			<Container>
				<Header backgroundColor={'rgb(13, 85, 100)'}>
						<Button transparent onPress={Actions.pop}>
							<Image source={require('../assets/arrow.png')} />
						</Button>
						<Title style={{ marginTop: 8 }}><Image source={require('../assets/FTF-A-logo-bar.png')} /></Title>
				</Header>
				<Content style={{backgroundColor: '#f6f6f6'}}>
					<View style={{paddingLeft: 15, paddingRight: 15}}>

					</View>
					<View style={styles.shad}>
						<View>
							<VideoPlayer
										thumbnail={{uri: this.state.selectedItem.thumbnail}}
										video={{uri: this.state.selectedItem.uri.ka}}
										style={styles.backgroundVideo}
								/>
						</View>
						<View style={styles.descrTitle}>
							<Grid>
								<Col>
									<Text style={styles.txt}>{this.state.selectedItem.title}</Text>
								</Col>
								<Col style={{width: 50}}>
									<Image
										style={styles.img}
										source={(this.state.selectedItem.type == 'video') ? require('../assets/video@3x.png') : (this.state.selectedItem.type == 'audio') ? require('../assets/audio.png') : require('../assets/FTF-A-logo-bar.png')}
									/>
								</Col>
							</Grid>
							<Text  style={{marginTop: 8, marginLeft: 6, fontSize: 12 }}>{this.state.selectedItem.description}</Text>
						</View>
					</View>






				{/* <SwipeCarousel>
						<View>
							<H3>One</H3>
						</View>
						<View>
							<H3>two</H3>
						</View>
						<View>
							<H3>Three</H3>
						</View>
						<View>
							<H3>Four</H3>
						</View>
				</SwipeCarousel> */}

				</Content>
			</Container>
    );
  }
}


var styles = StyleSheet.create({
	img: {
		alignSelf: "flex-end",
		//marginTop: 54,
		width: 35,
		height: 30,
		marginTop: 2
	},
	txt: {
		fontWeight: 'normal',
		marginLeft: 6,
		marginTop: 3
	},
	descrTitle: {
		//flexDirection: "row",
		backgroundColor: '#fff',
		padding: 10,
		paddingBottom: 30


	},
	shad: {
		// shadowColor: 'rgb(130, 130, 130)',
		// shadowOffset: {width: 3, height: 3},
		// shadowOpacity: 0.2,
		// shadowRadius: 1.5,
		 margin: 0
	}
})
