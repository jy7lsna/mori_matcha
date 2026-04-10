import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import Home from "./pages/Home.jsx";
import Admin from "./pages/Admin.jsx";
import OrderTracking from "./pages/OrderTracking.jsx";
import { CartProvider } from "./context/CartContext.jsx";

const App = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const percent = totalHeight > 0 ? (scrollTop / totalHeight) * 100 : 0;
      setProgress(percent);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <CartProvider>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <NavBar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/track" element={<OrderTracking />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
