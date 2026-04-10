import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";

const NavBar = () => {
  const { items, setIsOpen } = useContext(CartContext);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav>
      <div className="nav-logo">Mori & Mochi</div>
      <ul className="nav-links">
        <li>
          <a href="/#menu">Menu</a>
        </li>
        <li>
          <a href="/#about">Our Story</a>
        </li>
        <li>
          <a href="/#specials">Specials</a>
        </li>
        <li>
          <a href="/#hours">Visit Us</a>
        </li>
        <li>
          <a href="/#contact">Contact</a>
        </li>
        <li>
          <Link to="/track">Track Order</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
      <button className="cart-button" type="button" onClick={() => setIsOpen(true)}>
        Cart ({count})
      </button>
    </nav>
  );
};

export default NavBar;
