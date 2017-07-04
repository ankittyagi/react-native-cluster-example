import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Map from './scenes/Map'

import Points from './assets/Points.json';

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
            ...{
              mapPoints: Points
            }
          }
        />
      </View>
    );
  }
}
