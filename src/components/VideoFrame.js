import React, { Component } from 'react';
import { WebView } from 'react-native';
import { Container, Header, Title, Content, List, Thumbnail, ListItem, Text, Button, Spinner, Card, CardItem, H3 } from 'native-base';
// import HTMLParser from 'fast-html-parser';



export default class VideoFrame extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	result: ''
		// }
	}

	// componentDidMount() {
	// 	this.getHtml('https://videotool.dk/ftf-a/c3473/v26929');
	// }

	// getHtml(uri) {
	// 	return fetch(uri)
	// 			.then((response) => response.text())
	// 			.then((text) => {
	// 				var root = HTMLParser.parse(text);
	// 				console.log(root.querySelector('video'));
	// 	 			var iframeAttrs = root.querySelector('iframe').rawAttrs
	// 				var iframe = `<iframe ` + iframeAttrs + `></iframe>`
	// 				console.log(iframe);
	//
	// 				this.setState({
	// 					result: iframe
	// 				});
	//
	// 				return text;
	// 			});
	// }

  render() {
    return (
    	<Card>
	    	<WebView
	        	source={{html: this.props.res}}
	        	style={{marginTop: 20}}
	      	/>
	    </Card>
    );
  }
}
