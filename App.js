/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from './src/components/core/Icon.js';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome to the Shop!</Text>
      <Icon name="shopping-cart-2-fill" size={20} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
