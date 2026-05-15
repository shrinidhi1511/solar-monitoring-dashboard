import { useState } from "react";
import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./Plant.scss";

const DAILY_DATA   = [420, 610, 780, 860, 940, 820, 750, 890, 960, 880, 720, 650];
const WEEKLY_DATA  = [4200, 5100, 4800, 5400, 4900, 5600, 5200];
const MONTHLY_DATA = [38000, 42000, 45000, 39000, 52000, 48000];
const CUF_DATA     = [16.2, 17.1, 15.8, 18.4, 17.9, 18.1, 16.5, 17.8];
const LABELS_D     = ["6AM","7AM","8AM","9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];
const LABELS_W     = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const LABELS_M     = ["JAN","FEB","MAR","APR","MAY","JUN"];
const LABELS_CUF   = ["W1","W2","W3","W4","W5","W6","W7","W8"];

const AI_CARDS = [
  { icon:"psychology",    label:"Predicted Monthly", value:"52.4 MWh", sub:"Based on irradiance forecast", color:"purple"    },
  { icon:"trending_down", label:"Performance Loss",  value:"-4.2%",    sub:"vs baseline expected",         color:"orange"    },
  { icon:"schedule",      label:"Peak Time (AI)",    value:"1:15 PM",  sub:"Average daily peak",           color:"primary"   },
  { icon:"savings",       label:"Total Savings",     value:"3.84 L",   sub:"This month (cost avoided)",    color:"secondary" },
];

function BarChart({ data, labels, color = "#0058be" }) {
  const W = 600; const H = 160;
  const max = Math.max(...data);
  const barW = Math.floor((W - 60) / data.length) - 6;
  return (
    <svg className="plant-chart-svg" viewBox={`0 0 ${W} ${H + 28}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`pg${color.replace(/[^a-z0-9]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.95"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.35"/>
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75,1].map((p,i) => (
        <line key={i} x1="0" y1={H*(1-p)} x2={W} y2={H*(1-p)}
          stroke="rgba(200,210,220,0.4)" strokeWidth="1" strokeDasharray="4,4"/>
      ))}
      {data.map((v,i) => {
        const bh = (v/max)*H;
        const x = 30 + i*(barW+6);
        return (
          <g key={i}>
            <rect x={x} y={H-bh} width={barW} height={bh} rx="4"
              fill={`url(#pg${color.replace(/[^a-z0-9]/gi,"")})`}/>
            <text x={x+barW/2} y={H+20} textAnchor="middle" fontSize="10" fill="#727785" fontWeight="600">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LineChart({ data, labels, target = 18.5 }) {
  const W = 600; const H = 140;
  const min = Math.min(...data) - 1;
  const max = Math.max(...data, target) + 1;
  const range = max - min;
  const pts = data.map((v,i) => {
    const x = 30 + i*((W-60)/(data.length-1));
    const y = H - ((v-min)/range)*H;
    return `${x},${y}`;
  }).join(" ");
  const targetY = H - ((target-min)/range)*H;
  return (
    <svg className="plant-chart-svg" viewBox={`0 0 ${W} ${H+28}`} preserveAspectRatio="none">
      <line x1="0" y1={targetY} x2={W} y2={targetY} stroke="#a855f7" strokeWidth="1.5" strokeDasharray="6,4"/>
      <text x={W-4} y={targetY-5} fontSize="9" fill="#a855f7" textAnchor="end" fontWeight="700">TARGET {target}%</text>
      <polyline points={pts} fill="none" stroke="#0058be" strokeWidth="2.5" strokeLinejoin="round"/>
      {data.map((v,i) => {
        const x = 30 + i*((W-60)/(data.length-1));
        const y = H - ((v-min)/range)*H;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" fill="white" stroke="#0058be" strokeWidth="2.5"/>
            <text x={x} y={H+20} textAnchor="middle" fontSize="10" fill="#727785" fontWeight="600">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Plant({ onNavigate }) {
  const [span, setSpan] = useState("Daily");
  const chartData   = span==="Daily"?DAILY_DATA  :span==="Weekly"?WEEKLY_DATA  :MONTHLY_DATA;
  const chartLabels = span==="Daily"?LABELS_D    :span==="Weekly"?LABELS_W     :LABELS_M;
  const chartColor  = span==="Daily"?"#0058be"   :span==="Weekly"?"#006e2f"    :"#a855f7";

  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="plant-page">
        <div className="page-header">
          <div>
            <h2 className="page-title">Plant Analytics</h2>
            <nav className="breadcrumb">
              <span>Monitoring</span><span>/</span>
              <span className="breadcrumb-active">Plant Performance</span>
            </nav>
          </div>
          <button className="btn-outline">
            <span className="material-symbols-outlined">download</span>Plant Report
          </button>
        </div>

        {/* AI cards */}
        <div className="plant-ai-grid">
          {AI_CARDS.map((c) => (
            <div key={c.label} className={`plant-ai-card color-${c.color}`}>
              <span className="material-symbols-outlined plant-ai-icon">{c.icon}</span>
              <div className="plant-ai-label">{c.label}</div>
              <div className="plant-ai-value">{c.value}</div>
              <div className="plant-ai-sub">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Generation chart */}
        <div className="plant-chart-card">
          <div className="plant-chart-header">
            <div>
              <h3 className="plant-chart-title">Generation Trend</h3>
              <p className="plant-chart-sub">Energy output across selected period</p>
            </div>
            <div className="plant-span-toggle">
              {["Daily","Weekly","Monthly"].map((s) => (
                <button key={s} className={`span-btn ${span===s?"active":""}`} onClick={()=>setSpan(s)}>{s}</button>
              ))}
            </div>
          </div>
          <BarChart data={chartData} labels={chartLabels} color={chartColor}/>
        </div>

        {/* CUF trend */}
        <div className="plant-chart-card">
          <div className="plant-chart-header">
            <div>
              <h3 className="plant-chart-title">CUF Trend</h3>
              <p className="plant-chart-sub">Capacity Utilization Factor — weekly vs 18.5% target</p>
            </div>
            <div className="cuf-legend">
              <span className="leg-dot primary"/>Actual
              <span className="leg-dot purple"/>Target
            </div>
          </div>
          <LineChart data={CUF_DATA} labels={LABELS_CUF} target={18.5}/>
        </div>

        {/* Cost analysis */}
        <div className="plant-cost-section">
          <h3 className="plant-section-title">Cost &amp; Savings Analysis</h3>
          <div className="plant-cost-grid">
            {[
              { icon:"currency_rupee", label:"Total Cost Savings",   value:"3,84,200",  unit:"INR",  color:"secondary" },
              { icon:"power_off",      label:"Grid Energy Avoided",  value:"48.4",      unit:"MWh",  color:"primary" },
              { icon:"eco",            label:"CO\u2082 Avoided",     value:"38.7",      unit:"tons", color:"secondary" },
              { icon:"trending_up",    label:"ROI Progress",         value:"67",        unit:"%",    color:"purple" },
            ].map(({ icon, label, value, unit, color }) => (
              <div className={`plant-cost-card color-${color}`} key={label}>
                <span className="material-symbols-outlined">{icon}</span>
                <div className="cost-label">{label}</div>
                <div className="cost-value">{value} <span className="cost-unit">{unit}</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Expected vs Actual */}
        <div className="plant-chart-card" style={{ marginBottom: 48 }}>
          <div className="plant-chart-header">
            <div>
              <h3 className="plant-chart-title">Expected vs Actual Generation</h3>
              <p className="plant-chart-sub">AI baseline vs measured output</p>
            </div>
            <div className="plant-deviation-badge">
              <span className="material-symbols-outlined">trending_down</span> -4.2% vs Baseline
            </div>
          </div>
          <BarChart data={[42000,47000,44000,51000,48000,53000]} labels={["JAN","FEB","MAR","APR","MAY","JUN"]} color="#006e2f"/>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default Plant;
