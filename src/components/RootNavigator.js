import React, { Component } from 'react';
import { Navigator, StyleSheet, Image } from 'react-native';
import { Header, Title } from 'native-base';

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'rgb(13, 85, 100)'
  },
  buttonStyle: { marginTop: 13 },
})

const NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState) {
    return route.leftButton ? (
      <route.leftButton
        style={styles.buttonStyle}
        navigator={navigator}
        route={route}
      />
    ) : null;
  },
  Title: function() {
    return (
      <Image source={require('../assets/FTF-A-logo-bar.png')} />
    )
  }
}

export default class RootNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = { hideNavigationBar: false };
  }

  componentDidMount() {
    this._setupRoute(this._getInitialRoute());
  }

  componentWillUnmount() {
    if (this._listeners)
      this._listeners.forEach((listener) => listener.remove());
  }

  onNavWillFocus(route) {
    this._setupRoute(route.currentTarget.currentRoute);
  }

  render() {
    let navigationBar = (
        <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
        />
    )

    return (
      <Navigator
          ref={(navigator) => this._setNavigatorRef(navigator)}
          ititialRoute={this.getItitialRoute()}
          renderScene={(route, navigator) => this.renderScene(route, navigator)}
          navigationBar={this.state.hideNavigationBar ? null : navigationBar}
      />
    );
  }
}
