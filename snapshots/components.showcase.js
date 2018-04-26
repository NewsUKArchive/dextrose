
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  green: {
    backgroundColor: 'green',
    width: '100%',
    height: '100%'
  },
  red: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%'
  }
});

const Hello = () => (
  <View style={styles.green}>
    <Text>HELLO WORLD</Text>
  </View>
);

const Bye = () => (
  <View style={styles.red}>
    <Text>GOODBYE WORLD</Text>
  </View>
);

const Ignore = () => <Text>IGNORE ME WORLD</Text>;


export default {
    name: "ExampleTests",
    children: [
      {
        type: "story",
        name: "hello",
        component: () => <Hello/>
      },
      {
        type: "story",
        name: "goodbye",
        component: () => <Text style={styles.aqua}> The Chamber of Secrets</Text>
      },
      {
        type: "story",
        name: "ignore",
        component: () => <Text style={styles.blue}> The Prisoner of Azkaban</Text>
      }
    ]
  };