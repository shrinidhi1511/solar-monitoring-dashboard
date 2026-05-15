import { useState } from "react";
import Login        from "./pages/Login/Login";
import Profile      from "./pages/Profile/Profile";
import Dashboard    from "./pages/Dashboard/Dashboard";
import MeterGraphs  from "./pages/MeterGraphs/MeterGraphs";
import MeterDashboard from "./pages/MeterDashboard/MeterDashboard";
import Inverter     from "./pages/Inverter/Inverter";
import Plant        from "./pages/Plant/Plant";
import SMD          from "./pages/SMD/SMD";
import AIAnalytics  from "./pages/AIAnalytics/AIAnalytics";
import PlantInfo    from "./pages/PlantInfo/PlantInfo";

function App() {
  const [page, setPage] = useState("login");

  switch (page) {
    case "login":
      return <Login onLogin={() => setPage("profile")} />;

    case "profile":
      return (
        <Profile
          onSave={() => setPage("dashboard")}
          onSkip={() => setPage("dashboard")}
        />
      );

    // ── Main pages ────────────────────────────────────────
    case "plant":
      return <Plant onNavigate={setPage} />;

    case "inverter":
      return <Inverter onNavigate={setPage} />;

    case "smd":
      return <SMD onNavigate={setPage} />;

    case "meter":
      return <MeterGraphs onNavigate={setPage} />;

    case "meter-dashboard":
      return <MeterDashboard onNavigate={setPage} />;

    case "ai-analytics":
      return <AIAnalytics onNavigate={setPage} />;

    case "plant-info":
      return <PlantInfo onNavigate={setPage} />;

    // ── Default: Dashboard ────────────────────────────────
    default:
      return <Dashboard onNavigate={setPage} />;
  }
}

export default App;