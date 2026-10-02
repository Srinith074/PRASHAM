import React, { useState } from 'react';
import {
  Play,
  Check,
  Copy,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X,
  Building2,
  Cpu,
  Database,
  ArrowDown,
  Layers
} from 'lucide-react';
import { HARMONIZATION_CLUSTERS } from '../data/mockData';

export default function AIHarmonization({
  onNavigate,
  onApproveCluster,
  showToast
}) {
  const [selectedClusterId, setSelectedClusterId] = useState('CLUS-FLAGSHIP-M10');
  const [clustersState, setClustersState] = useState(HARMONIZATION_CLUSTERS);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingPhase, setProcessingPhase] = useState('');
  const [hasRunProcessing, setHasRunProcessing] = useState(false);

  // UI state
  const [copiedCode, setCopiedCode] = useState(false);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const activeCluster = clustersState.find(c => c.clusterId === selectedClusterId) || clustersState[0];

  // Run Harmonization Simulation
  const handleRunHarmonization = () => {
    setIsProcessing(true);
    setProcessingProgress(20);
    setProcessingPhase('Extracting attributes & normalizing text tokens across CPSE records...');

    setTimeout(() => {
      setProcessingProgress(55);
      setProcessingPhase('Matching semantic descriptions & dense transformer embeddings...');
    }, 450);

    setTimeout(() => {
      setProcessingProgress(85);
      setProcessingPhase('Checking specifications, dimensions, metallurgy, and UOM standards...');
    }, 850);

    setTimeout(() => {
      setProcessingProgress(100);
      setProcessingPhase('Analysis complete. Standardized material mapping generated.');
      setIsProcessing(false);
      setHasRunProcessing(true);
      showToast?.('Harmonization complete: 12,450 records processed. High confidence mapping generated.');
    }, 1300);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast?.(`Code ${code} copied to clipboard.`);
  };

  const handleApprove = () => {
    setShowApproveConfirm(false);
    setClustersState(prev => prev.map(c => {
      if (c.clusterId === activeCluster.clusterId) {
        return { ...c, status: 'Approved' };
      }
      return c;
    }));
    onApproveCluster?.(activeCluster.clusterId);
    showToast?.(`Cluster ${activeCluster.harmonizedCode} approved and published to Unified Master Catalog.`);
  };

  const handleSendForReview = () => {
    setClustersState(prev => prev.map(c => {
      if (c.clusterId === activeCluster.clusterId) {
        return { ...c, status: 'Review Required' };
      }
      return c;
    }));
    showToast?.(`Cluster ${activeCluster.harmonizedCode} queued for Inter-CPSE Technical Committee review.`);
  };

  const handleReject = () => {
    setShowRejectConfirm(false);
    setClustersState(prev => prev.map(c => {
      if (c.clusterId === activeCluster.clusterId) {
        return { ...c, status: 'Rejected' };
      }
      return c;
    }));
    showToast?.(`Harmonization rejected for ${activeCluster.harmonizedCode}. Justification archived.`);
    setRejectionReason('');
  };

  return (
    <div className="ai-harmonization-page">
      {/* ============================================================ */}
      {/* HEADER SECTION                                               */}
      {/* ============================================================ */}
      <div className="view-header">
        <div className="view-title-group">
          <div className="page-greeting">Enterprise Engine</div>
          <h1 className="page-title">AI Harmonization Engine</h1>
          <div className="page-subtitle">
            Identify semantically equivalent materials and generate standardized material mappings using AI.
          </div>
        </div>

        <div className="view-actions">
          {/* Cluster Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Sample Cluster:
            </span>
            <select
              className="select-filter"
              value={selectedClusterId}
              onChange={(e) => setSelectedClusterId(e.target.value)}
              aria-label="Select material cluster"
            >
              {clustersState.map((c) => (
                <option key={c.clusterId} value={c.clusterId}>
                  {c.clusterName} ({c.harmonizedCode})
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate?.('master')}
          >
            <Layers size={13} />
            <span>Material Master</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TOP PROCESSING PANEL                                         */}
      {/* ============================================================ */}
      <section className="card-section" style={{ marginBottom: '20px' }}>
        <div className="card-body" style={{ padding: '16px 20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Source */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
                Source
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontWeight: 600, color: 'var(--text-primary)' }}>
                <Database size={14} color="var(--accent-blue)" />
                <span>Multiple CPSE Material Masters</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                {activeCluster.participatingCPSEs.map(cpse => (
                  <span key={cpse} className="cpse-tag" style={{ fontSize: '10px' }}>{cpse}</span>
                ))}
              </div>
            </div>

            {/* Records Selected */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
                Records Selected
              </div>
              <div style={{ fontSize: '17px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                12,450
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Active catalog slice
              </div>
            </div>

            {/* AI Processing */}
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em' }}>
                AI Processing
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '13px' }}>
                <Cpu size={14} color="var(--accent-blue)" />
                <span>Semantic Matching + Attribute Extraction + Normalization</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Deterministic verification + Transformer Cosine (0.85 threshold)
              </div>
            </div>

            {/* Action Button */}
            <div>
              <button
                className="btn btn-primary"
                onClick={handleRunHarmonization}
                disabled={isProcessing}
                style={{ minWidth: '160px' }}
              >
                {isProcessing ? (
                  <>
                    <Sparkles size={14} style={{ animation: 'spin 1.5s linear infinite' }} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play size={13} fill="currentColor" />
                    <span>Run Harmonization</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Processing State Progress */}
          {isProcessing && (
            <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{processingPhase}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)' }}>{processingProgress}%</span>
              </div>
              <div className="thin-progress-bar">
                <div className="thin-progress-fill" style={{ width: `${processingProgress}%` }} />
              </div>
            </div>
          )}

          {hasRunProcessing && !isProcessing && (
            <div style={{ marginTop: '12px', fontSize: '11.5px', color: 'var(--status-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} />
              <span>Harmonization run completed in 1.18s · 12,450 records processed</span>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* MOBILE AI WORKFLOW STEPPER (VISIBLE ON MOBILE ONLY)          */}
      {/* ============================================================ */}
      <div className="mobile-step-indicator mobile-only">
        <div className="mobile-step-item">
          <span className="mobile-step-num">1</span>
          <span>Records</span>
        </div>
        <span style={{ color: 'var(--border-medium)' }}>→</span>
        <div className="mobile-step-item active">
          <span className="mobile-step-num">2</span>
          <span>AI Analysis</span>
        </div>
        <span style={{ color: 'var(--border-medium)' }}>→</span>
        <div className="mobile-step-item">
          <span className="mobile-step-num">3</span>
          <span>Review</span>
        </div>
        <span style={{ color: 'var(--border-medium)' }}>→</span>
        <div className="mobile-step-item">
          <span className="mobile-step-num">4</span>
          <span>Approve</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3-COLUMN WORKSPACE: MATERIAL RECORDS → AI ANALYSIS → HARMONIZED */}
      {/* ============================================================ */}
      <div className="ai-harmonization-three-col">
        
        {/* ========================================================== */}
        {/* COLUMN 1: SOURCE MATERIALS (MATERIAL RECORDS)               */}
        {/* ========================================================== */}
        <div className="card-section" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <Building2 size={15} color="var(--accent-blue)" />
              <span>Source Materials</span>
            </div>
            <span className="badge badge-neutral">
              {activeCluster.memberLegacyCodes.length} Records
            </span>
          </div>

          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="text-secondary-info" style={{ marginBottom: '2px' }}>
              Disparate CPSE ERP records identified for harmonization:
            </div>

            {activeCluster.memberLegacyCodes.map((item) => (
              <div
                key={item.code}
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="cpse-tag">{item.cpse}</span>
                    <span className="code-pill">{item.code}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {item.plant || 'Main Plant'}
                  </span>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '2px' }}>
                  Original ERP Description:
                </div>
                <div style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface)',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid var(--border-subtle)',
                  marginBottom: '8px'
                }}>
                  “{item.desc}”
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
                  <span>UOM: <strong>{item.uom}</strong></span>
                  <span>Unit Cost: <strong>₹{item.price?.toFixed(2) || '85.00'}</strong></span>
                </div>
              </div>
            ))}

            <div style={{
              padding: '10px',
              backgroundColor: 'var(--bg-surface)',
              border: '1px dashed var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '11.5px',
              color: 'var(--text-secondary)',
              textAlign: 'center'
            }}>
              3 independent ERP records representing 1 identical physical commodity.
            </div>
          </div>
        </div>

        {/* Mobile vertical flow arrow */}
        <div className="mobile-only" style={{ textAlign: 'center', margin: '-10px 0', color: 'var(--text-muted)' }}>
          <ArrowDown size={18} />
        </div>

        {/* ========================================================== */}
        {/* COLUMN 2: AI ANALYSIS                                      */}
        {/* ========================================================== */}
        <div className="card-section" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <Sparkles size={15} color="var(--accent-blue)" />
              <span>AI Analysis</span>
            </div>
            <span className="badge badge-approved">
              {activeCluster.confidenceScore}% Confidence
            </span>
          </div>

          <div className="card-body">
            {/* Match Indicators (Thin Progress Bars) */}
            <div style={{ marginBottom: '18px' }}>
              <div className="text-secondary-info" style={{ fontWeight: 600, marginBottom: '10px', color: 'var(--text-primary)' }}>
                Attribute & Semantic Similarity:
              </div>

              {/* Semantic Match */}
              <div style={{ marginBottom: '12px' }}>
                <div className="ai-match-meter">
                  <span className="ai-match-meter-label">Semantic Match</span>
                  <span className="ai-match-meter-val">97%</span>
                </div>
                <div className="thin-progress-bar">
                  <div className="thin-progress-fill" style={{ width: '97%' }} />
                </div>
              </div>

              {/* Attribute Match */}
              <div style={{ marginBottom: '12px' }}>
                <div className="ai-match-meter">
                  <span className="ai-match-meter-label">Attribute Match</span>
                  <span className="ai-match-meter-val">100%</span>
                </div>
                <div className="thin-progress-bar">
                  <div className="thin-progress-fill" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Specification Match */}
              <div style={{ marginBottom: '12px' }}>
                <div className="ai-match-meter">
                  <span className="ai-match-meter-label">Specification Match</span>
                  <span className="ai-match-meter-val">95%</span>
                </div>
                <div className="thin-progress-bar">
                  <div className="thin-progress-fill" style={{ width: '95%' }} />
                </div>
              </div>

              {/* UOM Match */}
              <div style={{ marginBottom: '14px' }}>
                <div className="ai-match-meter">
                  <span className="ai-match-meter-label">UOM Match</span>
                  <span className="ai-match-meter-val">100%</span>
                </div>
                <div className="thin-progress-bar">
                  <div className="thin-progress-fill" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            {/* Explainable AI Evidence */}
            <div style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                AI Recommendation Evidence
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--status-success)' }}>•</span>
                  <span><strong>Same dimensions:</strong> M10 × 50 mm</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--status-success)' }}>•</span>
                  <span><strong>Same grade:</strong> Property Class 8.8</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--status-success)' }}>•</span>
                  <span><strong>Same material category:</strong> Fasteners</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--status-success)' }}>•</span>
                  <span><strong>Equivalent terminology:</strong> Hex Bolt ≅ Hex Head</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--status-success)' }}>•</span>
                  <span><strong>Same UOM:</strong> EA ≅ NOS unified to EA</span>
                </li>
              </ul>
            </div>

            {/* Reconciled Variations */}
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
              <strong>Reconciled Variations:</strong> Syntax order normalized (Noun-first vs modifier); metric representation unified (10 mm space vs M10).
            </div>
          </div>
        </div>

        {/* Mobile vertical flow arrow */}
        <div className="mobile-only" style={{ textAlign: 'center', margin: '-10px 0', color: 'var(--text-muted)' }}>
          <ArrowDown size={18} />
        </div>

        {/* ========================================================== */}
        {/* COLUMN 3: HARMONIZED MATERIAL                              */}
        {/* ========================================================== */}
        <div className="card-section" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div className="card-title">
              <CheckCircle2 size={15} color="var(--status-success)" />
              <span>Harmonized Material</span>
            </div>
            <span className="badge badge-approved">
              Standardized
            </span>
          </div>

          <div className="card-body">
            {/* Harmonized Code Box */}
            <div style={{
              backgroundColor: 'var(--bg-canvas)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
                Standard Harmonized Code
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {activeCluster.harmonizedCode}
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleCopyCode(activeCluster.harmonizedCode)}
                  title="Copy Code"
                >
                  {copiedCode ? <Check size={12} color="var(--status-success)" /> : <Copy size={12} />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Standard Description */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '4px' }}>
                Standardized Description
              </div>
              <div style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.45,
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                padding: '10px',
                borderRadius: 'var(--radius-xs)'
              }}>
                {activeCluster.standardizedDescription}
              </div>
            </div>

            {/* Standardized Attributes Table */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                Standardized Attributes
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '12px'
              }}>
                <div style={{ padding: '8px', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Material</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Carbon Steel</div>
                </div>
                <div style={{ padding: '8px', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Dimension</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>M10 × 50 mm</div>
                </div>
                <div style={{ padding: '8px', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>Grade</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>8.8</div>
                </div>
                <div style={{ padding: '8px', background: 'var(--bg-canvas)', borderRadius: 'var(--radius-xs)' }}>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>UOM</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>EA</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn btn-primary"
                onClick={() => setShowApproveConfirm(true)}
                style={{ width: '100%', minHeight: '40px' }}
              >
                <Check size={14} />
                <span>Approve Mapping</span>
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleSendForReview}
                  style={{ minHeight: '36px' }}
                >
                  <span>Review</span>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setShowRejectConfirm(true)}
                  style={{ minHeight: '36px' }}
                >
                  <span>Reject</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* APPROVAL CONFIRMATION MODAL                                  */}
      {/* ============================================================ */}
      {showApproveConfirm && (
        <div className="confirm-modal-overlay" onClick={() => setShowApproveConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <CheckCircle2 size={16} color="var(--status-success)" />
                <span>Confirm Harmonization Approval</span>
              </div>
              <button
                className="btn-icon-subtle"
                onClick={() => setShowApproveConfirm(false)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <p style={{ marginBottom: '10px' }}>
                Publish standardized mapping to the National Master Catalog:
              </p>
              <div style={{
                backgroundColor: 'var(--bg-canvas)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '14px',
                border: '1px solid var(--border-subtle)'
              }}>
                <div style={{ fontWeight: 600 }}>{activeCluster.harmonizedCode}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {activeCluster.standardizedDescription}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowApproveConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleApprove}
                >
                  Confirm & Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* REJECTION CONFIRMATION MODAL                                 */}
      {/* ============================================================ */}
      {showRejectConfirm && (
        <div className="confirm-modal-overlay" onClick={() => setShowRejectConfirm(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <AlertCircle size={16} color="var(--status-error)" />
                <span>Reject Harmonization Recommendation</span>
              </div>
              <button
                className="btn-icon-subtle"
                onClick={() => setShowRejectConfirm(false)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <p style={{ marginBottom: '8px' }}>
                Provide justification for rejecting this cluster:
              </p>
              <textarea
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '12.5px',
                  marginBottom: '14px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
                placeholder="e.g. Incompatible metallurgy grade or dimensional standard..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowRejectConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleReject}
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
