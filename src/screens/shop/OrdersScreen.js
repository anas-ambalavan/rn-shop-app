import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import {selectAllOrders} from '../../store/orders';

const OrdersScreen = props => {
  const orders = useSelector(selectAllOrders);

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No order found, maybe start ordering some items?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id.toString()}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.amount}
          date={itemData.item.date.toString()}
          items={itemData.item.items}
        />
      )}
    />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'Your Orders',
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
