import React from "react";

const Feature = () => (
  <section className="feature">
    <div className="feature-visual">
      <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="150" r="130" stroke="#3a6b35" strokeWidth="0.5" fill="none" opacity="0.2" />
        <circle cx="150" cy="150" r="100" stroke="#3a6b35" strokeWidth="0.5" fill="none" opacity="0.3" />
        <circle cx="150" cy="150" r="70" fill="#b8d4a8" opacity="0.3" />
        <circle cx="150" cy="150" r="50" fill="#6a9e5f" opacity="0.4" />
        <circle cx="150" cy="150" r="30" fill="#3a6b35" opacity="0.7" />
        <g opacity="0.6">
          <path d="M150 150 Q145 120 148 90" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q158 120 162 90" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q165 125 180 100" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q170 140 200 138" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q165 160 185 180" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q140 165 135 195" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q125 158 100 170" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q120 140 95 128" stroke="#fdf8f2" strokeWidth="1" fill="none" />
          <path d="M150 150 Q130 120 120 95" stroke="#fdf8f2" strokeWidth="1" fill="none" />
        </g>
        <circle cx="150" cy="150" r="5" fill="#fdf8f2" />
        <g opacity="0.25">
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(0 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(45 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(90 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(135 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(180 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(225 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(270 150 150)" />
          <ellipse cx="150" cy="30" rx="8" ry="15" fill="#e8c4a0" transform="rotate(315 150 150)" />
        </g>
      </svg>

      <svg style={{ position: "absolute", bottom: "2rem", left: "2rem", opacity: 0.35 }} width="160" height="40" viewBox="0 0 160 40">
        <text x="0" y="30" fontFamily="serif" fontSize="11" fill="#2d5a27" letterSpacing="3" fontStyle="italic">
          ceremony - ritual - craft
        </text>
      </svg>
    </div>

    <div className="feature-content reveal">
      <p className="section-label">The Art of Matcha</p>
      <h2 className="section-title">
        Whisked<br />
        by hand,<br />
        <em>every time.</em>
      </h2>
      <p>
        We never pour from a machine. Each matcha is whisked in a hand-thrown ceramic bowl using a traditional chasen, bringing out the full body, sweetness, and umami of the leaf. It takes 40 extra seconds. It makes all the difference.
      </p>
      <a href="#menu" className="btn-primary">
        Order Matcha
      </a>
    </div>
  </section>
);

export default Feature;
