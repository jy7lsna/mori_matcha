import React from "react";

const Footer = () => (
  <footer>
    <div className="footer-top">
      <div>
        <span className="footer-logo">Mori & Mochi</span>
        <p className="footer-tagline">A small cafe with a deep belief that good matcha and warm bread can fix most things.</p>
      </div>
      <div className="footer-col">
        <h4>Menu</h4>
        <ul>
          <li>Matcha & Tea</li>
          <li>Bakery</li>
          <li>Mochi & Sweets</li>
          <li>Seasonal Specials</li>
        </ul>
      </div>
      <div className="footer-col">
        <h4>Follow Along</h4>
        <ul>
          <li>Instagram</li>
          <li>Pinterest</li>
          <li>Newsletter</li>
          <li>Press</li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p className="footer-copy">Copyright 2025 Mori & Mochi. All rights reserved.</p>
      <span className="footer-made">made with matcha & love</span>
    </div>
  </footer>
);

export default Footer;
