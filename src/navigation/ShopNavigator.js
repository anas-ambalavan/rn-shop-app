import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import ProductOverviewScreen, {
  screenOptions as ProductOverViewScreenOptions,
} from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen, {
  screenOptions as ProductDetailScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import CartScreen, {
  screenOptions as CartScreenOptions,
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as OrdersScreenOptions,
} from '../screens/shop/OrdersScreen';
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
import {selectCartTotalQuantity} from '../store/cart';

const headerStyle = (navigation, totalQuantity = 0, cart = false) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        style={styles.headerIcon}
        onPress={() => navigation.navigate(CART)}>
        <Icon
          name={cart ? 'shopping-cart-2-fill' : 'shopping-cart-2-line'}
          size={20}
          color={primary}
        />
        <Text>{totalQuantity}</Text>
      </TouchableOpacity>
    ),
    headerTintColor: primary,
  };
};

const ProductStackNavigator = createNativeStackNavigator();

export const ProductNavigator = ({navigation}) => {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <ProductStackNavigator.Navigator
      screenOptions={headerStyle(navigation, totalQuantity)}>
      <ProductStackNavigator.Screen
        component={ProductOverviewScreen}
        name={PRODUCT_OVERVIEW}
        options={ProductOverViewScreenOptions}
      />
      <ProductStackNavigator.Screen
        component={ProductDetailScreen}
        name={PRODUCT_DETAIL}
        options={ProductDetailScreenOptions}
      />
      <ProductStackNavigator.Screen
        component={CartScreen}
        name={CART}
        options={{
          ...CartScreenOptions,
          ...headerStyle(navigation, totalQuantity, true),
        }}
      />
    </ProductStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createNativeStackNavigator();

export const OrdersNavigator = ({navigation}) => {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <OrdersStackNavigator.Navigator
      screenOptions={headerStyle(navigation, totalQuantity)}>
      <OrdersStackNavigator.Screen
        component={OrdersScreen}
        name={ORDERS}
        options={OrdersScreenOptions}
      />
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
