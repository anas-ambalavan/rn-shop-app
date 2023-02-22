import React from 'react';
import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {primary} from '../../constants';
import {addItem} from '../../store/cart';

const ProductDetailScreen = ({route, navigation}) => {
  const productId = route.params ? route.params.productId : null;
  const selectedProduct = useSelector(state =>
    state.products.products.find(prod => prod.id === productId),
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.images[0]}} />
      <View style={styles.actions}>
        <Button
          color={primary}
          title="Add To Cart"
          onPress={() => {
            dispatch(addItem(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
