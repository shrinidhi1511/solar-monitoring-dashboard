import "./KpiCards.scss";

const cards = [
  {
    title: "Last Log Time",
    value: "Today, 10:45 AM",
    unit: "",
    theme: "blue",
    stroke: "#4a69bd",
    path: "M0,20 Q25,5 50,15 T100,5",
  },
  {
    title: "Solar Power",
    value: "125.6",
    unit: "kW",
    theme: "blue",
    stroke: "#4a69bd",
    path: "M0,20 Q25,10 50,18 T100,10",
  },
  {
    title: "Day Generation",
    value: "780.4",
    unit: "kWh",
    theme: "yellow",
    stroke: "#f1c40f",
    path: "M0,20 Q25,15 50,5 T100,15",
  },
  {
    title: "Yesterday Generation",
    value: "850.7",
    unit: "kWh",
    theme: "red",
    stroke: "#e84118",
    path: "M0,20 Q25,5 50,15 T100,5",
  },
  {
    title: "Month Generation",
    value: "18,250",
    unit: "kWh",
    theme: "green",
    stroke: "#44bd32",
    path: "M0,20 Q25,10 50,18 T100,10",
  },
  {
    title: "Total Generation",
    value: "225,600",
    unit: "kWh",
    theme: "green",
    stroke: "#44bd32",
    path: "M0,20 Q25,5 50,15 T100,5",
    trend: { value: "21.5%", isUp: true },
    isFilled: true
  },
];

function KpiCards() {
  return (
    <div className="kpi-cards">
      {cards.map((card, index) => (
        <div className={`kpi-card theme-${card.theme}`} key={index}>
          <span className="card-title">{card.title}</span>
          
          <div className="card-value-wrapper">
            <span className="card-value">{card.value}</span>
            {card.unit && <span className="card-unit">{card.unit}</span>}
          </div>

          {card.trend && (
            <div className="card-trend">
              <span className="material-symbols-outlined icon">
                {card.trend.isUp ? "arrow_drop_up" : "arrow_drop_down"}
              </span> 
              {card.trend.value}
            </div>
          )}

          <div className="card-chart">
            <svg viewBox="0 0 100 20" preserveAspectRatio={card.isFilled ? "none" : "xMidYMid meet"}>
              <path 
                d={card.path} 
                fill="none" 
                stroke={card.stroke} 
                strokeWidth="2" 
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default KpiCards;