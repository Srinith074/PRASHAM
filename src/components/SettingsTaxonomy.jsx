import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Save,
  CheckCircle2,
  Database,
  FileCode2,
  Server
} from 'lucide-react';

export default function SettingsTaxonomy() {
  const [namingSyntax, setNamingSyntax] = useState('[Noun], [Primary Modifier], [Material Grade], [Dimensions / Rating], [Standard Specification]');
  const [autoThreshold, setAutoThreshold] = useState(90);
  const [reviewThreshold, setReviewThreshold] = useState(70);
  const [strictStandards, setStrictStandards] = useState(true);
  const [activeTaxonomy, setActiveTaxonomy] = useState('UNSPSC_CPSE_HYBRID');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2200);
  };

  return (
    <div>
      {/* View Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Taxonomy Rules & Platform Configuration</span>
            <span className="badge badge-neutral">DPE Master Governance Policy</span>
          </h1>
          <div className="view-subtitle">
            Configure standardization syntax rules, AI confidence thresholds, unit-of-measure dictionaries, and CPSE ERP integration endpoints.
          </div>
        </div>
        <div className="view-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={14} />
            <span>{isSaved ? 'Settings Saved!' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>

      {isSaved && (
        <div style={{
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '10px 14px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#166534',
          fontSize: '12.5px',
          fontWeight: 600,
          marginBottom: '16px'
        }}>
          <CheckCircle2 size={16} />
          <span>Configuration policy updated successfully. AI harmonization pipeline will apply these rules.</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
        
        {/* Left Column: Naming Conventions & AI Thresholds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Naming Syntax Section */}
          <div className="card-section" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <FileCode2 size={16} color="var(--accent-primary)" />
                <span>1. National Standardized Naming Syntax</span>
              </div>
            </div>
            <div className="card-body">
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Standard Description Template (Enforced on all CPSE Catalogs):
              </label>
              <input
                type="text"
                value={namingSyntax}
                onChange={(e) => setNamingSyntax(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  fontSize: '12.5px',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '8px'
                }}
              />
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Complies with Bureau of Indian Standards (BIS) and ISO 8000 master data conventions. Example output: <code>BOLT, HEXAGON HEAD, SS 304, M16 X 65 MM, IS 1364</code>.
              </div>

              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Base Master Taxonomy Classification:
                </label>
                <select
                  className="select-filter"
                  style={{ width: '100%', padding: '6px 10px', fontSize: '12.5px' }}
                  value={activeTaxonomy}
                  onChange={(e) => setActiveTaxonomy(e.target.value)}
                >
                  <option value="UNSPSC_CPSE_HYBRID">UNSPSC v26 + CPSE Technical Suffix (Recommended)</option>
                  <option value="NIC_2008">National Industrial Classification (NIC 2008)</option>
                  <option value="MESC_SHELL">MESC Materials and Equipment Standard Code</option>
                  <option value="CUSTOM_DPE">Custom DPE Government Procurement Taxonomy</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Confidence Thresholds */}
          <div className="card-section" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <SlidersHorizontal size={16} color="var(--accent-primary)" />
                <span>2. AI Harmonization & Governance Thresholds</span>
              </div>
            </div>
            <div className="card-body">
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    High-Confidence Batch Approval Threshold:
                  </span>
                  <span style={{ fontWeight: 700, color: '#15803d' }}>≥ {autoThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="98"
                  value={autoThreshold}
                  onChange={(e) => setAutoThreshold(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Items scoring above this threshold are deemed high-confidence duplicates and qualify for batch steward clearance.
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Human Stewardship Mandatory Review Floor:
                  </span>
                  <span style={{ fontWeight: 700, color: '#b45309' }}>≥ {reviewThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="80"
                  value={reviewThreshold}
                  onChange={(e) => setReviewThreshold(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Items with similarity between {reviewThreshold}% and {autoThreshold}% are routed directly to the Chief Steward review queue.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                <input
                  type="checkbox"
                  id="strictCheck"
                  checked={strictStandards}
                  onChange={(e) => setStrictStandards(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="strictCheck" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                  Enforce strict safety-standard equivalence (Flag MIL-SPEC / Aerospace / Nuclear spec divergences as hard blocks)
                </label>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: UOM Dictionary & ERP Connectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* UOM Standardization Dictionary */}
          <div className="card-section" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <Database size={16} color="var(--accent-primary)" />
                <span>3. Unit of Measure (UOM) Normalization Rules</span>
              </div>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Legacy Variations Ingested</th>
                      <th>Target Standard UOM</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>NOS, NO, PCS, EA, PC, PIECE, SET</td>
                      <td><span className="code-pill harmonized">NOS</span> (Numbers)</td>
                      <td><span className="badge badge-approved">Active</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>MTR, M, METRE, METERS, MTRS</td>
                      <td><span className="code-pill harmonized">MTR</span> (Meters)</td>
                      <td><span className="badge badge-approved">Active</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>KG, KGS, KILOGRAM, KILOGRAMS</td>
                      <td><span className="code-pill harmonized">KG</span> (Kilogram)</td>
                      <td><span className="badge badge-approved">Active</span></td>
                    </tr>
                    <tr>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>LTR, L, LITRE, LITERS</td>
                      <td><span className="code-pill harmonized">LTR</span> (Liters)</td>
                      <td><span className="badge badge-approved">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ERP Integration Connectors */}
          <div className="card-section" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div className="card-title">
                <Server size={16} color="var(--accent-primary)" />
                <span>4. CPSE ERP & GeM Connector Endpoints</span>
              </div>
              <span className="badge badge-approved">7 Connected</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'SAP S/4HANA Master Data Hub (ONGC/IOCL/NTPC)', type: 'OData v4 REST API', status: 'Healthy (200 OK)' },
                { name: 'SAP ECC 6.0 RFC Gateway (BHEL Haridwar & Trichy)', type: 'RFC / IDoc NetWeaver', status: 'Healthy (200 OK)' },
                { name: 'Oracle EBS Inventory Connector (SAIL Bhilai)', type: 'Oracle Integration Cloud', status: 'Healthy (200 OK)' },
                { name: 'Government e-Marketplace (GeM) Master Catalog', type: 'GeM v3 Public Procurement API', status: 'Synchronized' }
              ].map((conn, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11.5px'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{conn.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '10.5px' }}>{conn.type}</div>
                  </div>
                  <span className="badge badge-approved" style={{ fontSize: '10px' }}>
                    <CheckCircle2 size={11} />
                    <span>{conn.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
