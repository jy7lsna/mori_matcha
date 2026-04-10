import React, { useContext, useEffect, useMemo, useState } from "react";
import api from "../api/client.js";
import CartContext from "../context/CartContext.jsx";
import MenuItemCard from "./MenuItemCard.jsx";

const Menu = () => {
  const { addItem } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      setStatus("loading");
      try {
        const response = await api.get("/menu");
        setItems(response.data);
        setStatus("success");
      } catch (err) {
        setError("Unable to load menu. Please try again later.");
        setStatus("error");
      }
    };

    fetchMenu();
  }, []);

  const groupedItems = useMemo(() => {
    if (!items.length) {
      return [];
    }

    return items.map((item) => ({
      ...item,
      categoryLabel: item.category || "Signature"
    }));
  }, [items]);

  // Loading skeleton
  const SkeletonCard = () => (
    <div className="menu-card skeleton">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  return (
    <section className="menu reveal" id="menu">
      <div className="menu-header">
        <div>
          <p className="section-label">What We Make</p>
          <h2 className="section-title">The Menu</h2>
        </div>
        <p className="menu-subtitle">Everything made with intention, from scratch, every morning.</p>
      </div>

      {status === "error" && <p className="menu-status error">{error}</p>}

      <div className="menu-grid">
        {status === "loading" && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {status === "success" && groupedItems.length > 0 && groupedItems.map((item) => (
          <MenuItemCard key={item._id} item={item} onAdd={() => addItem(item)} />
        ))}
      </div>

      {status === "success" && items.length === 0 && (
        <p className="menu-status">No menu items yet. Add items in the admin panel.</p>
      )}
    </section>
  );
};

export default Menu;
