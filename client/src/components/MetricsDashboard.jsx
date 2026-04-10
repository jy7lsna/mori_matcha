import React, { useEffect, useState } from "react";
import api from "../api/client.js";

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await api.get("/orders/metrics/summary");
      setMetrics(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="metrics-loading">Loading metrics...</div>;
  }

  return (
    <div className="metrics-dashboard">
      <h3 style={{ marginBottom: "1.5rem", fontFamily: '"Fraunces", serif' }}>📊 Sales Metrics</h3>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Total Orders</div>
          <div className="metric-value">{metrics?.totalOrders || 0}</div>
        </div>

        <div className="metric-card accent-rose">
          <div className="metric-label">Total Revenue</div>
          <div className="metric-value">Rs {metrics?.totalRevenue}</div>
        </div>

        <div className="metric-card accent-blue">
          <div className="metric-label">Average Order Value</div>
          <div className="metric-value">Rs {metrics?.avgOrderValue}</div>
        </div>

        <div className="metric-card accent-gold">
          <div className="metric-label">Completion Rate</div>
          <div className="metric-value">{metrics?.completionRate}%</div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="status-breakdown" style={{ marginBottom: "2rem" }}>
        <h4 style={{ fontFamily: '"Fraunces", serif', marginBottom: "1rem" }}>Orders by Status</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "1rem"
          }}
        >
          <div style={{ textAlign: "center", padding: "1rem", background: "white", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.85rem", color: "#f59e0b" }}>📋 Pending</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#f59e0b" }}>
              {metrics?.byStatus?.pending || 0}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "1rem", background: "white", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.85rem", color: "#3b82f6" }}>👨‍🍳 Preparing</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#3b82f6" }}>
              {metrics?.byStatus?.preparing || 0}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "1rem", background: "white", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.85rem", color: "#10b981" }}>✅ Ready</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#10b981" }}>
              {metrics?.byStatus?.ready || 0}
            </div>
          </div>

          <div style={{ textAlign: "center", padding: "1rem", background: "white", borderRadius: "8px" }}>
            <div style={{ fontSize: "0.85rem", color: "#10b981" }}>🎉 Completed</div>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#10b981" }}>
              {metrics?.byStatus?.completed || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Top Items */}
      {metrics?.topItems && metrics.topItems.length > 0 && (
        <div className="top-items">
          <h4>🍵 Top Items</h4>
          <div className="items-list">
            {metrics.topItems.map((item, idx) => (
              <div key={idx} className="items-list-item">
                <span className="items-list-item-name">
                  #{idx + 1} {item.name}
                </span>
                <span className="items-list-item-count">{item.count} sold</span>
                <span className="items-list-item-revenue">Rs {item.revenue.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders by Date */}
      {metrics?.ordersByDate && (
        <div style={{ marginTop: "2rem" }}>
          <h4 style={{ fontFamily: '"Fraunces", serif', marginBottom: "1rem" }}>📈 Last 7 Days</h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "0.8rem"
            }}
          >
            {Object.entries(metrics.ordersByDate).map(([date, count]) => (
              <div
                key={date}
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  background: "white",
                  borderRadius: "8px",
                  border: `2px solid ${count > 0 ? "#3a6b35" : "#e0e0e0"}`
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "#999", marginBottom: "0.5rem" }}>
                  {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#3a6b35" }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "1.5rem", fontSize: "0.85rem", color: "#999", textAlign: "center" }}>
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MetricsDashboard;
