import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { products } from "../data/products";
import { useEffect } from "react";
import { nekosenseInstance } from "../../nekosenseInstance.ts";

const ProductsPage = () => {
  useEffect(() => {
    nekosenseInstance.start();
  }, []);
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-black">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div
        id={"product-product-4"}
        className={"w-[100px] h-[100px] bg-amber-200"}
      ></div>
      <Cart />
    </>
  );
};

export default ProductsPage;
