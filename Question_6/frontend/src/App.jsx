import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function convertCurrency() {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid numeric amount greater than zero");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/currency?amount=${amount}&from=${from}&to=${to}`
      );

      const data = await response.json();

      if (data.rates && data.rates[to]) {
        const rate = (data.rates[to] / Number(amount)).toFixed(4);
        setResult({
          converted: `${amount} ${from} = ${data.rates[to]} ${to}`,
          rate: `1 ${from} ≈ ${rate} ${to}`,
          date: data.date || "Latest live rate"
        });
      } else {
        setError("Currency conversion failed. Check input parameters.");
      }
    } catch (err) {
      setError("Unable to connect to currency backend. Ensure port 5000 is active.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="converter-card">
      <div className="badge-utility">
        <span style="width: 8px; height: 8px; border-radius: 50%; background: #38bdf8;"></span>
        Question 06 • Free API Integration
      </div>
      
      <h1 className="header-title">FinFlow Currency Utility</h1>
      <p className="header-desc">
        Real-time foreign exchange conversions powered by Frankfurter Open API via Express backend.
      </p>

      <div className="form-group">
        <label className="field-label">Transfer Amount</label>
        <input
          type="number"
          className="input-box"
          placeholder="Enter numeric amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="currency-row">
        <div>
          <label className="field-label">Source Currency (From)</label>
          <select 
            className="select-box" 
            value={from} 
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>

        <div>
          <label className="field-label">Target Currency (To)</label>
          <select 
            className="select-box" 
            value={to} 
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>
      </div>

      <button className="btn-convert" onClick={convertCurrency} disabled={loading}>
        {loading ? "Fetching Live Exchange..." : "Calculate Real-Time Conversion"}
      </button>

      {result && (
        <div className="result-card">
          <span className="result-label">Calculated Live Exchange Result</span>
          <span className="result-val">{result.converted}</span>
          <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
            Exchange Benchmark: {result.rate} ({result.date})
          </span>
        </div>
      )}

      {error && (
        <div className="alert-error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

export default App;
