import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./index.css";
import "./App.css";
import { nekosenseInstance } from "../nekosenseInstance.ts";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    nekosenseInstance.start();
  }, []); // Start NekoSense when the app mounts
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="font-sans bg-gray-100 h-screen w-screen">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
