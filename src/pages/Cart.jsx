import React from "react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Product Name",
      quantity: 1,
      price: 20.0,
    },
    {
      id: 2,
      name: "Product Name",
      quantity: 1,
      price: 20.0,
    },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
      <div className="grid grid-cols-1 gap-8">
        {cartItems.map((item) => (
          <div key={item.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>Quantity: {item.quantity}</p>
              <p>${item.price.toFixed(2)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-error">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
