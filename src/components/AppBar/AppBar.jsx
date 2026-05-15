import "./AppBar.scss";

function AppBar() {
  return (
    <header className="app-bar">
      <div className="app-bar-left">
        <button className="icon-round-btn">
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="plant-select-wrapper">
          <select className="plant-select">
            <option>Bhadla Solar Park II</option>
            <option>Pavagada Phase 1</option>
            <option>Kurnool Ultra Mega</option>
          </select>
          <span className="material-symbols-outlined select-icon">expand_more</span>
        </div>
      </div>

      <div className="app-bar-right">
        <button className="lang-btn">
          <span className="material-symbols-outlined">language</span>
          <span className="lang-text">EN</span>
        </button>

        <button className="icon-round-btn notif-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notif-dot"></span>
        </button>

        <div className="avatar">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh1Qj9dFDEa9mHvVRzPyShQik74I3f8gu8qlrxBtOlpntGQPOQ65954YYiAOnuoQTAdl-svnlm-zQjHnMBEC1fPurjoWaz_MAhFHPknGzw2hnfNrOLAPyKKk_Ow8x_jfLfQqsWwuVwIQJjgLOQfL_96uengHApGjig-Z8FTcW1_2552FTteqcoa5_-gEhPq-u10HMVYpktzPi2pMG0d-fkzSy7L9d67VzgDW5WSFmhP2L1B8c16gl6YkapdR2swuT1qrF4JFkwHes"
            alt="User avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default AppBar;
