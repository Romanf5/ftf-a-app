import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

// Custom Components
import MediaList from './src/components/MediaList';
import VideoFrame from './src/components/VideoFrame';

class FTFA extends Component {
  render() {
    return (
    	<MediaList />
    );
  }
}

AppRegistry.registerComponent('FTFA', () => FTFA);