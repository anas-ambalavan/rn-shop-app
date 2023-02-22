import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {CART, PRODUCT_DETAIL} from '../../navigation/Constants';

const ProductOverviewScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>ProductOverviewScreen</Text>
      <Button
        onPress={() => navigation.navigate(PRODUCT_DETAIL)}
        title="to detail"
      />
    </View>
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
