import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetch('https://dummyjson.com/products');
  return response.json();
});

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.pending, state => {
      console.log('pending');
    }),
      builder.addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('success');
        state.products = action.payload.products;
      }),
      builder.addCase(fetchProducts.rejected, state => {
        console.log('REjected');
      });
  },
});

export default productSlice.reducer;
