import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { addToCartWithQuantity } from "../store/cartSlice";
import loadStockFromLocalStorage from "../utils/loadStock";

const ProductDetail = () => {
  const { id } = useParams();
  const { items: products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State untuk menyimpan kuantitas
  const [quantity, setQuantity] = useState(1);

  const product = products.find((product) => product.id === parseInt(id));

  const existingProduct = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );
  const currentQuantity = existingProduct ? existingProduct.quantity : 0;

  const handleAddToCart = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
      navigate("/login");
    } else {
      if (product) {
        dispatch(addToCartWithQuantity({ product, quantity }));
      }
    }
  };

  const stock = loadStockFromLocalStorage();
  const availableStock = stock[product.id];

  // Cek apakah produk ditemukan
  useEffect(() => {
    if (quantity > availableStock) {
      setQuantity(availableStock);
    }
  }, [quantity, availableStock]);

  if (loading) {
    return (
      <div className="flex flex-col items-center p-8">
        {/* Skeleton loading code... */}
      </div>
    );
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  const relatedProducts = products.filter(
    (item) => item.category === product.category && item.id !== product.id
  );

  return (
    <div className="flex flex-grow px-8 py-2">
      <div className="w-full">
        <div className="card w-full bg-base-100 shadow-xl p-8">
          <div className="flex flex-col md:flex-row gap-16 px-4">
            <figure className="w-full md:w-1/4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-scale-down rounded-xl"
              />
            </figure>

            <div className="flex flex-col w-full">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-500 mb-4">{product.category}</p>
              <p className="text-2xl font-semibold mb-6">${product.price}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Rating section */}
              {/* ... */}

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="btn btn-outline"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  max={availableStock}
                  className="input input-bordered w-16 text-center"
                  onChange={(e) => {
                    const value = Math.max(
                      1,
                      Math.min(availableStock, parseInt(e.target.value) || 1)
                    );
                    setQuantity(value);
                  }}
                />
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(availableStock, prev + 1))
                  }
                  className="btn btn-outline"
                  disabled={quantity >= availableStock}
                >
                  +
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`btn btn-primary ${
                    currentQuantity >= availableStock ? "btn-disabled" : ""
                  }`}
                  disabled={currentQuantity >= availableStock}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="flex overflow-x-auto gap-2">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
