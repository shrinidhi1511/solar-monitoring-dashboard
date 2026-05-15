import "./Topbar.scss";

const NAV_LINKS = [
  { label: "Dashboard",    page: "dashboard" },
  { label: "Meter Graphs", page: "meter" },
  { label: "Meter Report", page: "meter-dashboard" },
];

function Topbar({ currentPage = "dashboard", onNavigate }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* ── Left: brand + nav ──────────────────────── */}
        <div className="topbar-left">
          <button
            className="topbar-logo"
            onClick={() => onNavigate?.("dashboard")}
          >
            <span className="topbar-logo-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px", color: "white" }}
              >
                solar_power
              </span>
            </span>
            Soledify
          </button>

          <nav className="topbar-nav">
            {NAV_LINKS.map(({ label, page }) => (
              <button
                key={page}
                className={`topbar-nav-link ${currentPage === page ? "active" : ""}`}
                onClick={() => onNavigate?.(page)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* ── Right: plant selector + actions ────────── */}
        <div className="topbar-right">
          <div className="plant-selector-wrapper">
            <select className="plant-select">
              <option>Bhadla Solar Park II</option>
              <option>Pavagada Phase 1</option>
              <option>Kurnool Ultra Mega</option>
            </select>
            <span className="material-symbols-outlined dropdown-icon">expand_more</span>
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn">
              <span className="material-symbols-outlined">language</span>
              <span className="lang-text">EN</span>
            </button>

            <button className="topbar-icon-btn notif-wrap">
              <span className="material-symbols-outlined">notifications</span>
              <span className="notif-dot" />
            </button>

            <button
              className="topbar-avatar"
              onClick={() => onNavigate?.("profile")}
              title="Profile"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBssJ0BhBo4fc_yme6T9f049Js6rc_JnguWwo6TMw2iveXvE8DhxC1YysuSB9Qy5cbIvRCd79jUQCZxhET4i5Ph4MPdZndQKnW8ysezgOcnm4QDb4bqE-N-25AcGmF-eAaZasYvDcRUNelLIzsR5U3qcRXywfdGuZkIynp4aLkxXE822imUOHXC0vKTB-mnRyWIh09fpNoWD4lpNA2tgCRtIf8o9SlLFX98duyW9PpfpnFwWyAZvbsx4fKk7SWJ6Rml4fF9rPux5Fw"
                alt="Profile"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;