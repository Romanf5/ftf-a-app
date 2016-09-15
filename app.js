import React, { Component } from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';

// Thirdparty
import Container from 'native-base';
import { Router, Scene } from 'react-native-router-flux';
import VideoPlayer from 'react-native-video-player';
import SplashScreen from 'rn-splash-screen';
import AudioPlayer from 'react-native-audioplayer';

// Custom Components
import MediaList from './src/components/MediaList';
import MediaScreen from './src/components/MediaScreen';

class FTFA extends Component {

    state = {
      isLoading: true,
    };


  componentWillMount() {

  }

  componentDidMount() {
    AudioPlayer.play('splash-sound.wav');
    global.setTimeout(() => {
      this.setState({isLoading: false});
    }, 1000);
  }

  componentDidUpdate() {
    if (!this.state.isLoading) {
      // Hide splash screen
      SplashScreen.hide();
    }
  }

  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    return (
        <Router hideNavBar={true}>
          <Scene key="root" navigationBarStyle={{backgroundColor: 'rgb(13, 85, 100)', borderBottomColor:"#1e2226"}} titleStyle={{color : "#FFF"}}>
            <Scene key="MediaList" component={MediaList} title="FTF-A" initial={true} />
            <Scene key="MediaScreen" component={MediaScreen} title="FTF-A" />
          </Scene>
        </Router>

    );
  }
}

AppRegistry.registerComponent('FTFA', () => FTFA);
