import Sidebar from "../../components/Sidebar/Sidebar";
import AppBar from "../../components/AppBar/AppBar";
import "./SidebarLayout.scss";

function SidebarLayout({ children, onNavigate }) {
  return (
    <div className="sidebar-layout">
      <Sidebar onNavigate={onNavigate} />
      <AppBar />
      <main className="sidebar-main">
        {children}
      </main>

      {/* Background accent orb */}
      <div className="bg-orb" aria-hidden="true" />
    </div>
  );
}

export default SidebarLayout;
