import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CartItem from '../../components/shop/CartItem';
import {primary} from '../../constants';
import Card from '../../components/core/Card';
import {removeItem, emptyCart, selectCartTotalPrice} from '../../store/cart';
import {addOrder} from '../../store/orders';

const CartScreen = props => {
  const [isLoading, setisLoading] = useState(false);

  const cartTotalAmount = useSelector(selectCartTotalPrice);

  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        id: key,
        title: state.cart.items[key].title,
        price: state.cart.items[key].price,
        quantity: state.cart.items[key].quantity,
        totalPrice: state.cart.items[key].totalPrice,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setisLoading(true);
    await dispatch(
      addOrder({
        id: new Date().toString(),
        items: cartItems,
        amount: cartTotalAmount,
        date: new Date().toISOString(),
      }),
    );
    await dispatch(emptyCart());
    setisLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>{' '}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={primary} />
        ) : (
          <Button
            title="Order Now"
            onPress={sendOrderHandler}
            color="red"
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={items => items.id.toString()}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.title}
            amount={itemData.item.totalPrice}
            deletable
            onRemove={() => {
              dispatch(removeItem(itemData.item.id));
            }}
          />
        )}
      />
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Your Cart',
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 20,
  },
  summaryText: {
    fontSize: 18,
  },
  amount: {
    color: primary,
  },
});
