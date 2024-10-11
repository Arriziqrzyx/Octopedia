import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleQuantityChange = (item, value) => {
    const newQuantity = Math.max(1, Math.min(value, item.stock)); // Batasi nilai input
    if (newQuantity > item.quantity) {
      // Jika jumlah baru lebih banyak, tingkatkan kuantitas
      for (let i = 0; i < newQuantity - item.quantity; i++) {
        dispatch(increaseQuantity(item));
      }
    } else if (newQuantity < item.quantity) {
      // Jika jumlah baru lebih sedikit, kurangi kuantitas
      for (let i = 0; i < item.quantity - newQuantity; i++) {
        dispatch(decreaseQuantity(item));
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      {cartItems.length > 0 ? (
        <table className="table w-full bg-base-100 text-center">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
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
                      max={item.stock}
                      className="input input-bordered mx-2 w-16 text-center"
                    />
                    <button
                      className="btn btn-outline"
                      onClick={() => {
                        if (item.quantity < item.stock) {
                          dispatch(increaseQuantity(item)); // Meningkatkan quantity
                        }
                      }}
                      disabled={item.quantity >= item.stock} // Nonaktifkan jika quantity >= stok
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>{item.stock}</td>
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
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-xl">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
