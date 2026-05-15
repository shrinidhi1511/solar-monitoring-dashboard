import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./SMD.scss";

const STRINGS = Array.from({ length: 16 }, (_, i) => {
  const id = `STR-${String(i + 1).padStart(2, "0")}`;
  const statuses = i === 3 ? "Fault" : i === 7 ? "Low" : i === 11 ? "Low" : "Normal";
  const current = statuses === "Fault" ? 0 : statuses === "Low" ? (10 + Math.random() * 4).toFixed(1) : (14 + Math.random() * 3).toFixed(1);
  const voltage = statuses === "Fault" ? 0 : (560 + Math.random() * 40).toFixed(0);
  return { id, status: statuses, current: parseFloat(current), voltage: parseFloat(voltage) };
});

const STATUS_CFG = {
  Normal: { cls: "normal", icon: "check_circle",  label: "Normal" },
  Low:    { cls: "low",    icon: "warning",         label: "Underperform" },
  Fault:  { cls: "fault",  icon: "error",           label: "Fault" },
};

function StringCard({ s }) {
  const cfg = STATUS_CFG[s.status];
  const pct = s.status === "Fault" ? 0 : Math.round((s.current / 17) * 100);
  return (
    <div className={`smd-card ${cfg.cls}`}>
      <div className="smd-card-top">
        <span className="smd-id">{s.id}</span>
        <span className={`smd-badge ${cfg.cls}`}>
          <span className="material-symbols-outlined">{cfg.icon}</span>
          {cfg.label}
        </span>
      </div>
      <div className="smd-readings">
        <div className="smd-reading">
          <span className="smd-read-label">Current</span>
          <span className="smd-read-val">{s.current > 0 ? `${s.current} A` : "—"}</span>
        </div>
        <div className="smd-reading">
          <span className="smd-read-label">Voltage</span>
          <span className="smd-read-val">{s.voltage > 0 ? `${s.voltage} V` : "—"}</span>
        </div>
      </div>
      <div className="smd-bar-wrap">
        <div className="smd-bar-track">
          <div className={`smd-bar-fill ${cfg.cls}`} style={{ width: `${pct}%` }} />
        </div>
        <span className="smd-bar-pct">{pct}%</span>
      </div>
    </div>
  );
}

function SMD({ onNavigate }) {
  const faults = STRINGS.filter((s) => s.status === "Fault").length;
  const low    = STRINGS.filter((s) => s.status === "Low").length;
  const normal = STRINGS.filter((s) => s.status === "Normal").length;

  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="smd-page">
        <div className="page-header">
          <div>
            <h2 className="page-title">SMD String Monitor</h2>
            <nav className="breadcrumb">
              <span>Monitoring</span><span>/</span>
              <span className="breadcrumb-active">String Dashboard</span>
            </nav>
          </div>
          <div className="smd-fleet-row">
            <div className="fleet-chip normal"><span className="material-symbols-outlined">check_circle</span>{normal} Normal</div>
            <div className="fleet-chip low"><span className="material-symbols-outlined">warning</span>{low} Underperform</div>
            <div className="fleet-chip fault"><span className="material-symbols-outlined">error</span>{faults} Fault</div>
          </div>
        </div>

        {/* AI insights */}
        <div className="smd-ai-card">
          <div className="smd-ai-title">
            <span className="material-symbols-outlined">psychology</span>
            AI String Analysis
          </div>
          <div className="smd-ai-insights">
            <div className="smd-insight fault">
              <span className="material-symbols-outlined">error</span>
              STR-04 current is 0 A — possible string disconnection or MPPT fault. Inspect immediately.
            </div>
            <div className="smd-insight low">
              <span className="material-symbols-outlined">warning</span>
              STR-08 &amp; STR-12 current 18% below average — possible panel shading or degradation detected.
            </div>
            <div className="smd-insight normal">
              <span className="material-symbols-outlined">check_circle</span>
              Remaining 13 strings operating within normal parameters. No action needed.
            </div>
          </div>
        </div>

        <div className="smd-grid">
          {STRINGS.map((s) => <StringCard key={s.id} s={s} />)}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default SMD;
