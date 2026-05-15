import WhiteSidebar from "../../components/WhiteSidebar/WhiteSidebar";
import AppBar from "../../components/AppBar/AppBar";
import "./WhiteSidebarLayout.scss";

function WhiteSidebarLayout({ children, onNavigate }) {
  return (
    <div className="ws-layout">
      <WhiteSidebar onNavigate={onNavigate} />
      <AppBar wide />
      <main className="ws-main">{children}</main>

      {/* Ambient orb */}
      <div className="ws-bg-orb" aria-hidden="true" />
    </div>
  );
}

export default WhiteSidebarLayout;
