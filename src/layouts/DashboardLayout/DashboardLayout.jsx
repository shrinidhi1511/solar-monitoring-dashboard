import Topbar from "../../components/Topbar/Topbar";
import "./DashboardLayout.scss";

function DashboardLayout({ children, onNavigate, currentPage }) {
  return (
    <div className="dashboard-layout">
      <Topbar onNavigate={onNavigate} currentPage={currentPage} />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;