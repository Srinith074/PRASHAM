import React, { useState } from 'react';
import { Search, Building2, Bell, CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';

export default function Navbar({ selectedCPSE, onSelectCPSE, searchQuery, onSearchChange }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, type: 'action', title: 'New Cluster Generated', text: '3 items grouped under 45 kW Induction Motor (84.2% match)', time: '10m ago' },
    { id: 2, type: 'warning', title: 'Steward Review Required', text: 'Spiral Wound Gasket 3" Class 300 flagged for inner ring variance', time: '1h ago' },
    { id: 3, type: 'success', title: 'GeM Catalog Sync Successful', text: '4,820 harmonized codes synchronized with GeM repository', time: '3h ago' }
  ];

  return (
    <header>
      {/* Official Government of India Top Masthead Banner */}
      <div className="gov-top-banner">
        <div className="gov-flag-seal">
          <div className="gov-tricolor-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span>भारत सरकार | Government of India — Ministry of Heavy Industries & Public Enterprises</span>
        </div>
        <div className="gov-system-tag">
          <span>Department of Public Enterprises (DPE)</span>
          <span>•</span>
          <span>National Master Data Governance</span>
        </div>
      </div>

      {/* Main Enterprise Navigation Header */}
      <div className="main-header">
        <div className="header-left">
          <div className="portal-brand">
            <div className="brand-icon-box">
              <span>प्र</span>
            </div>
            <div className="brand-titles">
              <span className="brand-name">
                PRASHAM <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)' }}>[प्रशम]</span>
              </span>
              <span className="brand-tagline">CPSE Material Code Standardization & Harmonization Platform</span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="header-center">
          <div className="global-search-bar">
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search across all CPSEs by Material Code, Description, Spec, or Standard (e.g. SS304, M16, A106, 6308)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                title="Clear Search"
              >
                <X size={14} color="var(--text-muted)" />
              </button>
            )}
          </div>
        </div>

        {/* Organization CPSE Filter & User Profile */}
        <div className="header-right">
          <div className="cpse-selector-wrapper" title="Filter master view by CPSE Organization">
            <Building2 size={15} color="var(--text-secondary)" />
            <select
              className="cpse-select-input"
              value={selectedCPSE}
              onChange={(e) => onSelectCPSE(e.target.value)}
            >
              {CPSE_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id === 'ALL' ? '🏢 Scope: All CPSEs (Consolidated)' : `🏢 ${c.shortName} (${c.name})`}
                </option>
              ))}
            </select>
          </div>

          {/* Notifications Trigger */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ position: 'relative', padding: '6px 8px' }}
              title="System Notifications"
            >
              <Bell size={15} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#dc2626',
                color: '#fff',
                fontSize: '9px',
                fontWeight: 700,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                2
              </span>
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: '36px',
                right: 0,
                width: '320px',
                background: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: 'var(--shadow-md)',
                zIndex: 60,
                padding: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 600, fontSize: '12px' }}>System Alerts & Activity</span>
                  <button onClick={() => setShowNotifications(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                    <X size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{ display: 'flex', gap: '8px', padding: '6px', borderRadius: '4px', background: 'var(--bg-secondary)', fontSize: '11.5px' }}>
                      {n.type === 'action' && <Info size={14} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      {n.type === 'warning' && <AlertTriangle size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      {n.type === 'success' && <CheckCircle2 size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />}
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{n.title}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{n.text}</div>
                        <div style={{ color: 'var(--text-light)', fontSize: '10px', marginTop: '2px' }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="user-badge-profile" title="Logged in as DPE Lead Master Data Steward">
            <div className="user-avatar">
              RV
            </div>
            <div className="user-meta">
              <span className="user-name">Dr. R. K. Verma</span>
              <span className="user-role">Chief Data Steward, DPE</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
