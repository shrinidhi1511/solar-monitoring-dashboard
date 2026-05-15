import "./StatsCards.scss";

export function PerformanceSavings() {
  return (
    <div className="stats-card">
      <h3>Performance / Savings</h3>
      <div className="stats-list">
        <div className="stat-item">
          <span className="stat-label">CUF</span>
          <span className="stat-value">21.5%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">CO<sub>2</sub> Saved</span>
          <span className="stat-value">1,250 <span className="stat-unit">kg</span></span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Savings</span>
          <span className="stat-value">₹ 15,800</span>
        </div>
      </div>
    </div>
  );
}

export function EnvironmentalInfo() {
  return (
    <div className="stats-card">
      <h3>Environmental Info</h3>
      <div className="stats-list">
        <div className="progress-stat">
          <div className="stat-header">
            <span className="stat-label">Temperature</span>
            <span className="stat-value">32°C</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill primary" style={{ width: "75%" }}></div>
          </div>
        </div>
        <div className="progress-stat">
          <div className="stat-header">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">65%</span>
          </div>
          <div className="progress-bg">
            <div className="progress-fill secondary" style={{ width: "65%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
