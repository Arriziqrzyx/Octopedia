import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromLocalStorage(), // Mengambil data dari localStorage
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 }); // Tambahkan produk baru dengan quantity 1
      }
      localStorage.setItem("cart", JSON.stringify(state.items)); // Simpan ke localStorage
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1; // Kurangi kuantitas jika lebih dari 1
        } else {
          // Jika kuantitas 1, hapus produk dari keranjang
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    addToCartWithQuantity: (state, action) => {
      const { product, quantity } = action.payload; // Dapatkan produk dan jumlah dari payload
      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity; // Tambah jumlah berdasarkan input
      } else {
        state.items.push({ ...product, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToCartWithQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
