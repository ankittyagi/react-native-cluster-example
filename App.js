import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Map from './Map'
import Points from './Map/points'
export default class App extends React.Component {
    render() {
    return (
            <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 80,
            backgroundColor: "red",
          }}
        >
          <Text
            style={{
              alignSelf: 'center',
              textAlign: "center",
              height: 50,
              marginTop: 35,
              color: "white"
            }}
          >
            Example for React Native Map Clusters
          </Text>
        </View>
        <Map
          {
            ...{mapPoints: Points}
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
   