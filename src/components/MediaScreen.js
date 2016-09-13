import React, { Component } from 'react';
import { StyleSheet, Image, Navigator, View  } from 'react-native';

// Thirdparty
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import VideoPlayer from 'react-native-video-player';
import SwipeCarousel from 'react-native-swipe-carousel';
import { Actions, ActionConst, NavBar } from 'react-native-router-flux';
import Orientation from 'react-native-orientation';

var styles = StyleSheet;

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
			styles.create({
				backgroundVideo: {},
			});
    } else {
			styles.create({
				backgroundVideo: {
					position: 'absolute',
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
				},
			});
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
							<Image source={require('../assets/arrow-back.png')} />
						</Button>
						<Title><Image source={require('../assets/FTF-A-logo-bar.png')} /></Title>
				</Header>
				<Content backgroundColor={'#f6f6f6'} style={{padding: 15}}>
					<H3 style={{textAlign: 'center', fontWeight: 'bold'}}>{this.state.selectedItem.title}</H3>
					<Card style={{borderRadius: 0}}>
					<CardItem style={{padding: 0, borderRadius: 0}}>
					<VideoPlayer
							thumbnail={{uri: this.state.selectedItem.thumbnail}}
							video={{uri: this.state.selectedItem.uri.ka}}
							style={styles.backgroundVideo}
					/>
					</CardItem>


							<Grid style={{padding: 15}}>
							<Row style={{minHeight: 50}}>
									<Col style={{}}>
										<H3 style={{fontWeight: 'bold'}}>{this.state.selectedItem.title}</H3>
									</Col>
									<Col style={{alignItems: "center"}}>
									<Image
										style={{ width: 40, alignSelf: 'flex-end'}}
										source={(this.state.selectedItem.type == 'video') ? require('../assets/icon-movie.png') : (this.state.selectedItem.type == 'audio') ? require('../assets/icon-audio.png') : require('../assets/FTF-A-logo-bar.png')}
									/>
									</Col>
									</Row>
									<Row>
							<Text style={{flex: 1}}>{this.state.selectedItem.description}</Text>
							</Row>
					</Grid>

					</Card>

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

// Later on in your styles..
