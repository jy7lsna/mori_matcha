import React from "react";

const Hours = () => (
  <section className="hours reveal" id="hours">
    <div>
      <p className="section-label hours-title">Opening Hours</p>
      <table className="hours-table">
        <tbody>
          <tr>
            <td>Monday - Friday</td>
            <td>8:00 am - 9:00 pm</td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>8:00 am - 10:00 pm</td>
          </tr>
          <tr>
            <td>Sunday</td>
            <td>9:00 am - 8:00 pm</td>
          </tr>
          <tr>
            <td>Public Holidays</td>
            <td>10:00 am - 6:00 pm</td>
          </tr>
        </tbody>
      </table>
      <p className="hours-note">
        Matcha service ends 30 minutes before closing. Last seating 45 min before close.
      </p>
    </div>

    <div>
      <div className="location-card">
        <span className="section-label">Find Us</span>
        <h3>
          Hauz Khas Village
          <br />
          New Delhi
        </h3>
        <p>
          12, Deer Park Lane
          <br />
          Hauz Khas Village, New Delhi - 110016
          <br />
          <br />
          Near the lake entrance, look for the green door with the bamboo wind chimes.
        </p>
      </div>

      <div className="reservation-card">
        <p className="section-label">Reservations</p>
        <p className="reservation-text">We do not take reservations - walk-ins only, always. The wait is part of the ritual.</p>
      </div>
    </div>
  </section>
);

export default Hours;
