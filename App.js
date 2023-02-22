/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ShopNavigator from './src/navigation/ShopNavigator.js';
import {configureStore} from '@reduxjs/toolkit';
import products from './src/store/products.js';
import {Provider} from 'react-redux';
import cart from './src/store/cart.js';
import {createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    products: products,
    cart: cart,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    createSerializableStateInvariantMiddleware(),
  ],
});

const App = () => {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
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
