import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Download,
  Eye,
  X,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Clock,
  ArrowUpDown,
  Copy,
  Check,
  RotateCcw,
  Layers
} from 'lucide-react';
import { MASTER_RECORDS, CPSE_LIST } from '../data/mockData';
import Pagination from './Pagination';

export default function MaterialMaster({
  records = MASTER_RECORDS,
  selectedCPSE = 'ALL',
  onSelectCPSE,
  searchQuery = '',
  onNavigate,
  onApproveRecord,
  onRejectRecord,
  onReviewRecord,
  showToast
}) {
  // Filter States
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedUnit, setSelectedUnit] = useState('All Units');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedConfidence, setSelectedConfidence] = useState('All Confidence');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Advanced Filter States
  const [manufacturerFilter, setManufacturerFilter] = useState('');
  const [minSimilarity, setMinSimilarity] = useState(0);

  // Sorting & Pagination
  const [sortField, setSortField] = useState('similarity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Side Drawer & Interaction
  const [activeCode, setActiveCode] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [rejectPromptOpen, setRejectPromptOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);

  // Derive currently active material record from activeCode and records
  const activeItem = useMemo(() => {
    return activeCode ? (records.find(r => r.materialCode === activeCode) || null) : null;
  }, [records, activeCode]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveCode(null);
        setRejectPromptOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Extract distinct categories and UOMs for filter options
  const categoryOptions = useMemo(() => {
    const set = new Set();
    records.forEach(r => { if (r.category) set.add(r.category); });
    return ['All Categories', ...Array.from(set).sort()];
  }, [records]);

  const unitOptions = useMemo(() => {
    const set = new Set();
    records.forEach(r => { if (r.uom) set.add(r.uom); });
    return ['All Units', ...Array.from(set).sort()];
  }, [records]);

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCPSE && selectedCPSE !== 'ALL') count++;
    if (selectedCategory !== 'All Categories') count++;
    if (selectedUnit !== 'All Units') count++;
    if (selectedStatus !== 'All Statuses') count++;
    if (selectedConfidence !== 'All Confidence') count++;
    if (manufacturerFilter.trim()) count++;
    if (minSimilarity > 0) count++;
    return count;
  }, [selectedCPSE, selectedCategory, selectedUnit, selectedStatus, selectedConfidence, manufacturerFilter, minSimilarity]);

  // Filter logic
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      // CPSE Filter
      if (selectedCPSE && selectedCPSE !== 'ALL' && item.cpse !== selectedCPSE) {
        return false;
      }
      // Category Filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Unit Filter
      if (selectedUnit !== 'All Units' && item.uom !== selectedUnit) {
        return false;
      }
      // Status Filter
      if (selectedStatus !== 'All Statuses' && item.status !== selectedStatus) {
        return false;
      }
      // Confidence Filter
      if (selectedConfidence !== 'All Confidence') {
        if (selectedConfidence === 'High (≥90%)' && item.similarity < 90) return false;
        if (selectedConfidence === 'Medium (75%-89%)' && (item.similarity < 75 || item.similarity >= 90)) return false;
        if (selectedConfidence === 'Low (<75%)' && item.similarity >= 75) return false;
      }
      // Advanced: Manufacturer
      if (manufacturerFilter.trim()) {
        const mfg = (item.manufacturer || '').toLowerCase();
        if (!mfg.includes(manufacturerFilter.trim().toLowerCase())) return false;
      }
      // Advanced: Min Similarity
      if (minSimilarity > 0 && item.similarity < minSimilarity) {
        return false;
      }
      // Search query (material code, description, normalized desc, spec, harmonized code, partNumber)
      if (localSearch && localSearch.trim()) {
        const q = localSearch.trim().toLowerCase();
        const codeMatch = item.materialCode?.toLowerCase().includes(q);
        const descMatch = item.materialDescription?.toLowerCase().includes(q);
        const normMatch = item.normalizedDescription?.toLowerCase().includes(q);
        const specMatch = item.specification?.toLowerCase().includes(q);
        const harmMatch = item.harmonizedCode?.toLowerCase().includes(q);
        const cpseMatch = item.cpse?.toLowerCase().includes(q);
        const partMatch = item.partNumber?.toLowerCase().includes(q);
        if (!codeMatch && !descMatch && !normMatch && !specMatch && !harmMatch && !cpseMatch && !partMatch) {
          return false;
        }
      }
      return true;
    });
  }, [
    records,
    selectedCPSE,
    selectedCategory,
    selectedUnit,
    selectedStatus,
    selectedConfidence,
    manufacturerFilter,
    minSimilarity,
    localSearch
  ]);

  // Sorting
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
        return sortDirection === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredRecords, sortField, sortDirection]);

  // Pagination
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  // Toggle sort direction
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setLocalSearch('');
    setSelectedCategory('All Categories');
    setSelectedUnit('All Units');
    setSelectedStatus('All Statuses');
    setSelectedConfidence('All Confidence');
    setManufacturerFilter('');
    setMinSimilarity(0);
    if (onSelectCPSE) onSelectCPSE('ALL');
    setCurrentPage(1);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Material Code',
      'CPSE',
      'Material Description',
      'Normalized Description',
      'Category',
      'UOM',
      'Specification',
      'Harmonized Code',
      'Similarity (%)',
      'Status',
      'Last Updated',
      'Manufacturer',
      'Part Number'
    ];

    const rows = filteredRecords.map(r => [
      `"${r.materialCode || ''}"`,
      `"${r.cpse || ''}"`,
      `"${(r.materialDescription || '').replace(/"/g, '""')}"`,
      `"${(r.normalizedDescription || '').replace(/"/g, '""')}"`,
      `"${r.category || ''}"`,
      `"${r.uom || ''}"`,
      `"${(r.specification || '').replace(/"/g, '""')}"`,
      `"${r.harmonizedCode || ''}"`,
      r.similarity || 0,
      `"${r.status || ''}"`,
      `"${r.lastUpdated || ''}"`,
      `"${(r.manufacturer || '').replace(/"/g, '""')}"`,
      `"${(r.partNumber || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPSE_Unified_Material_Master_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) {
      showToast(`Exported ${filteredRecords.length} material records to CSV.`);
    }
  };

  // Copy Common Code to Clipboard
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    if (showToast) {
      showToast(`Harmonized Code ${code} copied to clipboard!`);
    }
  };

  // Action handlers on active item
  const handleApprove = () => {
    if (!activeItem) return;
    setShowApproveConfirm(false);
    if (onApproveRecord) {
      onApproveRecord(activeItem.materialCode, 'Approved mapping to unified common code');
    }
  };

  const handleReject = () => {
    if (!activeItem) return;
    const reason = rejectReason.trim() || 'Attribute variance and dimensional incompatibility';
    if (onRejectRecord) {
      onRejectRecord(activeItem.materialCode, reason);
    }
    setRejectPromptOpen(false);
    setRejectReason('');
  };

  const handleSendForReview = () => {
    if (!activeItem) return;
    if (onReviewRecord) {
      onReviewRecord(activeItem.materialCode, 'Dispatched to CPSE Technical Evaluation Committee');
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Harmonized':
        return <span className="badge badge-approved"><CheckCircle2 size={11} /> Harmonized</span>;
      case 'Review Required':
        return <span className="badge badge-pending"><AlertCircle size={11} /> Review Required</span>;
      case 'Rejected':
        return <span className="badge badge-rejected"><XCircle size={11} /> Rejected</span>;
      default:
        return <span className="badge badge-neutral"><Clock size={11} /> Unmatched</span>;
    }
  };

  // Similarity Meter Helper
  const getSimilarityBadge = (score) => {
    let colorClass = 'high';
    if (score < 75) colorClass = 'low';
    else if (score < 90) colorClass = 'medium';

    return (
      <div className="confidence-meter">
        <div className="score-bar-bg" style={{ width: '42px' }}>
          <div className={`score-bar-fill ${colorClass}`} style={{ width: `${score}%` }}></div>
        </div>
        <span className="score-text" style={{ fontSize: '11px' }}>{score}%</span>
      </div>
    );
  };

  return (
    <div className="material-master-page">
      {/* HEADER */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Material Master</span>
            <span className="badge badge-neutral" style={{ fontSize: '11.5px', fontWeight: 600 }}>
              {filteredRecords.length} {filteredRecords.length === 1 ? 'Record' : 'Records'}
            </span>
            <span className="badge badge-blue" style={{ fontSize: '11px' }}>
              8 CPSEs Participating
            </span>
          </h1>
          <div className="view-subtitle">
            Unified view of material records across participating CPSEs.
          </div>
        </div>

        <div className="view-actions">
          <button 
            className="btn btn-secondary" 
            onClick={() => onNavigate && onNavigate('crosswalk')}
            title="View CPSE Crosswalk Matrix"
          >
            <Layers size={14} />
            <span>Legacy Crosswalk</span>
          </button>
          <button 
            className="btn btn-primary" 
            onClick={() => onNavigate && onNavigate('harmonization')}
            title="Launch AI Harmonization Engine"
          >
            <Sparkles size={14} />
            <span>Harmonization Studio</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="card-section">
        {/* DESKTOP TOOLBAR */}
        <div className="table-toolbar desktop-only">
          <div className="toolbar-left" style={{ flexWrap: 'wrap', gap: '8px' }}>
            {/* Search Input */}
            <div className="search-input-inline" style={{ minWidth: '240px' }}>
              <Search size={13} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search material code or description..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch('')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}
                  title="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* CPSE Filter */}
            <select
              className="select-filter"
              value={selectedCPSE}
              onChange={(e) => {
                if (onSelectCPSE) onSelectCPSE(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by CPSE"
            >
              <option value="ALL">All CPSEs</option>
              {CPSE_LIST.filter(c => c.id !== 'ALL').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortName}
                </option>
              ))}
            </select>

            {/* Material Category Filter */}
            <select
              className="select-filter"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by Material Category"
            >
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Unit Filter */}
            <select
              className="select-filter"
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by Unit of Measure (UOM)"
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>

            {/* Harmonization Status Filter */}
            <select
              className="select-filter"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by Harmonization Status"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Harmonized">Harmonized</option>
              <option value="Review Required">Review Required</option>
              <option value="Unmatched">Unmatched</option>
              <option value="Rejected">Rejected</option>
            </select>

            {/* AI Confidence Filter */}
            <select
              className="select-filter"
              value={selectedConfidence}
              onChange={(e) => {
                setSelectedConfidence(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by AI Confidence Score"
            >
              <option value="All Confidence">All Confidence</option>
              <option value="High (≥90%)">High (≥90%)</option>
              <option value="Medium (75%-89%)">Medium (75%-89%)</option>
              <option value="Low (<75%)">Low (&lt;75%)</option>
            </select>
          </div>

          <div className="toolbar-right">
            {/* Advanced Filters Button */}
            <button
              className={`btn btn-secondary ${showAdvancedFilters ? 'active' : ''}`}
              onClick={() => setShowAdvancedFilters(prev => !prev)}
              style={{
                backgroundColor: showAdvancedFilters ? 'var(--accent-subtle)' : undefined,
                borderColor: showAdvancedFilters ? 'var(--accent-primary)' : undefined,
                color: showAdvancedFilters ? 'var(--accent-primary)' : undefined
              }}
              title="Toggle Advanced Parameters"
            >
              <SlidersHorizontal size={13} />
              <span>Advanced Filters</span>
            </button>

            {/* Export Button */}
            <button
              className="btn btn-secondary"
              onClick={handleExportCSV}
              title="Export Current Filtered Dataset to CSV"
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 13. RESPONSIVE MOBILE FILTER TOOLBAR */}
        <div className="mobile-only mobile-filter-bar">
          <div className="search-input-inline" style={{ width: '100%' }}>
            <Search size={14} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search code, description, or spec..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch('')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--text-muted)' }}
                title="Clear search"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="mobile-filter-actions-row">
            <button
              className={`btn btn-secondary btn-sm ${showMobileFilters ? 'active' : ''}`}
              onClick={() => setShowMobileFilters(prev => !prev)}
              style={{ flex: 1, height: '38px', justifyContent: 'center' }}
            >
              <SlidersHorizontal size={13} />
              <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={handleExportCSV}
              style={{ height: '38px' }}
              title="Export to CSV"
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>

          {showMobileFilters && (
            <div className="mobile-filters-drawer">
              <div className="mobile-filter-group">
                <label>CPSE Scope</label>
                <select
                  className="select-filter"
                  value={selectedCPSE}
                  onChange={(e) => {
                    if (onSelectCPSE) onSelectCPSE(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="ALL">All CPSEs</option>
                  {CPSE_LIST.filter(c => c.id !== 'ALL').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.shortName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>Material Category</label>
                <select
                  className="select-filter"
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>Unit of Measure (UOM)</label>
                <select
                  className="select-filter"
                  value={selectedUnit}
                  onChange={(e) => {
                    setSelectedUnit(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>Harmonization Status</label>
                <select
                  className="select-filter"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All Statuses">All Statuses</option>
                  <option value="Harmonized">Harmonized</option>
                  <option value="Review Required">Review Required</option>
                  <option value="Unmatched">Unmatched</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>AI Confidence Score</label>
                <select
                  className="select-filter"
                  value={selectedConfidence}
                  onChange={(e) => {
                    setSelectedConfidence(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All Confidence">All Confidence</option>
                  <option value="High (≥90%)">High (≥90%)</option>
                  <option value="Medium (75%-89%)">Medium (75%-89%)</option>
                  <option value="Low (<75%)">Low (&lt;75%)</option>
                </select>
              </div>

              <div className="mobile-filter-group">
                <label>Manufacturer</label>
                <input
                  type="text"
                  placeholder="e.g. TVS, L&T, SKF..."
                  className="select-filter"
                  value={manufacturerFilter}
                  onChange={(e) => {
                    setManufacturerFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              <div className="mobile-filter-group">
                <label>Min AI Similarity ({minSimilarity}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minSimilarity}
                  onChange={(e) => {
                    setMinSimilarity(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                />
              </div>

              {activeFiltersCount > 0 && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleResetFilters}
                  style={{ width: '100%', height: '36px', marginTop: '6px', justifyContent: 'center' }}
                >
                  <RotateCcw size={12} />
                  <span>Reset All Filters ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* ADVANCED FILTERS PANEL */}
        {showAdvancedFilters && (
          <div className="advanced-filters-panel">
            {/* Manufacturer Filter */}
            <div className="advanced-filter-item">
              <span className="advanced-filter-label">Manufacturer:</span>
              <input
                type="text"
                placeholder="e.g. TVS, L&T, SKF..."
                className="select-filter"
                style={{ width: '150px' }}
                value={manufacturerFilter}
                onChange={(e) => {
                  setManufacturerFilter(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* Min Similarity Score Slider */}
            <div className="advanced-filter-item">
              <span className="advanced-filter-label">Min AI Similarity:</span>
              <div className="range-slider-wrapper">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={minSimilarity}
                  onChange={(e) => {
                    setMinSimilarity(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                />
                <span className="slider-val-badge">{minSimilarity}%</span>
              </div>
            </div>

            {/* Reset All Action */}
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleResetFilters}
              style={{ marginLeft: 'auto' }}
              title="Reset all search queries and filters to defaults"
            >
              <RotateCcw size={11} />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* MAIN TABLE (DESKTOP VIEW) */}
        <div className="table-container desktop-only">
          <table className="data-table master-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('materialCode')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Material Code</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('cpse')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>CPSE</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('materialDescription')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Material Description</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('normalizedDescription')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Normalized Description</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Category</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th>UOM</th>
                <th>Specification</th>
                <th onClick={() => handleSort('harmonizedCode')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Harmonized Code</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('similarity')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Similarity</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Status</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('lastUpdated')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Last Updated</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ textAlign: 'center', width: '70px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={12} style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <AlertCircle size={28} style={{ margin: '0 auto', color: '#94a3b8' }} />
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      No material records found matching your filters
                    </div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      Try adjusting the search query, category, or resetting advanced criteria.
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleResetFilters}
                      style={{ marginTop: '12px' }}
                    >
                      <RotateCcw size={12} />
                      <span>Reset Filters</span>
                    </button>
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => {
                  const isSelected = activeItem?.materialCode === item.materialCode;
                  return (
                    <tr
                      key={item.materialCode}
                      className={isSelected ? 'row-active' : ''}
                      onClick={() => setActiveCode(item.materialCode)}
                      title="Click row to inspect full normalization and harmonization details"
                    >
                      {/* Material Code */}
                      <td>
                        <span className="code-pill">
                          {item.materialCode}
                        </span>
                      </td>

                      {/* CPSE */}
                      <td>
                        <span className={`cpse-tag ${item.cpse.toLowerCase()}`}>
                          {item.cpse}
                        </span>
                      </td>

                      {/* Material Description */}
                      <td className="desc-cell" title={item.materialDescription}>
                        {item.materialDescription}
                      </td>

                      {/* Normalized Description */}
                      <td className="desc-cell desc-normalized" title={item.normalizedDescription}>
                        <Sparkles size={12} color="#0284c7" style={{ flexShrink: 0 }} />
                        <span>{item.normalizedDescription}</span>
                      </td>

                      {/* Category */}
                      <td>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                          {item.category}
                        </span>
                      </td>

                      {/* UOM */}
                      <td>
                        <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>
                          {item.uom}
                        </span>
                      </td>

                      {/* Specification */}
                      <td style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.specification}>
                        <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                          {item.specification || '—'}
                        </span>
                      </td>

                      {/* Harmonized Code */}
                      <td>
                        <span className="code-pill harmonized">
                          {item.harmonizedCode}
                        </span>
                      </td>

                      {/* Similarity */}
                      <td>
                        {getSimilarityBadge(item.similarity)}
                      </td>

                      {/* Status */}
                      <td>
                        {getStatusBadge(item.status)}
                      </td>

                      {/* Last Updated */}
                      <td style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                        {item.lastUpdated}
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCode(item.materialCode);
                          }}
                          title="Open detailed side panel"
                          style={{ padding: '3px 6px', fontSize: '11px' }}
                        >
                          <Eye size={12} />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 11. MOBILE CARDS VIEW (Transforms wide table into responsive material cards) */}
        <div className="mobile-only material-mobile-cards-list">
          {paginatedRecords.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)', fontSize: '13px' }}>
              No material records found matching your filters.
            </div>
          ) : (
            paginatedRecords.map((item) => (
              <div
                key={`mobile-${item.materialCode}`}
                className="material-mobile-card"
                onClick={() => setActiveCode(item.materialCode)}
              >
                <div className="material-mobile-card-header">
                  <span className="code-pill mono" style={{ fontWeight: 700, fontSize: '12px' }}>
                    {item.materialCode}
                  </span>
                  {getStatusBadge(item.status)}
                </div>

                <div className="material-mobile-card-title">
                  {item.materialDescription}
                </div>

                {item.specification && (
                  <div className="material-mobile-card-sub">
                    {item.specification}
                  </div>
                )}

                <div className="material-mobile-card-tags">
                  <span className="cpse-tag" style={{ fontWeight: 600 }}>{item.cpse}</span>
                  <span className="bullet-sep">·</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.category}</span>
                </div>

                <div className="material-mobile-card-meta-grid">
                  <div className="meta-box">
                    <span className="meta-label">Similarity</span>
                    <strong style={{ color: item.similarity >= 90 ? '#15803D' : item.similarity >= 75 ? '#B45309' : '#DC2626', fontFamily: 'var(--font-mono)' }}>
                      {item.similarity}%
                    </strong>
                  </div>
                  <div className="meta-box">
                    <span className="meta-label">Harmonized Code</span>
                    <span className="code-pill harmonized" style={{ fontSize: '11px' }}>
                      {item.harmonizedCode || '—'}
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', height: '38px', justifyContent: 'center' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCode(item.materialCode);
                  }}
                >
                  <Eye size={13} />
                  <span>View Details</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* CUSTOM ENTERPRISE PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredRecords.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[10, 25, 50]}
          itemName="records"
        />
      </div>

      {/* DETAILED SIDE PANEL (DRAWER) */}
      {activeItem && (
        <div className="drawer-overlay" onClick={() => setActiveCode(null)}>
          <div 
            className="drawer-panel" 
            onClick={(e) => e.stopPropagation()}
            style={{ width: '560px' }}
          >
            {/* Drawer Header */}
            <div className="drawer-header">
              <div>
                <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Material Details
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeItem.harmonizedCode || activeItem.materialCode}
                  </span>
                  <button
                    className="btn-icon-subtle"
                    onClick={() => handleCopyCode(activeItem.harmonizedCode || activeItem.materialCode)}
                    title="Copy code"
                  >
                    {copiedCode ? <Check size={13} color="var(--status-success)" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <button
                className="btn-icon-subtle"
                onClick={() => setActiveCode(null)}
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="drawer-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Material Title & Subtitle */}
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.35 }}>
                  {activeItem.normalizedDescription || activeItem.materialDescription}
                </h2>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {activeItem.dimensions || 'M10 × 50 mm'} · Grade {activeItem.grade || '8.8'}
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', width: '100%' }} />

              {/* Standardized Attributes */}
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  Standardized Attributes
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Material</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', fontSize: '13px' }}>
                      {activeItem.material || 'Carbon Steel'}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Dimension</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', fontSize: '13px' }}>
                      {activeItem.dimensions || 'M10 × 50 mm'}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Grade</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', fontSize: '13px' }}>
                      {activeItem.grade || '8.8'}
                    </div>
                  </div>
                  <div style={{ padding: '8px 10px', backgroundColor: 'var(--bg-canvas)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>UOM</div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px', fontSize: '13px' }}>
                      {activeItem.uom || 'EA'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', width: '100%' }} />

              {/* Mapped CPSE Records */}
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  Mapped CPSE Records
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { cpse: 'BHEL', code: 'BHEL-FST-10921' },
                    { cpse: 'NTPC', code: 'NTPC-BLT-88231' },
                    { cpse: 'IOCL', code: 'IOCL-FST-19283' }
                  ].map((rec) => (
                    <div
                      key={rec.code}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: 'var(--bg-canvas)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="cpse-tag">{rec.cpse}</span>
                        <span className="code-pill">{rec.code}</span>
                      </div>
                      <span className="badge badge-approved" style={{ fontSize: '10px' }}>
                        Mapped
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: 'var(--border-subtle)', width: '100%' }} />

              {/* AI Confidence */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    AI Confidence
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {activeItem.similarity}%
                  </span>
                </div>
                <div className="thin-progress-bar">
                  <div className="thin-progress-fill" style={{ width: `${activeItem.similarity}%` }} />
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  • High certainty match based on identical thread dimension, carbon steel metallurgy, and ISO specification.
                </div>
              </div>

              {/* Rejection Prompt Inline */}
              {rejectPromptOpen && (
                <div style={{ padding: '10px 12px', backgroundColor: 'var(--status-error-bg)', border: '1px solid var(--status-error-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--status-error)', marginBottom: '4px' }}>
                    State Rejection Reason:
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Incompatible grade..."
                    className="select-filter"
                    style={{ width: '100%', marginBottom: '8px' }}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    autoFocus
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setRejectPromptOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleReject}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer Actions */}
            <div className="drawer-footer">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleSendForReview}
                  style={{ minHeight: '36px' }}
                >
                  <span>Review</span>
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setRejectPromptOpen(prev => !prev)}
                    style={{ color: 'var(--status-error)', minHeight: '36px' }}
                  >
                    <span>Reject</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setShowApproveConfirm(true)}
                    style={{ minHeight: '36px' }}
                  >
                    <Check size={13} />
                    <span>Approve Mapping</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog: Approve Material Mapping */}
      {showApproveConfirm && activeItem && (
        <div className="confirm-modal-overlay" onClick={() => setShowApproveConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <CheckCircle2 size={16} color="#16a34a" />
                <span>Confirm Material Harmonization</span>
              </div>
              <button
                onClick={() => setShowApproveConfirm(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <div style={{ marginBottom: '10px' }}>
                Confirm publication of harmonized mapping to the National Master Catalog:
              </div>
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '12px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeItem.materialCode} ({activeItem.cpse})
                </div>
                <div style={{ fontSize: '12px', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>
                  Target Unified Code: {activeItem.harmonizedCode}
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Standard Description: {activeItem.normalizedDescription}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Similarity Match: {activeItem.similarity}% • Category: {activeItem.category} • UOM: {activeItem.uom}
                </div>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                This approval updates the central material registry across all participating CPSE instances and enters a timestamped event into the Governance Audit Trail.
              </div>
            </div>

            <div className="confirm-modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowApproveConfirm(false)}>
                Cancel
              </button>
              <button className="btn btn-success btn-sm" onClick={handleApprove}>
                <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
                Confirm & Harmonize
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
            <span>Consolidated CPSE Material Master Registry • GFR 2017 Compliant</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Enterprise Unified Data Management System v4.2</span>
        </div>
      </footer>
    </div>
  );
}
