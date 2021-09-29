import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export const Planet = ({ planet }) => {
  return (
    <View style={styles.mainRow}>
      <Text style={styles.text}>Planet Name: {planet.name}</Text>
      <Text style={styles.text}>Rotation period: {planet.rotation_period}, Orbital period: {planet.orbital_period}, Diameter: {planet.diameter}</Text>
      <Text style={styles.text}>Climate: {planet.climate}, Gravity: {planet.gravity}, Terrain: {planet.terrain}</Text>
      <Text style={styles.text}>Surface water: {planet.surface_water}, Population: {planet.population}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainRow: {
    flex: 0,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 8,
    marginBottom: 8,
  }
});

export default Planet;