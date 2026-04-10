import React from "react";

const Specials = () => (
  <section className="specials reveal" id="specials">
    <p className="section-label" style={{ marginBottom: "1rem" }}>
      On The Table Today
    </p>
    <h2 className="section-title" style={{ marginBottom: "4rem" }}>
      Daily Specials
    </h2>

    <div className="specials-inner">
      <div className="special-card">
        <div className="special-number">01</div>
        <div className="special-name">Iced Matchaccino</div>
        <div className="special-desc">Cold ceremonial matcha pulled espresso-style over ice, topped with micro-foam. An obsession.</div>
        <div className="special-badge">new</div>
      </div>
      <div className="special-card">
        <div className="special-number">02</div>
        <div className="special-name">Black Sesame Roll</div>
        <div className="special-desc">Pillowy shokupan swirled with roasted black sesame paste and just enough brown sugar.</div>
      </div>
      <div className="special-card">
        <div className="special-number">03</div>
        <div className="special-name">Azuki Cream Puff</div>
        <div className="special-desc">Choux pastry filled with sweet red bean cream and topped with craquelin. Cloud-light.</div>
        <div className="special-badge" style={{ background: "var(--matcha)" }}>favorite</div>
      </div>
      <div className="special-card">
        <div className="special-number">04</div>
        <div className="special-name">Forest Tiramisu</div>
        <div className="special-desc">Our take - hojicha-soaked ladyfingers, mascarpone, dusted with ceremonial matcha powder.</div>
      </div>
    </div>
  </section>
);

export default Specials;
