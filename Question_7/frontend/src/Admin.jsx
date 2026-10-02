import { useEffect, useState } from "react";

function Admin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  async function getCategories() {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function getProducts() {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addCategory(e) {
    e.preventDefault();
    if (!categoryName.trim()) return;

    await fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    });

    setCategoryName("");
    getCategories();
  }

  async function deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?")) return;
    await fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
    });
    getCategories();
  }

  async function addProduct(e) {
    e.preventDefault();
    if (!productName || !price || !category) return;

    await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: productName,
        price: Number(price),
        quantity: Number(quantity || 0),
        category: category,
      }),
    });

    setProductName("");
    setPrice("");
    setQuantity("");
    setCategory("");
    getProducts();
  }

  async function deleteProduct(id) {
    if (!confirm("Are you sure you want to remove this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });
    getProducts();
  }

  return (
    <div className="store-container">
      <div className="page-header">
        <span className="badge-tag">Backoffice Administration</span>
        <h1 className="page-title">Storefront Inventory & Catalog Control</h1>
        <p className="page-subtitle">Configure 2-level product hierarchies, manage inventory stocks, and set pricing.</p>
      </div>

      <div className="admin-grid">
        {/* CATEGORY MANAGEMENT */}
        <div className="admin-card">
          <h2 className="admin-card-title">Category Directory</h2>

          <form onSubmit={addCategory} className="form-inline">
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Laptops, Audio, Apparel"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button type="submit" className="btn-admin-submit">+ Add Category</button>
          </form>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th style={{ width: "80px", textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan="2" style={{ textAlign: "center", color: "#64748b" }}>
                    No categories created yet.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id}>
                    <td><strong>{cat.name}</strong></td>
                    <td style={{ textAlign: "right" }}>
                      <button 
                        className="btn-admin-del" 
                        onClick={() => deleteCategory(cat._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PRODUCT MANAGEMENT */}
        <div className="admin-card">
          <h2 className="admin-card-title">Register New Product</h2>

          <form onSubmit={addProduct} style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "26px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#94a3b8", marginBottom: "6px" }}>Product Name</label>
              <input
                type="text"
                className="admin-input"
                placeholder="e.g. Ultra Wireless Headphones"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#94a3b8", marginBottom: "6px" }}>Price (₹)</label>
                <input
                  type="number"
                  className="admin-input"
                  placeholder="e.g. 4999"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#94a3b8", marginBottom: "6px" }}>Stock Quantity</label>
                <input
                  type="number"
                  className="admin-input"
                  placeholder="e.g. 25"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#94a3b8", marginBottom: "6px" }}>Assigned Category</label>
              <select 
                className="admin-select"
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">-- Choose Category --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-admin-submit" style={{ marginTop: "6px" }}>
              Publish Product to Catalog
            </button>
          </form>

          <h2 className="admin-card-title" style={{ marginTop: "10px" }}>Catalog Overview ({products.length})</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", color: "#64748b" }}>
                      No inventory items found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td><strong>{product.name}</strong></td>
                      <td>₹{product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <span className="product-badge-cat" style={{ margin: 0 }}>
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="btn-admin-del" 
                          onClick={() => deleteProduct(product._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
