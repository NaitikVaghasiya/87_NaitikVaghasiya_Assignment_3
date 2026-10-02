import { useEffect, useState } from "react";

function User() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCat, setActiveCat] = useState("all");

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
      setActiveCat("all");
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function selectCategory(id) {
    try {
      setActiveCat(id);
      const response = await fetch(`http://localhost:5000/api/products/category/${id}`);
      const data = await response.json();
      if (Array.isArray(data)) setProducts(data);
    } catch (err) {
      console.error(err);
    }
  }

  function addToCart(product) {
    const existingProduct = cart.find((item) => item._id === product._id);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, cartQuantity: item.cartQuantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        { ...product, cartQuantity: 1 },
      ]);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item._id !== id));
  }

  function increase(id) {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      )
    );
  }

  function decrease(id) {
    setCart(
      cart.map((item) =>
        item._id === id
          ? { ...item, cartQuantity: item.cartQuantity > 1 ? item.cartQuantity - 1 : 1 }
          : item
      )
    );
  }

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.cartQuantity, 0);
  }

  const totalCartCount = cart.reduce((count, item) => count + item.cartQuantity, 0);

  return (
    <div className="store-container">
      <div className="page-header">
        <span className="badge-tag">Customer Showcase</span>
        <h1 className="page-title">Curated Product Collections</h1>
        <p className="page-subtitle">Filter by department category and manage your shopping basket in real time.</p>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="category-filter-bar">
        <button 
          className={`btn-filter-pill ${activeCat === "all" ? "active" : ""}`}
          onClick={getProducts}
        >
          All Collections ({products.length})
        </button>

        {categories.map((cat) => (
          <button 
            key={cat._id} 
            className={`btn-filter-pill ${activeCat === cat._id ? "active" : ""}`}
            onClick={() => selectCategory(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="store-layout">
        {/* PRODUCT SHOWCASE */}
        <div>
          {products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
              <h3>No merchandise in this category</h3>
              <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>Switch categories or visit the Admin Console to register products.</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div>
                    <span className="product-badge-cat">
                      {product.category?.name || "General"}
                    </span>
                    <h3 className="product-name">{product.name}</h3>
                  </div>

                  <div>
                    <div className="product-price-box">
                      <span className="product-price">₹{product.price}</span>
                      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                        Stock: {product.quantity ?? "Available"}
                      </span>
                    </div>

                    <button 
                      className="btn-add-cart" 
                      onClick={() => addToCart(product)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                      Add to Basket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SHOPPING CART SIDEBAR */}
        <div className="cart-sidebar">
          <div className="cart-title-row">
            <h3 className="cart-title">Shopping Basket</h3>
            <span className="cart-count-badge">{totalCartCount} Items</span>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart-msg">
              <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🛒</div>
              Your basket is currently empty.
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item._id} className="cart-item-row">
                  <div className="cart-item-header">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₹{item.price * item.cartQuantity}</span>
                  </div>

                  <div className="cart-qty-row">
                    <div className="qty-controls">
                      <button className="btn-qty" onClick={() => decrease(item._id)}>-</button>
                      <span className="qty-num">{item.cartQuantity}</span>
                      <button className="btn-qty" onClick={() => increase(item._id)}>+</button>
                    </div>

                    <button 
                      className="btn-remove-item" 
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total-box">
                <span style={{ color: "#94a3b8", fontWeight: "500" }}>Total Payable</span>
                <span className="cart-total-val">₹{getTotal()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
