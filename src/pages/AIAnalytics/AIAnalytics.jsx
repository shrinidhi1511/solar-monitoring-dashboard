import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./AIAnalytics.scss";

const REPORTS = [
  { icon:"description",    title:"Daily Plant Report",          sub:"Today — May 15, 2024",     size:"2.4 MB",  color:"primary"   },
  { icon:"bar_chart",      title:"Monthly Performance Report",  sub:"April 2024",               size:"5.1 MB",  color:"secondary" },
  { icon:"calendar_month", title:"Yearly Generation Report",    sub:"FY 2023–24",               size:"8.7 MB",  color:"purple"    },
  { icon:"report_problem", title:"Fault & Failure Report",      sub:"Last 30 days",             size:"1.9 MB",  color:"fault"     },
  { icon:"psychology",     title:"AI Health Report",            sub:"AI-generated insights",    size:"3.2 MB",  color:"ai"        },
];

const ANOMALIES = [
  { time:"15 May 14:32", device:"INV-03", severity:"Warning", message:"Thermal rise detected — temp 58°C" },
  { time:"15 May 11:10", device:"STR-04", severity:"Fault",   message:"String current dropped to 0 A" },
  { time:"14 May 16:45", device:"INV-06", severity:"Fault",   message:"Communication timeout — device offline" },
  { time:"14 May 09:20", device:"STR-08", severity:"Warning", message:"Current 18% below string average" },
  { time:"13 May 13:00", device:"METER",  severity:"Info",    message:"High grid import 6–9 PM pattern detected" },
];

const SCORE_ITEMS = [
  { label:"Plant Performance Score", value:87,  max:100, color:"primary" },
  { label:"AI Confidence Level",     value:92,  max:100, color:"purple"  },
  { label:"Device Health Average",   value:79,  max:100, color:"secondary" },
  { label:"Efficiency Rating",       value:84,  max:100, color:"primary"  },
];

function ScoreBar({ item }) {
  return (
    <div className="score-item">
      <div className="score-row">
        <span className="score-label">{item.label}</span>
        <span className="score-val">{item.value}%</span>
      </div>
      <div className="score-track">
        <div className={`score-fill color-${item.color}`} style={{ width: `${item.value}%` }} />
      </div>
    </div>
  );
}

function AIAnalytics({ onNavigate }) {
  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="ai-page">
        <div className="page-header">
          <div>
            <h2 className="page-title">AI Analytics &amp; Reports</h2>
            <nav className="breadcrumb">
              <span>Intelligence</span><span>/</span>
              <span className="breadcrumb-active">AI Reports</span>
            </nav>
          </div>
        </div>

        {/* Score summary */}
        <div className="ai-score-card">
          <div className="ai-score-header">
            <span className="material-symbols-outlined">psychology</span>
            Plant Intelligence Summary
          </div>
          <div className="ai-score-grid">
            {SCORE_ITEMS.map((s) => <ScoreBar key={s.label} item={s} />)}
          </div>
          <div className="ai-prediction-box">
            <span className="material-symbols-outlined">auto_awesome</span>
            <div>
              <div className="pred-title">AI Prediction — Today</div>
              <div className="pred-value">Predicted Generation: 4.2 MWh &nbsp;·&nbsp; Peak at 1:15 PM &nbsp;·&nbsp; CUF: 17.8%</div>
            </div>
          </div>
        </div>

        {/* Downloadable reports */}
        <div className="ai-section-title">Downloadable Reports</div>
        <div className="ai-reports-grid">
          {REPORTS.map((r) => (
            <div className={`ai-report-card color-${r.color}`} key={r.title}>
              <span className="material-symbols-outlined ai-report-icon">{r.icon}</span>
              <div className="ai-report-info">
                <div className="ai-report-title">{r.title}</div>
                <div className="ai-report-sub">{r.sub}</div>
                <div className="ai-report-size">{r.size}</div>
              </div>
              <button className="ai-dl-btn">
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          ))}
        </div>

        {/* Anomaly log */}
        <div className="ai-section-title">Anomaly Log</div>
        <div className="ai-anomaly-table">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Device</th>
                <th>Severity</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {ANOMALIES.map((a, i) => (
                <tr key={i}>
                  <td className="mono">{a.time}</td>
                  <td><strong>{a.device}</strong></td>
                  <td>
                    <span className={`sev-badge sev-${a.severity.toLowerCase()}`}>{a.severity}</span>
                  </td>
                  <td>{a.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommendations */}
        <div className="ai-section-title">AI Recommendations</div>
        <div className="ai-recs" style={{ marginBottom: 48 }}>
          {[
            { icon:"build",         text:"Schedule preventive maintenance for INV-03 within next 5 days to address thermal pattern.",     priority:"High"   },
            { icon:"cable",         text:"Inspect STR-04 wiring — immediate string disconnection likely. Manual check required.",          priority:"High"   },
            { icon:"wb_sunny",      text:"Clean panels on Row 3 — soiling detected via yield gap analysis vs Row 1.",                     priority:"Medium" },
            { icon:"bar_chart",     text:"CUF is 3% below target for this week. Review shading analysis and inverter efficiency logs.",   priority:"Medium" },
            { icon:"check_circle",  text:"Grid interaction pattern is normal. No demand-response action needed this week.",               priority:"Info"   },
          ].map(({ icon, text, priority }, i) => (
            <div key={i} className={`ai-rec prio-${priority.toLowerCase()}`}>
              <span className="material-symbols-outlined">{icon}</span>
              <div className="rec-text">{text}</div>
              <span className={`rec-badge prio-${priority.toLowerCase()}`}>{priority}</span>
            </div>
          ))}
        </div>
      </div>
    </SidebarLayout>
  );
}

export default AIAnalytics;
