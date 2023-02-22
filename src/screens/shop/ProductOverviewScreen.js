import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {PRODUCT_DETAIL} from '../../navigation/Constants';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../store/products';

const ProductOverviewScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {products} = useSelector(state => state.products);

  // console.log(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <View>
      <Text>ProductOverviewScreen</Text>
      <Button
        onPress={() => navigation.navigate(PRODUCT_DETAIL)}
        title="to detail"
      />
      <ScrollView>
        {products &&
          products.map(product => (
            <Text key={product.id}>{product.title}</Text>
          ))}
      </ScrollView>
    </View>
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
