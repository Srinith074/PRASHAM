import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  Eye,
  ArrowUpDown,
  Building2,
  GitFork
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';
import Pagination from './Pagination';

// Visual Mapping Trees Configuration
const VISUAL_MAPPINGS = [
  {
    harmonizedCode: 'HMF-FAST-00128',
    standardDescription: 'Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8',
    category: 'Fasteners',
    confidence: '98.2%',
    branches: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-FST-10921',
        originalDescription: 'HEX BOLT M10X50 GR 8.8',
        plant: 'Haridwar HEEP',
        erpSystem: 'SAP ECC 6.0',
        uom: 'EA',
        price: 84.50,
        confidence: 98.2,
        status: 'Active',
        dimensions: 'M10 × 50 mm',
        material: 'Carbon Steel Grade 8.8',
        aiReasoning: 'Matched because the records share the same material category (Fasteners), thread diameter (M10), length (50 mm), material grade (Class 8.8), and functional head geometry. Minor differences were detected in naming convention and word order.'
      },
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-BLT-88231',
        originalDescription: 'HEXAGONAL HEAD BOLT 10 MM X 50 MM CLASS 8.8',
        plant: 'Ramagundam STPP',
        erpSystem: 'SAP S/4HANA',
        uom: 'NOS',
        price: 89.00,
        confidence: 97.8,
        status: 'Active',
        dimensions: '10 mm × 50 mm',
        material: 'Medium Carbon Steel',
        aiReasoning: 'Exact semantic equivalence for 10mm x 50mm metric hex head screw. Standardized unit NOS unified to standard ISO EA.'
      },
      {
        cpse: 'IOCL',
        originalCode: 'IOCL-FST-19283',
        originalDescription: 'MS HEX HEAD BOLT M10*50, GR8.8',
        plant: 'Panipat Refinery',
        erpSystem: 'Oracle E-Business Suite',
        uom: 'EA',
        price: 82.00,
        confidence: 96.5,
        status: 'Active',
        dimensions: 'M10 * 50',
        material: 'Mild Steel / Carbon Steel',
        aiReasoning: 'Reconciled asterisk notation (M10*50) to standardized metric syntax M10 × 50 mm. Verified Grade 8.8 mechanical properties.'
      }
    ]
  },
  {
    harmonizedCode: 'HMF-VAL-00082',
    standardDescription: 'Gate Valve DN100 (4") Class 150 Flanged Carbon Steel WCB',
    category: 'Valves & Actuators',
    confidence: '95.4%',
    branches: [
      {
        cpse: 'ONGC',
        originalCode: 'ONGC-VAL-8821',
        originalDescription: 'Gate Valve 100 NB CS 150# Flanged API 600',
        plant: 'Mumbai High Offshore',
        erpSystem: 'SAP S/4HANA',
        uom: 'EA',
        price: 38500,
        confidence: 94.7,
        status: 'Pending Review',
        dimensions: '100 NB (DN100)',
        material: 'Carbon Steel (ASTM A216 WCB)',
        aiReasoning: 'Matched envelope geometry (100 NB = 4 Inch) and pressure rating (150# = Class 150). Flagged for review due to offshore trim specification.'
      },
      {
        cpse: 'GAIL',
        originalCode: 'GAIL-VLV-1102',
        originalDescription: '4" Bolted Bonnet Gate Valve A216 WCB 150# RF',
        plant: 'Vijaipur Compressor',
        erpSystem: 'SAP S/4HANA',
        uom: 'NOS',
        price: 39800,
        confidence: 95.4,
        status: 'Active',
        dimensions: '4 Inch (100 mm)',
        material: 'Cast Steel A216 WCB',
        aiReasoning: 'Exact engineering equivalence for 4 Inch Class 150 raised face flanged cast steel API 600 gate valve.'
      },
      {
        cpse: 'IOCL',
        originalCode: 'IOCL-VAL-3091',
        originalDescription: 'Valve Gate 4 Inch CS 150# Flanged',
        plant: 'Mathura Refinery',
        erpSystem: 'Oracle EBS',
        uom: 'EA',
        price: 38200,
        confidence: 96.2,
        status: 'Active',
        dimensions: '4 Inch',
        material: 'Carbon Steel WCB',
        aiReasoning: 'Unified inverted noun-modifier description (Valve Gate -> Gate Valve). 100% attribute parity verified.'
      }
    ]
  },
  {
    harmonizedCode: 'HMF-PIPE-00214',
    standardDescription: 'Seamless Carbon Steel Pipe 4" (100 NB) Sch 40 ASTM A106 Gr B',
    category: 'Piping & Tubing',
    confidence: '98.5%',
    branches: [
      {
        cpse: 'GAIL',
        originalCode: 'GAIL-PIP-4491',
        originalDescription: 'Seamless Pipe 4" Sch 40 A106 Gr B',
        plant: 'HVJ Gas Pipeline',
        erpSystem: 'SAP S/4HANA',
        uom: 'MTR',
        price: 2850,
        confidence: 98.6,
        status: 'Active',
        dimensions: '4 Inch / Sch 40',
        material: 'ASTM A106 Grade B',
        aiReasoning: 'Identical steel metallurgy (ASTM A106 Gr B), size (4 Inch), wall schedule (Schedule 40), and seamless manufacturing process.'
      },
      {
        cpse: 'IOCL',
        originalCode: 'IOCL-PIP-1002',
        originalDescription: 'Pipe CS SMLS 100 NB Sch 40 ASTM A106 Gr B',
        plant: 'Panipat Refinery',
        erpSystem: 'SAP S/4HANA',
        uom: 'MTR',
        price: 2890,
        confidence: 99.1,
        status: 'Active',
        dimensions: '100 NB / Sch 40',
        material: 'CS ASTM A106-B',
        aiReasoning: 'Harmonized 100 NB abbreviation to 4 Inch NPS standard. Complete specification match.'
      },
      {
        cpse: 'ONGC',
        originalCode: 'ONGC-DRL-4819',
        originalDescription: 'Carbon Steel Pipe Seamless 4" Nominal Sch 40 Beveled',
        plant: 'Mehsana Asset',
        erpSystem: 'SAP S/4HANA',
        uom: 'MTR',
        price: 2940,
        confidence: 97.4,
        status: 'Active',
        dimensions: '4" NPS / Sch 40',
        material: 'Carbon Steel A106-B',
        aiReasoning: 'Verified beveled end line pipe specification for high pressure process piping.'
      },
      {
        cpse: 'SAIL',
        originalCode: 'SAIL-RSP-7712',
        originalDescription: 'Carbon Steel Seamless Pipe 100 NB Sch 40 ASTM A106 Gr B',
        plant: 'Rourkela Steel Plant',
        erpSystem: 'Oracle EBS',
        uom: 'MTR',
        price: 2820,
        confidence: 96.8,
        status: 'Active',
        dimensions: '100 NB / 6.02mm WT',
        material: 'ASTM A106 Grade B',
        aiReasoning: 'Cross-plant metallurgical and dimensional match confirmed with national pipeline standards.'
      }
    ]
  },
  {
    harmonizedCode: 'HMF-BEAR-00045',
    standardDescription: 'Deep Groove Ball Bearing 6308-2RS C3 (40 × 90 × 23 mm)',
    category: 'Bearings & Transmission',
    confidence: '98.9%',
    branches: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-BRG-6308',
        originalDescription: 'Deep Groove Ball Bearing 6308 2RS C3',
        plant: 'Bhopal Heavy Electricals',
        erpSystem: 'SAP ECC',
        uom: 'EA',
        price: 890,
        confidence: 99.4,
        status: 'Active',
        dimensions: '40 × 90 × 23 mm',
        material: 'High Carbon Chromium Steel',
        aiReasoning: 'ISO 6308 designates exact 40x90x23mm envelope. 2RS indicates dual rubber contact seals and C3 specifies thermal radial clearance.'
      },
      {
        cpse: 'SAIL',
        originalCode: 'SAIL-DSP-4011',
        originalDescription: 'Bearing Ball 6308-2RS1/C3 Dims 40x90x23 mm',
        plant: 'Durgapur Steel Plant',
        erpSystem: 'Oracle EBS',
        uom: 'PCS',
        price: 915,
        confidence: 98.7,
        status: 'Active',
        dimensions: '40x90x23 mm',
        material: 'Bearing Steel 100Cr6',
        aiReasoning: 'Harmonized 2RS1 (SKF designation) to unified 2RS standard seal nomenclature.'
      },
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-EL-8812',
        originalDescription: 'Radial Ball Bearing Rubber Sealed Both Sides 6308 2RS C3',
        plant: 'Korba Thermal Power',
        erpSystem: 'SAP S/4HANA',
        uom: 'NOS',
        price: 875,
        confidence: 97.9,
        status: 'Active',
        dimensions: '40 mm ID × 90 mm OD × 23 mm W',
        material: 'SAE 52100 Alloy Steel',
        aiReasoning: 'Verbose long text normalized to concise standard deep groove ball bearing 6308-2RS C3.'
      }
    ]
  }
];

// Flatten all entries for the detailed crosswalk table
const ALL_CROSSWALK_ROWS = VISUAL_MAPPINGS.flatMap(m => 
  m.branches.map(b => ({
    harmonizedCode: m.harmonizedCode,
    standardDescription: m.standardDescription,
    category: m.category,
    cpse: b.cpse,
    originalCode: b.originalCode,
    originalDescription: b.originalDescription,
    plant: b.plant,
    erpSystem: b.erpSystem,
    uom: b.uom,
    price: b.price,
    confidence: b.confidence,
    status: b.status,
    dimensions: b.dimensions,
    material: b.material,
    aiReasoning: b.aiReasoning
  }))
);

export default function MappingCrosswalk({
  selectedCPSE = 'ALL',
  onSelectCPSE,
  onNavigate,
  showToast
}) {
  // Active tree selection (Default to flagship HMF-FAST-00128)
  const [selectedHarmonizedCode, setSelectedHarmonizedCode] = useState('HMF-FAST-00128');

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [filterConfidence, setFilterConfidence] = useState('All Confidence');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sorting
  const [sortField, setSortField] = useState('harmonizedCode');
  const [sortDirection, setSortDirection] = useState('asc');

  // Inspection Modal
  const [inspectedMapping, setInspectedMapping] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Current visual mapping tree object
  const currentTree = useMemo(() => {
    return VISUAL_MAPPINGS.find(m => m.harmonizedCode === selectedHarmonizedCode) || VISUAL_MAPPINGS[0];
  }, [selectedHarmonizedCode]);

  // Filtered rows for the detailed table
  const filteredRows = useMemo(() => {
    return ALL_CROSSWALK_ROWS.filter(row => {
      // CPSE
      if (selectedCPSE && selectedCPSE !== 'ALL' && row.cpse !== selectedCPSE) {
        return false;
      }
      // Category
      if (filterCategory !== 'All Categories' && row.category !== filterCategory) {
        return false;
      }
      // Status
      if (filterStatus !== 'All Statuses' && row.status !== filterStatus) {
        return false;
      }
      // Confidence
      if (filterConfidence !== 'All Confidence') {
        if (filterConfidence === 'High (≥90%)' && row.confidence < 90) return false;
        if (filterConfidence === 'Medium (75%-89%)' && (row.confidence < 75 || row.confidence >= 90)) return false;
        if (filterConfidence === 'Low (<75%)' && row.confidence >= 75) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchHarm = row.harmonizedCode.toLowerCase().includes(q);
        const matchCpse = row.cpse.toLowerCase().includes(q);
        const matchOrigCode = row.originalCode.toLowerCase().includes(q);
        const matchOrigDesc = row.originalDescription.toLowerCase().includes(q);
        const matchStdDesc = row.standardDescription.toLowerCase().includes(q);
        if (!matchHarm && !matchCpse && !matchOrigCode && !matchOrigDesc && !matchStdDesc) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCPSE, filterCategory, filterStatus, filterConfidence, searchQuery]);

  // Sorted rows
  const sortedRows = useMemo(() => {
    return [...filteredRows].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal || '').toLowerCase();
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [filteredRows, sortField, sortDirection]);

  // Paginated rows
  const paginatedRows = useMemo(() => {
    return sortedRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [sortedRows, currentPage, pageSize]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Export Crosswalk CSV
  const handleExportCSV = () => {
    const headers = [
      'Harmonized Code',
      'Standard Description',
      'Category',
      'CPSE',
      'Original Code',
      'Original Description',
      'Confidence (%)',
      'Mapping Status',
      'Plant',
      'Legacy ERP System'
    ];

    const rows = filteredRows.map(r => [
      `"${r.harmonizedCode}"`,
      `"${r.standardDescription.replace(/"/g, '""')}"`,
      `"${r.category}"`,
      `"${r.cpse}"`,
      `"${r.originalCode}"`,
      `"${r.originalDescription.replace(/"/g, '""')}"`,
      r.confidence,
      `"${r.status}"`,
      `"${r.plant}"`,
      `"${r.erpSystem}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Material_Code_Crosswalk_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (showToast) {
      showToast(`Exported ${filteredRows.length} crosswalk mapping records to CSV.`);
    }
  };

  // Copy code helper
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    if (showToast) {
      showToast(`Code ${code} copied to clipboard!`);
    }
  };

  return (
    <div className="material-code-crosswalk-page">
      {/* PAGE HEADER */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Material Code Crosswalk</span>
            <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: 600 }}>
              {ALL_CROSSWALK_ROWS.length} Legacy Crosswalk Mappings
            </span>
          </h1>
          <div className="view-subtitle">
            Trace relationships between CPSE-specific material codes and harmonized material identities.
          </div>
        </div>

        <div className="view-actions">
          {/* Export Crosswalk Button */}
          <button
            className="btn btn-primary"
            onClick={handleExportCSV}
            title="Export full crosswalk mapping directory to CSV"
          >
            <Download size={14} />
            <span>Export Crosswalk</span>
          </button>
        </div>
      </div>

      {/* VISUAL RESTRAINED MAPPING LAYOUT (Simple lines and boxes) */}
      <div className="crosswalk-visual-panel">
        <div className="crosswalk-visual-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitFork size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px', color: 'var(--text-primary)' }}>
              Hierarchical Material Mapping Topology
            </span>
          </div>

          {/* Material Tree Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)' }}>Focus Material:</span>
            <select
              className="select-filter"
              value={selectedHarmonizedCode}
              onChange={(e) => setSelectedHarmonizedCode(e.target.value)}
              style={{ fontWeight: 600, fontSize: '12px', padding: '4px 8px' }}
            >
              {VISUAL_MAPPINGS.map(m => (
                <option key={m.harmonizedCode} value={m.harmonizedCode}>
                  {m.harmonizedCode} — {m.category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tree Render with lines and boxes */}
        <div className="crosswalk-tree-container">
          
          {/* Top Box: HARMONIZED MATERIAL */}
          <div className="crosswalk-root-box">
            <div className="crosswalk-root-label">HARMONIZED MATERIAL</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span className="crosswalk-root-code">{currentTree.harmonizedCode}</span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleCopy(currentTree.harmonizedCode)}
                title="Copy Code"
                style={{ padding: '2px 5px', backgroundColor: '#ffffff' }}
              >
                {copiedCode ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
              </button>
            </div>
            <div className="crosswalk-root-desc">
              {currentTree.standardDescription}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '6px' }}>
              <span className="badge badge-blue" style={{ fontSize: '10.5px' }}>{currentTree.category}</span>
              <span className="badge badge-approved" style={{ fontSize: '10.5px' }}>Confidence: {currentTree.confidence}</span>
            </div>
          </div>

          {/* Central Stem Line Down */}
          <div className="crosswalk-stem-down" />

          {/* Horizontal Branch Bar */}
          <div className="crosswalk-branch-wrapper">
            <div
              className="crosswalk-branch-bar"
              style={{
                width: `${Math.min(currentTree.branches.length * 220, 840)}px`
              }}
            />

            {/* Branches Row */}
            <div className="crosswalk-branches-row" style={{ marginTop: 0 }}>
              {currentTree.branches.map((b) => (
                <div key={b.originalCode} className="crosswalk-branch-col">
                  {/* Stem from horizontal bar to CPSE Node */}
                  <div className="crosswalk-stem-sub" />

                  {/* CPSE Node Box */}
                  <div className="crosswalk-cpse-node">
                    <span className={`cpse-tag ${b.cpse.toLowerCase()}`} style={{ fontSize: '10.5px' }}>
                      {b.cpse}
                    </span>
                    <span>{b.cpse} Enterprise</span>
                  </div>

                  {/* Stem from CPSE Node to Code Box */}
                  <div className="crosswalk-code-stem" />

                  {/* Leaf Box: Original Code & Raw Description */}
                  <div
                    className="crosswalk-leaf-node"
                    onClick={() => setInspectedMapping({
                      harmonizedCode: currentTree.harmonizedCode,
                      standardDescription: currentTree.standardDescription,
                      category: currentTree.category,
                      ...b
                    })}
                    title="Click to view full source record and AI reasoning"
                  >
                    <div className="crosswalk-leaf-code">
                      {b.originalCode}
                    </div>
                    <div className="crosswalk-leaf-desc">
                      “{b.originalDescription}”
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px', paddingTop: '4px', borderTop: '1px dashed #e2e8f0' }}>
                      <span>{b.plant}</span>
                      <span style={{ fontWeight: 600, color: '#15803d' }}>{b.confidence}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* DETAILED TABLE BELOW IT */}
      <div className="card-section">
        <div className="card-header">
          <div className="card-title">
            <Layers size={16} color="var(--accent-primary)" />
            <span>Cross-CPSE Material Mapping Directory</span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
            Showing {filteredRows.length} mappings across participating enterprises
          </span>
        </div>

        {/* Filters Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-left" style={{ flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Filters:</span>

            {/* Search */}
            <div className="search-input-inline" style={{ minWidth: '220px' }}>
              <Search size={13} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="Search code or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

            {/* CPSE Filter */}
            <select
              className="select-filter"
              value={selectedCPSE || 'ALL'}
              onChange={(e) => {
                if (onSelectCPSE) onSelectCPSE(e.target.value);
                setCurrentPage(1);
              }}
              title="Filter by CPSE"
            >
              <option value="ALL">All CPSEs</option>
              {CPSE_LIST.filter(c => c.id !== 'ALL').map(c => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              className="select-filter"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Categories">All Categories</option>
              {Array.from(new Set(ALL_CROSSWALK_ROWS.map(r => r.category))).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Mapping Status Filter */}
            <select
              className="select-filter"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Review">Pending Review</option>
            </select>

            {/* Confidence Filter */}
            <select
              className="select-filter"
              value={filterConfidence}
              onChange={(e) => {
                setFilterConfidence(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Confidence">All Confidence</option>
              <option value="High (≥90%)">High (≥90%)</option>
              <option value="Medium (75%-89%)">Medium (75%-89%)</option>
              <option value="Low (<75%)">Low (&lt;75%)</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('harmonizedCode')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Harmonized Code</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('cpse')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>CPSE</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('originalCode')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Original Code</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th>Original Description</th>
                <th>Standard Description</th>
                <th onClick={() => handleSort('confidence')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Confidence</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Mapping Status</span>
                    <ArrowUpDown size={11} />
                  </div>
                </th>
                <th style={{ textAlign: 'center', width: '80px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No crosswalk records found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row) => {
                  const isCurrentTree = row.harmonizedCode === selectedHarmonizedCode;
                  return (
                    <tr
                      key={`${row.harmonizedCode}-${row.originalCode}`}
                      className={isCurrentTree ? 'row-active' : ''}
                      onClick={() => {
                        setSelectedHarmonizedCode(row.harmonizedCode);
                        setInspectedMapping(row);
                      }}
                      style={{ cursor: 'pointer' }}
                      title="Click to view source record and AI reasoning"
                    >
                      {/* Harmonized Code */}
                      <td>
                        <span className="code-pill harmonized" style={{ fontWeight: 700 }}>
                          {row.harmonizedCode}
                        </span>
                      </td>

                      {/* CPSE */}
                      <td>
                        <span className={`cpse-tag ${row.cpse.toLowerCase()}`}>
                          {row.cpse}
                        </span>
                      </td>

                      {/* Original Code */}
                      <td>
                        <span className="code-pill">
                          {row.originalCode}
                        </span>
                      </td>

                      {/* Original Description */}
                      <td className="desc-cell" title={row.originalDescription}>
                        {row.originalDescription}
                      </td>

                      {/* Standard Description */}
                      <td className="desc-cell desc-normalized" title={row.standardDescription}>
                        <Sparkles size={11} color="#0284c7" style={{ flexShrink: 0 }} />
                        <span>{row.standardDescription}</span>
                      </td>

                      {/* Confidence */}
                      <td>
                        <div className="confidence-meter">
                          <div className="score-bar-bg" style={{ width: '42px' }}>
                            <div
                              className="score-bar-fill high"
                              style={{ width: `${row.confidence}%` }}
                            />
                          </div>
                          <span className="score-text" style={{ fontSize: '11px' }}>
                            {row.confidence}%
                          </span>
                        </div>
                      </td>

                      {/* Mapping Status */}
                      <td>
                        {row.status === 'Active' ? (
                          <span className="badge badge-approved">
                            <CheckCircle2 size={11} /> Active
                          </span>
                        ) : (
                          <span className="badge badge-pending">
                            <Clock size={11} /> Pending Review
                          </span>
                        )}
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: 'center' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedHarmonizedCode(row.harmonizedCode);
                            setInspectedMapping(row);
                          }}
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          title="Inspect mapping source and AI rationale"
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

        {/* Compact Floating-Style Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={sortedRows.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[10, 25, 50]}
          itemName="mappings"
        />
      </div>

      {/* SOURCE RECORD AND AI REASONING MODAL */}
      {inspectedMapping && (
        <div className="modal-overlay" onClick={() => setInspectedMapping(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ width: '740px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '13.5px', fontWeight: 700 }}>
                  Mapping Inspector: {inspectedMapping.originalCode} ↔ {inspectedMapping.harmonizedCode}
                </span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setInspectedMapping(null)}
                style={{ padding: '3px 6px' }}
              >
                <X size={14} />
              </button>
            </div>

            <div className="modal-body">
              {/* Mapping Overview Strip */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', textTransform: 'uppercase', color: '#1e3a8a', fontWeight: 700 }}>National Harmonized Target</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '15px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                      {inspectedMapping.harmonizedCode}
                    </span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleCopy(inspectedMapping.harmonizedCode)}
                      style={{ padding: '2px 5px', backgroundColor: '#ffffff' }}
                    >
                      {copiedCode ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                    </button>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 600 }}>
                    {inspectedMapping.standardDescription}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-approved" style={{ fontSize: '11px' }}>
                    {inspectedMapping.confidence}% Similarity Match
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Status: <strong>{inspectedMapping.status}</strong>
                  </div>
                </div>
              </div>

              {/* Source Record Details */}
              <div className="mm-detail-section" style={{ marginBottom: '16px' }}>
                <div className="mm-detail-title">
                  <Building2 size={14} color="var(--accent-primary)" />
                  <span>CPSE Source Record Information</span>
                </div>

                <div className="mm-info-grid">
                  <div className="mm-info-item">
                    <span className="mm-info-label">Enterprise</span>
                    <span className="mm-info-value">
                      <span className={`cpse-tag ${inspectedMapping.cpse.toLowerCase()}`}>{inspectedMapping.cpse}</span>
                    </span>
                  </div>

                  <div className="mm-info-item">
                    <span className="mm-info-label">Legacy Material Code</span>
                    <span className="mm-info-value mono">{inspectedMapping.originalCode}</span>
                  </div>

                  <div className="mm-info-item" style={{ gridColumn: 'span 2' }}>
                    <span className="mm-info-label">Original ERP Description</span>
                    <div className="source-desc-box" style={{ marginTop: '3px' }}>
                      “{inspectedMapping.originalDescription}”
                    </div>
                  </div>

                  <div className="mm-info-item">
                    <span className="mm-info-label">Operating Plant</span>
                    <span className="mm-info-value">{inspectedMapping.plant}</span>
                  </div>

                  <div className="mm-info-item">
                    <span className="mm-info-label">Source ERP System</span>
                    <span className="mm-info-value mono">{inspectedMapping.erpSystem}</span>
                  </div>

                  <div className="mm-info-item">
                    <span className="mm-info-label">Stock Unit of Measure</span>
                    <span className="mm-info-value"><span className="badge badge-neutral">{inspectedMapping.uom}</span></span>
                  </div>

                  <div className="mm-info-item">
                    <span className="mm-info-label">Unit Contract Price</span>
                    <span className="mm-info-value" style={{ fontWeight: 700 }}>₹{inspectedMapping.price?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="mm-detail-section">
                <div className="mm-detail-title">
                  <Sparkles size={14} color="#0284c7" />
                  <span>AI Reasoning & Alignment Rationale</span>
                </div>

                <div style={{ backgroundColor: '#f8fafc', borderLeft: '3px solid var(--accent-primary)', padding: '10px 12px', borderRadius: '0 var(--radius-xs) var(--radius-xs) 0', marginBottom: '12px', fontSize: '12px', lineHeight: 1.5 }}>
                  <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                    “{inspectedMapping.aiReasoning}”
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>METALLURGY</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>Verified 100%</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>DIMENSIONS</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>Exact Parity</div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 'var(--radius-xs)' }}>
                    <div style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>APPLICATION</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>Interchangeable</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {onNavigate && (
                  <>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setInspectedMapping(null);
                        onNavigate('master');
                      }}
                    >
                      View in Master Catalog
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setInspectedMapping(null);
                        onNavigate('harmonization');
                      }}
                    >
                      <Sparkles size={13} style={{ marginRight: '4px' }} />
                      AI Engine
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        setInspectedMapping(null);
                        onNavigate('audit');
                      }}
                    >
                      View Audit Trail
                    </button>
                  </>
                )}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setInspectedMapping(null)}
              >
                Close
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
            <span>Cross-Enterprise Material Crosswalk • GFR 2017 Compliant</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Unified Material Identity Framework v4.2</span>
        </div>
      </footer>

    </div>
  );
}
