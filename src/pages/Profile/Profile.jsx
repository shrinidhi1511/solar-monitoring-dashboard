import { useState, useRef } from "react";
import "./Profile.scss";

const COUNTRIES = [
  "United States", "India", "Germany", "Australia",
  "Canada", "Spain", "United Kingdom", "France", "Japan",
];

function PasswordField({ id, label, value, onChange }) {
  const [show, setShow] = useState(false);
  return (
    <div className="pf-field">
      <label className="pf-label" htmlFor={id}>{label}</label>
      <div className="pf-input-wrap">
        <input
          id={id}
          className="pf-input"
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={onChange}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="pf-eye-btn"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide" : "Show"}
        >
          <span className="material-symbols-outlined">
            {show ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    </div>
  );
}

function Profile({ onSave, onSkip }) {
  const fileRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCOaldMXAkEehyxoCoikmhUEUz5ItM-xBM8qvC-ytpvU3ONYppbd2Au3hp6He6wnn19LeM390F1VCojeNr0xNXzSBUiQo4OtfLC4BqNAn33kTGZYsj0EBCRF6FMT0G0EtZvoDgjAyDcwj7-VfAbRTYpo0RHcu2QJHL5Mj1HYfORs0CMFAdsE3dJP6LhSjenVMPD-eK5plBhYR0_qFKWhxk_5y7jrxroJsPBXMz3OTA8yAq4KM2K1LKH-EUTpZBNj7bglP9nPlOOJq4"
  );
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    country: "",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (form.password && form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      if (onSave) onSave();
    }, 800);
  };

  return (
    <div className="profile-root">
      {/* ── Background ─────────────────────────────────── */}
      <div className="profile-bg" aria-hidden="true">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2hAT9PuOsBUR7GTDffBt6jUneOj5LLGkLCVn-2rLACWxTzh0zKlDblvNQTEIamHYNSDNgiS_QGgALmtpQNJHXT4qIQWsJPiugn-dRwDqEWYUtQ5pkSa6FgfMfzWHgot6KQmbScxcBRXO1nh6fX7skeSF2tUTlTPPVXh5zhub1IcftJnnOar2ULdCbVYYihEXBC9qqBSPv_2qNiNgKBexE2M7FfNBhLjzVbrFOxUdHiQDaSYPXuoZj-3EaPgSXreA4LgUXehBeOmw"
          alt=""
          className="profile-bg-img"
        />
        <div className="profile-bg-overlay" />
      </div>

      {/* ── Card ───────────────────────────────────────── */}
      <main className="profile-main">
        <div className="profile-card">
          {/* Header */}
          <div className="profile-card-header">
            <h1 className="profile-heading">Profile Details</h1>
            <p className="profile-subheading">
              Manage your account preferences and security settings
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Avatar section */}
            <div className="profile-avatar-section">
              <div className="profile-avatar-wrap">
                <img src={avatarSrc} alt="Profile" className="profile-avatar-img" />
                <button
                  type="button"
                  className="profile-avatar-edit"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Edit profile picture"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="profile-file-hidden"
                  onChange={handleAvatar}
                />
              </div>
              <div className="profile-avatar-info">
                <h3 className="profile-avatar-title">Profile Picture</h3>
                <p className="profile-avatar-hint">
                  PNG or JPG, max 5MB. 400×400px recommended.
                </p>
                <button
                  type="button"
                  className="profile-browse-btn"
                  onClick={() => fileRef.current?.click()}
                >
                  Browse Files
                </button>
              </div>
            </div>

            {/* Fields grid */}
            <div className="profile-grid">
              {/* First Name */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="first-name">First Name</label>
                <input
                  id="first-name"
                  className={`pf-input ${errors.firstName ? "error" : ""}`}
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={set("firstName")}
                />
                {errors.firstName && <span className="pf-error">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="last-name">Last Name</label>
                <input
                  id="last-name"
                  className={`pf-input ${errors.lastName ? "error" : ""}`}
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={set("lastName")}
                />
                {errors.lastName && <span className="pf-error">{errors.lastName}</span>}
              </div>

              {/* Password */}
              <PasswordField
                id="password"
                label="Password"
                value={form.password}
                onChange={set("password")}
              />

              {/* Confirm Password */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="confirm-password">Confirm Password</label>
                <div className="pf-input-wrap">
                  <PasswordField
                    id="confirm-password"
                    label=""
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="pf-error">{errors.confirmPassword}</span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  className="pf-input"
                  type="date"
                  value={form.dob}
                  onChange={set("dob")}
                />
              </div>

              {/* Gender */}
              <div className="pf-field">
                <label className="pf-label" htmlFor="gender">Gender</label>
                <div className="pf-select-wrap">
                  <select
                    id="gender"
                    className="pf-input pf-select"
                    value={form.gender}
                    onChange={set("gender")}
                  >
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <span className="material-symbols-outlined pf-select-icon">expand_more</span>
                </div>
              </div>

              {/* Country — full width */}
              <div className="pf-field pf-field--full">
                <label className="pf-label" htmlFor="country">Country</label>
                <div className="pf-select-wrap">
                  <select
                    id="country"
                    className="pf-input pf-select"
                    value={form.country}
                    onChange={set("country")}
                  >
                    <option value="" disabled>Select country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined pf-select-icon">expand_more</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="profile-actions">
              <button
                type="button"
                className="profile-skip-btn"
                onClick={onSkip}
              >
                Skip
              </button>
              <button
                type="submit"
                className={`profile-save-btn ${saving ? "loading" : ""}`}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <span className="pf-spinner" />
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="profile-footer">
        <span className="pf-copyright">© 2024 Soledify Solar. All rights reserved.</span>
        <div className="pf-footer-links">
          <a href="#" className="pf-footer-link">Privacy Policy</a>
          <a href="#" className="pf-footer-link">Terms of Service</a>
          <a href="#" className="pf-footer-link">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}

export default Profile;
