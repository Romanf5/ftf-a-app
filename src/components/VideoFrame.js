import React, { Component } from 'react';
import { WebView } from 'react-native';
import HTMLParser from 'fast-html-parser';

export default class VideoFrame extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: ''
		}
	}

	getHtml(uri) {
		return fetch(uri)
				.then((response) => response.text())
				.then((text) => {
					var root = HTMLParser.parse(text);
		 			var iframeAttrs = root.querySelector('iframe').rawAttrs
					var iframe = `<iframe ` + iframeAttrs + ` style="height: auto; width: 100%"></iframe>`

					this.setState({
						result: iframe
					});

					return text;
				});
	}

	componentDidMount() {
		this.getHtml(this.props.video);
	}

  render() {
		return (
	    	<WebView
						automaticallyAdjustContentInsets={false}
	        	source={{html: this.state.result}}
	        	style={{backgroundColor: 'grey', marginTop: 20, alignItems: 'center', height: 100}}
	      	/>
    );
  }
}
