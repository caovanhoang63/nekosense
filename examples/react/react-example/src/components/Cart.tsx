import { ShoppingBag, X, Plus, Minus } from "lucide-react";
import { useCart } from "../context/CartContext.tsx";

const Cart = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity } =
    useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  return (
    <div
      id="cartOverlay"
      className={`fixed inset-0 bg-gray-800 bg-opacity-40 z-50 ${isCartOpen ? "active" : "hidden"}`}
      onClick={handleOverlayClick}
    >
      <div
        id="cartPanel"
        className="bg-white w-full max-w-md h-full flex flex-col shadow-lg ml-auto"
      >
        <div className="p-4 bg-orange-500 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <ShoppingBag className="text-gray-300 mb-4" size={64} />
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-gray-500 mt-1">
                Add some products to your cart
              </p>
              <button
                onClick={closeCart}
                className="mt-4 bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-black">
                      {item.name}
                    </h4>
                    <p className="text-orange-500">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={12} />
                    </button>

                    <span className="w-6 text-center text-black">
                      {item.quantity}
                    </span>

                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <button
                    className="p-2 text-gray-500 hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
