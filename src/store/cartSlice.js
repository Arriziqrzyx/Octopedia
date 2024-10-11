import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const loadStockFromLocalStorage = () => {
  const storedStock = localStorage.getItem("stock");
  return storedStock ? JSON.parse(storedStock) : {};
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
      const stock = loadStockFromLocalStorage(); // Muat stok dari localStorage

      if (existingProduct) {
        // Hanya tambah kuantitas jika masih ada stok
        if (stock[product.id] > existingProduct.quantity) {
          existingProduct.quantity += 1;
        } else {
          alert("Cannot add more items, stock limit reached."); // Pesan jika stok sudah penuh
        }
      } else {
        if (stock[product.id] > 0) {
          // Pastikan stok lebih dari 0 untuk menambahkan ke cart
          state.items.push({ ...product, quantity: 1 }); // Tambahkan produk baru dengan quantity 1
        } else {
          alert("Cannot add this item to the cart, out of stock."); // Pesan jika stok habis
        }
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
      const stock = loadStockFromLocalStorage(); // Muat stok dari localStorage

      if (
        existingProduct &&
        stock[existingProduct.id] > existingProduct.quantity
      ) {
        existingProduct.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      } else {
        alert("Cannot increase quantity, stock limit reached."); // Pesan jika stok sudah penuh
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
      const stock = loadStockFromLocalStorage(); // Muat stok dari localStorage

      if (existingProduct) {
        // Pastikan penambahan kuantitas tidak melebihi stok
        if (stock[product.id] >= existingProduct.quantity + quantity) {
          existingProduct.quantity += quantity; // Tambah jumlah berdasarkan input
        } else {
          alert("Cannot add more items, stock limit reached."); // Pesan jika stok sudah penuh
        }
      } else {
        if (stock[product.id] >= quantity && quantity > 0) {
          // Pastikan stok cukup dan quantity positif
          state.items.push({ ...product, quantity });
        } else {
          alert("Cannot add this item to the cart, out of stock."); // Pesan jika stok habis
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    checkout: (state, action) => {
      const stock = loadStockFromLocalStorage();
      const itemsToCheckout = action.payload; // Ambil produk yang akan di-checkout

      itemsToCheckout.forEach((item) => {
        if (stock[item.id]) {
          stock[item.id] -= item.quantity; // Kurangi stok sesuai quantity di cart
          // Pastikan stok tidak menjadi negatif
          if (stock[item.id] < 0) {
            stock[item.id] = 0; // Jika kurang dari 0, set ke 0
          }
        }
      });
      localStorage.setItem("stock", JSON.stringify(stock)); // Simpan stok yang diperbarui ke localStorage
      state.items = state.items.filter(
        (item) => !itemsToCheckout.some((i) => i.id === item.id)
      ); // Hapus produk yang di-checkout dari cart
      localStorage.setItem("cart", JSON.stringify(state.items)); // Simpan cart yang diperbarui
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  addToCartWithQuantity,
  checkout,
} = cartSlice.actions;

export default cartSlice.reducer;
