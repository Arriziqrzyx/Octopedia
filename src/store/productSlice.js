import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous action fetch api
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const productsUrl = import.meta.env.VITE_API_PRODUCTS;
    const response = await axios.get(productsUrl);
    // Map produk dan tambahkan properti stock
    const productsWithStock = response.data.map((product) => ({
      ...product,
      stock: 20,
    }));
    return productsWithStock;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
