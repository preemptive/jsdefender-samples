import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Redirect } from 'react-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const LoginComponent = ({ name, errorMessage, loggingIn, login }) => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');

  let activityIndicator = null;
  if (loggingIn) {
    activityIndicator = <ActivityIndicator size='large' color='#0000ff' />;
  }

  if (name.length > 0) {
    return <Redirect to='/' />;
  }

  let errorMessageBlock = null;
  if (errorMessage.length > 0) {
    errorMessageBlock = <Text style={styles.errorText}>{errorMessage}</Text>;
  }

  return (
    <View>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>SWAPI</Text>
        <Text style={styles.headerSubtitle}>The Star Wars API</Text>
      </View>
      <View style={styles.mainRow}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setUsername(text)} placeholder='Enter your Username' />
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput style={styles.textInput} onChangeText={(text) => setDob(text)} placeholder='Enter your DOB' />
        {errorMessageBlock}
        <View style={styles.cta}>
          <Button title='LOGIN' onPress={() => login(username, dob)} />
          {activityIndicator}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
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
    fontSize: 65,
    flex: 1,
  },
  headerSubtitle: {
    marginTop: 30,
    color: 'yellow',
    flex: 1,
  },
  mainRow: {
    flex: 0,
    borderRadius: 5,
    margin: 10,
    padding: 10,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
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
  errorText: {
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
  }
});

