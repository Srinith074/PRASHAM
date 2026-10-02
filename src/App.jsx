import React, { useState } from 'react';
import FloatingNav from './components/FloatingNav';
import Dashboard from './components/Dashboard';
import MaterialMaster from './components/MaterialMaster';
import AIHarmonization from './components/AIHarmonization';
import DuplicateDetection from './components/DuplicateDetection';
import MappingCrosswalk from './components/MappingCrosswalk';
import ReviewApproval from './components/ReviewApproval';
import Analytics from './components/Analytics';
import DataImport from './components/DataImport';
import AuditTrail from './components/AuditTrail';
import SettingsTaxonomy from './components/SettingsTaxonomy';

import { HARMONIZATION_CLUSTERS, AUDIT_TRAIL_LOG, MASTER_RECORDS } from './data/mockData';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [selectedCPSE, setSelectedCPSE] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [clusters, setClusters] = useState(HARMONIZATION_CLUSTERS);
  const [masterRecords, setMasterRecords] = useState(MASTER_RECORDS);
  const [auditLogs, setAuditLogs] = useState(AUDIT_TRAIL_LOG);
  const [activeReviewCluster, setActiveReviewCluster] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Trigger toast alert
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Human approval handler
  const handleApproveCluster = (clusterId, editedDesc, remarks) => {
    setClusters(prev => prev.map(c => {
      if (c.clusterId === clusterId) {
        return {
          ...c,
          status: 'Approved',
          standardizedDescription: editedDesc || c.standardizedDescription,
          approvedBy: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
          approvedDate: new Date().toISOString().replace('T', ' ').slice(0, 19),
          reviewNotes: remarks || c.reviewNotes
        };
      }
      return c;
    }));

    // Prepend to Audit Trail
    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Dr. R. K. Verma',
      role: 'Chief Master Data Steward (DPE)',
      cpse: 'Multi-CPSE',
      action: 'HARMONIZATION_APPROVAL',
      targetCode: clusterId,
      details: remarks || `Approved harmonization of cluster ${clusterId}. Standardized description published to GeM Master Catalog.`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    showToast(`Cluster ${clusterId} successfully approved and published to the National Master Catalog!`);
  };

  // Human rejection handler
  const handleRejectCluster = (clusterId, reason) => {
    setClusters(prev => prev.map(c => {
      if (c.clusterId === clusterId) {
        return {
          ...c,
          status: 'Rejected',
          reviewNotes: `Rejected by Chief Steward: ${reason}`
        };
      }
      return c;
    }));

    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Dr. R. K. Verma',
      role: 'Chief Master Data Steward (DPE)',
      cpse: 'Multi-CPSE',
      action: 'REJECTION_SUBMITTED',
      targetCode: clusterId,
      details: `Steward rejected harmonization: ${reason}`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);

    showToast(`Harmonization rejected for ${clusterId}. Audit justification recorded.`);
  };

  // Material Master record mapping actions
  const handleApproveMasterRecord = (materialCode, note) => {
    setMasterRecords(prev => prev.map(rec => {
      if (rec.materialCode === materialCode) {
        return {
          ...rec,
          status: 'Harmonized',
          similarity: Math.max(rec.similarity, 95),
          lastUpdated: new Date().toISOString().slice(0, 10),
          approvalNote: note || 'Approved by Chief Master Data Steward (DPE)'
        };
      }
      return rec;
    }));

    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Dr. R. K. Verma',
      role: 'Chief Master Data Steward (DPE)',
      cpse: 'Multi-CPSE',
      action: 'RECORD_MAPPING_APPROVED',
      targetCode: materialCode,
      details: note || `Approved harmonization mapping for material ${materialCode}. Published to unified master catalog.`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    showToast(`Material mapping for ${materialCode} approved!`);
  };

  const handleRejectMasterRecord = (materialCode, reason) => {
    setMasterRecords(prev => prev.map(rec => {
      if (rec.materialCode === materialCode) {
        return {
          ...rec,
          status: 'Rejected',
          lastUpdated: new Date().toISOString().slice(0, 10),
          rejectionReason: reason || 'Incompatible technical specification or standard'
        };
      }
      return rec;
    }));

    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Dr. R. K. Verma',
      role: 'Chief Master Data Steward (DPE)',
      cpse: 'Multi-CPSE',
      action: 'RECORD_MAPPING_REJECTED',
      targetCode: materialCode,
      details: reason ? `Rejected mapping: ${reason}` : `Rejected mapping for ${materialCode} due to attribute variance.`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    showToast(`Material mapping for ${materialCode} rejected.`);
  };

  const handleSendForReviewMasterRecord = (materialCode, note) => {
    setMasterRecords(prev => prev.map(rec => {
      if (rec.materialCode === materialCode) {
        return {
          ...rec,
          status: 'Review Required',
          lastUpdated: new Date().toISOString().slice(0, 10),
          reviewNote: note || 'Flagged for cross-CPSE technical committee review'
        };
      }
      return rec;
    }));

    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'Technical Evaluator',
      role: 'Inter-CPSE Data Committee',
      cpse: 'Multi-CPSE',
      action: 'RECORD_SENT_FOR_REVIEW',
      targetCode: materialCode,
      details: note || `Dispatched ${materialCode} to Technical Committee for dimensional and standard verification.`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    showToast(`Material ${materialCode} routed to Technical Committee for review.`);
  };

  // Ingestion success handler
  const handleIngestSuccess = (cpse, fileName) => {
    const newAudit = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'AI Ingestion Pipeline',
      role: 'Automated Data Normalizer',
      cpse: cpse,
      action: 'BATCH_INGESTION',
      targetCode: `BATCH-${cpse}-${new Date().getFullYear()}`,
      details: `Ingested ${fileName}. Executed attribute extraction, UOM standardization, and vector clustering.`,
      hash: `SHA256:${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`
    };
    setAuditLogs(prev => [newAudit, ...prev]);
    showToast(`Master catalog updated with new records from ${cpse}!`);
  };

  const pendingReviewCount = clusters.filter(c => c.status === 'Pending Review').length;

  return (
    <div className="app-container">
      {/* Floating Navigation (Desktop pill bar & Mobile bottom bar) */}
      <FloatingNav
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        selectedCPSE={selectedCPSE}
        onSelectCPSE={setSelectedCPSE}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pendingReviewCount={pendingReviewCount}
      />

      {/* Main Content Canvas */}
      <main className="main-content-canvas" id="main-content">
          {activeSection === 'dashboard' && (
            <Dashboard
              clusters={clusters}
              onNavigate={setActiveSection}
              onApprove={handleApproveCluster}
              onReject={handleRejectCluster}
              selectedCPSE={selectedCPSE}
              onSelectCPSE={setSelectedCPSE}
              showToast={showToast}
              onSelectClusterForReview={(cluster) => {
                setActiveReviewCluster(cluster);
                setActiveSection('review');
              }}
            />
          )}

          {activeSection === 'master' && (
            <MaterialMaster
              records={masterRecords}
              selectedCPSE={selectedCPSE}
              onSelectCPSE={setSelectedCPSE}
              searchQuery={searchQuery}
              onNavigate={setActiveSection}
              onApproveRecord={handleApproveMasterRecord}
              onRejectRecord={handleRejectMasterRecord}
              onReviewRecord={handleSendForReviewMasterRecord}
              showToast={showToast}
            />
          )}

          {activeSection === 'harmonization' && (
            <AIHarmonization
              onNavigate={setActiveSection}
              onApproveCluster={handleApproveCluster}
              showToast={showToast}
            />
          )}

          {activeSection === 'duplicates' && (
            <DuplicateDetection
              onNavigate={setActiveSection}
              onSelectClusterForReview={(cluster) => {
                setActiveReviewCluster(cluster);
                setActiveSection('review');
              }}
              showToast={showToast}
            />
          )}

          {activeSection === 'crosswalk' && (
            <MappingCrosswalk
              selectedCPSE={selectedCPSE}
              onSelectCPSE={setSelectedCPSE}
              onNavigate={setActiveSection}
              showToast={showToast}
            />
          )}

          {activeSection === 'review' && (
            <ReviewApproval
              clusters={clusters}
              onApprove={handleApproveCluster}
              onReject={handleRejectCluster}
              activeReviewCluster={activeReviewCluster}
              onOpenReviewModal={(cluster) => setActiveReviewCluster(cluster)}
              onCloseReviewModal={() => setActiveReviewCluster(null)}
              selectedCPSE={selectedCPSE}
              onSelectCPSE={setSelectedCPSE}
              showToast={showToast}
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'analytics' && (
            <Analytics
              onNavigate={setActiveSection}
            />
          )}

          {activeSection === 'import' && (
            <DataImport
              onNavigate={setActiveSection}
              onIngestSuccess={handleIngestSuccess}
            />
          )}

          {activeSection === 'audit' && (
            <AuditTrail
              auditLogs={auditLogs}
              onNavigate={setActiveSection}
              showToast={showToast}
            />
          )}

          {activeSection === 'settings' && (
            <SettingsTaxonomy />
          )}
        </main>

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="toast-alert">
          <CheckCircle2 size={16} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
