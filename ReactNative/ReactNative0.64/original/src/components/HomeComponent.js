import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Redirect } from 'react-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PlanetList from './PlanetList';

class HomeComponent extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    if (!this.props.isLoaded) {
      return <ActivityIndicator />;
    }

    if (this.props.isLoaded && this.props.username.length === 0) {
      return <Redirect to='/login' />;
    }

    return (
      <View>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Welcome {this.props.username}!</Text>
          <View style={styles.logoutButtonWrapper}>
            <Button title='Logout' onPress={(e) => this.props.removeUser()} />
          </View>
        </View>
        <PlanetList
          planets={this.props.planets}
          isLoaded={this.props.planetsLoaded}
          isFetching={this.props.planetsFetching}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
  },
  headerRow: {
    flex: 0,
    color: Colors.yellow,
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'yellow',
    fontSize: 35,
    flex: 1,
  },
  logoutButtonWrapper: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  label: {
    color: Colors.black,
    marginBottom: 5,
  },
  textInput: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    height: 36,
  },
  cta: {
    marginTop: 20,
  }
});

export default HomeComponent;
