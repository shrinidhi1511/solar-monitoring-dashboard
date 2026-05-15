import "./powerChart.scss";

function PowerChart() {
  return (
    <div className="power-chart-card">
      <div className="chart-header">
        <h2>Daily Power Curve</h2>
      </div>
      
      <div className="chart-container">
        <div className="y-axis">
          <span>150</span>
          <span>130</span>
          <span>90</span>
          <span>50</span>
          <span>0</span>
        </div>

        <div className="chart-area">
          <svg className="chart-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="chartFill" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#4a69bd" stopOpacity="0.3"></stop>
                <stop offset="100%" stopColor="#4a69bd" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M0,90 Q10,85 20,70 Q35,50 50,15 Q65,30 80,75 Q90,88 100,92 L100,100 L0,100 Z" fill="url(#chartFill)"></path>
            <path d="M0,90 Q10,85 20,70 Q35,50 50,15 Q65,30 80,75 Q90,88 100,92" fill="none" stroke="#4a69bd" strokeWidth="2"></path>
            <circle cx="0" cy="90" fill="#4a69bd" r="1.5"></circle>
            <circle cx="20" cy="70" fill="#4a69bd" r="1.5"></circle>
            <circle cx="50" cy="15" fill="#4a69bd" r="1.5"></circle>
            <circle cx="80" cy="75" fill="#4a69bd" r="1.5"></circle>
            <circle cx="100" cy="92" fill="#4a69bd" r="1.5"></circle>
          </svg>

          <div className="x-axis">
            <span>6 AM</span>
            <span>12 PM</span>
            <span>2 PM</span>
            <span>4 PM</span>
            <span>6 PM</span>
          </div>
        </div>

        <div className="chart-unit">Power (kW)</div>
      </div>
    </div>
  );
}

export default PowerChart;