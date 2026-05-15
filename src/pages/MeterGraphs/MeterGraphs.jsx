import { useState, useRef, useEffect } from "react";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./MeterGraphs.scss";

// ─── Constants ─────────────────────────────────────────────────────────────────
const Y_LABELS = [1600, 1200, 800, 400, 0];

const ALL_BARS = [
  { height: 60,  kWh: "960",   cuf: "15.4%", label: "OCT 01" },
  { height: 75,  kWh: "1,200", cuf: "16.8%", label: "OCT 05" },
  { height: 65,  kWh: "1,040", cuf: "15.9%", label: "OCT 10" },
  { height: 90,  kWh: "1,420", cuf: "18.2%", label: "OCT 15", highlight: true },
  { height: 82,  kWh: "1,310", cuf: "17.6%", label: "OCT 20" },
  { height: 55,  kWh: "880",   cuf: "14.3%", label: "OCT 25" },
  { height: 70,  kWh: "1,120", cuf: "16.2%", label: "OCT 30" },
];

const METRICS = [
  {
    icon: "bolt",
    iconColor: "secondary",
    badge: "+12.4% vs last month",
    badgeColor: "secondary",
    label: "Total Generation",
    value: "42.84",
    unit: "MWh",
    sparkData: [40, 55, 45, 60, 50, 70, 65, 80],
    sparkColor: "#006e2f",
  },
  {
    icon: "query_stats",
    iconColor: "purple",
    badge: "Target: 18.5%",
    badgeColor: "purple",
    label: "Avg. AC CUF",
    value: "17.92",
    unit: "%",
    sparkData: [14, 16, 15, 18, 17, 19, 18, 20],
    sparkColor: "#a855f7",
  },
  {
    icon: "timer",
    iconColor: "primary",
    badge: "Healthy",
    badgeColor: "primary",
    label: "Uptime Duration",
    value: "99.85",
    unit: "%",
    sparkData: [98, 99, 100, 99, 100, 100, 99, 100],
    sparkColor: "#0058be",
  },
];

// ─── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  const polyline = pts.join(" ");
  const area = `0,${h} ${polyline} ${w},${h}`;

  return (
    <svg className="sparkline" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${color.replace("#","")})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────────
function FilterBar() {
  const [activeSpan, setActiveSpan] = useState("MONTHLY");

  return (
    <section className="mg-filter-section">
      <div className="mg-filter-card">
        <div className="mg-filter-group">
          <label className="mg-filter-label">Span Selection</label>
          <div className="mg-span-toggle">
            {["MONTHLY", "WEEKLY", "YEARLY"].map((s) => (
              <button
                key={s}
                className={`mg-span-btn ${activeSpan === s ? "active" : ""}`}
                onClick={() => setActiveSpan(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mg-filter-group">
          <label className="mg-filter-label">Meter Point</label>
          <select className="mg-filter-select">
            <option>Main Incomer Meter 01</option>
            <option>Export Grid Meter 02</option>
          </select>
        </div>

        <div className="mg-filter-group">
          <label className="mg-filter-label">Report Module</label>
          <select className="mg-filter-select">
            <option>Generation Report</option>
            <option>Efficiency Breakdown</option>
            <option>Loss Analysis</option>
          </select>
        </div>

        <div className="mg-filter-group">
          <label className="mg-filter-label">Target Date</label>
          <input className="mg-filter-select" type="month" defaultValue="2023-10" />
        </div>
      </div>

      <div className="mg-filter-update">
        <button className="mg-update-btn">
          <span className="material-symbols-outlined">search</span>
          Update View
        </button>
      </div>
    </section>
  );
}

// ─── Energy Chart ──────────────────────────────────────────────────────────────
function EnergyChart() {
  const [hoveredBar, setHoveredBar] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(50); // 0-100
  const [mounted, setMounted] = useState(false);
  const trackRef = useRef(null);
  const dragging = useRef(false);

  useEffect(() => {
    // Trigger bar entrance animation after mount
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Draggable zoom track
  const startDrag = (e) => {
    dragging.current = true;
    moveDrag(e);
  };
  const moveDrag = (e) => {
    if (!dragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setZoomLevel(Math.round(pct));
  };
  const stopDrag = () => { dragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", moveDrag);
    window.addEventListener("mouseup", stopDrag);
    return () => {
      window.removeEventListener("mousemove", moveDrag);
      window.removeEventListener("mouseup", stopDrag);
    };
  });

  const thumbLeft = `${Math.max(0, zoomLevel - 15)}%`;
  const thumbRight = `${Math.max(0, 100 - zoomLevel - 15)}%`;

  return (
    <section className="mg-chart-card">
      {/* Header */}
      <div className="mg-chart-header">
        <div>
          <h3 className="mg-chart-title">Energy Generation Analytics</h3>
          <p className="mg-chart-sub">Real-time vs AC/DC Capacity Utilization (CUF)</p>
        </div>
        <div className="mg-legend">
          {[
            { cls: "secondary", label: "Live Energy" },
            { cls: "purple",    label: "CUF (AC)" },
            { cls: "tertiary",  label: "CUF (DC)" },
          ].map(({ cls, label }) => (
            <div className="mg-legend-item" key={label}>
              <span className={`mg-dot ${cls}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chart with Y axis */}
      <div className="mg-chart-wrap">
        {/* Y-axis */}
        <div className="mg-y-axis">
          {Y_LABELS.map((v) => (
            <span key={v} className="mg-y-label">{v}</span>
          ))}
          <div className="mg-y-title">Energy (kWh)</div>
        </div>

        {/* Plot area */}
        <div className="mg-plot">
          {/* Grid lines */}
          <div className="mg-grid" aria-hidden="true">
            {Y_LABELS.map((_, i) => <div key={i} className="mg-grid-line" />)}
          </div>

          {/* CUF reference lines */}
          <div className="mg-cuf-line mg-cuf-ac" aria-hidden="true">
            <span className="mg-cuf-label">CUF AC 18.5%</span>
          </div>
          <div className="mg-cuf-line mg-cuf-dc" aria-hidden="true">
            <span className="mg-cuf-label">CUF DC 15.0%</span>
          </div>

          {/* Bars */}
          <div className="mg-bars">
            {ALL_BARS.map((bar, i) => (
              <div
                key={bar.label}
                className="mg-bar-col"
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                <div className={`mg-tooltip ${hoveredBar === i ? "visible" : ""}`}>
                  <div className="tt-value">{bar.kWh} kWh</div>
                  <div className="tt-cuf">CUF: {bar.cuf}</div>
                  <div className="tt-arrow" />
                </div>

                <div
                  className={`mg-energy-bar ${bar.highlight ? "highlight" : ""} ${mounted ? "entered" : ""}`}
                  style={{
                    "--bar-height": `${bar.height}%`,
                    transitionDelay: `${i * 60}ms`,
                  }}
                />
                <span className={`mg-bar-label ${bar.highlight ? "hl" : ""}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zoom / Pan Controls */}
      <div className="mg-zoom-controls">
        <button
          className="mg-zoom-btn"
          onClick={() => setZoomLevel((z) => Math.min(100, z + 10))}
          title="Zoom In"
        >
          <span className="material-symbols-outlined">zoom_in</span>
        </button>

        <div
          className="mg-zoom-track"
          ref={trackRef}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
          onTouchMove={moveDrag}
          onTouchEnd={stopDrag}
          title={`Zoom: ${zoomLevel}%`}
        >
          <div
            className="mg-zoom-thumb"
            style={{ left: thumbLeft, right: thumbRight }}
          />
          <div
            className="mg-zoom-handle"
            style={{ left: `${zoomLevel}%` }}
          />
        </div>

        <button
          className="mg-zoom-btn"
          onClick={() => setZoomLevel((z) => Math.max(0, z - 10))}
          title="Zoom Out"
        >
          <span className="material-symbols-outlined">zoom_out</span>
        </button>

        <span className="mg-zoom-pct">{zoomLevel}%</span>
      </div>
    </section>
  );
}

// ─── Metric Card ───────────────────────────────────────────────────────────────
function MetricCard({ metric }) {
  return (
    <div className="mg-metric-card">
      <div className="mg-metric-top">
        <span className={`material-symbols-outlined mg-metric-icon color-${metric.iconColor}`}>
          {metric.icon}
        </span>
        <span className={`mg-metric-badge badge-${metric.badgeColor}`}>{metric.badge}</span>
      </div>
      <h4 className="mg-metric-label">{metric.label}</h4>
      <div className="mg-metric-value">
        <span className="val">{metric.value}</span>
        <span className="unit">{metric.unit}</span>
      </div>
      <div className="mg-metric-spark">
        <Sparkline data={metric.sparkData} color={metric.sparkColor} />
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
function MeterGraphs({ onNavigate }) {
  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="meter-page">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h2 className="page-title">Meter Graphs</h2>
            <nav className="breadcrumb">
              <span>Performance</span>
              <span>/</span>
              <span className="breadcrumb-active">Meter Analytics</span>
            </nav>
          </div>
          <div className="header-actions">
            <button className="btn-outline">
              <span className="material-symbols-outlined">print</span>
              Print
            </button>
            <button className="btn-primary">
              <span className="material-symbols-outlined">ios_share</span>
              Export Data
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Main Chart */}
        <EnergyChart />

        {/* Metrics Row */}
        <section className="metrics-row">
          {METRICS.map((m) => <MetricCard key={m.label} metric={m} />)}
        </section>

        {/* Atmosphere image */}
        <div className="mg-atmo-img" aria-hidden="true">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSATxSOyUix7te0pR2mgjG83GKhGlk6tL_rx6v7nXzyYcMrq_dbvs1LbwWDhTE4f1WcYJUnkOUdSA5ZPY2xXq8Dzq69O1Xf_igYHpVUm1zYejSLKFA2h3e4aTt2MpjiHtuYAKxRQIYoD_SEBk-4dgQArqv0oeA8g_uJYsT6gc2BoCPhn0je1-05R9QyCbMME-Sf4Kk6IrAzfXEZxVd4pyT1yw7ymAvT0IGLQ5fXrE1S9cZHQCS9hS5PPWqk41BAQgW_LrUI58q-GI"
            alt=""
          />
        </div>
      </div>
    </SidebarLayout>
  );
}

export default MeterGraphs;
