import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';

class App extends Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.main}>
          <ImageBackground source={require('./assets/img/star_wars.jpg')} resizeMode='cover' style={styles.backgroundImage}>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/login" component={LoginContainer} />
          </ImageBackground>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
});

export default App;
