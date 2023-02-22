import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import {
  PRODUCT_OVERVIEW,
  PRODUCT_DETAIL,
  CART,
  ORDERS,
  PRODUCTS,
  ORDER_HISTORY,
} from './Constants';
import Icon from '../components/core/Icon';
import {height, primary} from '../constants';

const headerStyle = navigation => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate(CART)}>
        <Icon name="shopping-cart-2-line" size={20} color={primary} />
        <Text>1</Text>
      </TouchableOpacity>
    ),
    headerTintColor: primary,
  };
};

const ProductStackNavigator = createNativeStackNavigator();

export const ProductNavigator = () => {
  const navigation = useNavigation();

  return (
    <ProductStackNavigator.Navigator screenOptions={headerStyle(navigation)}>
      <ProductStackNavigator.Screen
        component={ProductOverviewScreen}
        name={PRODUCT_OVERVIEW}
      />
      <ProductStackNavigator.Screen
        component={ProductDetailScreen}
        name={PRODUCT_DETAIL}
      />
      <ProductStackNavigator.Screen component={CartScreen} name={CART} />
    </ProductStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createNativeStackNavigator();

export const OrdersNavigator = () => {
  const navigation = useNavigation();

  return (
    <OrdersStackNavigator.Navigator screenOptions={headerStyle(navigation)}>
      <OrdersStackNavigator.Screen component={OrdersScreen} name={ORDERS} />
    </OrdersStackNavigator.Navigator>
  );
};

const ShopBottomNavigator = createBottomTabNavigator();

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ShopBottomNavigator.Navigator
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          tabBarActiveTintColor: primary,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === PRODUCTS) {
              iconName = focused ? 'home-fill' : 'home-line';
            } else if (route.name === ORDER_HISTORY) {
              iconName = 'list-unordered';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarStyle: {
            height: height / 14,
          },
        })}>
        <ShopBottomNavigator.Screen
          component={ProductNavigator}
          name={PRODUCTS}
        />
        <ShopBottomNavigator.Screen
          component={OrdersNavigator}
          name={ORDER_HISTORY}
        />
      </ShopBottomNavigator.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;

const styles = StyleSheet.create({
  headerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
