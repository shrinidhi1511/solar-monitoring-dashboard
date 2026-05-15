// src/components/DataTables/DataTables.jsx

const sourceRows = [
  { export: "150,000 kWh", pf: "0.98", activePower: "130.5 kW", apparentPower: "140.2 kVA", freq: "50.0 Hz" },
  { export: "150,000 kWh", pf: "0.98", activePower: "130.5 kW", apparentPower: "140.2 kVA", freq: "50.0 Hz" },
];

const plantStatus = [
  { name: "Main Plant",  inverters: "4 Inverters", status: "Running",     statusClass: "bg-secondary text-white" },
  { name: "North Plant", inverters: "2 Inverters", status: "Fault",       statusClass: "bg-tertiary text-white" },
  { name: "East Plant",  inverters: "1 Inverter",  status: "Maintenance", statusClass: "bg-yellow-400 text-on-surface" },
];

// ─── Source Data Table ──────────────────────────────────────────────────────
const SourceDataTable = () => (
  <div className="lg:col-span-8 bg-white rounded-lg border border-outline shadow-sm overflow-hidden">
    {/* Header */}
    <div className="px-6 py-4 border-b border-outline flex items-center gap-4">
      <h3 className="text-sm font-bold text-on-surface">Source Data</h3>
      <div className="relative">
        <select className="pl-3 pr-8 py-1 bg-[#f8f9fa] border border-outline rounded text-xs font-bold appearance-none">
          <option>Grid Meter</option>
        </select>
        <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-xs">
          expand_more
        </span>
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#f8f9fa] text-on-surface-variant">
            <th className="px-6 py-3 font-medium">Total Export</th>
            <th className="px-6 py-3 font-medium">PF</th>
            <th className="px-6 py-3 font-medium">Active Power (kW)</th>
            <th className="px-6 py-3 font-medium text-center">Apparent Power (kVA)</th>
            <th className="px-6 py-3 font-medium text-right">Frequency</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline/50 font-medium text-on-surface">
          {sourceRows.map((row, i) => (
            <tr key={i} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">{row.export}</td>
              <td className="px-6 py-4">{row.pf}</td>
              <td className="px-6 py-4">{row.activePower}</td>
              <td className="px-6 py-4 text-center">{row.apparentPower}</td>
              <td className="px-6 py-4 text-right">{row.freq}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Plant Status Table ──────────────────────────────────────────────────────
const PlantStatusTable = () => (
  <div className="lg:col-span-4 bg-white rounded-lg border border-outline shadow-sm overflow-hidden">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="bg-[#f8f9fa] text-on-surface-variant">
          <th className="px-6 py-4 font-medium">Plant Status</th>
          <th className="px-6 py-4 font-medium">Inverters</th>
          <th className="px-6 py-4 font-medium">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-outline/50 font-semibold">
        {plantStatus.map((plant, i) => (
          <tr key={i}>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  domain
                </span>
                <span>{plant.name}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-on-surface-variant font-normal">{plant.inverters}</td>
            <td className="px-6 py-4">
              <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${plant.statusClass}`}>
                {plant.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ─── Combined DataTables ──────────────────────────────────────────────────────
const DataTables = () => (
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
    <SourceDataTable />
    <PlantStatusTable />
  </div>
);

export default DataTables;