import React from "react";

const emojiByCategory = {
  matcha: "🍵",
  bakery: "🥐",
  sweets: "🍡",
  drinks: "🧇",
  desserts: "🍰",
  tea: "🫖",
  pastry: "🍩",
  specials: "🥛"
};

const getEmoji = (categoryLabel) => {
  if (!categoryLabel) {
    return "🍵";
  }

  const key = categoryLabel.toLowerCase();
  return emojiByCategory[key] || "🍵";
};

const MenuItemCard = ({ item, onAdd }) => (
  <div className="menu-item">
    <span className="item-emoji" aria-hidden="true">
      {getEmoji(item.categoryLabel)}
    </span>
    <div className="item-category">{item.categoryLabel}</div>
    <div className="item-name">{item.name}</div>
    <div className="item-desc">{item.description}</div>
    <div className="item-price">
      Rs {item.price}
      {item.isSeasonal && <span className="item-seasonal">Seasonal</span>}
    </div>
    <button className="menu-item-action" type="button" onClick={onAdd} aria-label={`Add ${item.name} to cart`}>
      Add to Cart
    </button>
  </div>
);

export default MenuItemCard;
