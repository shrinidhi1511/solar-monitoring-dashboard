import { useState } from "react";
import WhiteSidebarLayout from "../../layouts/WhiteSidebarLayout/WhiteSidebarLayout";
import "./MeterDashboard.scss";

// ─── Data ─────────────────────────────────────────────────────────────────────
const KPI_CARDS = [
  {
    icon: "bolt",
    iconColor: "secondary",
    badge: "+12.4% vs last month",
    badgeColor: "secondary",
    label: "Total Generation",
    value: "42.84",
    unit: "MWh",
  },
  {
    icon: "query_stats",
    iconColor: "primary",
    badge: "Target: 18.5%",
    badgeColor: "primary",
    label: "Avg. AC CUF",
    value: "17.92",
    unit: "%",
  },
  {
    icon: "timer",
    iconColor: "tertiary",
    badge: "Healthy",
    badgeColor: "secondary",
    label: "Uptime Duration",
    value: "99.85",
    unit: "%",
  },
];

const DAILY_BARS = [
  { height: 55, label: "OCT 01" },
  { height: 70, label: "OCT 05" },
  { height: 62, label: "OCT 10" },
  { height: 92, label: "OCT 15", highlight: true },
  { height: 85, label: "OCT 20" },
  { height: 58, label: "OCT 25" },
  { height: 75, label: "OCT 30" },
];

const DIST_BARS = [
  { color: "secondary", heightPx: 192, label: "Live Energy" },
  { color: "primary", heightPx: 144, label: "Backlog Energy" },
  { color: "tertiary", heightPx: 160, label: "Unmonitored Energy" },
  { color: "outline", heightPx: 112, label: "CUF ON AC Capacity", dim: true },
  { color: "outline-variant", heightPx: 128, label: "CUF ON DC Capacity", dim: true },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({ card }) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <div className={`kpi-icon-wrap color-${card.iconColor}`}>
          <span className="material-symbols-outlined">{card.icon}</span>
        </div>
        <span className={`kpi-badge badge-${card.badgeColor}`}>{card.badge}</span>
      </div>
      <h4 className="kpi-label">{card.label}</h4>
      <div className="kpi-value">
        <span className="val">{card.value}</span>
        <span className="unit">{card.unit}</span>
      </div>
    </div>
  );
}

function TabSwitcher({ active, onChange }) {
  return (
    <div className="tab-switcher">
      {["Day", "Month", "Year"].map((t) => (
        <button
          key={t}
          className={`tab-btn ${active === t ? "active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function DailyEnergyChart() {
  const [fromDate, setFromDate] = useState("2023-10-01");
  const [toDate, setToDate] = useState("2023-10-31");

  return (
    <section className="chart-card main-chart">
      <div className="chart-card-header">
        <h3>Daily Energy Analytics</h3>
        <button className="icon-btn outline-color">
          <span className="material-symbols-outlined">print</span>
        </button>
      </div>

      {/* Filters */}
      <div className="chart-filters">
        <div className="filter-field">
          <label>From Date</label>
          <input
            type="date"
            className="date-input"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="filter-field">
          <label>To Date</label>
          <input
            type="date"
            className="date-input"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <button className="btn-primary">Update View</button>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <span className="dot secondary" />
          <span>Live Energy</span>
        </div>
        <div className="legend-item">
          <span className="dot primary" />
          <span>CUF ON AC</span>
        </div>
        <div className="legend-item">
          <span className="dot tertiary" />
          <span>CUF ON DC</span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bar-chart-area">
        <div className="y-axis-label">Energy (KWH)</div>

        {/* CUF reference lines */}
        <div className="cuf-line cuf-ac" />
        <div className="cuf-line cuf-dc" />

        <div className="bars">
          {DAILY_BARS.map((bar) => (
            <div key={bar.label} className="bar-col">
              <div
                className={`energy-bar ${bar.highlight ? "highlight-ring" : ""}`}
                style={{ height: `${bar.height}%` }}
              />
              <span className={`bar-label ${bar.highlight ? "hl-text" : ""}`}>
                {bar.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GenerationThroughoutDay() {
  return (
    <div className="chart-card side-card">
      <div className="chart-card-header">
        <div>
          <h3>Generation Throughout Day</h3>
          <div className="mini-legend">
            <span className="mini-item secondary">Solar Meter AC Power</span>
            <span className="mini-item primary">SSP</span>
            <span className="mini-item tertiary">Grid Meter AC Power</span>
            <span className="mini-item dark">DG SYNC AC Power</span>
          </div>
        </div>
        <div className="card-controls">
          <input type="date" className="date-input-sm" defaultValue="2023-10-30" />
          <button className="icon-btn outline-color">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>print</span>
          </button>
        </div>
      </div>

      <div className="area-chart-wrap">
        <div className="y-axis-label-sm">AC/DC Power (KW)</div>
        <div className="area-chart-canvas">
          {/* SVG area chart */}
          <svg
            className="area-svg"
            viewBox="0 0 400 240"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ae176" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#4ae176" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="sspGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0058be" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0058be" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {/* Solar AC power area */}
            <path
              d="M0,240 L0,108 L40,96 L80,120 L120,72 L160,84 L200,48 L240,96 L280,60 L320,108 L360,36 L400,84 L400,240 Z"
              fill="url(#areaGrad)"
            />
            <path
              d="M0,108 L40,96 L80,120 L120,72 L160,84 L200,48 L240,96 L280,60 L320,108 L360,36 L400,84"
              fill="none"
              stroke="#006e2f"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* SSP line */}
            <path
              d="M0,150 L40,140 L80,160 L120,110 L160,130 L200,90 L240,135 L280,105 L320,145 L360,80 L400,120"
              fill="url(#sspGrad)"
            />
            <path
              d="M0,150 L40,140 L80,160 L120,110 L160,130 L200,90 L240,135 L280,105 L320,145 L360,80 L400,120"
              fill="none"
              stroke="#0058be"
              strokeWidth="1.5"
              strokeDasharray="6 3"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="x-axis-labels">
          <span>06:00</span>
          <span>10:00</span>
          <span>14:00</span>
          <span>18:00</span>
        </div>
      </div>
    </div>
  );
}

function EnergyDistribution() {
  return (
    <div className="chart-card side-card">
      <div className="chart-card-header">
        <h3>Meter-wise Energy Distribution</h3>
        <div className="card-controls">
          <input type="date" className="date-input-sm" defaultValue="2023-10-30" />
          <button className="icon-btn outline-color">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>print</span>
          </button>
        </div>
      </div>

      <div className="dist-chart">
        {DIST_BARS.map((bar) => (
          <div key={bar.label} className="dist-col">
            <div
              className={`dist-bar color-${bar.color} ${bar.dim ? "dim" : ""}`}
              style={{ height: `${bar.heightPx}px` }}
            />
            <span className="dist-label">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function MeterDashboard({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("Day");

  return (
    <WhiteSidebarLayout onNavigate={onNavigate}>
      <div className="meter-dashboard">
        {/* KPI Row */}
        <section className="kpi-row">
          {KPI_CARDS.map((c) => (
            <KpiCard key={c.label} card={c} />
          ))}
        </section>

        {/* Tab Switcher */}
        <TabSwitcher active={activeTab} onChange={setActiveTab} />

        {/* Main Bar Chart */}
        <DailyEnergyChart />

        {/* Bottom row */}
        <section className="bottom-row">
          <GenerationThroughoutDay />
          <EnergyDistribution />
        </section>
      </div>
    </WhiteSidebarLayout>
  );
}

export default MeterDashboard;
