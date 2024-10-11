import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Asynchronous action to fetch products from API
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const productsUrl = import.meta.env.VITE_API_PRODUCTS;
    const response = await axios.get(productsUrl);

    // Load existing stock from localStorage
    const initialStock = JSON.parse(localStorage.getItem("stock")) || {};

    // Map products and add stock
    const productsWithStock = response.data.map((product) => ({
      ...product,
      stock: initialStock[product.id] || 20, // Use stock from localStorage if available, otherwise default to 20
    }));

    // Save updated stock to localStorage
    productsWithStock.forEach((product) => {
      if (!initialStock[product.id]) {
        initialStock[product.id] = product.stock; // Set stock for products that are new
      }
    });

    // Only save stock if it has changed
    localStorage.setItem("stock", JSON.stringify(initialStock));

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
