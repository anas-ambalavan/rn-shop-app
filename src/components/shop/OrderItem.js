import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

import {primary} from '../../constants';
import Card from '../core/Card';
import CartItem from './CartItem';

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  const readableDate = moment(props.date).format('MMMM Do YYYY, hh:mm');

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{readableDate}</Text>
      </View>
      <Button
        color={primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => setShowDetails(prevState => !prevState)}
      />
      {showDetails && (
        <View style={styles.details}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.id}
              quantity={cartItem.quantity}
              amount={cartItem.totalPrice}
              title={cartItem.title}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  amount: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  details: {
    width: '100%',
  },
});
