import React, { Component } from 'react';
import { WebView, Text } from 'react-native';
import HTMLParser from 'fast-html-parser';



export default class VideoFrame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: ''
		}
	}

	componentWillMount() {
		this.getHtml('https://videotool.dk/ftf-a/c3473/v26929');
	}

	componentDidMount() {
		
	}

	getHtml(uri) {	
		return  
			fetch(baseUrl + video)
				.then((response) => response.text())
				.then((text) => {
					var root = HTMLParser.parse(text);
					console.log(root.querySelector('video'));	
		 			var iframeAttrs = root.querySelector('iframe').rawAttrs 
					var iframe = `<iframe ` + iframeAttrs + `></iframe>`
					console.log(iframe);			

					this.setState({
						result: iframe
					});

					return text;
				});
	}

  render() {
    return (
    	<WebView
        	source={{html: this.state.result}}
        	style={{marginTop: 20}}
      	/>
    );
  }
}