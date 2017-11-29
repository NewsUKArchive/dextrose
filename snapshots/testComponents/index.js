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
  },
});

export const Hello = props => (
  <View style={styles.green}>
    <Text>HELLO WORLD</Text>
  </View>
);

export const Bye = props => (
  <View style={styles.red}>
    <Text>GOODBYE WORLD</Text>
  </View>);

export const Ignore = props => <Text>IGNORE ME WORLD</Text>;