import { Bell, Menu, Moon, Search } from "lucide-react";
import { useUserStore } from "../../store/useUserStore";

export function Header() {
  const query = useUserStore((state) => state.query);
  const setQuery = useUserStore((state) => state.setQuery);

  return (
    <header className="top-header">
      <button className="icon-button">
        <Menu size={18} />
      </button>

      <label className="global-search">
        <Search size={16} />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search users, emails, phone..."
        />
      </label>

      <div className="header-actions">
        <button className="icon-button">
          <Moon size={16} />
        </button>

        <button className="icon-button bell">
          <Bell size={16} />
          <span>1</span>
        </button>

        <button className="profile-chip">AD</button>
      </div>
    </header>
  );
}