import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../store/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Panggil action untuk fetch data produk saat komponen mount
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 pt-16">
        {Array(8)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-xl w-full max-w-sm mx-auto"
            >
              <figure>
                <div className="skeleton h-72 w-full"></div>
              </figure>
              <div className="card-body pt-4">
                <div className="skeleton h-6 w-1/2 mb-2"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-full mb-4"></div>
                <div className="skeleton h-8 w-1/4 mb-2"></div>
                <div className="skeleton h-5 w-1/3"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">Product List</h1>
      <div className="flex flex-wrap justify-center gap-6 pb-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
