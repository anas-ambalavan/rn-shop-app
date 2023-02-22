import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: action.payload.id,
        items: action.payload.items,
        amount: action.payload.amount,
        date: action.payload.date,
      };
      state.orders.push(newOrder);
    },
  },
});

export const {addOrder} = orderSlice.actions;
export default orderSlice.reducer;

export const selectOrders = state => state.orders;
export const selectAllOrders = createSelector(
  [selectOrders],
  state => state.orders,
);
