import React from "react";

const About = () => (
  <section className="about reveal" id="about">
    <div className="about-left">
      <div className="about-card">
        <p className="section-label">Established 2019</p>
        <div className="about-stat-row">
          <div>
            <div className="about-stat">47</div>
            <div className="about-stat-label">recipes crafted</div>
          </div>
          <div>
            <div className="about-stat">03</div>
            <div className="about-stat-label">matcha origins</div>
          </div>
        </div>

        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" style={{ marginTop: "2rem", display: "block", opacity: 0.4 }}>
          <path d="M10 70 Q40 20 110 10 Q80 50 10 70Z" fill="#3a6b35" />
          <path d="M10 70 Q55 40 110 10" stroke="#fdf8f2" strokeWidth="1" />
          <path d="M20 65 Q50 45 90 20" stroke="#fdf8f2" strokeWidth="0.5" opacity="0.6" />
          <path d="M35 60 Q60 48 85 30" stroke="#fdf8f2" strokeWidth="0.5" opacity="0.4" />
        </svg>
      </div>
    </div>

    <div className="about-right">
      <p className="section-label">Our Philosophy</p>
      <h2 className="section-title">
        Tea as a<br />
        <em>ritual,</em> not a<br />
        routine.
      </h2>
      <span className="quote">slow down, sip deeply</span>
      <p>
        Born from a love of Japanese tea ceremony and the comforting warmth of a neighborhood bakery, Mori &amp; Mochi is our little world between the two. Every cup of matcha is whisked to order. Every loaf is shaped by hand before sunrise.
      </p>
      <p>
        We source our ceremonial grade matcha directly from small farms in Uji and Kagoshima - the kind that turns a brilliant, almost electric green. The kind that makes you pause.
      </p>
      <a href="#menu" className="btn-ghost" style={{ display: "inline-block", marginTop: "2rem" }}>
        See what's brewing -&gt;
      </a>
    </div>
  </section>
);

export default About;
