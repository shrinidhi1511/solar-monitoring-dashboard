import "./PlantInfoCard.scss";

function PlantInfoCard() {
  return (
    <div className="plant-info-card">
      <div className="card-image-header">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm6aoKJ6i9_sILxrQXg5mctcSGRcej3prXfgf9mwOGEIVjrYgZis9x4jESMVv1cB7kos3usjOcZ4tzPcLKZ3gfwZAiqdmmrt-HkHHcaT8j73NQSnQZmJfIKLcheuZEeCMKmoxiT3RuceuvTrGC7bf5ldwI5Iv9nSWmIwD2FHYuArJdClBT-u-BV2gcB4k70qdol-SsB8V5P3VWmOLOjp4xXJfHObXJb_u3yUtHjp2N4-N2pYfHLv1BjXzLWk2rwBjnS5aCkZXPAwQ" 
          alt="Highlighted Plant Info" 
          className="plant-img"
        />
        <div className="image-overlay">
          <span className="overlay-title">Highlighted Plant Info</span>
        </div>
      </div>

      <div className="card-content">
        <div className="info-grid">
          <div className="info-item">
            <span className="label">DC Capacity</span>
            <p className="value">500 <span className="unit">kwp</span></p>
          </div>
          <div className="info-item">
            <span className="label">AC Capacity</span>
            <p className="value">450 <span className="unit">kw</span></p>
          </div>
          <div className="info-item">
            <span className="label">Start Time</span>
            <p className="value">06:00 <span className="unit">AM</span></p>
          </div>
          <div className="info-item">
            <span className="label">End Time</span>
            <p className="value">06:30 <span className="unit">PM</span></p>
          </div>
        </div>

        <div className="efficiency-section">
          <div className="efficiency-header">
            <span className="label">Efficiency Index</span>
            <span className="value">92%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: "92%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantInfoCard;
