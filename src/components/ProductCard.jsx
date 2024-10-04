import React from "react";

const ProductCard = ({ product }) => {
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
        <p className="text-gray-500 badge badge-outline">{product.category}</p>
        <h2 className="card-title line-clamp-2 h-14">{product.title}</h2>
        <p className="font-bold text-2xl">${product.price}</p>

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
          {product.rating.rate} ({product.rating.count})
        </span>

        <div className="card-actions justify-between gap-6">
          <button className="btn flex items-center flex-1 btn-primary">
            Detail
          </button>
          <button className="btn flex items-center flex-1 btn-primary">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
