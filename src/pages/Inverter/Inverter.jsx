import { useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./Inverter.scss";

const INVERTERS = [
  { id: "INV-01", status: "Online",  power: 48.2, temp: 42, load: 88, health: 94 },
  { id: "INV-02", status: "Online",  power: 45.7, temp: 44, load: 82, health: 91 },
  { id: "INV-03", status: "Warning", power: 31.2, temp: 58, load: 57, health: 63 },
  { id: "INV-04", status: "Online",  power: 47.8, temp: 41, load: 87, health: 96 },
  { id: "INV-05", status: "Online",  power: 49.1, temp: 39, load: 90, health: 98 },
  { id: "INV-06", status: "Fault",   power: 0,    temp: 71, load: 0,  health: 12 },
  { id: "INV-07", status: "Online",  power: 46.3, temp: 43, load: 84, health: 89 },
  { id: "INV-08", status: "Online",  power: 44.9, temp: 45, load: 81, health: 87 },
  { id: "INV-09", status: "Offline", power: 0,    temp: 28, load: 0,  health: 0  },
  { id: "INV-10", status: "Online",  power: 47.5, temp: 40, load: 86, health: 93 },
];

const STATUS_META = {
  Online:  { cls: "online",  icon: "check_circle" },
  Warning: { cls: "warning", icon: "warning" },
  Fault:   { cls: "fault",   icon: "error" },
  Offline: { cls: "offline", icon: "power_off" },
};

function HealthBar({ value }) {
  const color = value >= 80 ? "good" : value >= 50 ? "warn" : "bad";
  return (
    <div className="health-bar-track">
      <div className={`health-bar-fill ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function InverterCard({ inv, onSelect }) {
  const meta = STATUS_META[inv.status];
  return (
    <div className={`inv-card ${meta.cls}`} onClick={() => onSelect(inv)} tabIndex={0}>
      <div className="inv-card-top">
        <span className="inv-id">{inv.id}</span>
        <span className={`inv-status-badge ${meta.cls}`}>
          <span className="material-symbols-outlined">{meta.icon}</span>
          {inv.status}
        </span>
      </div>
      <div className="inv-power">{inv.power > 0 ? `${inv.power} kW` : "—"}</div>
      <div className="inv-metrics">
        <div className="inv-metric">
          <span className="material-symbols-outlined">thermostat</span>
          <span>{inv.temp}°C</span>
        </div>
        <div className="inv-metric">
          <span className="material-symbols-outlined">speed</span>
          <span>{inv.load}%</span>
        </div>
      </div>
      <div className="inv-health-row">
        <span className="inv-health-label">AI Health</span>
        <span className="inv-health-val">{inv.health}</span>
      </div>
      <HealthBar value={inv.health} />
    </div>
  );
}

function InverterDetail({ inv, onBack }) {
  return (
    <div className="inv-detail">
      <button className="inv-back-btn" onClick={onBack}>
        <span className="material-symbols-outlined">arrow_back</span>
        Back to Fleet
      </button>
      <div className="inv-detail-header">
        <div>
          <h2 className="inv-detail-title">{inv.id} — Detail View</h2>
          <p className="inv-detail-sub">Real-time monitoring &amp; AI analysis</p>
        </div>
        <span className={`inv-status-badge large ${STATUS_META[inv.status].cls}`}>
          <span className="material-symbols-outlined">{STATUS_META[inv.status].icon}</span>
          {inv.status}
        </span>
      </div>

      <div className="inv-detail-kpis">
        {[
          { label: "Power Output",    value: `${inv.power} kW`,  icon: "bolt" },
          { label: "Temperature",     value: `${inv.temp}°C`,    icon: "thermostat" },
          { label: "Load",            value: `${inv.load}%`,     icon: "speed" },
          { label: "AI Health Score", value: `${inv.health}/100`,icon: "psychology" },
        ].map(({ label, value, icon }) => (
          <div className="inv-kpi-card" key={label}>
            <span className="material-symbols-outlined inv-kpi-icon">{icon}</span>
            <div>
              <div className="inv-kpi-label">{label}</div>
              <div className="inv-kpi-value">{value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="inv-ai-card">
        <div className="inv-ai-header">
          <span className="material-symbols-outlined">psychology</span>
          AI Diagnostics
        </div>
        <div className="inv-ai-rows">
          <div className="inv-ai-row">
            <span>Failure Risk</span>
            <span className={`ai-badge ${inv.health >= 80 ? "low" : inv.health >= 50 ? "medium" : "high"}`}>
              {inv.health >= 80 ? "Low" : inv.health >= 50 ? "Medium" : "High"}
            </span>
          </div>
          <div className="inv-ai-row">
            <span>Anomaly Detection</span>
            <span className={`ai-badge ${inv.status === "Online" ? "low" : "high"}`}>
              {inv.status === "Online" ? "No Anomaly" : "Detected"}
            </span>
          </div>
          <div className="inv-ai-insight">
            {inv.health >= 80
              ? `${inv.id} operating at ${inv.health}% health. No critical issues detected.`
              : `${inv.id} shows degraded performance. Thermal rise detected at ${inv.temp}°C — inspection recommended.`}
          </div>
        </div>
      </div>

      <div className="inv-data-table">
        <h3 className="inv-table-title">Live Readings</h3>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Value</th><th>Unit</th><th>Status</th></tr>
          </thead>
          <tbody>
            {[
              { param: "Voltage (L1)", value: "232.4",       unit: "V",   ok: true },
              { param: "Current",      value: "87.3",        unit: "A",   ok: true },
              { param: "Frequency",    value: "50.01",       unit: "Hz",  ok: true },
              { param: "Power Factor", value: "0.98",        unit: "—",   ok: true },
              { param: "Energy Today", value: "312.4",       unit: "kWh", ok: true },
              { param: "Temperature",  value: `${inv.temp}`, unit: "°C",  ok: inv.temp < 60 },
            ].map(({ param, value, unit, ok }) => (
              <tr key={param}>
                <td>{param}</td>
                <td><strong>{value}</strong></td>
                <td className="unit-cell">{unit}</td>
                <td><span className={`table-status ${ok ? "ok" : "warn"}`}>{ok ? "Normal" : "High"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Inverter({ onNavigate }) {
  const [selected, setSelected] = useState(null);
  const online = INVERTERS.filter((i) => i.status === "Online").length;
  const faults = INVERTERS.filter((i) => i.status === "Fault" || i.status === "Warning").length;
  const totalPower = INVERTERS.reduce((s, i) => s + i.power, 0).toFixed(1);

  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="inverter-page">
        {selected ? (
          <InverterDetail inv={selected} onBack={() => setSelected(null)} />
        ) : (
          <>
            <div className="page-header">
              <div>
                <h2 className="page-title">Inverter Fleet</h2>
                <nav className="breadcrumb">
                  <span>Monitoring</span><span>/</span>
                  <span className="breadcrumb-active">Inverter Overview</span>
                </nav>
              </div>
              <div className="inv-fleet-summary">
                <div className="fleet-stat online">
                  <span className="material-symbols-outlined">check_circle</span>{online} Online
                </div>
                <div className="fleet-stat fault">
                  <span className="material-symbols-outlined">error</span>{faults} Faults
                </div>
                <div className="fleet-stat">
                  <span className="material-symbols-outlined">bolt</span>{totalPower} kW Total
                </div>
              </div>
            </div>
            <div className="inv-grid">
              {INVERTERS.map((inv) => (
                <InverterCard key={inv.id} inv={inv} onSelect={setSelected} />
              ))}
            </div>
          </>
        )}
      </div>
    </SidebarLayout>
  );
}

export default Inverter;
