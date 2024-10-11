import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  checkout,
} from "../store/cartSlice";
import loadStockFromLocalStorage from "../utils/loadStock";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState({}); // Menyimpan status checkbox

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (item, value) => {
    const stock = loadStockFromLocalStorage();
    const availableStock = stock[item.id];
    const newQuantity = Math.max(1, Math.min(value, availableStock));

    if (newQuantity > item.quantity) {
      for (let i = 0; i < newQuantity - item.quantity; i++) {
        dispatch(increaseQuantity(item));
      }
    } else if (newQuantity < item.quantity) {
      for (let i = 0; i < item.quantity - newQuantity; i++) {
        dispatch(decreaseQuantity(item));
      }
    }
  };

  const handleCheckout = () => {
    const itemsToCheckout = cartItems.filter((item) => selectedItems[item.id]);

    if (itemsToCheckout.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    dispatch(checkout(itemsToCheckout)); // Kirim produk yang dipilih ke action checkout
    alert("Checkout successful!");
    setSelectedItems({}); // Reset pilihan checkbox
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <table className="table w-full bg-base-100 text-center">
            <thead>
              <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const stock = loadStockFromLocalStorage();
                const availableStock = stock[item.id];

                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedItems[item.id] || false}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 mr-4"
                      />
                      <span>{item.title}</span>
                    </td>
                    <td>
                      <div className="flex items-center justify-center">
                        <button
                          className="btn btn-outline"
                          onClick={() => dispatch(decreaseQuantity(item))}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item, Number(e.target.value))
                          }
                          min={1}
                          max={availableStock}
                          className="input input-bordered mx-2 w-16 text-center"
                        />
                        <button
                          className="btn btn-outline"
                          onClick={() => {
                            if (item.quantity < availableStock) {
                              dispatch(increaseQuantity(item));
                            }
                          }}
                          disabled={item.quantity >= availableStock}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{availableStock}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-4 flex justify-center">
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout Selected Items
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-xl">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
