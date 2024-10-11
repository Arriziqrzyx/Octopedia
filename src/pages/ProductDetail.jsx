import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { addToCartWithQuantity } from "../store/cartSlice"; // Import action baru

const ProductDetail = () => {
  const { id } = useParams();
  const { items: products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cari produk berdasarkan ID
  const product = products.find((product) => product.id === parseInt(id));

  // Mendapatkan jumlah produk yang ada di keranjang
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
        const quantity =
          parseInt(
            document.getElementById(`quantity-input-${product.id}`).value
          ) || 1; // Ambil nilai dari input
        dispatch(addToCartWithQuantity({ product, quantity })); // Dispatch action baru
      }
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center p-8">
        <div className="w-full">
          <div className="card w-full bg-base-100 shadow-xl p-8">
            <div className="flex flex-col md:flex-row gap-16 px-4">
              <div className="w-full md:w-1/4 h-64 skeleton rounded-xl"></div>
              <div className="flex flex-col w-full">
                <div className="skeleton h-8 w-3/4 mb-4"></div>
                <div className="skeleton h-6 w-1/3 mb-4"></div>
                <div className="skeleton h-6 w-1/2 mb-6"></div>
                <div className="skeleton h-24 w-full mb-6"></div>
                <div className="flex gap-2 mb-2">
                  <div className="skeleton h-6 w-6 rounded-full"></div>
                  <div className="skeleton h-6 w-6 rounded-full"></div>
                  <div className="skeleton h-6 w-6 rounded-full"></div>
                  <div className="skeleton h-6 w-6 rounded-full"></div>
                  <div className="skeleton h-6 w-6 rounded-full"></div>
                </div>
                <div className="skeleton h-6 w-1/4 mb-4"></div>
                <div className="skeleton h-10 w-32 mt-4"></div>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <div className="flex overflow-x-auto gap-2">
              <div className="w-full md:w-1/5 h-64 skeleton rounded-xl"></div>
              <div className="w-full md:w-1/5 h-64 skeleton rounded-xl"></div>
              <div className="w-full md:w-1/5 h-64 skeleton rounded-xl"></div>
            </div>
          </div>
        </div>
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

              <div className="rating mb-2">
                <input
                  type="radio"
                  name={`rating-${product.id}`}
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked={product.rating.rate >= 1}
                  disabled
                />
                <input
                  type="radio"
                  name={`rating-${product.id}`}
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked={product.rating.rate >= 2}
                  disabled
                />
                <input
                  type="radio"
                  name={`rating-${product.id}`}
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked={product.rating.rate >= 3}
                  disabled
                />
                <input
                  type="radio"
                  name={`rating-${product.id}`}
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked={product.rating.rate >= 4}
                  disabled
                />
                <input
                  type="radio"
                  name={`rating-${product.id}`}
                  className="mask mask-star-2 bg-green-500"
                  defaultChecked={product.rating.rate >= 5}
                  disabled
                />
              </div>
              <span>
                {product.rating.rate} ({product.rating.count} reviews)
              </span>

              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => {
                    const inputElement = document.getElementById(
                      `quantity-input-${product.id}`
                    );
                    inputElement.value = Math.max(
                      1,
                      (parseInt(inputElement.value) || 0) - 1
                    ); // Decrease quantity
                  }}
                  className="btn btn-outline"
                >
                  -
                </button>
                <input
                  id={`quantity-input-${product.id}`}
                  type="number"
                  defaultValue={1}
                  min={1}
                  max={product.stock}
                  className="input input-bordered w-16 text-center"
                  onChange={(e) => {
                    if (parseInt(e.target.value) > product.stock) {
                      e.target.value = product.stock;
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const inputElement = document.getElementById(
                      `quantity-input-${product.id}`
                    );
                    inputElement.value = parseInt(inputElement.value) + 1; // Increase quantity
                  }}
                  className="btn btn-outline"
                >
                  +
                </button>
                <button
                  onClick={handleAddToCart}
                  className={`btn btn-primary mt-4 ${
                    currentQuantity >= product.stock ? "btn-disabled" : ""
                  }`}
                  disabled={currentQuantity >= product.stock}
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
