import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";

const Header = () => {
  const { cart, openCart } = useCart();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-800 text-white p-5 flex justify-between items-center sticky top-0 z-50">
      <div className="logo">
        <h1 className="text-xl font-bold">Nekosense</h1>
      </div>
      <div className="nav">
        <button
          onClick={openCart}
          className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-400 flex items-center gap-2"
        >
          <ShoppingCart size={20} />
          Cart
          {totalItems > 0 && (
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-orange-500 rounded-full">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
