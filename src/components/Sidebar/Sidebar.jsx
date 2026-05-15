import { useState } from "react";
import "./Sidebar.scss";

const NAV_ITEMS = [
  { icon: "dashboard",              label: "Dashboard",              page: "dashboard" },
  { icon: "solar_power",            label: "Plant",                  page: "plant", fill: true },
  {
    icon: "electrical_services",
    label: "Inverter",
    children: [
      { label: "Fleet Overview",  page: "inverter" },
      { label: "MPPT Table",      page: null },
      { label: "Charts",          page: null },
      { label: "Reports",         page: null },
    ],
  },
  {
    icon: "memory",
    label: "SMD",
    children: [
      { label: "String Monitor",  page: "smd" },
      { label: "Charts",          page: null },
      { label: "Reports",         page: null },
    ],
  },
  {
    icon: "electric_meter",
    label: "Meter",
    activeParent: true,
    fillIcon: true,
    children: [
      { label: "Graphs",      page: "meter" },
      { label: "Dashboard",   page: "meter-dashboard" },
      { label: "Table",       page: null },
      { label: "Reports",     page: null },
    ],
  },
  { icon: "psychology",    label: "AI Analytics", page: "ai-analytics" },
  { icon: "account_tree",  label: "Block Diagram", page: null },
  { icon: "info",          label: "Plant Info",    page: "plant-info" },
];

function NavItem({ item, onNavigate, activePage, onSetActive }) {
  const [open, setOpen] = useState(item.activeParent || false);
  const hasChildren = item.children?.length > 0;
  const isActive = activePage === item.page;

  if (hasChildren) {
    const anyChildActive = item.children.some((c) => c.page === activePage);
    return (
      <div className="nav-group">
        <button
          className={`nav-btn ${anyChildActive || open ? "active-parent" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <span
            className="material-symbols-outlined nav-icon"
            style={item.fillIcon ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            {item.icon}
          </span>
          <span className="nav-label">{item.label}</span>
          <span className={`material-symbols-outlined chevron ${open ? "open" : ""}`}>
            expand_more
          </span>
        </button>

        <div className={`nav-children ${open ? "expanded" : ""}`}>
          {item.children.map((child) => (
            <button
              key={child.label}
              className={`nav-child-link ${activePage === child.page && child.page ? "active-child" : ""}`}
              onClick={() => {
                if (child.page) {
                  onSetActive(child.page);
                  onNavigate(child.page);
                }
              }}
              disabled={!child.page}
            >
              {child.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      className={`nav-link ${isActive ? "active-link" : ""}`}
      onClick={() => {
        onSetActive(item.page);
        if (item.page) onNavigate(item.page);
      }}
    >
      <span
        className="material-symbols-outlined nav-icon"
        style={isActive || item.fill ? { fontVariationSettings: "'FILL' 1" } : {}}
      >
        {item.icon}
      </span>
      <span className="nav-label">{item.label}</span>
    </button>
  );
}

function Sidebar({ onNavigate, currentPage = "dashboard" }) {
  const [activePage, setActivePage] = useState(currentPage);

  const go = (page) => {
    setActivePage(page);
    if (onNavigate) onNavigate(page);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo-row">
          <div className="sidebar-logo-icon">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px", color: "white" }}
            >
              solar_power
            </span>
          </div>
          <div>
            <h1 className="brand-name">Soledify</h1>
            <p className="brand-sub">Luminous Grid Management</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.label}
            item={item}
            onNavigate={go}
            activePage={activePage}
            onSetActive={setActivePage}
          />
        ))}
        <div className="nav-divider" />
        <button className="nav-link" onClick={() => go("dashboard")}>
          <span className="material-symbols-outlined nav-icon">settings</span>
          <span className="nav-label">Plant Config</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="support-btn">
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>support_agent</span>
          Support Hub
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;