import SidebarLayout from "../../layouts/SidebarLayout/SidebarLayout";
import "./PlantInfo.scss";

const PLANT_DATA = {
  name: "Bhadla Solar Park — Unit II",
  capacity: "5.0 MW",
  type: "Grid-Connected Solar PV",
  location: "Bhadla, Rajasthan, India",
  coordinates: "27.5423° N, 71.9151° E",
  commissioned: "March 14, 2022",
  lastMaintenance: "April 28, 2024",
  owner: "Soledify Energy Pvt. Ltd.",
  operator: "Alex Rivers (Energy Manager)",
  gridUtility: "Rajasthan Rajya Vidyut Prasaran Nigam",
};

const EQUIPMENT = [
  {
    category: "Inverters",
    icon: "electrical_services",
    items: [
      { label: "Model",        value: "SMA Sunny Tripower CORE2" },
      { label: "Quantity",     value: "10 Units" },
      { label: "Rating",       value: "50 kW each" },
      { label: "Efficiency",   value: "98.4%" },
      { label: "Warranty",     value: "5 Years" },
    ],
  },
  {
    category: "Solar Modules",
    icon: "solar_power",
    items: [
      { label: "Model",        value: "Waaree WS-400" },
      { label: "Quantity",     value: "12,500 Panels" },
      { label: "Rating",       value: "400 Wp each" },
      { label: "Technology",   value: "Monocrystalline PERC" },
      { label: "Degradation",  value: "0.7% / year" },
    ],
  },
  {
    category: "SMD / SCADA",
    icon: "memory",
    items: [
      { label: "SMD Model",    value: "SolarEdge S440 Optimizer" },
      { label: "Strings",      value: "16 Active Strings" },
      { label: "Datalogger",   value: "Soledify DL-500" },
      { label: "Protocol",     value: "Modbus TCP / RS485" },
      { label: "Scan Rate",    value: "Every 5 seconds" },
    ],
  },
  {
    category: "Energy Meter",
    icon: "electric_meter",
    items: [
      { label: "Model",        value: "Secure Elite 440" },
      { label: "Type",         value: "Bidirectional (Net Metering)" },
      { label: "Accuracy",     value: "Class 0.5S" },
      { label: "Communication",value: "DLMS / COSEM" },
      { label: "CT Ratio",     value: "200/5 A" },
    ],
  },
];

const TIMELINE = [
  { date: "Mar 14, 2022", event: "Plant Commissioned",              icon: "rocket_launch",  color: "primary" },
  { date: "Sep 02, 2022", event: "First 1 GWh Milestone",          icon: "emoji_events",   color: "secondary" },
  { date: "Jan 15, 2023", event: "Soledify Datalogger Integrated",  icon: "devices",        color: "purple" },
  { date: "Apr 28, 2024", event: "Annual Preventive Maintenance",   icon: "build",          color: "orange" },
  { date: "May 15, 2024", event: "Live — Current Status",           icon: "bolt",           color: "secondary" },
];

function InfoRow({ label, value }) {
  return (
    <div className="pi-info-row">
      <span className="pi-info-label">{label}</span>
      <span className="pi-info-value">{value}</span>
    </div>
  );
}

function PlantInfo({ onNavigate }) {
  return (
    <SidebarLayout onNavigate={onNavigate}>
      <div className="plant-info-page">
        {/* Header */}
        <div className="pi-page-header">
          <div>
            <h2 className="page-title">Plant Information</h2>
            <nav className="breadcrumb">
              <span>Documentation</span><span>/</span>
              <span className="breadcrumb-active">Plant Info</span>
            </nav>
          </div>
          <button className="btn-outline">
            <span className="material-symbols-outlined">download</span>
            Export Info Sheet
          </button>
        </div>

        {/* Hero identity card */}
        <div className="pi-hero-card">
          <div className="pi-hero-left">
            <div className="pi-hero-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "36px", color: "white" }}
              >
                solar_power
              </span>
            </div>
            <div>
              <h3 className="pi-plant-name">{PLANT_DATA.name}</h3>
              <p className="pi-plant-type">{PLANT_DATA.type}</p>
              <div className="pi-plant-tags">
                <span className="pi-tag primary">{PLANT_DATA.capacity}</span>
                <span className="pi-tag secondary">Grid-Connected</span>
                <span className="pi-tag online">
                  <span className="pi-online-dot" />Live
                </span>
              </div>
            </div>
          </div>
          <div className="pi-hero-stats">
            {[
              { label: "Commissioned",     value: "Mar 2022" },
              { label: "Total Generation", value: "12.4 GWh" },
              { label: "Avg CUF",          value: "17.8%" },
              { label: "Plant Health",     value: "87 / 100" },
            ].map(({ label, value }) => (
              <div className="pi-hero-stat" key={label}>
                <div className="pi-stat-val">{value}</div>
                <div className="pi-stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Plant details + location */}
        <div className="pi-two-col">
          {/* Plant identity */}
          <div className="pi-card">
            <div className="pi-card-title">
              <span className="material-symbols-outlined">info</span>
              Plant Details
            </div>
            {Object.entries({
              "Plant Name":         PLANT_DATA.name,
              "Capacity":           PLANT_DATA.capacity,
              "Plant Type":         PLANT_DATA.type,
              "Location":           PLANT_DATA.location,
              "Coordinates":        PLANT_DATA.coordinates,
              "Grid Utility":       PLANT_DATA.gridUtility,
              "Owner":              PLANT_DATA.owner,
              "Operator":           PLANT_DATA.operator,
              "Commissioned":       PLANT_DATA.commissioned,
              "Last Maintenance":   PLANT_DATA.lastMaintenance,
            }).map(([label, value]) => (
              <InfoRow key={label} label={label} value={value} />
            ))}
          </div>

          {/* Timeline */}
          <div className="pi-card">
            <div className="pi-card-title">
              <span className="material-symbols-outlined">timeline</span>
              Plant Timeline
            </div>
            <div className="pi-timeline">
              {TIMELINE.map((t, i) => (
                <div className="pi-timeline-item" key={i}>
                  <div className={`pi-timeline-dot color-${t.color}`}>
                    <span className="material-symbols-outlined">{t.icon}</span>
                  </div>
                  <div className="pi-timeline-content">
                    <div className="pi-timeline-event">{t.event}</div>
                    <div className="pi-timeline-date">{t.date}</div>
                  </div>
                  {i < TIMELINE.length - 1 && <div className="pi-timeline-line" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equipment specs */}
        <div className="pi-section-title">Equipment Specifications</div>
        <div className="pi-equipment-grid">
          {EQUIPMENT.map((eq) => (
            <div className="pi-equip-card" key={eq.category}>
              <div className="pi-equip-header">
                <span className="material-symbols-outlined">{eq.icon}</span>
                {eq.category}
              </div>
              {eq.items.map(({ label, value }) => (
                <InfoRow key={label} label={label} value={value} />
              ))}
            </div>
          ))}
        </div>

        {/* Plant schematic */}
        <div className="pi-schematic-card" style={{ marginBottom: 48 }}>
          <div className="pi-card-title">
            <span className="material-symbols-outlined">account_tree</span>
            Plant Layout Schematic
          </div>
          <div className="pi-schematic">
            {/* SVG schematic diagram */}
            <svg viewBox="0 0 700 200" className="pi-schematic-svg">
              {/* Panels */}
              {[0,1,2,3].map((i) => (
                <g key={i} transform={`translate(${20 + i*90}, 20)`}>
                  <rect width="70" height="50" rx="6" fill="#e8f5e9" stroke="#006e2f" strokeWidth="1.5"/>
                  <text x="35" y="20" textAnchor="middle" fontSize="8" fill="#006e2f" fontWeight="700">PANEL</text>
                  <text x="35" y="34" textAnchor="middle" fontSize="8" fill="#006e2f">String {i+1}</text>
                  <text x="35" y="46" textAnchor="middle" fontSize="7" fill="#424754">400 Wp×50</text>
                  <line x1="35" y1="50" x2="35" y2="75" stroke="#006e2f" strokeWidth="1.5"/>
                </g>
              ))}
              {/* SMD box */}
              <rect x="60" y="90" width="240" height="36" rx="8" fill="#e3f2fd" stroke="#0058be" strokeWidth="1.5"/>
              <text x="180" y="108" textAnchor="middle" fontSize="10" fill="#0058be" fontWeight="700">SMD / String Combiner Box</text>
              <text x="180" y="120" textAnchor="middle" fontSize="8" fill="#424754">16 Strings · Modbus TCP</text>
              <line x1="180" y1="126" x2="180" y2="148" stroke="#0058be" strokeWidth="1.5"/>
              {/* Inverter */}
              <rect x="120" y="148" width="120" height="36" rx="8" fill="#ede7f6" stroke="#7c3aed" strokeWidth="1.5"/>
              <text x="180" y="166" textAnchor="middle" fontSize="10" fill="#7c3aed" fontWeight="700">Inverter Block</text>
              <text x="180" y="178" textAnchor="middle" fontSize="8" fill="#424754">10 × 50 kW</text>
              <line x1="240" y1="166" x2="320" y2="166" stroke="#7c3aed" strokeWidth="1.5"/>
              {/* Meter */}
              <rect x="320" y="148" width="100" height="36" rx="8" fill="#fff8e1" stroke="#f59e0b" strokeWidth="1.5"/>
              <text x="370" y="166" textAnchor="middle" fontSize="10" fill="#d97706" fontWeight="700">Energy Meter</text>
              <text x="370" y="178" textAnchor="middle" fontSize="8" fill="#424754">Net Metering</text>
              <line x1="420" y1="166" x2="500" y2="166" stroke="#f59e0b" strokeWidth="1.5"/>
              {/* Grid */}
              <rect x="500" y="148" width="80" height="36" rx="8" fill="#fce4ec" stroke="#b61722" strokeWidth="1.5"/>
              <text x="540" y="166" textAnchor="middle" fontSize="10" fill="#b61722" fontWeight="700">Grid</text>
              <text x="540" y="178" textAnchor="middle" fontSize="8" fill="#424754">33 kV Feeder</text>
              {/* Datalogger */}
              <rect x="580" y="20" width="100" height="50" rx="8" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5"/>
              <text x="630" y="42" textAnchor="middle" fontSize="9" fill="#a855f7" fontWeight="700">Soledify</text>
              <text x="630" y="54" textAnchor="middle" fontSize="9" fill="#a855f7" fontWeight="700">Datalogger</text>
              <text x="630" y="64" textAnchor="middle" fontSize="7" fill="#424754">Cloud · AI · SCADA</text>
              <line x1="630" y1="70" x2="630" y2="90" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,3"/>
              <line x1="630" y1="90" x2="420" y2="90" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,3"/>
              <line x1="420" y1="90" x2="420" y2="148" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,3"/>
            </svg>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default PlantInfo;
