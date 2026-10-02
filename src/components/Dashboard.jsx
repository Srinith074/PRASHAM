import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Download,
  ArrowRight,
  Eye,
  Check,
  X,
  AlertCircle,
  Building2,
  ArrowUpRight
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';

export default function Dashboard({
  clusters,
  onNavigate,
  onApprove,
  onReject,
  selectedCPSE,
  onSelectCPSE,
  showToast,
  onSelectClusterForReview
}) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionRemark, setRejectionRemark] = useState('');
  const [approvingItem, setApprovingItem] = useState(null);

  // Items Requiring Review (High Priority Stewardship Cases)
  const itemsRequiringReview = [
    {
      id: 'HR-004821',
      clusterId: 'CLUS-FST-001',
      materialCode: 'BHEL-FST-10921',
      material: 'Hexagonal Head Bolt M10 × 50 mm · Grade 8.8',
      cpses: ['BHEL', 'NTPC', 'IOCL'],
      similarity: 96.8,
      recommendation: 'Map to HMF-FAST-00128',
      reason: 'Same dimensions (M10×50), grade 8.8, and IS 1363 spec. Minor phrasing variation in legacy ERP descriptions.',
      status: 'Review Required'
    },
    {
      id: 'HR-004822',
      clusterId: 'CLUS-VLV-003',
      materialCode: 'ONGC-VAL-8821',
      material: 'Gate Valve DN100 Class 150 RF Flanged WCB',
      cpses: ['ONGC', 'IOCL', 'GAIL'],
      similarity: 94.7,
      recommendation: 'Map to HMF-VALV-00042',
      reason: 'Equivalent pressure class (Class 150 / PN20) and API 600 metallurgy envelope; metric vs imperial flange standard normalized.',
      status: 'Review Required'
    },
    {
      id: 'HR-004823',
      clusterId: 'CLUS-GSK-007',
      materialCode: 'IOCL-GSK-4412',
      material: 'Spiral Wound Gasket 3" Class 300 SS316 Graphite',
      cpses: ['IOCL', 'ONGC'],
      similarity: 89.2,
      recommendation: 'Map to HMF-GSK-00210',
      reason: 'Inner ring spec omission in ONGC record vs IOCL Type CGI standard; dimensional envelope identical per ASME B16.20.',
      status: 'Review Required'
    },
    {
      id: 'HR-004824',
      clusterId: 'CLUS-ELE-008',
      materialCode: 'SAIL-MOT-5501',
      material: 'Induction Motor 45 kW 4-Pole 415V Foot Mounted',
      cpses: ['SAIL', 'BHEL', 'NTPC'],
      similarity: 86.4,
      recommendation: 'Map to HMF-ELEC-00914',
      reason: 'Legacy SAIL entry references obsolete IS 325 standard; BHEL mandates IE3 Premium efficiency per IS 12615.',
      status: 'Review Required'
    }
  ];

  // Recent AI Activity Logs (Continuous Normalization Pipeline)
  const recentAIActivity = [
    {
      time: '14:22 IST',
      cpse: 'BHEL',
      process: 'Attribute Extraction & NLP Normalization',
      records: '1,420',
      result: 'Standardized 1,388 records (IS/ISO specs extracted)',
      status: 'Completed'
    },
    {
      time: '14:15 IST',
      cpse: 'NTPC',
      process: 'Dense Vector Semantic Clustering',
      records: '3,850',
      result: '142 potential duplicate groups formed (Cosine > 0.88)',
      status: 'Completed'
    },
    {
      time: '13:58 IST',
      cpse: 'IOCL',
      process: 'UOM & Engineering Code Harmonization',
      records: '980',
      result: 'Metric conversions resolved (in/mm & lbs/kg mapped)',
      status: 'Completed'
    },
    {
      time: '13:40 IST',
      cpse: 'ONGC',
      process: 'Cross-CPSE Duplicate Identification',
      records: '2,640',
      result: 'Cross-referenced against national unified master catalog',
      status: 'Completed'
    }
  ];

  // Refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast?.('Dashboard synchronized with latest CPSE master data updates.');
    }, 600);
  };

  // Export report handler
  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'CPSE Material Harmonization Executive Brief\n' +
      'Scope,All CPSEs\n' +
      'Total Material Records,1240000\n' +
      'Unique Materials,842000\n' +
      'Potential Duplicates,126000\n' +
      'Harmonization Rate,68.4%\n' +
      'Generated Date,' + new Date().toISOString() + '\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CPSE_Harmonization_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast?.('Harmonization summary report downloaded.');
  };

  const handleConfirmApproval = () => {
    if (!approvingItem) return;
    onApprove?.(approvingItem.clusterId, approvingItem.recommendation, 'Approved from Dashboard Priority Queue');
    showToast?.(`Harmonization recommendation approved for ${approvingItem.materialCode}`);
    setApprovingItem(null);
  };

  const handleConfirmRejection = () => {
    if (!rejectingItem) return;
    onReject?.(rejectingItem.clusterId, rejectionRemark || 'Rejected from Dashboard Priority Queue');
    showToast?.(`Recommendation rejected for ${rejectingItem.materialCode}`);
    setRejectingItem(null);
    setRejectionRemark('');
  };

  return (
    <div className="dashboard-editorial-layout">
      {/* ============================================================ */}
      {/* TOP CALM EDITORIAL HEADER                                    */}
      {/* ============================================================ */}
      <div className="view-header">
        <div className="view-title-group">
          <div className="page-greeting">Good morning, Admin</div>
          <h1 className="page-title">Material Harmonization Overview</h1>
          <div className="page-subtitle">
            {selectedCPSE === 'ALL' ? 'All CPSEs' : `${selectedCPSE} Master Data`} · Updated 2 minutes ago
          </div>
        </div>

        {/* Top Controls */}
        <div className="view-actions">
          {/* CPSE Filter Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={14} color="var(--text-secondary)" />
            <select
              className="select-filter"
              value={selectedCPSE}
              onChange={(e) => onSelectCPSE?.(e.target.value)}
              aria-label="Filter CPSE scope"
            >
              {CPSE_LIST.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id === 'ALL' ? 'All CPSEs' : c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Refresh Action */}
          <button
            className="btn btn-secondary btn-sm"
            onClick={handleRefresh}
            title="Synchronize latest data"
          >
            <RefreshCw size={13} style={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
            <span>Refresh</span>
          </button>

          {/* Export Report Action */}
          <button
            className="btn btn-primary btn-sm"
            onClick={handleExport}
            title="Download Executive Brief"
          >
            <Download size={13} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* COMPACT KPI ROW (4 RESTRAINED ENTERPRISE METRICS)            */}
      {/* ============================================================ */}
      <section className="kpi-row-calm" aria-label="Key Performance Indicators">
        {/* KPI 1 */}
        <div
          className="kpi-card-calm"
          onClick={() => onNavigate?.('master')}
          title="Open Unified Material Master Catalog"
        >
          <div className="kpi-stat-number">1.24M</div>
          <div className="kpi-stat-label">Material Records</div>
          <div className="kpi-stat-sub">
            <ArrowUpRight size={12} color="var(--accent-blue)" />
            <span>+24.8K this month</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div
          className="kpi-card-calm"
          onClick={() => onNavigate?.('crosswalk')}
          title="View Unique Materials in Code Crosswalk"
        >
          <div className="kpi-stat-number">842K</div>
          <div className="kpi-stat-label">Unique Materials</div>
          <div className="kpi-stat-sub">
            <span>67.9% deduplicated base</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div
          className="kpi-card-calm"
          onClick={() => onNavigate?.('duplicates')}
          title="Inspect Potential Duplicates"
        >
          <div className="kpi-stat-number">126K</div>
          <div className="kpi-stat-label">Potential Duplicates</div>
          <div className="kpi-stat-sub" style={{ color: 'var(--status-warning)' }}>
            <span>10.1% cross-CPSE overlap</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div
          className="kpi-card-calm"
          onClick={() => onNavigate?.('analytics')}
          title="Explore Harmonization Velocity"
        >
          <div className="kpi-stat-number" style={{ color: 'var(--accent-blue)' }}>68.4%</div>
          <div className="kpi-stat-label">Harmonized</div>
          <div className="kpi-stat-sub" style={{ color: 'var(--status-success)' }}>
            <ArrowUpRight size={12} color="var(--status-success)" />
            <span>+4.2% from last cycle</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LARGE CONTENT SECTION 1: HARMONIZATION PROGRESS             */}
      {/* ============================================================ */}
      <section className="card-section" aria-label="Harmonization Progress Section">
        <div className="card-header">
          <div>
            <div className="card-title">
              <span>Harmonization Progress</span>
              <span className="badge badge-approved" style={{ marginLeft: '6px' }}>
                68.4% Unified
              </span>
            </div>
            <div className="text-secondary-info" style={{ marginTop: '2px' }}>
              Progress towards national cross-CPSE standard item identification
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate?.('analytics')}
            >
              <span>View Analytics</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* Main Progress Indicator */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                Cumulative Harmonization Velocity
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                848,160 / 1,240,000 Records Normalized
              </span>
            </div>

            {/* Clean Monochromatic Progress Bar with Single Accent */}
            <div style={{
              display: 'flex',
              height: '14px',
              width: '100%',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)'
            }}>
              <div
                style={{
                  width: '68.4%',
                  backgroundColor: 'var(--accent-blue)',
                  transition: 'width 0.4s ease'
                }}
                title="Harmonized: 68.4%"
              />
              <div
                style={{
                  width: '10.2%',
                  backgroundColor: '#D1D5DB'
                }}
                title="Pending Review: 10.2%"
              />
              <div
                style={{
                  width: '21.4%',
                  backgroundColor: '#F3F4F6'
                }}
                title="Unprocessed: 21.4%"
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginTop: '10px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }} />
                <span>Standardized (68.4%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#D1D5DB' }} />
                <span>Pending Review (10.2%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E5E7EB' }} />
                <span>Unprocessed Legacy (21.4%)</span>
              </div>
            </div>
          </div>

          {/* Clean 6-Month Velocity Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '12px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px'
          }}>
            {[
              { month: 'Apr', pct: 48.2, count: '597K' },
              { month: 'May', pct: 52.4, count: '650K' },
              { month: 'Jun', pct: 57.1, count: '708K' },
              { month: 'Jul', pct: 61.8, count: '766K' },
              { month: 'Aug', pct: 65.2, count: '808K' },
              { month: 'Sep', pct: 68.4, count: '848K', current: true }
            ].map((col) => (
              <div
                key={col.month}
                style={{
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: col.current ? 'var(--bg-hover)' : 'transparent',
                  borderRadius: 'var(--radius-sm)',
                  border: col.current ? '1px solid var(--border-medium)' : '1px solid transparent'
                }}
              >
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>{col.month}</div>
                <div style={{
                  height: '60px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  margin: '8px 0'
                }}>
                  <div
                    style={{
                      width: '28px',
                      height: `${(col.pct / 80) * 60}px`,
                      backgroundColor: col.current ? 'var(--accent-blue)' : '#9CA3AF',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.3s ease'
                    }}
                  />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{col.pct}%</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{col.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LARGE CONTENT SECTION 2: ITEMS REQUIRING REVIEW             */}
      {/* ============================================================ */}
      <section className="card-section" aria-label="Items Requiring Review Section">
        <div className="card-header">
          <div>
            <div className="card-title">
              <span>Items Requiring Review</span>
              <span className="badge badge-pending" style={{ marginLeft: '6px' }}>
                4,286 Pending
              </span>
            </div>
            <div className="text-secondary-info" style={{ marginTop: '2px' }}>
              AI harmonization recommendations requiring master data steward approval
            </div>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate?.('review')}
          >
            <span>Open Review Queue</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Desktop Table View */}
        <div className="table-container desktop-only">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '220px' }}>Material</th>
                <th style={{ width: '130px' }}>CPSEs</th>
                <th style={{ width: '90px' }}>Similarity</th>
                <th>AI Recommendation</th>
                <th>Explainable AI Reasoning</th>
                <th style={{ width: '160px', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {itemsRequiringReview.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                      {item.material}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '2px' }}>
                      {item.materialCode}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {item.cpses.map(c => (
                        <span key={c} className="cpse-tag">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-approved">
                      {item.similarity}%
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className="code-pill">{item.recommendation}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '280px', lineHeight: 1.4 }}>
                    {item.reason}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          const clusterObj = clusters.find(c => c.clusterId === item.clusterId) || {
                            clusterId: item.clusterId,
                            clusterName: item.material,
                            category: 'Fasteners & Hardware',
                            standardizedDescription: item.recommendation,
                            confidenceScore: item.similarity,
                            status: 'Pending Review',
                            participatingCPSEs: item.cpses,
                            memberLegacyCodes: [],
                            aiExplainability: { summary: item.reason, confidenceBreakdown: [], tokenAlignment: [] }
                          };
                          onSelectClusterForReview?.(clusterObj);
                        }}
                        title="Inspect record details"
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setApprovingItem(item)}
                        title="Approve mapping"
                      >
                        <Check size={12} />
                        <span>Approve</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Transformation View */}
        <div className="mobile-only" style={{ padding: '12px' }}>
          {itemsRequiringReview.map((item) => (
            <div key={item.id} className="mobile-card-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <span className="code-pill">{item.materialCode}</span>
                <span className="badge badge-approved">{item.similarity}% match</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {item.material}
              </div>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {item.cpses.map(c => (
                  <span key={c} className="cpse-tag">{c}</span>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', background: 'var(--bg-subtle)', padding: '8px', borderRadius: 'var(--radius-xs)' }}>
                <strong>Recommendation:</strong> {item.recommendation}
                <p style={{ marginTop: '4px', color: 'var(--text-muted)' }}>{item.reason}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, minHeight: '44px' }}
                  onClick={() => onNavigate?.('review')}
                >
                  <Eye size={13} />
                  <span>Inspect</span>
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, minHeight: '44px' }}
                  onClick={() => setApprovingItem(item)}
                >
                  <Check size={13} />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* LARGE CONTENT SECTION 3: RECENT AI ACTIVITY                  */}
      {/* ============================================================ */}
      <section className="card-section" aria-label="Recent AI Activity Section">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Sparkles size={15} color="var(--accent-blue)" />
              <span>Recent AI Activity</span>
            </div>
            <div className="text-secondary-info" style={{ marginTop: '2px' }}>
              Autonomous semantic normalization and cross-CPSE clustering pipeline
            </div>
          </div>
          <span className="text-secondary-info" style={{ fontFamily: 'var(--font-mono)' }}>
            Engine Status: Operational (Active)
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="table-container desktop-only">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>Timestamp</th>
                <th style={{ width: '90px' }}>CPSE</th>
                <th style={{ width: '240px' }}>Pipeline Stage</th>
                <th style={{ width: '100px', textAlign: 'right' }}>Records</th>
                <th>Result & Output</th>
                <th style={{ width: '110px' }}>State</th>
              </tr>
            </thead>
            <tbody>
              {recentAIActivity.map((act, idx) => (
                <tr key={idx}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {act.time}
                  </td>
                  <td>
                    <span className="cpse-tag">{act.cpse}</span>
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-primary)' }}>
                    {act.process}
                  </td>
                  <td style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                    {act.records}
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {act.result}
                  </td>
                  <td>
                    <span className="badge badge-approved">
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--status-success)' }} />
                      <span>{act.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="mobile-only" style={{ padding: '12px' }}>
          {recentAIActivity.map((act, idx) => (
            <div key={idx} className="mobile-card-row">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span className="cpse-tag">{act.cpse}</span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{act.time}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {act.process}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {act.result} · <span style={{ fontFamily: 'var(--font-mono)' }}>{act.records} items</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* APPROVE CONFIRMATION MODAL                                   */}
      {/* ============================================================ */}
      {approvingItem && (
        <div className="confirm-modal-overlay" onClick={() => setApprovingItem(null)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span>Approve Harmonization Mapping</span>
              </div>
              <button
                className="btn-icon-subtle"
                onClick={() => setApprovingItem(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Approve and publish this material mapping to the national unified catalog?
              </p>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '14px'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {approvingItem.material}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Target: <strong>{approvingItem.recommendation}</strong> · Confidence: {approvingItem.similarity}%
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setApprovingItem(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleConfirmApproval}
                >
                  Confirm & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* REJECT CONFIRMATION MODAL                                    */}
      {/* ============================================================ */}
      {rejectingItem && (
        <div className="confirm-modal-overlay" onClick={() => setRejectingItem(null)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <AlertCircle size={16} color="var(--status-error)" />
                <span>Reject Harmonization Recommendation</span>
              </div>
              <button
                className="btn-icon-subtle"
                onClick={() => setRejectingItem(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Provide reason for rejecting mapping for <strong>{rejectingItem.materialCode}</strong>:
              </p>
              <textarea
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '12.5px',
                  fontFamily: 'inherit',
                  marginBottom: '14px',
                  outline: 'none'
                }}
                placeholder="e.g. Incompatible metallurgy grade or dimensional standard..."
                value={rejectionRemark}
                onChange={(e) => setRejectionRemark(e.target.value)}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setRejectingItem(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleConfirmRejection}
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
