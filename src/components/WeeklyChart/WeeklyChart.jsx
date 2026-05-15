import "./weeklyChart.scss";

function WeeklyChart() {
  const bars = [
    { height: "40%" },
    { height: "38%" },
    { height: "42%" },
    { height: "48%" },
    { height: "70%" },
    { height: "72%" },
    { height: "85%" },
    { height: "70%" }
  ];
  
  const days = ["Mon", "Tue", "Wed", "Thu", "Wed", "Thu", "Fri", "Sun"];

  return (
    <div className="weekly-chart-card">
      <h3>Weekly Energy Generation</h3>
      
      <div className="chart-wrapper">
        <div className="grid-lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <div className="bars-container">
          {bars.map((bar, index) => (
            <div 
              key={index} 
              className="bar" 
              style={{ height: bar.height }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="x-axis">
        {days.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
    </div>
  );
}

export default WeeklyChart;