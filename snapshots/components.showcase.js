
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
    name: "snaps",
    children: [
      {
        type: "story",
        name: "hello",
        component: () => <Hello/>
      },
      {
        type: "story",
        name: "goodbye",
        component: () => <Bye/>
      },
      {
        type: "story",
        name: "ignore",
        component: () => <Ignore/>
      }
    ]
  };