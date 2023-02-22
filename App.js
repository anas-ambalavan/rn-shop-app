/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {createSerializableStateInvariantMiddleware} from '@reduxjs/toolkit';

import ShopNavigator from './src/navigation/ShopNavigator.js';
import cart from './src/store/cart.js';
import products from './src/store/products.js';
import orders from './src/store/orders.js';

const store = configureStore({
  reducer: {products, cart, orders},
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

export default App;
