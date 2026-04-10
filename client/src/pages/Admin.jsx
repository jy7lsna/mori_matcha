import React, { useEffect, useState } from "react";
import api from "../api/client.js";
import MetricsDashboard from "../components/MetricsDashboard.jsx";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  isSeasonal: false
};

const Admin = () => {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("adminToken"));

  const loadItems = async () => {
    setStatus("loading");
    try {
      const [menuResponse, ordersResponse] = await Promise.all([api.get("/menu"), api.get("/orders")]);
      setItems(menuResponse.data);
      setOrders(ordersResponse.data);
      setStatus("success");
    } catch (err) {
      if (err.response?.status === 401) {
        setStatus("error");
        setError("Please sign in to access the admin panel.");
      } else {
        setStatus("error");
        setError("Unable to load menu items.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      loadItems();
    }
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    if (!username.trim() || !password.trim()) {
      setStatus("error");
      setError("Username and password are required.");
      return;
    }

    try {
      const response = await api.post("/auth/login", { username, password });
      localStorage.setItem("adminToken", response.data.token);
      setToken(response.data.token);
      setUsername("");
      setPassword("");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setItems([]);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.image || "",
      category: item.category || "",
      isSeasonal: item.isSeasonal || false
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    if (!form.name.trim() || !form.description.trim() || Number(form.price) < 0) {
      setStatus("error");
      setError("Name, price, and description are required.");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price)
    };

    try {
      if (editingId) {
        await api.put(`/menu/${editingId}`, payload);
      } else {
        await api.post("/menu", payload);
      }
      resetForm();
      loadItems();
    } catch (err) {
      setStatus("error");
      setError("Unable to save menu item.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item? This action cannot be undone.")) {
      return;
    }

    setStatus("loading");
    setError("");

    try {
      await api.delete(`/menu/${id}`);
      loadItems();
    } catch (err) {
      setStatus("error");
      setError("Unable to delete menu item.");
    }
  };

  const updateOrderStatus = async (orderId, nextStatus) => {
    setStatus("loading");
    setError("");

    try {
      const response = await api.patch(`/orders/${orderId}/status`, { status: nextStatus });
      setOrders((current) => current.map((order) => (order._id === orderId ? response.data : order)));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError("Unable to update order status.");
    }
  };

  if (!token) {
    return (
      <div className="admin-page">
        <header className="admin-header">
          <h1>Menu Admin</h1>
          <p>Sign in to manage menu items.</p>
        </header>

        <form className="admin-form admin-login" onSubmit={handleLogin}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>
          {status === "error" && <p className="form-error">{error}</p>}
          <button className="btn-primary" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1>Menu Admin</h1>
          <p>Manage menu items shown on the public menu.</p>
        </div>
        <button className="btn-ghost" type="button" onClick={handleLogout}>
          Log out
        </button>
      </header>

      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit item" : "Add new item"}</h2>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="Menu item name" />
          </label>
          <label>
            Price
            <input name="price" value={form.price} onChange={handleChange} type="number" min="0" step="0.01" placeholder="0" />
          </label>
          <label>
            Category
            <input name="category" value={form.category} onChange={handleChange} placeholder="Matcha, Bakery, Desserts" />
          </label>
          <label>
            Image URL
            <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </label>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Short description" />
          </label>
          <label className="checkbox">
            <input name="isSeasonal" type="checkbox" checked={form.isSeasonal} onChange={handleChange} />
            Seasonal
          </label>
          {status === "error" && <p className="form-error">{error}</p>}
          <div className="admin-actions">
            <button className="btn-primary" type="submit" disabled={status === "loading"}>
              {editingId ? "Update" : "Add"}
            </button>
            {editingId && (
              <button className="btn-ghost" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          <h2>Current menu</h2>
          {status === "loading" && <p>Loading...</p>}
          {items.map((item) => (
            <div key={item._id} className="admin-item">
              <div>
                <h3>{item.name}</h3>
                <p>Rs {item.price}</p>
                <p className="admin-desc">{item.description}</p>
              </div>
              <div className="admin-item-actions">
                <button type="button" onClick={() => startEdit(item)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MetricsDashboard />

      <section className="admin-orders">
        <h2>Orders</h2>
        {orders.length === 0 && <p>No orders yet.</p>}
        {orders.map((order) => (
          <div key={order._id} className="order-row">
            <div>
              <p className="order-id">{order._id}</p>
              <p className="order-meta">{order.customerName || "Guest"}</p>
              <p className="order-meta">{order.customerEmail || "No email"}</p>
              <p className="order-meta">Total: Rs {order.totalPrice}</p>
            </div>
            <div className="order-status">
              <label>
                Status
                <select value={order.status} onChange={(event) => updateOrderStatus(order._id, event.target.value)}>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                </select>
              </label>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Admin;
