import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { products } from "../data/products";

const ProductsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-black">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Cart />
    </>
  );
};

export default ProductsPage;
