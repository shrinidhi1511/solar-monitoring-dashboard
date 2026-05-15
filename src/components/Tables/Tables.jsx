import "./tables.scss";

export function SourceDataTable() {
  return (
    <div className="data-table-card">
      <div className="table-header">
        <h3>Source Data</h3>
        <div className="select-wrapper">
          <select className="meter-select">
            <option>Grid Meter</option>
          </select>
          <span className="material-symbols-outlined icon">expand_more</span>
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Total Export</th>
              <th>PF</th>
              <th>Active Power (kw)</th>
              <th className="text-center">Apparent Power (kVA)</th>
              <th className="text-right">Frequency</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>150,000 <span className="unit">kWh</span></td>
              <td>0.98</td>
              <td>130.5 <span className="unit">kW</span></td>
              <td className="text-center">140.2 <span className="unit">kVA</span></td>
              <td className="text-right">50.0 <span className="unit">Hz</span></td>
            </tr>
            <tr>
              <td>150,000 <span className="unit">kWh</span></td>
              <td>0.98</td>
              <td>130.5 <span className="unit">kW</span></td>
              <td className="text-center">140.2 <span className="unit">kVA</span></td>
              <td className="text-right">50.0 <span className="unit">Hz</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PlantStatusTable() {
  return (
    <div className="data-table-card">
      <div className="table-wrapper full-height">
        <table>
          <thead>
            <tr>
              <th>Plant Status</th>
              <th>Inverters</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="plant-name">
                  <span className="material-symbols-outlined primary-icon">domain</span>
                  <span>Main Plant</span>
                </div>
              </td>
              <td className="dim-text">4 Inverters</td>
              <td>
                <span className="status-badge running">Running</span>
              </td>
            </tr>
            <tr>
              <td>
                <div className="plant-name">
                  <span className="material-symbols-outlined primary-icon">domain</span>
                  <span>North Plant</span>
                </div>
              </td>
              <td className="dim-text">2 Inverters</td>
              <td>
                <span className="status-badge fault">Fault</span>
              </td>
            </tr>
            <tr>
              <td>
                <div className="plant-name">
                  <span className="material-symbols-outlined primary-icon">domain</span>
                  <span>East Plant</span>
                </div>
              </td>
              <td className="dim-text">1 Inverters</td>
              <td>
                <span className="status-badge maintenance">Maintenance</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}