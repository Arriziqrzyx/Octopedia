import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import loadStockFromLocalStorage from "../utils/loadStock";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCart(product));
    }
  };

  const existingProduct = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const currentQuantity = existingProduct ? existingProduct.quantity : 0;

  // Ambil stok dari localStorage untuk produk ini
  const stock = loadStockFromLocalStorage();
  const availableStock = stock[product.id];

  return (
    <div className="card bg-base-100 shadow-xl w-full max-w-xs mx-2">
      <figure>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-72 object-cover"
        />
      </figure>
      <div className="card-body pt-4">
        <p className="text-gray-500 badge badge-outline line-clamp-1">
          {product.category}
        </p>
        <h2 className="card-title line-clamp-2 h-14">{product.title}</h2>
        <p className="font-bold text-2xl">${product.price}</p>

        <div className="flex items-center">
          <div className="rating mb-2">
            <input
              type="radio"
              name={`rating-${product.id}`}
              className="mask mask-star-2 bg-green-500 cursor-default"
              defaultChecked={product.rating.rate >= 1}
              disabled
            />
            <input
              type="radio"
              name={`rating-${product.id}`}
              className="mask mask-star-2 bg-green-500 cursor-default"
              defaultChecked={product.rating.rate >= 2}
              disabled
            />
            <input
              type="radio"
              name={`rating-${product.id}`}
              className="mask mask-star-2 bg-green-500 cursor-default"
              defaultChecked={product.rating.rate >= 3}
              disabled
            />
            <input
              type="radio"
              name={`rating-${product.id}`}
              className="mask mask-star-2 bg-green-500 cursor-default"
              defaultChecked={product.rating.rate >= 4}
              disabled
            />
            <input
              type="radio"
              name={`rating-${product.id}`}
              className="mask mask-star-2 bg-green-500 cursor-default"
              defaultChecked={product.rating.rate >= 5}
              disabled
            />
          </div>
          <p className="ml-3 text-gray-400">
            {product.rating.rate} ({product.rating.count})
          </p>
        </div>
        <p className="font-semibold">
          Stock: <span className="text-green-600">{availableStock}</span>
        </p>

        <div className="card-actions justify-between gap-6">
          <Link
            to={`/product/${product.id}`}
            className="btn flex items-center flex-1 btn-primary"
          >
            Detail
          </Link>
          <button
            onClick={handleAddToCart}
            className={`btn flex items-center flex-1 btn-primary ${
              currentQuantity >= availableStock ? "btn-disabled" : ""
            }`} // Nonaktifkan jika quantity >= stok
            disabled={currentQuantity >= availableStock} // Nonaktifkan jika quantity >= stok
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
