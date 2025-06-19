
import * as React from 'react';
import { NativeRouter, Routes, Route } from 'react-router-native';
import {
  Platform,
  StyleSheet,
  ImageBackground,
  View
} from 'react-native';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
function App() {
  return (
    <NativeRouter>
      <View style={styles.main}>
        <ImageBackground source={require('./assets/img/star_wars.jpg')} resizeMode='cover' style={styles.backgroundImage}>
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            <Route exact path="/login" element={<LoginContainer />} />
          </Routes>
        </ImageBackground>
      </View>
    </NativeRouter>
  );
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

export default App
