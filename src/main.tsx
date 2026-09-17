import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const orders = [
  ["#10482", "Amelia Brown", "16 Sep", "Complete"],
  ["#10481", "Daniel Green", "15 Sep", "Pending"],
  ["#10480", "Sophie Wilson", "15 Sep", "Complete"],
  ["#10479", "Oliver Smith", "14 Sep", "Failed"],
];

const initialBars = [52, 70, 44, 86, 63, 94];

function App() {
  const [bars, setBars] = useState(initialBars);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (bars === initialBars) return;

    // Report success after the updated sales have been committed to the chart.
    setToast(true);
    const timeout = window.setTimeout(() => setToast(false), 1200);
    return () => window.clearTimeout(timeout);
  }, [bars]);

  function refresh() {
    setToast(false);
    // Deterministic local sample data, kept within 35–95 percent.
    setBars(previous => previous.map((height, index) =>
      35 + ((height - 35 + 7 + index * 3) % 61)
    ));
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">UI Eval</div>
        <nav aria-label="Main navigation">
          <button type="button" className="nav-item active"><span className="nav-icon" aria-hidden="true">▦</span><span className="nav-label">Dashboard</span></button>
          <button type="button" className="nav-item"><span className="nav-icon" aria-hidden="true">◷</span><span className="nav-label">Activity</span></button>
          <button type="button" className="nav-item"><span className="nav-icon" aria-hidden="true">♙</span><span className="nav-label">Customers</span></button>
          <button type="button" className="nav-item"><span className="nav-icon" aria-hidden="true">▤</span><span className="nav-label">Reports</span></button>
          <button type="button" className="nav-item"><span className="nav-icon" aria-hidden="true">⚙</span><span className="nav-label">Settings and preferences</span></button>
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <h1>Overview</h1>
            <p className="subtitle">Monitor your workspace performance</p>
          </div>
          <button className="avatar" aria-label="User profile">PW</button>
        </header>

        <section className="cards" aria-label="Key metrics">
          <Metric label="Revenue" value="£24,680" delta="↑ 12.4% this month" />
          <Metric label="Orders" value="1,284" delta="↑ 8.1% this month" />
          <Metric label="Customers" value="8,492" delta="↑ 4.7% this month" />
          <Metric label="Conversion" value="4.82%" delta="↑ 0.6% this month" />
        </section>

        <section className="content">
          <div className="panel">
            <div className="panel-header">
              <h2>Recent orders</h2>
              <select className="filter" aria-label="Filter orders">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Order</th><th>Customer</th><th>Date</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {orders.map(([order, customer, date, status]) => (
                    <tr key={order}>
                      <td>{order}</td>
                      <td>{customer}</td>
                      <td>{date}</td>
                      <td><span className={`status ${status.toLowerCase()}`}>{status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <h2>Monthly sales</h2>
              <button className="filter-btn" onClick={refresh}>Refresh</button>
            </div>

            <div className="chart" aria-label="Monthly sales chart">
              <div className="bars">
                {bars.map((height, index) => (
                  <div
                    className="bar-wrapper"
                    key={index}
                  >
                    <div
                      className="bar"
                      style={{ height: `${height}%` }}
                      aria-label={`${height} percent`}
                    />
                  </div>
                ))}
              </div>
              <div className="months">
                {["Apr", "May", "Jun", "Jul", "Aug", "Sep"].map(month => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast ? "Data refreshed" : ""}
      </div>
    </div>
  );
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <article className="card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <div className="delta">{delta}</div>
    </article>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><App /></StrictMode>
);
