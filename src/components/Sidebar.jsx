import React from 'react';
import {
  LayoutDashboard,
  Database,
  Sparkles,
  GitCompare,
  Layers,
  CheckSquare,
  BarChart3,
  UploadCloud,
  History,
  Settings,
  ShieldCheck
} from 'lucide-react';

const NAV_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'master', label: 'Material Master', icon: Database, badge: '148K' },
  { id: 'harmonization', label: 'AI Harmonization', icon: Sparkles, badge: 'Studio' },
  { id: 'duplicates', label: 'Duplicate Detection', icon: GitCompare, badge: '19.4K' },
  { id: 'crosswalk', label: 'Mapping & Crosswalk', icon: Layers, badge: null },
  { id: 'review', label: 'Review & Approval', icon: CheckSquare, badge: '2 Pending', badgeType: 'warning' },
  { id: 'analytics', label: 'Analytics & Savings', icon: BarChart3, badge: '₹284 Cr' },
  { id: 'import', label: 'Data Import', icon: UploadCloud, badge: null },
  { id: 'audit', label: 'Audit Trail', icon: History, badge: 'SHA-256' },
  { id: 'settings', label: 'Settings & Rules', icon: Settings, badge: null }
];

export default function Sidebar({ activeSection, onSelectSection, pendingReviewCount }) {
  return (
    <aside className="app-sidebar">
      <div>
        <div className="sidebar-nav-section">
          <div className="sidebar-section-title">Core Operations</div>
          <ul className="sidebar-nav-list">
            {NAV_SECTIONS.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(item.id)}
                  title={item.label}
                >
                  <div className="nav-item-left">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`nav-badge-pill ${item.badgeType === 'warning' ? 'warning' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-nav-section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="sidebar-section-title">Governance & Crosswalk</div>
          <ul className="sidebar-nav-list">
            {NAV_SECTIONS.slice(4, 7).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const badge = item.id === 'review' && pendingReviewCount > 0 ? `${pendingReviewCount} Pending` : item.badge;
              return (
                <li
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(item.id)}
                  title={item.label}
                >
                  <div className="nav-item-left">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {badge && (
                    <span className={`nav-badge-pill ${item.id === 'review' && pendingReviewCount > 0 ? 'warning' : ''}`}>
                      {badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-nav-section" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="sidebar-section-title">Ingestion & System</div>
          <ul className="sidebar-nav-list">
            {NAV_SECTIONS.slice(7).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li
                  key={item.id}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSection(item.id)}
                  title={item.label}
                >
                  <div className="nav-item-left">
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="nav-badge-pill">
                      {item.badge}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Sidebar Footer System Badge */}
      <div className="sidebar-footer">
        <div className="system-status-indicator">
          <div className="status-dot"></div>
          <div>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>AI Engine v4.2 Active</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '10.5px' }}>UNSPSC & NIC Taxonomies</div>
          </div>
        </div>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-light)', fontSize: '10.5px' }}>
          <ShieldCheck size={12} color="#16a34a" />
          <span>GeM Certified Master Repo</span>
        </div>
      </div>
    </aside>
  );
}
