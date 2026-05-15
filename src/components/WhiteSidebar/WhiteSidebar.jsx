import { useState } from "react";
import "./WhiteSidebar.scss";

const NAV_ITEMS = [
  { icon: "solar_power",             label: "Plant",                 page: "dashboard", fill: true },
  { icon: "settings_input_component",label: "Inverter",              page: null },
  { icon: "memory",                  label: "SMB",                   page: null },
  { icon: "electric_meter",          label: "Meter",                 page: "meter-dashboard" },
  { icon: "account_tree",            label: "Inverter Block Diagram",page: null },
  { icon: "source",                  label: "Source",                page: null },
  { icon: "analytics",               label: "Grid/DG Statistics",   page: null },
];

function WhiteSidebar({ onNavigate, activePage = "dashboard" }) {
  const [active, setActive] = useState(activePage);

  const navigate = (page, label) => {
    setActive(label);
    if (page && onNavigate) onNavigate(page);
  };

  return (
    <aside className="white-sidebar">
      {/* ── Header: avatar + user info ──────────────────── */}
      <div className="ws-header">
        <div className="ws-user-row">
          <div className="ws-avatar-wrap">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5xWilASJ4ueVQqYov1lq1GuQgQK58MDy3FJx13aItVdTfHiQLeYfaNvFt3D7tp1FyQOXhQ5oHxphmAqt8uNje_t34NU1a0SRtUTu5134PSifCGDWYD8ObMxYCSh25dDycifiHB3J4U1SUvlr_DYfedlQ-dRuf9IJb4tYlZZjcAUnVdPCMa6QTxigqXyYh7N_c09CYkObeQZ3j3i0zG5YBJKvyKZzIvIUrlCQY4HMUPviBLQhHAD0bYmP8JUCXX4EmAwgH6xJTErQ"
              alt="Alex Rivers"
              className="ws-avatar"
            />
            <span className="ws-online-dot" aria-label="Online" />
          </div>
          <div className="ws-user-info">
            <span className="ws-user-name">Alex Rivers</span>
            <span className="ws-user-role">Energy Manager</span>
            <span className="ws-active-badge">Active Now</span>
          </div>
        </div>
        <div className="ws-divider" />
      </div>

      {/* ── Navigation ──────────────────────────────────── */}
      <nav className="ws-nav">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.label;
          return (
            <button
              key={item.label}
              className={`ws-nav-link ${isActive ? "active" : ""}`}
              onClick={() => navigate(item.page, item.label)}
            >
              <span
                className="material-symbols-outlined ws-nav-icon"
                style={
                  isActive || item.fill
                    ? { fontVariationSettings: "'FILL' 1" }
                    : {}
                }
              >
                {item.icon}
              </span>
              <span className="ws-nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Footer ──────────────────────────────────────── */}
      <div className="ws-footer">
        <div className="ws-divider" />

        <button className="ws-nav-link" onClick={() => {}}>
          <span className="material-symbols-outlined ws-nav-icon">support_agent</span>
          <span className="ws-nav-label">Support</span>
        </button>

        <button
          className="ws-nav-link ws-logout"
          onClick={() => onNavigate?.("login")}
        >
          <span className="material-symbols-outlined ws-nav-icon">logout</span>
          <span className="ws-nav-label">Logout</span>
        </button>

        {/* Brand anchor */}
        <div className="ws-brand-anchor">
          <span className="material-symbols-outlined">bolt</span>
          <span>Soledify</span>
        </div>
      </div>
    </aside>
  );
}

export default WhiteSidebar;
