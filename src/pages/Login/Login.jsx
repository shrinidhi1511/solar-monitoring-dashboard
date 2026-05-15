import { useState } from "react";
import "./Login.scss";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate auth delay then navigate
    setTimeout(() => {
      setLoading(false);
      if (onLogin) onLogin();
    }, 900);
  };

  return (
    <div className="login-root">
      {/* ── Background ──────────────────────────────────── */}
      <div className="login-bg" aria-hidden="true">
        <div className="login-bg-img" />
        <div className="login-bg-overlay" />
      </div>

      {/* ── Header ──────────────────────────────────────── */}
      <header className="login-header">
        <span className="login-brand">Soledify</span>
        <nav className="login-header-nav">
          <span className="login-header-link">Support</span>
          <span className="login-header-link bold">Contact Sales</span>
        </nav>
      </header>

      {/* ── Main Card ───────────────────────────────────── */}
      <main className="login-main">
        <div className="login-card">
          {/* Logo + tagline */}
          <div className="login-logo-wrap">
            <div className="login-logo-icon">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}
              >
                solar_power
              </span>
            </div>
            <h1 className="login-title">Soledify</h1>
            <p className="login-tagline">Think Green, Live Clean</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="login-field">
              <label className="login-label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                className="login-input"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="login-field">
              <div className="login-label-row">
                <label className="login-label" htmlFor="password">
                  Password
                </label>
                <a href="#" className="login-forgot">
                  Forgot Password?
                </a>
              </div>
              <div className="login-input-wrap">
                <input
                  id="password"
                  className="login-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="login-remember">
              <label className="login-checkbox-label">
                <input
                  type="checkbox"
                  className="login-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember this device</span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="login-error" role="alert">
                <span className="material-symbols-outlined">error</span>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className={`login-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="login-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Login
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="login-footer">
        <span className="login-copyright">
          © 2024 Soledify. Sustainable Intelligence.
        </span>
        <div className="login-footer-links">
          <a href="#" className="login-footer-link">Privacy Policy</a>
          <a href="#" className="login-footer-link">Security</a>
          <a href="#" className="login-footer-link">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}

export default Login;