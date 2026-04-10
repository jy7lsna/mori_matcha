import React from "react";

const Hero = () => (
  <section className="hero">
    <div className="hero-left">
      <div className="floater floater-2"></div>
      <div className="floater floater-3"></div>
      <p className="hero-eyebrow">A little cafe in the forest</p>
      <h1 className="hero-title">
        <span className="word-mochi">Mori</span>
        <span className="word-matcha">&amp; Mochi</span>
      </h1>
      <p className="hero-desc">
        Where ceremonial matcha meets fresh-baked bread, handmade mochi, and the
        sweetest little desserts. A cozy corner to slow down and savor.
      </p>
      <div className="hero-cta-row">
        <a href="#menu" className="btn-primary">
          Explore Menu
        </a>
        <a href="#specials" className="btn-ghost">
          Today's Specials
        </a>
      </div>
    </div>

    <div className="hero-right">
      <div className="floater floater-1"></div>
      <div className="hero-bowl-wrap">
        <div className="hero-badge">hand-whisked daily</div>

        <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="140" cy="155" rx="100" ry="30" fill="#2d5a27" opacity="0.15" />
          <path d="M50 120 Q50 200 140 210 Q230 200 230 120 Z" fill="#f5f0e8" stroke="#3a6b35" strokeWidth="2" />
          <path d="M50 120 Q140 105 230 120" stroke="#3a6b35" strokeWidth="2" fill="none" />
          <ellipse cx="140" cy="125" rx="75" ry="20" fill="#6a9e5f" opacity="0.7" />
          <path d="M90 120 Q110 115 130 120 Q150 125 170 120 Q190 115 200 120" stroke="#b8d4a8" strokeWidth="1.5" fill="none" />
          <path d="M100 128 Q120 123 140 128 Q160 133 180 128" stroke="#b8d4a8" strokeWidth="1" fill="none" opacity="0.6" />
          <path d="M120 95 Q115 80 120 65" stroke="#c4a882" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M140 90 Q135 72 140 55" stroke="#c4a882" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M160 95 Q165 80 160 65" stroke="#c4a882" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M200 100 Q220 85 215 70 Q200 80 200 100Z" fill="#6a9e5f" opacity="0.8" />
          <path d="M215 70 L205 88" stroke="#3a6b35" strokeWidth="0.8" />
          <circle cx="68" cy="80" r="5" fill="#e8c4a0" opacity="0.6" />
          <circle cx="75" cy="72" r="4" fill="#d4836a" opacity="0.5" />
          <circle cx="85" cy="78" r="3" fill="#e8c4a0" opacity="0.6" />
          <circle cx="140" cy="140" r="120" stroke="#3a6b35" strokeWidth="0.5" fill="none" strokeDasharray="4 6" opacity="0.3" />
          <path d="M220 155 L235 140 M222 160 L240 148 M218 165 L234 158" stroke="#8aac7e" strokeWidth="1" opacity="0.7" />
          <ellipse cx="40" cy="150" rx="6" ry="3" fill="#f0d4c8" opacity="0.7" transform="rotate(-20 40 150)" />
          <ellipse cx="250" cy="100" rx="5" ry="2.5" fill="#f0d4c8" opacity="0.6" transform="rotate(15 250 100)" />
        </svg>

        <div className="hero-bowl-tags">
          <span className="tag">Ceremonial Grade</span>
          <span className="tag">Uji Matcha</span>
          <span className="tag">Artisan Bread</span>
          <span className="tag">Handmade Mochi</span>
        </div>
      </div>

      <svg className="botanical-spin" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#3a6b35" strokeWidth="0.5" strokeDasharray="3 5" />
        <text x="50" y="20" textAnchor="middle" fontSize="7" fill="#3a6b35" fontFamily="serif" letterSpacing="3">OPEN</text>
        <text x="50" y="85" textAnchor="middle" fontSize="7" fill="#3a6b35" fontFamily="serif" letterSpacing="3">DAILY</text>
        <text x="15" y="55" fontSize="7" fill="#3a6b35" fontFamily="serif" letterSpacing="3" transform="rotate(-90 15 55)">8AM</text>
        <text x="82" y="55" fontSize="7" fill="#3a6b35" fontFamily="serif" letterSpacing="3" transform="rotate(90 82 55)">9PM</text>
        <circle cx="50" cy="50" r="3" fill="#3a6b35" />
        <line x1="50" y1="50" x2="50" y2="15" stroke="#3a6b35" strokeWidth="0.8" />
        <line x1="50" y1="50" x2="75" y2="65" stroke="#3a6b35" strokeWidth="0.5" />
      </svg>
    </div>
  </section>
);

export default Hero;
