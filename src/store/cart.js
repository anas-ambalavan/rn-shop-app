import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const {id, price, title} = action.payload;
      let existingItem = state.items[id];
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += price;
      } else {
        existingItem = {
          id,
          price,
          title,
          quantity: 1,
          totalPrice: price,
        };
        state.items[id] = existingItem;
      }
      state.totalQuantity++;
      state.totalPrice += price;
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items[id];
      if (existingItem.quantity === 1) {
        delete state.items[id];
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
      state.totalPrice -= existingItem.price;
    },
  },
});

export const {addItem, removeItem} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = state => state.cart;

export const selectCartItems = createSelector([selectCart], cart =>
  Object.values(cart.items),
);

export const selectCartTotalPrice = createSelector(
  [selectCart],
  cart => cart.totalPrice,
);

export const selectCartTotalQuantity = createSelector(
  [selectCart],
  cart => cart.totalQuantity,
);

export const selectCartItemById = itemId => {
  return createSelector([selectCartItems], items =>
    items.find(item => item.id === itemId),
  );
};
