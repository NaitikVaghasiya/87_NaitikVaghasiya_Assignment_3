import { useState } from "react";
import Admin from "./Admin";
import User from "./User";
import "./App.css";

function App() {
  const [site, setSite] = useState("user");

  return (
    <div className="store-app">
      <nav className="store-nav">
        <div className="store-brand">
          <div className="store-brand-icon">A</div>
          <div>
            <h2>Apex Commerce Hub</h2>
            <span>{site === "admin" ? "Administrative Backoffice" : "Customer Storefront"} • Question 07</span>
          </div>
        </div>

        <button 
          className="nav-switch-btn" 
          onClick={() => setSite(site === "admin" ? "user" : "admin")}
        >
          {site === "admin" ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              Switch to Storefront (User View)
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Access Admin Console
            </>
          )}
        </button>
      </nav>

      {site === "admin" ? <Admin setSite={setSite} /> : <User setSite={setSite} />}
    </div>
  );
}

export default App;
