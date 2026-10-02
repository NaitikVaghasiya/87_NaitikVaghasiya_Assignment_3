import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("token"));

  function loginSuccess(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setPage("home");
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setPage("login");
  }

  return (
    <div className="ess-app">
      <nav className="ess-nav">
        <div className="ess-brand">
          <div className="brand-icon">E</div>
          <div>
            <div className="brand-title">Employee Self-Service (ESS)</div>
            <div className="brand-subtitle">JWT Secure Workspace • Question 05</div>
          </div>
        </div>
        {token && (
          <div className="nav-right-actions">
            <button className="btn-action-sm btn-action-outline" onClick={() => setPage("home")}>
              Home
            </button>
            <button className="btn-action-sm btn-action-logout" onClick={logout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>

      <div className="centered-wrapper">
        {!token ? (
          <Login loginSuccess={loginSuccess} />
        ) : page === "profile" ? (
          <Profile token={token} setPage={setPage} />
        ) : page === "leave" ? (
          <Leave token={token} setPage={setPage} />
        ) : (
          <Home setPage={setPage} logout={logout} />
        )}
      </div>
    </div>
  );
}

// ========================================
// LOGIN COMPONENT
// ========================================
function Login({ loginSuccess }) {
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          empid: empid,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        loginSuccess(data.token);
      } else {
        setMessage(data.message || "Invalid credentials provided");
      }
    } catch (err) {
      setMessage("Cannot connect to server. Ensure backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-box">
      <span className="badge-tag">Question 05 • JWT Authentication</span>
      <h2 className="heading-lg">Employee Sign In</h2>
      <p className="desc-text">
        Access your verified profile and file time-off leave applications.
      </p>

      {message && <div className="msg-alert">{message}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label className="field-label">Employee ID (EmpID)</label>
          <input
            type="text"
            className="field-input"
            placeholder="e.g. EMP001"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="field-label">Access Password</label>
          <input
            type="password"
            className="field-input"
            placeholder="Enter secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-blue-primary" disabled={loading}>
          {loading ? "Authenticating..." : "Authorize & Sign In"}
        </button>
      </form>
    </div>
  );
}

// ========================================
// HOME COMPONENT
// ========================================
function Home({ setPage, logout }) {
  return (
    <div className="card-box card-box-wide">
      <span className="badge-tag">Employee Workspace</span>
      <h2 className="heading-lg">Welcome to Your Workspace</h2>
      <p className="desc-text">
        Select a destination below to inspect your payroll profile or manage leave applications.
      </p>

      <div className="home-nav-grid">
        <div className="nav-card-item" onClick={() => setPage("profile")}>
          <div className="nav-card-icon">👤</div>
          <h3>Page 1 • Employee Profile</h3>
          <p>Inspect your personal credentials, department assignment, and salary calculation breakdown.</p>
        </div>

        <div className="nav-card-item" onClick={() => setPage("leave")}>
          <div className="nav-card-icon">📝</div>
          <h3>Page 2 • Leave Application</h3>
          <p>Submit formal time-off requests, view approval grant statuses, and manage your leave records.</p>
        </div>
      </div>

      <button className="btn-action-sm btn-action-logout" onClick={logout} style={{ width: "100%", padding: "12px" }}>
        Terminate Active Session (Logout)
      </button>
    </div>
  );
}

// ========================================
// PROFILE COMPONENT
// ========================================
function Profile({ token, setPage }) {
  const [employee, setEmployee] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function getProfile() {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setEmployee(data);
      } else {
        setMessage(data.message || "Failed to retrieve employee profile");
      }
    } catch (err) {
      setMessage("Unable to contact backend service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card-box card-box-wide">
      <span className="badge-tag">Page 01 • Verified Credentials</span>
      <h2 className="heading-lg">Personnel Profile & Payroll</h2>
      <p className="desc-text">
        Fetch your synchronized ERP employee record via JWT authorization.
      </p>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <button className="btn-action-sm btn-action-blue" onClick={getProfile} disabled={loading}>
          {loading ? "Fetching..." : "Display Employee Profile"}
        </button>
        <button className="btn-action-sm btn-action-outline" onClick={() => setPage("home")}>
          &larr; Back to Home
        </button>
      </div>

      {message && <div className="msg-alert">{message}</div>}

      {employee && (
        <table className="data-table-box">
          <tbody>
            <tr>
              <th style={{ width: "35%" }}>Employee ID</th>
              <td><strong>{employee.empid}</strong></td>
            </tr>
            <tr>
              <th>Full Name</th>
              <td>{employee.name}</td>
            </tr>
            <tr>
              <th>Email Address</th>
              <td>{employee.email}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{employee.department}</td>
            </tr>
            <tr>
              <th>Basic Salary</th>
              <td>₹{employee.basicSalary}</td>
            </tr>
            <tr>
              <th>House Rent Allowance (HRA 20%)</th>
              <td>₹{employee.hra}</td>
            </tr>
            <tr>
              <th>Dearness Allowance (DA 10%)</th>
              <td>₹{employee.da}</td>
            </tr>
            <tr>
              <th>Provident Fund (PF 12%)</th>
              <td>₹{employee.pf}</td>
            </tr>
            <tr>
              <th>Net Take-Home Salary</th>
              <td style={{ color: "#38bdf8", fontWeight: "700" }}>₹{employee.netSalary}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

// ========================================
// LEAVE COMPONENT
// ========================================
function Leave({ token, setPage }) {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [grant, setGrant] = useState("No");
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function addLeave(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/leave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          date: date,
          reason: reason,
          grant: grant,
        }),
      });

      const data = await response.json();
      setMessage(data.message);

      if (response.ok) {
        setDate("");
        setReason("");
        setGrant("No");
        getLeaves();
      }
    } catch (err) {
      setMessage("Error communicating with leave service");
    } finally {
      setLoading(false);
    }
  }

  async function getLeaves() {
    try {
      const response = await fetch("http://localhost:5000/api/leaves", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      if (Array.isArray(data)) {
        setLeaves(data);
      }
    } catch (err) {
      setMessage("Error fetching leave records");
    }
  }

  return (
    <div className="card-box card-box-wide">
      <span className="badge-tag">Page 02 • Leave Application</span>
      <h2 className="heading-lg">Time-Off & Leave Management</h2>
      <p className="desc-text">
        Submit a new leave application or query your historical leave requests.
      </p>

      <form onSubmit={addLeave} style={{ marginBottom: "26px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: "14px", alignItems: "end" }}>
          <div className="form-field" style={{ margin: 0 }}>
            <label className="field-label">Date of Leave</label>
            <input
              type="date"
              className="field-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-field" style={{ margin: 0 }}>
            <label className="field-label">Reason / Justification</label>
            <input
              type="text"
              className="field-input"
              placeholder="e.g. Medical appointment, Family emergency"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          <div className="form-field" style={{ margin: 0 }}>
            <label className="field-label">Grant Status</label>
            <select
              className="field-select"
              value={grant}
              onChange={(e) => setGrant(e.target.value)}
            >
              <option value="Yes">Yes (Approved)</option>
              <option value="No">No (Pending)</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
          <button type="submit" className="btn-action-sm btn-action-blue" disabled={loading}>
            {loading ? "Submitting..." : "+ Add Leave Application"}
          </button>
          <button type="button" className="btn-action-sm btn-action-outline" onClick={getLeaves}>
            List All Submitted Leaves
          </button>
          <button type="button" className="btn-action-sm btn-action-outline" onClick={() => setPage("home")}>
            &larr; Back to Home
          </button>
        </div>
      </form>

      {message && <div className="msg-alert">{message}</div>}

      {leaves.length > 0 && (
        <table className="data-table-box">
          <thead>
            <tr>
              <th>Date of Absence</th>
              <th>Reason for Leave</th>
              <th>Grant Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave._id}>
                <td><strong>{leave.date}</strong></td>
                <td>{leave.reason}</td>
                <td>
                  <span className={`status-pill ${leave.grant === "Yes" ? "yes" : "no"}`}>
                    {leave.grant === "Yes" ? "Granted (Yes)" : "Denied / Pending (No)"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
