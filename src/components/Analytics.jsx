import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Download,
  AlertTriangle,
  Layers,
  Sparkles,
  CheckCircle2,
  Building2,
  Check
} from 'lucide-react';
import Pagination from './Pagination';

// Monthly trend data for Section 1: Harmonization Progress
const HARMONIZATION_TREND = [
  { month: 'May 2026', ingested: 420000, harmonized: 110000, rate: 26.2 },
  { month: 'Jun 2026', ingested: 640000, harmonized: 225000, rate: 35.2 },
  { month: 'Jul 2026', ingested: 890000, harmonized: 412000, rate: 46.3 },
  { month: 'Aug 2026', ingested: 1080000, harmonized: 598000, rate: 55.4 },
  { month: 'Sep 2026', ingested: 1210000, harmonized: 742000, rate: 61.3 },
  { month: 'Oct 2026 (Current)', ingested: 1284620, harmonized: 878680, rate: 68.4 }
];

// CPSE Comparison Table Data for Section 3
const CPSE_COMPARISON_DATA = [
  {
    cpse: 'BHEL',
    records: 342180,
    duplicates: 34820,
    harmonized: 236100,
    pendingReview: 1420,
    dataQuality: 94.2
  },
  {
    cpse: 'NTPC',
    records: 284920,
    duplicates: 28140,
    harmonized: 198400,
    pendingReview: 980,
    dataQuality: 92.8
  },
  {
    cpse: 'IOCL',
    records: 248310,
    duplicates: 25600,
    harmonized: 172500,
    pendingReview: 840,
    dataQuality: 95.1
  },
  {
    cpse: 'ONGC',
    records: 194500,
    duplicates: 18920,
    harmonized: 129800,
    pendingReview: 620,
    dataQuality: 91.6
  },
  {
    cpse: 'SAIL',
    records: 138410,
    duplicates: 12850,
    harmonized: 94180,
    pendingReview: 310,
    dataQuality: 89.4
  },
  {
    cpse: 'GAIL',
    records: 76300,
    duplicates: 6150,
    harmonized: 47700,
    pendingReview: 116,
    dataQuality: 93.5
  }
];

// Category Analysis for Section 4 (Ranked by highest duplication)
const CATEGORY_DUPLICATION_DATA = [
  {
    category: 'Fasteners & Hardware',
    totalRecords: 135280,
    duplicates: 38420,
    duplicationRate: 28.4,
    consolidationPotential: 'High (GeM Bulk Tendering)',
    sampleOverlap: 'Hex Bolts M8-M24, Studs, Washers Grade 8.8 & SS304'
  },
  {
    category: 'Valves & Actuators',
    totalRecords: 108600,
    duplicates: 26180,
    duplicationRate: 24.1,
    consolidationPotential: 'Critical (High Unit Value)',
    sampleOverlap: 'Gate, Globe, Ball Valves DN50-DN200 Class 150/300'
  },
  {
    category: 'Piping, Tubes & Fittings',
    totalRecords: 103750,
    duplicates: 22410,
    duplicationRate: 21.6,
    consolidationPotential: 'High (Tonnage Rolling Rebates)',
    sampleOverlap: 'CS Seamless Pipes ASTM A106 Gr B, Sch 40/80'
  },
  {
    category: 'Mechanical Bearings',
    totalRecords: 85050,
    duplicates: 16840,
    duplicationRate: 19.8,
    consolidationPotential: 'Moderate (Direct OEM Sourcing)',
    sampleOverlap: 'Deep Groove Ball Bearings 6200-6300 Series C3'
  },
  {
    category: 'Pumps & Rotating Spares',
    totalRecords: 81000,
    duplicates: 12310,
    duplicationRate: 15.2,
    consolidationPotential: 'Moderate (High Wear Rationalization)',
    sampleOverlap: 'Centrifugal Slurry Impellers High Chrome ASTM A532'
  },
  {
    category: 'Electrical & Instrumentation',
    totalRecords: 83200,
    duplicates: 10320,
    duplicationRate: 12.4,
    consolidationPotential: 'Moderate (IS Standard Compliance)',
    sampleOverlap: 'LT Armoured XLPE Cables 1.1kV IS 7098, Terminal Blocks'
  }
];

export default function Analytics({ onNavigate }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Pagination for CPSE Comparison table
  const [cpsePage, setCpsePage] = useState(1);
  const [cpsePageSize, setCpsePageSize] = useState(4);
  const paginatedCPSE = useMemo(() => {
    return CPSE_COMPARISON_DATA.slice((cpsePage - 1) * cpsePageSize, cpsePage * cpsePageSize);
  }, [cpsePage, cpsePageSize]);

  // Pagination for Category Analysis table
  const [catPage, setCatPage] = useState(1);
  const [catPageSize, setCatPageSize] = useState(4);
  const paginatedCategories = useMemo(() => {
    return CATEGORY_DUPLICATION_DATA.slice((catPage - 1) * catPageSize, catPage * catPageSize);
  }, [catPage, catPageSize]);

  // Handle Export Report
  const handleExportReport = () => {
    const csvRows = [];
    csvRows.push(['PRASHAM - CPSE MATERIAL HARMONIZATION ANALYTICS REPORT']);
    csvRows.push(['Generated On', '2026-10-02 21:50 IST']);
    csvRows.push(['Disclaimer', 'Illustrative prototype estimates - not actual CPSE savings']);
    csvRows.push([]);

    // 1. Harmonization Progress
    csvRows.push(['--- 1. HARMONIZATION PROGRESS OVER TIME ---']);
    csvRows.push(['Month', 'Ingested Records', 'Harmonized Records', 'Harmonization Rate (%)']);
    HARMONIZATION_TREND.forEach(t => {
      csvRows.push([t.month, t.ingested, t.harmonized, `${t.rate}%`]);
    });
    csvRows.push([]);

    // 2. Duplicate Reduction
    csvRows.push(['--- 2. DUPLICATE REDUCTION SUMMARY ---']);
    csvRows.push(['Metric', 'Before Harmonization', 'After Harmonization', 'Delta']);
    csvRows.push(['Total Catalog Entries', '1,284,620', '842,310', '-34.4% SKU Reduction']);
    csvRows.push(['Unresolved Duplicates', '126,480', '27,738', '98,742 Duplicates Resolved']);
    csvRows.push(['Duplicate Resolution Rate', '0%', '78.1%', '+78.1% Resolved']);
    csvRows.push([]);

    // 3. CPSE Comparison
    csvRows.push(['--- 3. CPSE COMPARISON TABLE ---']);
    csvRows.push(['CPSE', 'Material Records', 'Duplicates', 'Harmonized', 'Pending Review', 'Data Quality (%)']);
    CPSE_COMPARISON_DATA.forEach(c => {
      csvRows.push([c.cpse, c.records, c.duplicates, c.harmonized, c.pendingReview, `${c.dataQuality}%`]);
    });
    csvRows.push([]);

    // 4. Category Duplication
    csvRows.push(['--- 4. CATEGORY DUPLICATION ANALYSIS ---']);
    csvRows.push(['Category', 'Total Records', 'Duplicates', 'Duplication Rate (%)', 'Consolidation Potential']);
    CATEGORY_DUPLICATION_DATA.forEach(cat => {
      csvRows.push([cat.category, cat.totalRecords, cat.duplicates, `${cat.duplicationRate}%`, cat.consolidationPotential]);
    });
    csvRows.push([]);

    // 5. AI Performance
    csvRows.push(['--- 5. AI PERFORMANCE METRICS ---']);
    csvRows.push(['Total AI Matches', '98,742']);
    csvRows.push(['Approved Matches', '94,456 (95.7%)']);
    csvRows.push(['Rejected Matches', '4,286 (4.3%)']);
    csvRows.push(['Average Confidence', '94.8%']);
    csvRows.push(['Human Review Rate', '14.2%']);
    csvRows.push([]);

    // 6. Procurement Impact (DEMO Estimates)
    csvRows.push(['--- 6. POTENTIAL PROCUREMENT IMPACT (DEMO ESTIMATES) ---']);
    csvRows.push(['Potential Duplicate Materials', '126,480']);
    csvRows.push(['Potential Consolidation Opportunities', '18,420']);
    csvRows.push(['Potential Procurement Standardization Opportunities', 'INR 548.6 Cr']);
    csvRows.push(['Note', 'Illustrative prototype estimates - not actual CPSE savings']);

    const csvContent = csvRows.map(row => row.map(val => `"${val}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CPSE_Harmonization_Analytics_Report_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Harmonization Analytics</span>
            <span className="badge badge-approved">Executive Insights</span>
          </h1>
          <div className="view-subtitle">
            Measure material master quality, standardization progress and cross-CPSE material overlap.
          </div>
        </div>

        <div className="view-actions">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {onNavigate && (
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('crosswalk')}>
                <Layers size={14} />
                <span>Material Crosswalk</span>
              </button>
            )}

            <button
              className="btn btn-primary btn-sm"
              onClick={handleExportReport}
            >
              {downloadSuccess ? (
                <>
                  <Check size={14} />
                  <span>Report Downloaded!</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Export Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: Harmonization Progress (Trend Over Time)                        */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--accent-primary)" />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                1. Harmonization Progress
              </h3>
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Multi-month trajectory of ingested material records vs standardized national catalog entries.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-approved" style={{ fontSize: '12px', padding: '3px 10px' }}>
              Current Rate: 68.4%
            </span>
          </div>
        </div>

        {/* Visual Trend Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {HARMONIZATION_TREND.map((item) => (
            <div key={item.month}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px', fontSize: '12px' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.month}</span>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Ingested: <strong>{item.ingested.toLocaleString()}</strong>
                  </span>
                  <span style={{ color: '#15803d', fontWeight: 700 }}>
                    Harmonized: <strong>{item.harmonized.toLocaleString()}</strong>
                  </span>
                  <span className="badge badge-neutral" style={{ fontSize: '11px', fontWeight: 700 }}>
                    {item.rate}%
                  </span>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{ height: '9px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
                <div
                  style={{
                    width: `${item.rate}%`,
                    backgroundColor: item.rate >= 60 ? '#10b981' : (item.rate >= 40 ? '#0284c7' : '#64748b'),
                    borderRadius: '4px',
                    transition: 'width 0.5s ease'
                  }}
                  title={`Harmonization Rate: ${item.rate}%`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: Duplicate Reduction (Before vs After)                          */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              2. Duplicate Reduction
            </h3>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Direct impact comparison of entity resolution algorithms across participating CPSE enterprise catalogs.
          </div>
        </div>

        {/* Before vs After Comparative Cards */}
        <div className="analytics-grid-two" style={{ marginBottom: '16px' }}>

          {/* Before Harmonization */}
          <div className="before-after-card before">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                Before Harmonization (Legacy State)
              </span>
              <span className="badge badge-neutral" style={{ color: '#991b1b' }}>Siloed Catalogs</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Material Records</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>1,284,620</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-light)' }}>Isolated SKUs</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Duplicates Detected</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626' }}>126,480</div>
                <div style={{ fontSize: '10.5px', color: '#991b1b' }}>9.8% redundant</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Catalog Quality</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309' }}>51.2%</div>
                <div style={{ fontSize: '10.5px', color: '#92400e' }}>High variance</div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              Disparate abbreviations, duplicate procurement tenders, and unlinked vendor item numbers.
            </div>
          </div>

          {/* After Harmonization */}
          <div className="before-after-card after">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
                After Harmonization (Target Catalog)
              </span>
              <span className="badge badge-approved">Unified Identity</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '4px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#166534' }}>Unified Materials</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>842,310</div>
                <div style={{ fontSize: '10.5px', color: '#166534' }}>Standard identities</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#166534' }}>Duplicates Resolved</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>98,742</div>
                <div style={{ fontSize: '10.5px', color: '#166534' }}>78.1% resolved</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#166534' }}>Catalog Quality</div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d' }}>94.8%</div>
                <div style={{ fontSize: '10.5px', color: '#166534' }}>ISO 8000 Grade</div>
              </div>
            </div>

            <div style={{ fontSize: '11.5px', color: '#166534', borderTop: '1px solid #bbf7d0', paddingTop: '8px' }}>
              <strong>34.4% catalog sprawl reduction</strong> achieved through cross-enterprise semantic mapping.
            </div>
          </div>

        </div>

        {/* Potential Duplicates Resolved Breakdown */}
        <div style={{
          backgroundColor: '#f8fafc',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Potential Duplicates Resolution Progress:
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>
              98,742 Resolved / 126,480 Identified (78.1%)
            </span>
          </div>

          <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '78.1%', backgroundColor: '#10b981' }} title="Resolved: 98,742" />
            <div style={{ width: '21.9%', backgroundColor: '#f59e0b' }} title="Pending Review: 27,738" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span>Resolved Duplicates: <strong>98,742 (78.1%)</strong></span>
            <span>Pending Review: <strong>27,738 (21.9%)</strong></span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: CPSE Comparison Table                                          */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 size={18} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              3. CPSE Comparison
            </h3>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Benchmarking catalog volume, redundancy levels, and master data quality across participating CPSEs.
          </div>
        </div>

        <div className="table-container" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>CPSE</th>
                <th style={{ textAlign: 'right', width: '150px' }}>Material Records</th>
                <th style={{ textAlign: 'right', width: '130px' }}>Duplicates</th>
                <th style={{ textAlign: 'right', width: '140px' }}>Harmonized</th>
                <th style={{ textAlign: 'right', width: '140px' }}>Pending Review</th>
                <th style={{ textAlign: 'right', width: '160px' }}>Data Quality</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCPSE.map((row) => (
                <tr key={row.cpse}>
                  <td>
                    <span className={`cpse-tag ${row.cpse.toLowerCase()}`}>{row.cpse}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {row.records.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: '#dc2626', fontWeight: 600 }}>
                    {row.duplicates.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: '#15803d', fontWeight: 700 }}>
                    {row.harmonized.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: '#b45309', fontWeight: 600 }}>
                    {row.pendingReview.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                      <div style={{ width: '50px', height: '5px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${row.dataQuality}%`,
                            height: '100%',
                            backgroundColor: row.dataQuality >= 93 ? '#10b981' : '#f59e0b'
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '12px', color: row.dataQuality >= 93 ? '#15803d' : '#b45309' }}>
                        {row.dataQuality}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Aggregated Total Row */}
              <tr style={{ backgroundColor: '#f8fafc', fontWeight: 700 }}>
                <td><strong>Aggregate Total</strong></td>
                <td style={{ textAlign: 'right' }}><strong>1,284,620</strong></td>
                <td style={{ textAlign: 'right', color: '#dc2626' }}><strong>126,480</strong></td>
                <td style={{ textAlign: 'right', color: '#15803d' }}><strong>878,680</strong></td>
                <td style={{ textAlign: 'right', color: '#b45309' }}><strong>4,286</strong></td>
                <td style={{ textAlign: 'right', color: '#15803d' }}><strong>93.4% Avg</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compact Floating-Style Pagination */}
        <Pagination
          currentPage={cpsePage}
          totalItems={CPSE_COMPARISON_DATA.length}
          pageSize={cpsePageSize}
          onPageChange={setCpsePage}
          onPageSizeChange={setCpsePageSize}
          pageSizeOptions={[3, 4, 6]}
          itemName="CPSEs"
        />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 4: Category Analysis (Categories with Highest Duplication)        */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              4. Category Analysis (Highest Duplication Categories)
            </h3>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Procurement categories ranked by inter-CPSE redundancy and standardization consolidation potential.
          </div>
        </div>

        <div className="table-container" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Material Category</th>
                <th style={{ textAlign: 'right', width: '130px' }}>Total Records</th>
                <th style={{ textAlign: 'right', width: '120px' }}>Duplicates</th>
                <th style={{ width: '160px' }}>Duplication %</th>
                <th style={{ width: '180px' }}>Consolidation Potential</th>
                <th>Dominant Overlapping Items</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((cat) => (
                <tr key={cat.category}>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                    {cat.category}
                  </td>
                  <td style={{ textAlign: 'right', color: 'var(--text-secondary)' }}>
                    {cat.totalRecords.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', color: '#dc2626', fontWeight: 700 }}>
                    {cat.duplicates.toLocaleString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${cat.duplicationRate * 3}%`,
                            height: '100%',
                            backgroundColor: cat.duplicationRate >= 20 ? '#ef4444' : '#f59e0b'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: cat.duplicationRate >= 20 ? '#dc2626' : '#b45309' }}>
                        {cat.duplicationRate}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${cat.consolidationPotential.startsWith('Critical') ? 'badge-rejected' : 'badge-pending'}`}>
                      {cat.consolidationPotential}
                    </span>
                  </td>
                  <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {cat.sampleOverlap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Floating-Style Pagination */}
        <Pagination
          currentPage={catPage}
          totalItems={CATEGORY_DUPLICATION_DATA.length}
          pageSize={catPageSize}
          onPageChange={setCatPage}
          onPageSizeChange={setCatPageSize}
          pageSizeOptions={[3, 4, 6]}
          itemName="categories"
        />
      </div>

      {/* ========================================================================= */}
      {/* SECTION 5: AI Performance Metrics                                         */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#0284c7" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              5. AI Performance
            </h3>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Quality evaluation of NLP token extraction, vector cosine clustering, and human review escalation.
          </div>
        </div>

        {/* 5 Required Metrics Grid: Total Matches, Approved, Rejected, Avg Confidence, Human Review Rate */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '14px',
          marginBottom: '16px'
        }}>
          {/* 1. Total AI Matches */}
          <div className="kpi-card" style={{ padding: '14px', backgroundColor: '#f0f9ff', borderColor: '#bae6fd' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
              Total AI Matches
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0284c7', marginTop: '4px' }}>
              98,742
            </div>
            <div style={{ fontSize: '11px', color: '#0369a1', marginTop: '2px' }}>
              Semantic clusters identified
            </div>
          </div>

          {/* 2. Approved Matches */}
          <div className="kpi-card" style={{ padding: '14px', backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              Approved Matches
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#15803d', marginTop: '4px' }}>
              94,456
            </div>
            <div style={{ fontSize: '11px', color: '#166534', marginTop: '2px' }}>
              <strong>95.7%</strong> precision accuracy
            </div>
          </div>

          {/* 3. Rejected Matches */}
          <div className="kpi-card" style={{ padding: '14px', backgroundColor: '#fef2f2', borderColor: '#fecaca' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#991b1b', textTransform: 'uppercase' }}>
              Rejected Matches
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#dc2626', marginTop: '4px' }}>
              4,286
            </div>
            <div style={{ fontSize: '11px', color: '#991b1b', marginTop: '2px' }}>
              <strong>4.3%</strong> steward override
            </div>
          </div>

          {/* 4. Average Confidence */}
          <div className="kpi-card" style={{ padding: '14px', backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Average Confidence
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              94.8%
            </div>
            <div style={{ fontSize: '11px', color: '#15803d', marginTop: '2px' }}>
              High-confidence clustering
            </div>
          </div>

          {/* 5. Human Review Rate */}
          <div className="kpi-card" style={{ padding: '14px', backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#92400e', textTransform: 'uppercase' }}>
              Human Review Rate
            </div>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
              14.2%
            </div>
            <div style={{ fontSize: '11px', color: '#92400e', marginTop: '2px' }}>
              Escalated to human stewards
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 6: Potential Procurement Impact (DEMO Estimates)                  */}
      {/* ========================================================================= */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#15803d" />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
              6. Potential Procurement Impact
            </h3>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Strategic procurement aggregation opportunities enabled by single-identity material standardization.
          </div>
        </div>

        {/* 3 Required Demo Estimate Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '16px'
        }}>
          {/* 1. Potential duplicate materials */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-medium)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Potential Duplicate Materials
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '6px' }}>
              126,480
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Material codes eligible for national master crosswalk
            </div>
          </div>

          {/* 2. Potential consolidation opportunities */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-medium)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Potential Consolidation Opportunities
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#0284c7', marginTop: '6px' }}>
              18,420
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Aggregated tender opportunities across 6 CPSEs
            </div>
          </div>

          {/* 3. Potential procurement standardization opportunities */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: '#f0fdf4',
            border: '1.5px solid #86efac',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              Potential Procurement Standardization Opportunities
            </div>
            <div style={{ fontSize: '26px', fontWeight: 800, color: '#15803d', marginTop: '6px' }}>
              ₹548.6 Cr
            </div>
            <div style={{ fontSize: '11px', color: '#166534', marginTop: '4px' }}>
              Estimated annualized pooled procurement scope
            </div>
          </div>
        </div>

        {/* Mandatory Explicit Prototype Disclaimer Banner */}
        <div className="disclaimer-banner">
          <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
          <div className="disclaimer-text">
            <span className="disclaimer-badge" style={{ marginRight: '6px' }}>Statutory Disclaimer</span>
            <strong>“Illustrative prototype estimates — not actual CPSE savings.”</strong> Figures shown represent algorithmic estimations based on sample procurement datasets to demonstrate potential consolidation capacity under the National Master Catalog. Actual fiscal realization is contingent on joint CPSE tendering agreements and GeM portal rate alignment.
          </div>
        </div>

      </div>

      {/* Institutional Statutory Footer */}
      <footer className="institutional-footer">
        <div className="institutional-footer-row">
          <div className="institutional-watermark">
            <span>🏛️</span>
            <span>PRASHAM [प्रशम] • Ministry of Heavy Industries & Department of Public Enterprises (DPE)</span>
          </div>
          <div>
            <span>Executive Analytics & Procurement Consolidation Engine • GFR 2017 Compliant</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Analytics Matrix v4.2 • GeM Rate Benchmark Integration</span>
        </div>
      </footer>

    </div>
  );
}
