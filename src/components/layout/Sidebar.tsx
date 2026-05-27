import {
  Ambulance,
  BriefcaseMedical,
  Building2,
  ChevronDown,
  FileText,
  FlaskConical,
  Grid2X2,
  Link as LinkIcon,
  Package,
  Settings,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export function Sidebar() {
  const navItems = [
    [Grid2X2, "Dashboard"],
    [Building2, "Organization"],
    [Users, "User Management", true],
    [BriefcaseMedical, "Services"],
    [Stethoscope, "Consultation"],
    [FlaskConical, "Lab test Booking"],
    [LinkIcon, "Medicine Orders"],
    [Ambulance, "Ambulance booking"],
    [Package, "Vendor & Partners"],
    [FileText, "Report"],
    [ShieldCheck, "User Access"],
    [Settings, "Setting"],
  ] as const;

  return (
    <aside className="sidebar">
      <div className="logo-wrap">
        <div className="logo">
          Jiva
          <span>HEALTH</span>
        </div>
      </div>

      <nav className="side-nav">
        {navItems.map(
          ([Icon, label, active]) => (
            <button
              className={
                active ? "active" : ""
              }
              key={label}
            >
              <Icon size={18} />

              <span>{label}</span>

              {label === "Services" && (
                <ChevronDown
                  size={14}
                  className="nav-chevron"
                />
              )}
            </button>
          )
        )}
      </nav>

      <div className="admin-card">
        <div className="admin-avatar">
          AD
        </div>

        <div>
          <strong>Admin User</strong>

          <span>
            Admin@healthcare.com
          </span>
        </div>
      </div>
    </aside>
  );
}