import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import KpiCards from "../../components/KpiCards/KpiCards";
import PowerChart from "../../components/PowerChart/PowerChart";
import PlantInfoCard from "../../components/PlantInfoCard/PlantInfoCard";
import WeeklyChart from "../../components/WeeklyChart/WeeklyChart";
import { PerformanceSavings, EnvironmentalInfo } from "../../components/StatsCards/StatsCards";
import { SourceDataTable, PlantStatusTable } from "../../components/Tables/Tables";

import "./dashboard.scss";

function Dashboard({ onNavigate }) {
  return (
    <DashboardLayout onNavigate={onNavigate} currentPage="dashboard">
      {/* KPI Cards Row */}
      <KpiCards />

      {/* Middle Section */}
      <div className="dashboard-grid middle-section">
        <div className="col-span-2">
          <PowerChart />
        </div>
        <div className="col-span-1">
          <PlantInfoCard />
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="dashboard-grid bottom-section">
        <div className="col-span-6">
          <WeeklyChart />
        </div>
        <div className="col-span-3">
          <PerformanceSavings />
        </div>
        <div className="col-span-3">
          <EnvironmentalInfo />
        </div>
      </div>

      {/* Data Tables Row */}
      <div className="dashboard-grid tables-section pb-12">
        <div className="col-span-8">
          <SourceDataTable />
        </div>
        <div className="col-span-4">
          <PlantStatusTable />
        </div>
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;