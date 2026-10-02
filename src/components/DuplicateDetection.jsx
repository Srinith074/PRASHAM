import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Search,
  CheckCircle2,
  AlertCircle,
  XCircle,
  X,
  Clock,
  Sparkles,
  GitCompare,
  Layers,
  ChevronDown,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { DUPLICATE_GROUPS } from '../data/mockData';
import Pagination from './Pagination';

export default function DuplicateDetection({
  onNavigate,
  onSelectClusterForReview,
  showToast
}) {
  // Groups State
  const [duplicateGroups, setDuplicateGroups] = useState(DUPLICATE_GROUPS);

  // Selected Group (Default to flagship DUP-000182)
  const [activeGroupId, setActiveGroupId] = useState('DUP-000182');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  // Active Group
  const activeGroup = useMemo(() => {
    return duplicateGroups.find(g => g.groupId === activeGroupId) || duplicateGroups[0];
  }, [duplicateGroups, activeGroupId]);

  // Unique categories for dropdown
  const categoryOptions = useMemo(() => {
    return Array.from(new Set(duplicateGroups.map(g => g.materialCategory))).sort();
  }, [duplicateGroups]);

  // Is any filter currently active?
  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All Categories' || selectedStatus !== 'All Statuses';

  // Filtered Groups for Table
  const filteredGroups = useMemo(() => {
    return duplicateGroups.filter(group => {
      // Category
      if (selectedCategory !== 'All Categories' && group.materialCategory !== selectedCategory) {
        return false;
      }
      // Status
      if (selectedStatus !== 'All Statuses' && group.status !== selectedStatus) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = group.groupId.toLowerCase().includes(q);
        const matchCat = group.materialCategory.toLowerCase().includes(q);
        const matchCpse = group.cpses.some(c => c.toLowerCase().includes(q));
        const matchHarm = group.harmonizedTarget?.toLowerCase().includes(q);
        const matchDesc = group.standardDescription?.toLowerCase().includes(q);
        if (!matchId && !matchCat && !matchCpse && !matchHarm && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [duplicateGroups, selectedCategory, selectedStatus, searchQuery]);

  // Paginated Groups
  const paginatedGroups = useMemo(() => {
    return filteredGroups.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredGroups, currentPage, pageSize]);

  // Filter change handlers with page reset
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleCategoryChange = (val) => {
    setSelectedCategory(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val) => {
    setSelectedStatus(val);
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStatus('All Statuses');
    setCurrentPage(1);
  };

  // Utility to determine if field values differ across records in activeGroup
  const checkFieldDifference = (field) => {
    if (!activeGroup || !activeGroup.records || activeGroup.records.length <= 1) {
      return false;
    }
    const firstVal = (activeGroup.records[0][field] || '').toString().trim().toLowerCase();
    for (let i = 1; i < activeGroup.records.length; i++) {
      const val = (activeGroup.records[i][field] || '').toString().trim().toLowerCase();
      if (val !== firstVal) {
        return true;
      }
    }
    return false;
  };

  // Copy Common Code
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    if (showToast) {
      showToast(`Harmonized Code ${text} copied to clipboard!`);
    }
  };

  // Action Handlers
  const handleApprove = () => {
    if (!activeGroup) return;
    setShowApproveConfirm(false);
    setDuplicateGroups(prev => prev.map(g => {
      if (g.groupId === activeGroup.groupId) {
        return { ...g, status: 'Approved' };
      }
      return g;
    }));
    if (showToast) {
      showToast(`Group ${activeGroup.groupId} approved: duplicate records mapped to ${activeGroup.harmonizedTarget}.`);
    }
  };

  const handleReject = () => {
    if (!activeGroup) return;
    setShowRejectConfirm(false);
    setDuplicateGroups(prev => prev.map(g => {
      if (g.groupId === activeGroup.groupId) {
        return { ...g, status: 'Rejected' };
      }
      return g;
    }));
    if (showToast) {
      showToast(`Group ${activeGroup.groupId} rejected: materials declared distinct.`);
    }
  };

  const handleReviewManually = () => {
    if (!activeGroup) return;
    if (onSelectClusterForReview) {
      onSelectClusterForReview({
        clusterId: activeGroup.groupId,
        clusterName: activeGroup.standardDescription,
        category: activeGroup.materialCategory,
        harmonizedCode: activeGroup.harmonizedTarget,
        confidenceScore: activeGroup.similarity,
        status: 'Pending Review',
        participatingCPSEs: activeGroup.cpses,
        memberLegacyCodes: activeGroup.records.map(r => ({
          cpse: r.cpse,
          code: r.code,
          desc: r.description,
          uom: r.uom,
          price: r.unitPrice
        }))
      });
    }
    if (onNavigate) {
      onNavigate('review');
    }
    if (showToast) {
      showToast(`Escalated Group ${activeGroup.groupId} to Human Stewardship Queue.`);
    }
  };

  // Status Badge Helper using subtle dot indicators
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="status-dot-badge approved">
            <span className="status-dot green" />
            <span>Approved</span>
          </span>
        );
      case 'Rejected':
        return (
          <span className="status-dot-badge rejected">
            <span className="status-dot red" />
            <span>Rejected</span>
          </span>
        );
      case 'Review':
      case 'Pending Review':
      default:
        return (
          <span className="status-dot-badge review">
            <span className="status-dot amber" />
            <span>Requires Review</span>
          </span>
        );
    }
  };

  return (
    <div className="duplicate-detection-page">
      {/* 2. PAGE HEADER */}
      <div className="dup-page-header">
        <div className="dup-header-main">
          <div className="dup-title-row">
            <h1 className="dup-title">Duplicate Detection</h1>
            <span className="dup-active-badge">
              {duplicateGroups.length} Active Groups
            </span>
          </div>
          <p className="dup-subtitle">
            AI-powered identification of duplicate and semantically similar material records across CPSE material masters.
          </p>
        </div>

        <div className="dup-header-actions">
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate && onNavigate('crosswalk')}
            title="Inspect Crosswalk Mapping Matrix"
          >
            <Layers size={14} />
            <span>Legacy Crosswalk</span>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onNavigate && onNavigate('harmonization')}
            title="Open AI Harmonization Engine"
          >
            <Sparkles size={14} />
            <span>Harmonization Engine</span>
          </button>
        </div>
      </div>

      {/* 3. KPI SECTION: 4 COMPACT ENTERPRISE CARDS IN RESPONSIVE GRID */}
      <div className="dup-kpi-grid">
        {/* Card 1: Potential Duplicates */}
        <div className="dup-kpi-card">
          <div className="dup-kpi-top">
            <span className="dup-kpi-label">Potential Duplicates</span>
            <Layers size={16} className="dup-kpi-icon" />
          </div>
          <div className="dup-kpi-number potential">126,480</div>
          <div className="dup-kpi-desc">Across 8 participating CPSEs</div>
        </div>

        {/* Card 2: High Confidence */}
        <div className="dup-kpi-card">
          <div className="dup-kpi-top">
            <span className="dup-kpi-label">High Confidence</span>
            <CheckCircle2 size={16} className="dup-kpi-icon" />
          </div>
          <div className="dup-kpi-number high">82,340</div>
          <div className="dup-kpi-desc">≥90% semantic & attribute match</div>
        </div>

        {/* Card 3: Medium Confidence */}
        <div className="dup-kpi-card">
          <div className="dup-kpi-top">
            <span className="dup-kpi-label">Medium Confidence</span>
            <AlertCircle size={16} className="dup-kpi-icon" />
          </div>
          <div className="dup-kpi-number medium">31,820</div>
          <div className="dup-kpi-desc">75%–89% attribute equivalence</div>
        </div>

        {/* Card 4: Requires Review */}
        <div className="dup-kpi-card">
          <div className="dup-kpi-top">
            <span className="dup-kpi-label">Requires Review</span>
            <Clock size={16} className="dup-kpi-icon" />
          </div>
          <div className="dup-kpi-number review">12,320</div>
          <div className="dup-kpi-desc">Flagged for steward sign-off</div>
        </div>
      </div>

      {/* 4. FILTER SECTION TOOLBAR */}
      <div className="dup-filter-bar">
        <div className="dup-filter-left">
          <span className="dup-filter-label">Filters</span>

          {/* 5. Custom Search Input (40px, #DDE1E6, 8px radius) */}
          <div className="dup-search-wrapper">
            <Search size={15} className="dup-search-icon" />
            <input
              type="text"
              className="dup-search-input"
              placeholder="Search group ID, category, or material..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search group ID, category, or material"
            />
            {searchQuery && (
              <button
                className="dup-search-clear"
                onClick={() => handleSearchChange('')}
                title="Clear search"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* 6. Custom Category Dropdown (40px, custom ChevronDown) */}
          <div className="dup-select-wrapper">
            <select
              className="dup-select"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              aria-label="Filter by Material Category"
            >
              <option value="All Categories">All Categories</option>
              {categoryOptions.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={14} className="dup-select-chevron" />
          </div>

          {/* 6. Custom Status Dropdown (40px, custom ChevronDown) */}
          <div className="dup-select-wrapper">
            <select
              className="dup-select"
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              aria-label="Filter by Status"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Review">Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown size={14} className="dup-select-chevron" />
          </div>

          {/* Clear Filters Action Button */}
          {isFiltered && (
            <button
              className="dup-clear-filters-btn"
              onClick={handleClearAllFilters}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 7. FILTER RESULTS COUNT */}
      <div className="dup-results-bar">
        <span className="dup-results-count">
          Showing <strong className="dup-results-number">{filteredGroups.length}</strong> duplicate groups
        </span>
      </div>

      {/* 8. ENTERPRISE DATA TABLE CONTAINER */}
      <div className="dup-table-card">
        {/* Desktop View Table */}
        <div className="desktop-only table-container">
          <table className="dup-data-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>GROUP ID</th>
                <th>MATERIAL CATEGORY</th>
                <th>CPSES</th>
                <th style={{ textAlign: 'center', width: '90px' }}>RECORDS</th>
                <th style={{ width: '130px' }}>SIMILARITY</th>
                <th>DUPLICATE TYPE</th>
                <th style={{ width: '140px' }}>STATUS</th>
                <th style={{ textAlign: 'center', width: '110px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGroups.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    No duplicate groups matching the filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedGroups.map((group) => {
                  const isSelected = activeGroupId === group.groupId;
                  return (
                    <tr
                      key={group.groupId}
                      className={isSelected ? 'row-selected' : ''}
                      onClick={() => setActiveGroupId(group.groupId)}
                      style={{ cursor: 'pointer' }}
                      title="Click to view side-by-side comparison"
                    >
                      {/* 1. Group ID */}
                      <td>
                        <span className="code-pill" style={{ fontWeight: 700 }}>
                          {group.groupId}
                        </span>
                      </td>

                      {/* 2. Material Category */}
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          {group.materialCategory}
                        </span>
                      </td>

                      {/* 3. CPSEs */}
                      <td>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {group.cpses.map(cpse => (
                            <span key={cpse} className="cpse-tag">
                              {cpse}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* 4. Records Count */}
                      <td style={{ textAlign: 'center' }}>
                        <span className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {group.recordsCount}
                        </span>
                      </td>

                      {/* 5. Similarity Score */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '48px', height: '5px', backgroundColor: '#E6E8EB', borderRadius: '999px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${group.similarity}%`,
                                height: '100%',
                                backgroundColor: group.similarity >= 90 ? '#15803D' : '#B45309',
                                borderRadius: '999px'
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                            {group.similarity}%
                          </span>
                        </div>
                      </td>

                      {/* 6. Duplicate Type */}
                      <td>
                        <span style={{ fontSize: '13px', color: '#4B5563' }}>
                          {group.duplicateType}
                        </span>
                      </td>

                      {/* 7. Status */}
                      <td>
                        {renderStatusBadge(group.status)}
                      </td>

                      {/* 8. Action Button (36px, 8px radius) */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className={`dup-action-btn ${isSelected ? 'primary' : 'secondary'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGroupId(group.groupId);
                          }}
                        >
                          <span>{isSelected ? 'Viewing' : 'Review'}</span>
                          <ArrowRight size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 12. RESPONSIVE MOBILE VIEW (CARDS INSTEAD OF OVERFLOWING TABLE) */}
        <div className="mobile-only dup-mobile-cards-list">
          {paginatedGroups.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
              No duplicate groups matching the filter criteria.
            </div>
          ) : (
            paginatedGroups.map((group) => {
              const isSelected = activeGroupId === group.groupId;
              return (
                <div
                  key={`mobile-${group.groupId}`}
                  className={`dup-mobile-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setActiveGroupId(group.groupId)}
                >
                  <div className="dup-mobile-card-top">
                    <div className="dup-mobile-card-id-block">
                      <span className="dup-mobile-id">{group.groupId}</span>
                      <span className="dup-mobile-category">{group.materialCategory}</span>
                    </div>
                    {renderStatusBadge(group.status)}
                  </div>

                  <div className="dup-mobile-cpses">
                    {group.cpses.join(' · ')}
                  </div>

                  <div className="dup-mobile-stats-row">
                    <span>{group.recordsCount} records</span>
                    <span className="dup-mobile-dot">•</span>
                    <span className="dup-mobile-sim">{group.similarity}% similarity</span>
                    <span className="dup-mobile-dot">•</span>
                    <span>{group.duplicateType}</span>
                  </div>

                  <div className="dup-mobile-card-bottom">
                    <button
                      className={`dup-action-btn ${isSelected ? 'primary' : 'secondary'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGroupId(group.groupId);
                      }}
                    >
                      <span>{isSelected ? 'Viewing' : 'Review'}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 11. CUSTOM ENTERPRISE PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredGroups.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[4, 6, 10]}
          itemName="duplicate groups"
        />
      </div>

      {/* SIDE-BY-SIDE COMPARISON INTERFACE WHEN A GROUP IS SELECTED */}
      {activeGroup && (
        <div className="side-by-side-wrapper">
          {/* Header */}
          <div className="side-by-side-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitCompare size={18} color="var(--accent-blue)" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Duplicate Group Comparison: {activeGroup.groupId}
                  </span>
                  <span className="badge badge-neutral" style={{ fontWeight: 600 }}>{activeGroup.materialCategory}</span>
                  {renderStatusBadge(activeGroup.status)}
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Comparing {activeGroup.records.length} ingested records across {activeGroup.cpses.join(', ')} • Subtle highlights mark field variances.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  Target Harmonized Code
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span className="code-pill harmonized" style={{ fontWeight: 700, fontSize: '12px' }}>
                    {activeGroup.harmonizedTarget}
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleCopy(activeGroup.harmonizedTarget)}
                    title="Copy code"
                    style={{ height: '30px', padding: '0 8px' }}
                  >
                    {copiedCode ? <Check size={12} color="#15803D" /> : <Copy size={12} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Difference Legend Bar */}
          <div className="side-by-side-legend-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Comparison Legend:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="field-diff-tag">Variance</span>
                <span>= Discrepancy detected across legacy records</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ color: '#15803D', fontWeight: 600, fontSize: '11px' }}>✓ Identical</span>
                <span>= 100% attribute parity verified</span>
              </div>
            </div>

            <div>
              Standard: <strong style={{ color: 'var(--text-primary)' }}>{activeGroup.standardDescription}</strong>
            </div>
          </div>

          {/* Original Records Side-by-Side Grid */}
          <div className="side-by-side-grid">
            {activeGroup.records.map((rec) => {
              const descDiff = checkFieldDifference('description');
              const dimDiff = checkFieldDifference('dimensions');
              const matDiff = checkFieldDifference('material');
              const gradeDiff = checkFieldDifference('grade');
              const uomDiff = checkFieldDifference('uom');
              const mfgDiff = checkFieldDifference('manufacturer');
              const partDiff = checkFieldDifference('partNumber');

              return (
                <div key={rec.id} className="comparison-record-card">
                  {/* Card Top: CPSE and Code */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #E6E8EB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="cpse-tag" style={{ fontWeight: 700 }}>{rec.cpse}</span>
                      <span className="code-pill" style={{ fontSize: '11.5px', fontWeight: 600 }}>
                        {rec.code}
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{rec.plant}</span>
                  </div>

                  {/* 1. Description */}
                  <div className={`comparison-field-row ${descDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Description</span>
                      {descDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }} title={rec.description}>
                      “{rec.description}”
                    </span>
                  </div>

                  {/* 2. Dimensions */}
                  <div className={`comparison-field-row ${dimDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Dimensions</span>
                      {dimDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val">{rec.dimensions}</span>
                  </div>

                  {/* 3. Material */}
                  <div className={`comparison-field-row ${matDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Material</span>
                      {matDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val">{rec.material}</span>
                  </div>

                  {/* 4. Grade */}
                  <div className={`comparison-field-row ${gradeDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Grade</span>
                      {gradeDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val">{rec.grade}</span>
                  </div>

                  {/* 5. UOM */}
                  <div className={`comparison-field-row ${uomDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>UOM</span>
                      {uomDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val">
                      <span className="badge badge-neutral" style={{ fontSize: '11px' }}>{rec.uom}</span>
                    </span>
                  </div>

                  {/* 6. Manufacturer */}
                  <div className={`comparison-field-row ${mfgDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Manufacturer</span>
                      {mfgDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val">{rec.manufacturer}</span>
                  </div>

                  {/* 7. Part Number */}
                  <div className={`comparison-field-row ${partDiff ? 'diff-highlight' : ''}`}>
                    <span className="field-title">
                      <span>Part Number</span>
                      {partDiff ? <span className="field-diff-tag">Variance</span> : <span style={{ color: '#15803D', fontSize: '10.5px' }}>✓ Identical</span>}
                    </span>
                    <span className="field-val" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>{rec.partNumber}</span>
                  </div>

                  {/* Footer metadata */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)', paddingTop: '8px', borderTop: '1px dashed #E6E8EB', marginTop: '2px' }}>
                    <span>Last Purchase Price:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>₹{rec.unitPrice?.toFixed(2)}</strong>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI ASSESSMENT & BOTTOM ACTIONS */}
          <div className="dup-assessment-section">
            <div className="dup-assessment-box">
              {/* Verdict & Confidence */}
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={13} />
                  AI Assessment
                </span>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#14532D', marginTop: '4px' }}>
                  “{activeGroup.aiAssessment?.verdict || 'High probability of duplicate material.'}”
                </div>
                <div style={{ fontSize: '12.5px', color: '#166534', marginTop: '3px' }}>
                  Confidence: <strong style={{ fontFamily: 'var(--font-mono)' }}>{activeGroup.aiAssessment?.confidence || activeGroup.similarity}%</strong>
                </div>
              </div>

              {/* Recommended Action */}
              <div style={{ maxWidth: '440px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.4px', color: '#15803D' }}>
                  Recommended Action:
                </span>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#14532D', marginTop: '2px' }}>
                  {activeGroup.aiAssessment?.recommendedAction || 'Map to existing harmonized material.'}
                </div>
                <div style={{ fontSize: '12px', color: '#15803D', marginTop: '2px' }}>
                  Target: <strong>{activeGroup.harmonizedTarget}</strong> — {activeGroup.standardDescription}
                </div>
              </div>

              {/* Rationale note */}
              <div style={{ width: '100%', fontSize: '12px', color: '#166534', borderTop: '1px solid #BBF7D0', paddingTop: '8px', marginTop: '2px', lineHeight: '1.45' }}>
                <strong>Technical Assessment:</strong> {activeGroup.aiAssessment?.rationale || 'The physical, metallurgical and dimensional specifications match across CPSE records. Naming variances are syntactic.'}
              </div>
            </div>

            {/* Actions: Approve / Reject / Review Manually */}
            <div className="dup-actions-bar">
              <button
                className="dup-action-btn secondary"
                onClick={() => setShowRejectConfirm(true)}
                style={{ color: '#B91C1C', borderColor: '#FCA5A5' }}
                title="Reject mapping and preserve separate legacy entries"
              >
                <XCircle size={14} />
                <span>Reject</span>
              </button>

              <button
                className="dup-action-btn secondary"
                onClick={handleReviewManually}
                style={{ color: '#B45309', borderColor: '#FDE68A' }}
                title="Send to Inter-CPSE Master Data Steward Review Queue"
              >
                <Clock size={14} color="#D97706" />
                <span>Review Manually</span>
              </button>

              <button
                className="dup-action-btn primary"
                onClick={() => setShowApproveConfirm(true)}
                style={{ backgroundColor: '#15803D', borderColor: '#15803D' }}
                title="Approve duplicate group and map to national master code"
              >
                <CheckCircle2 size={14} />
                <span>Approve</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Approve Duplicate Group */}
      {showApproveConfirm && activeGroup && (
        <div className="confirm-modal-overlay" onClick={() => setShowApproveConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <CheckCircle2 size={16} color="#15803D" />
                <span>Confirm Duplicate Consolidation</span>
              </div>
              <button
                onClick={() => setShowApproveConfirm(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <div style={{ marginBottom: '10px' }}>
                Confirm merging duplicate candidate cluster across participating CPSEs:
              </div>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 12px',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  Group: {activeGroup.groupId} • {activeGroup.materialCategory}
                </div>
                <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 600, marginTop: '2px' }}>
                  Target Unified Code: {activeGroup.harmonizedTarget}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  CPSEs: {activeGroup.cpses.join(', ')} ({activeGroup.records.length} Records)
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  AI Confidence: {activeGroup.similarity}% (Near-identical match)
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                This approval unifies the duplicate records under the National Master Catalog, removing procurement duplication across CPSE enterprise systems.
              </div>
            </div>

            <div className="confirm-modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowApproveConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-success btn-sm" onClick={handleApprove}>
                <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
                Confirm Merger
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Reject Duplicate Group */}
      {showRejectConfirm && activeGroup && (
        <div className="confirm-modal-overlay" onClick={() => setShowRejectConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <XCircle size={16} color="#DC2626" />
                <span>Declare Materials Distinct</span>
              </div>
              <button
                onClick={() => setShowRejectConfirm(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <div style={{ marginBottom: '10px' }}>
                Are you sure you want to reject duplicate grouping for <strong>{activeGroup.groupId}</strong>?
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                These records will be classified as independent, non-interchangeable engineering items in their respective CPSE master catalogs.
              </div>
            </div>

            <div className="confirm-modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowRejectConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-danger btn-sm" onClick={handleReject}>
                Confirm Separation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Statutory Footer */}
      <footer className="institutional-footer">
        <div className="institutional-footer-row">
          <div className="institutional-watermark">
            <span>🏛️</span>
            <span>PRASHAM [प्रशम] • Ministry of Heavy Industries & Department of Public Enterprises (DPE)</span>
          </div>
          <div>
            <span>Cross-CPSE Duplicate Identification Engine • GFR 2017 Compliant</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Cosine + Levenshtein Multi-Strategy Deduplication v4.2</span>
        </div>
      </footer>
    </div>
  );
}
