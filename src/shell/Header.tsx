import { NavLink } from "react-router";

// DEMO 8: the shell's header with branding and the main navigation.
// NavLink changes the URL without a page reload, and tells us whether its
// route is the current one (isActive), so the active button is highlighted
// without any manual classList.add/remove.
const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/evidence", label: "Evidence" },
  { to: "/team", label: "People & Locations" },
  { to: "/timeline", label: "Timeline" },
  { to: "/workspace", label: "Workspace" },
];

function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <img
            src="assets/logo/logo.svg"
            alt="Project ReMotion logo"
            className="brand-logo"
          />
          <div>
            <h1>Project ReMotion</h1>
            <p className="subtitle">
              Investigate the failure of an AI-assisted rehabilitation robot.
            </p>
          </div>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "nav-btn" + (isActive ? " active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
