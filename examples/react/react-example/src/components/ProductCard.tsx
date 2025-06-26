import type React from "react";

import { Link } from "react-router-dom";
import type { Product } from "../data/products.ts";
import { useCart } from "../context/CartContext.tsx";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div
      id={`product-${product.id}`}
      className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="product-image w-full h-48 object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-orange-500 font-medium">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button
          className="w-full bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
