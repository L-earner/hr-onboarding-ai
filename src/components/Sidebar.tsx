import { Home, Bell, BookOpen, Gift, Users, Gamepad2 } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'bounties', label: 'Bounties', icon: Gift },
    { id: 'directory', label: 'Directory', icon: Users },
    { id: 'games', label: 'Games', icon: Gamepad2 },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">🤖</div>
          <span className="logo-text">AI for Everyone</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">👤</div>
          <div className="user-info">
            <div className="user-name">antonyaliaspat12345</div>
            <div className="user-points">🪙 50</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
