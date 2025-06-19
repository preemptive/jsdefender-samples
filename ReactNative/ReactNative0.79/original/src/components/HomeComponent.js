import React, { useEffect } from 'react';
import { Text, StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { Navigate } from 'react-router-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PlanetList from './PlanetList';

const HomeComponent = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  if (!props.isLoaded) {
    return <ActivityIndicator />;
  }

  if (props.isLoaded && props.username.length === 0) {
    return <Navigate to="/login" />;
  }

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Welcome {props.username}!</Text>
        <View style={styles.logoutButtonWrapper}>
          <Button title="Logout" onPress={(e) => props.removeUser()} />
        </View>
      </View>
      <PlanetList
        planets={props.planets}
        isLoaded={props.planetsLoaded}
        isFetching={props.planetsFetching}
      />
    </View>
  );
};

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
  },
});

export default HomeComponent;