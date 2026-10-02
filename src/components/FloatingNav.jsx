import React, { useState, useEffect, useRef } from 'react';
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
  Building2,
  Search,
  X,
  Check,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';

export default function FloatingNav({
  activeSection,
  onSelectSection,
  selectedCPSE,
  onSelectCPSE,
  searchQuery,
  onSearchChange,
  pendingReviewCount
}) {
  const [showCPSEDropdown, setShowCPSEDropdown] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const desktopNavRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowCPSEDropdown(false);
        setMobileSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen && mobileSearchInputRef.current) {
      mobileSearchInputRef.current.focus();
    }
  }, [mobileSearchOpen]);

  // Requirement 3: The active navigation item should automatically scroll into view smoothly
  useEffect(() => {
    // Desktop active item auto-scroll
    if (desktopNavRef.current) {
      const activeEl = desktopNavRef.current.querySelector('.floating-nav-item.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
    // Mobile active item auto-scroll
    if (mobileNavRef.current) {
      const activeEl = mobileNavRef.current.querySelector('.mobile-nav-btn.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeSection]);

  // Requirement 2: Mouse wheel horizontal scrolling where available
  const handleWheelScroll = (e, containerRef) => {
    if (!containerRef.current) return;
    if (e.deltaY !== 0 && e.deltaX === 0) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleNavClick = (sectionId) => {
    setShowCPSEDropdown(false);
    onSelectSection(sectionId);
  };

  // 10 Platform Navigation Items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'master', label: 'Materials', icon: Database },
    { id: 'harmonization', label: 'Harmonize', icon: Sparkles },
    { id: 'duplicates', label: 'Duplicates', icon: GitCompare },
    { id: 'crosswalk', label: 'Crosswalk', icon: Layers },
    { id: 'review', label: 'Review', icon: CheckSquare, badge: pendingReviewCount > 0 ? pendingReviewCount : null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'import', label: 'Import', icon: UploadCloud },
    { id: 'audit', label: 'Audit', icon: History },
    { id: 'settings', label: 'Taxonomy', icon: Settings }
  ];

  const currentCPSEObj = CPSE_LIST.find(c => c.id === selectedCPSE) || CPSE_LIST[0];

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP FLOATING NAVIGATION BAR                           */}
      {/* ============================================================ */}
      <header className="desktop-floating-nav-wrapper">
        <div className="desktop-floating-nav">
          
          {/* Logo Brand Segment */}
          <div 
            className="floating-nav-brand"
            onClick={() => handleNavClick('dashboard')}
            title="PRASHAM - CPSE Material Standardization Platform"
          >
            <div className="brand-symbol">
              <span>प्र</span>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">PRASHAM</span>
              <span className="brand-subtext">CPSE Master Data</span>
            </div>
          </div>

          <div className="floating-nav-divider" />

          {/* Horizontally Scrollable Nav Links with Smooth Auto-Scroll */}
          <nav 
            ref={desktopNavRef}
            className="floating-nav-links" 
            aria-label="Main Navigation"
            onWheel={(e) => handleWheelScroll(e, desktopNavRef)}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  className={`floating-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={15} strokeWidth={isActive ? 2.2 : 1.7} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="floating-nav-badge">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="floating-nav-divider" />

          {/* Right Controls: Search, Scope Switcher, User Profile */}
          <div className="floating-nav-controls">
            
            {/* 7 & 8. Global Navigation Search Field */}
            <div className="floating-search-box">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search materials..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search materials"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn"
                  onClick={() => onSearchChange('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* CPSE Organization Scope Switcher */}
            <div className="cpse-dropdown-wrapper">
              <button
                className="cpse-selector-btn"
                onClick={() => setShowCPSEDropdown(!showCPSEDropdown)}
                title="Select participating CPSE"
              >
                <Building2 size={14} />
                <span className="cpse-selector-label">
                  {selectedCPSE === 'ALL' ? 'All CPSEs' : currentCPSEObj.shortName}
                </span>
                <ChevronDown size={13} color="var(--text-secondary)" />
              </button>

              {showCPSEDropdown && (
                <div className="cpse-menu-popover">
                  <div className="cpse-menu-header">Select Enterprise Scope</div>
                  {CPSE_LIST.map((c) => (
                    <button
                      key={c.id}
                      className={`cpse-menu-option ${selectedCPSE === c.id ? 'selected' : ''}`}
                      onClick={() => {
                        onSelectCPSE(c.id);
                        setShowCPSEDropdown(false);
                      }}
                    >
                      <span className="cpse-opt-name">{c.name}</span>
                      {selectedCPSE === c.id && <Check size={14} color="var(--accent-blue)" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="nav-profile-pill" title="Dr. R. K. Verma • Chief Master Data Steward (DPE)">
              <div className="profile-avatar">RV</div>
              <span className="profile-role">Admin</span>
            </div>

          </div>

        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. MOBILE TOP COMPACT BAR + EXPANDABLE SEARCH OVERLAY       */}
      {/* ============================================================ */}
      <header className="mobile-top-bar">
        {!mobileSearchOpen ? (
          <>
            <div 
              className="mobile-brand-pill"
              onClick={() => onSelectSection('dashboard')}
            >
              <div className="brand-symbol sm">
                <span>प्र</span>
              </div>
              <span className="mobile-brand-title">PRASHAM</span>
            </div>

            <div className="mobile-top-right">
              {/* 9. Compact Search Icon Button on Mobile */}
              <button
                className="mobile-search-trigger-btn"
                onClick={() => setMobileSearchOpen(true)}
                title="Search materials"
                aria-label="Search materials"
              >
                <Search size={16} />
              </button>

              {/* Mobile CPSE Select */}
              <select
                className="mobile-cpse-select"
                value={selectedCPSE}
                onChange={(e) => onSelectCPSE(e.target.value)}
                aria-label="Select CPSE"
              >
                {CPSE_LIST.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.id === 'ALL' ? 'All CPSEs' : c.shortName}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          /* Expandable Clean Mobile Search Interface */
          <div className="mobile-search-overlay-bar">
            <button
              className="mobile-search-back-btn"
              onClick={() => setMobileSearchOpen(false)}
              aria-label="Close search"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="mobile-search-input-wrap">
              <Search size={15} color="var(--text-muted)" />
              <input
                ref={mobileSearchInputRef}
                type="text"
                placeholder="Search materials..."
                value={searchQuery || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Search materials"
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => onSearchChange('')}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ============================================================ */}
      {/* 3. MOBILE FLOATING BOTTOM NAVIGATION (HORIZONTALLY SCROLLABLE) */}
      {/* ============================================================ */}
      <nav 
        ref={mobileNavRef}
        className="mobile-floating-bottom-nav" 
        aria-label="Mobile Navigation"
        onWheel={(e) => handleWheelScroll(e, mobileNavRef)}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.7} />
                {item.badge && <span className="mobile-badge-dot" />}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
