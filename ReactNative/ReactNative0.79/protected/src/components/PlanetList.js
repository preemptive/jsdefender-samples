import React from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView
} from 'react-native';
import Planet from './Planet';

export const PlanetList = ({ planets, isLoaded, isFetching }) => {
  if (!isLoaded || isFetching) {
    return <ActivityIndicator size='large' color='white' />;
  }

  if (planets.length === 0) {
    return <Text style={styles.text}>No planets</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {planets.map(planet => <Planet key={planet.name} planet={planet} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white'
  }
});

export default PlanetList;
