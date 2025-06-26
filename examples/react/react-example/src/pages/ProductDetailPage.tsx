import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../data/products";
import Cart from "../components/Cart";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { nekosenseInstance } from "../../nekosenseInstance.ts";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }
  useEffect(() => {
    nekosenseInstance.start();
  }, []);
  return (
    <>
      <div className="mb-4">
        <Link to="/" className="text-orange-500 hover:underline">
          ← Back to products
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold text-orange-500 mb-4">
            ${product.price.toFixed(2)}
          </p>
          <div className="border-t border-b py-4 my-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded flex items-center justify-center"
          >
            <ShoppingCart className="mr-2" size={20} />
            Add to Cart
          </button>
        </div>
      </div>

      <Cart />
    </>
  );
};

export default ProductDetailPage;
