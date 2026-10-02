import React, { useState, useRef, useMemo } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  FileCheck,
  Building2,
  Sparkles,
  RefreshCw,
  Check,
  Database,
  Layers
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';
import Pagination from './Pagination';

// Initial Recent Imports Data
const INITIAL_RECENT_IMPORTS = [
  {
    id: 'IMP-2026-091',
    fileName: 'BHEL_Haridwar_SAP_ECC_Material_Master_2026.xlsx',
    cpse: 'BHEL',
    format: 'XLSX',
    recordsDetected: 32410,
    validRecords: 31980,
    uploadDate: '2026-10-02 14:20 IST',
    status: 'Processed'
  },
  {
    id: 'IMP-2026-090',
    fileName: 'NTPC_Sipat_Thermal_MM_Catalog.csv',
    cpse: 'NTPC',
    format: 'CSV',
    recordsDetected: 28940,
    validRecords: 28510,
    uploadDate: '2026-10-01 16:45 IST',
    status: 'Processed'
  },
  {
    id: 'IMP-2026-089',
    fileName: 'ONGC_WesternOnshore_Materials_SAP_S4.xlsx',
    cpse: 'ONGC',
    format: 'XLSX',
    recordsDetected: 26800,
    validRecords: 26450,
    uploadDate: '2026-09-30 11:10 IST',
    status: 'Processed'
  },
  {
    id: 'IMP-2026-088',
    fileName: 'IOCL_Refineries_Master_Dump.csv',
    cpse: 'IOCL',
    format: 'CSV',
    recordsDetected: 31200,
    validRecords: 30890,
    uploadDate: '2026-09-29 17:30 IST',
    status: 'Processed'
  },
  {
    id: 'IMP-2026-087',
    fileName: 'SAIL_Bhilai_Steel_ERP_Oracle.csv',
    cpse: 'SAIL',
    format: 'CSV',
    recordsDetected: 22800,
    validRecords: 22340,
    uploadDate: '2026-09-28 10:15 IST',
    status: 'Processed'
  }
];

// Presets for 1-click evaluation
const SAMPLE_FILES = [
  {
    name: 'BHEL_Heavy_Equipment_Catalog_2026.xlsx',
    cpse: 'BHEL',
    format: 'XLSX',
    size: '4.8 MB',
    records: 24820,
    valid: 24392,
    missingDesc: 182,
    invalidUOM: 91,
    duplicates: 155
  },
  {
    name: 'NTPC_Super_Thermal_Spares_Dump.csv',
    cpse: 'NTPC',
    format: 'CSV',
    size: '3.6 MB',
    records: 18450,
    valid: 18120,
    missingDesc: 140,
    invalidUOM: 62,
    duplicates: 128
  },
  {
    name: 'IOCL_Refinery_Piping_Fasteners.json',
    cpse: 'IOCL',
    format: 'JSON',
    size: '2.9 MB',
    records: 14200,
    valid: 13950,
    missingDesc: 95,
    invalidUOM: 45,
    duplicates: 110
  }
];

export default function DataImport({ onNavigate, onIngestSuccess }) {
  const fileInputRef = useRef(null);

  // Upload & Selection State
  const [selectedCPSE, setSelectedCPSE] = useState('BHEL');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Validation Workflow State
  const [isValidating, setIsValidating] = useState(false);
  const [validationStage, setValidationStage] = useState(0); // 0 to 5
  const [validationResults, setValidationResults] = useState(null);

  // AI Processing State
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiCompleted, setAiCompleted] = useState(false);

  // Recent Imports List
  const [recentImports, setRecentImports] = useState(INITIAL_RECENT_IMPORTS);

  // Pagination for Recent Imports Table
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const paginatedImports = useMemo(() => {
    return recentImports.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [recentImports, currentPage, pageSize]);

  // Trigger Validation Workflow Pipeline
  const runValidationPipeline = (fileData) => {
    setUploadedFile(fileData);
    setValidationResults(null);
    setAiCompleted(false);
    setIsValidating(true);
    setValidationStage(1);

    // Stage 1: File Validation
    setTimeout(() => {
      setValidationStage(2); // Stage 2: Schema Mapping
    }, 500);

    // Stage 3: Data Quality Check
    setTimeout(() => {
      setValidationStage(3);
    }, 1000);

    // Stage 4: Normalization
    setTimeout(() => {
      setValidationStage(4);
    }, 1500);

    // Stage 5: AI Harmonization Ready
    setTimeout(() => {
      setValidationStage(5);
      setIsValidating(false);
      setValidationResults({
        recordsDetected: fileData.records || 24820,
        validRecords: fileData.valid || 24392,
        missingDescriptions: fileData.missingDesc || 182,
        invalidUOM: fileData.invalidUOM || 91,
        duplicateCodes: fileData.duplicates || 155
      });
    }, 2000);
  };

  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const extension = file.name.split('.').pop().toUpperCase();
      runValidationPipeline({
        name: file.name,
        cpse: selectedCPSE,
        format: extension,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        records: 24820,
        valid: 24392,
        missingDesc: 182,
        invalidUOM: 91,
        duplicates: 155
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const extension = file.name.split('.').pop().toUpperCase();
      runValidationPipeline({
        name: file.name,
        cpse: selectedCPSE,
        format: extension,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        records: 24820,
        valid: 24392,
        missingDesc: 182,
        invalidUOM: 91,
        duplicates: 155
      });
    }
  };

  // Load Preset Sample File
  const handleSelectSample = (sample) => {
    setSelectedCPSE(sample.cpse);
    runValidationPipeline(sample);
  };

  // Trigger Start AI Processing
  const handleStartAIProcessing = () => {
    if (!validationResults) return;

    setIsProcessingAI(true);
    setAiProgress(15);

    setTimeout(() => setAiProgress(45), 400);
    setTimeout(() => setAiProgress(75), 800);
    setTimeout(() => {
      setAiProgress(100);
      setIsProcessingAI(false);
      setAiCompleted(true);

      // Prepend to Recent Imports
      const newImport = {
        id: `IMP-2026-${Math.floor(100 + Math.random() * 900)}`,
        fileName: uploadedFile.name,
        cpse: selectedCPSE,
        format: uploadedFile.format,
        recordsDetected: validationResults.recordsDetected,
        validRecords: validationResults.validRecords,
        uploadDate: '2026-10-02 21:50 IST',
        status: 'Processed'
      };
      setRecentImports(prev => [newImport, ...prev]);

      if (onIngestSuccess) {
        onIngestSuccess(selectedCPSE, uploadedFile.name);
      }
    }, 1300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Import Material Master</span>
            <span className="badge badge-neutral">Enterprise Ingestion Pipeline</span>
          </h1>
          <div className="view-subtitle">
            Upload and validate material master data for AI-powered harmonization.
          </div>
        </div>

        <div className="view-actions">
          <div style={{ display: 'flex', gap: '8px' }}>
            {onNavigate && (
              <>
                <button className="btn btn-outline btn-sm" onClick={() => onNavigate('master')}>
                  <Database size={14} />
                  <span>Master Catalog</span>
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => onNavigate('harmonization')}>
                  <Sparkles size={14} />
                  <span>AI Harmonization Engine</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Upload Area & CPSE Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>

        {/* Left Column: Clean Upload Area */}
        <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UploadCloud size={18} color="var(--accent-primary)" />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Material Master Upload
              </h3>
            </div>

            {/* Supported Formats */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <span className="format-badge active">CSV</span>
              <span className="format-badge active">XLSX</span>
              <span className="format-badge active">JSON</span>
            </div>
          </div>

          {/* CPSE Selector */}
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Origin CPSE Enterprise:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                className="select-filter"
                style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                value={selectedCPSE}
                onChange={(e) => setSelectedCPSE(e.target.value)}
              >
                {CPSE_LIST.filter(c => c.id !== 'ALL').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.shortName} — {c.name} ({c.sector})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Upload Dropzone */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv, .xlsx, .json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div
            className={`upload-dropzone ${isDragOver ? 'drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <UploadCloud size={24} color="var(--accent-primary)" />
            </div>

            <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              “Drag and drop your material master file here”
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
              or
            </div>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                if (fileInputRef.current) fileInputRef.current.click();
              }}
              style={{ padding: '6px 16px', fontSize: '12px' }}
            >
              “Browse files”
            </button>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>
              Supported formats: <strong>CSV, XLSX, JSON</strong> • Maximum file size: <strong>100 MB</strong>
            </div>

            {uploadedFile && (
              <div style={{
                marginTop: '16px',
                padding: '8px 12px',
                backgroundColor: '#ffffff',
                border: '1px solid var(--accent-border)',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileSpreadsheet size={16} color="var(--accent-primary)" />
                <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {uploadedFile.name}
                </span>
                <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                  {uploadedFile.size || '4.8 MB'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preloaded Certified CPSE Catalogs */}
        <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Building2 size={16} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Certified Preloaded Datasets
            </h3>
          </div>
          <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>
            Or instantly test the validation pipeline with actual CPSE master catalog exports:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SAMPLE_FILES.map((sample) => {
              const isSelected = uploadedFile && uploadedFile.name === sample.name;
              return (
                <div
                  key={sample.name}
                  onClick={() => handleSelectSample(sample)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    backgroundColor: isSelected ? '#f0f7ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span className={`cpse-tag ${sample.cpse.toLowerCase()}`}>{sample.cpse}</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {sample.name}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        <strong>{sample.records.toLocaleString()}</strong> records • {sample.format} • {sample.size}
                      </div>
                    </div>

                    {isSelected ? (
                      <CheckCircle2 size={18} color="var(--accent-primary)" />
                    ) : (
                      <span className="badge badge-neutral" style={{ fontSize: '10.5px' }}>
                        Load Sample
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Field Specifications (Required & Optional Fields) */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <FileCheck size={16} color="var(--accent-primary)" />
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
            ERP Schema Field Specifications
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* Required Fields */}
          <div style={{
            border: '1px solid #fecaca',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
            backgroundColor: '#fffdfd'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span className="field-tag required">Required Fields</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Mandatory for entity resolution & catalog indexing
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <div className="field-chip required">
                <span>Material Code</span>
                <span style={{ fontSize: '10px', color: '#991b1b', fontWeight: 700 }}>(e.g. MATNR)</span>
              </div>
              <div className="field-chip required">
                <span>Material Description</span>
                <span style={{ fontSize: '10px', color: '#991b1b', fontWeight: 700 }}>(e.g. MAKTX)</span>
              </div>
              <div className="field-chip required">
                <span>UOM</span>
                <span style={{ fontSize: '10px', color: '#991b1b', fontWeight: 700 }}>(e.g. MEINS)</span>
              </div>
              <div className="field-chip required">
                <span>Category</span>
                <span style={{ fontSize: '10px', color: '#991b1b', fontWeight: 700 }}>(e.g. MATKL)</span>
              </div>
            </div>
          </div>

          {/* Optional Fields */}
          <div style={{
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span className="field-tag optional">Optional Fields</span>
              <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                Enhance AI attribute matching and similarity scoring
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <div className="field-chip optional">
                <span>Manufacturer</span>
              </div>
              <div className="field-chip optional">
                <span>Part Number</span>
              </div>
              <div className="field-chip optional">
                <span>Specification</span>
              </div>
              <div className="field-chip optional">
                <span>Material Type</span>
              </div>
              <div className="field-chip optional">
                <span>Plant</span>
              </div>
              <div className="field-chip optional">
                <span>Procurement Group</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Validation Workflow (Appears after file is selected/dropped) */}
      {uploadedFile && (
        <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Validation Workflow Pipeline
                </h3>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Automated multi-stage pre-processing for <strong>{uploadedFile.name}</strong> ({selectedCPSE})
              </div>
            </div>

            {isValidating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--accent-primary)', fontWeight: 600 }}>
                <RefreshCw size={14} className="spin" />
                <span>Running Stage {validationStage} of 5...</span>
              </div>
            )}
          </div>

          {/* 5-step Validation Stepper */}
          <div className="validation-stepper">
            {[
              { num: 1, name: 'File Validation' },
              { num: 2, name: 'Schema Mapping' },
              { num: 3, name: 'Data Quality Check' },
              { num: 4, name: 'Normalization' },
              { num: 5, name: 'AI Harmonization' }
            ].map((step, idx) => {
              const isDone = validationStage > step.num || validationStage === 5;
              const isActive = validationStage === step.num && isValidating;

              return (
                <React.Fragment key={step.num}>
                  <div className={`validation-step-item ${isDone ? 'completed' : (isActive ? 'active' : '')}`}>
                    <div className="validation-step-num">
                      {isDone ? <Check size={13} /> : step.num}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: isDone || isActive ? 700 : 500,
                        color: isDone ? '#15803d' : (isActive ? 'var(--accent-primary)' : 'var(--text-muted)')
                      }}>
                        {step.num}. {step.name}
                      </div>
                      <div style={{ fontSize: '10.5px', color: 'var(--text-light)' }}>
                        {isDone ? 'Validated' : (isActive ? 'Checking...' : 'Pending')}
                      </div>
                    </div>
                  </div>
                  {idx < 4 && (
                    <div style={{
                      width: '24px',
                      height: '2px',
                      backgroundColor: isDone ? '#10b981' : 'var(--border-subtle)',
                      transition: 'all 0.3s ease'
                    }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Example Validation Results Card */}
          {validationResults && (
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px 20px',
              marginTop: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Pre-Ingestion Validation Audit Summary
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Source file passed structural and semantic threshold checks with <strong>98.3% data integrity</strong>.
                  </div>
                </div>

                <span className="badge badge-approved" style={{ fontSize: '11.5px', padding: '3px 10px' }}>
                  <CheckCircle2 size={12} style={{ marginRight: '4px' }} /> Ready for AI Processing
                </span>
              </div>

              {/* 5 Validation Metric Boxes */}
              <div className="validation-metric-grid">
                <div className="validation-metric-card">
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Records Detected
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {validationResults.recordsDetected.toLocaleString()}
                  </div>
                </div>

                <div className="validation-metric-card success">
                  <div style={{ fontSize: '10.5px', color: '#166534', textTransform: 'uppercase', fontWeight: 600 }}>
                    Valid Records
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#15803d', marginTop: '2px' }}>
                    {validationResults.validRecords.toLocaleString()}
                  </div>
                </div>

                <div className="validation-metric-card warning">
                  <div style={{ fontSize: '10.5px', color: '#92400e', textTransform: 'uppercase', fontWeight: 600 }}>
                    Missing Descriptions
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
                    {validationResults.missingDescriptions}
                  </div>
                </div>

                <div className="validation-metric-card warning">
                  <div style={{ fontSize: '10.5px', color: '#92400e', textTransform: 'uppercase', fontWeight: 600 }}>
                    Invalid UOM
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#b45309', marginTop: '2px' }}>
                    {validationResults.invalidUOM}
                  </div>
                </div>

                <div className="validation-metric-card danger">
                  <div style={{ fontSize: '10.5px', color: '#991b1b', textTransform: 'uppercase', fontWeight: 600 }}>
                    Duplicate Codes
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', marginTop: '2px' }}>
                    {validationResults.duplicateCodes}
                  </div>
                </div>
              </div>

              {/* Visual Health Breakdown Bar */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>Validation Distribution</span>
                  <span>98.3% Clean Records • 1.7% Flags</span>
                </div>
                <div style={{ height: '8px', width: '100%', backgroundColor: '#e2e8f0', borderRadius: '4px', display: 'flex', overflow: 'hidden' }}>
                  <div style={{ width: '98.3%', backgroundColor: '#10b981' }} title="Valid Records" />
                  <div style={{ width: '0.7%', backgroundColor: '#f59e0b' }} title="Missing Descriptions" />
                  <div style={{ width: '0.4%', backgroundColor: '#f97316' }} title="Invalid UOM" />
                  <div style={{ width: '0.6%', backgroundColor: '#ef4444' }} title="Duplicate Codes" />
                </div>
              </div>

              {/* Action Button: Start AI Processing */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  {isProcessingAI ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RefreshCw size={16} className="spin" color="var(--accent-primary)" />
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                        Running Semantic Embeddings & Clustering ({aiProgress}%)...
                      </span>
                    </div>
                  ) : aiCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803d' }}>
                      <CheckCircle2 size={16} />
                      <span style={{ fontSize: '12.5px', fontWeight: 700 }}>
                        AI Harmonization Completed & Indexed!
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                      Click below to generate semantic vector clusters and cross-CPSE mappings.
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {aiCompleted ? (
                    <>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onNavigate && onNavigate('crosswalk')}
                      >
                        <Layers size={13} style={{ marginRight: '4px' }} />
                        View Material Crosswalk
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onNavigate && onNavigate('harmonization')}
                      >
                        <Sparkles size={13} style={{ marginRight: '4px' }} />
                        Open AI Harmonization Workspace
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={handleStartAIProcessing}
                      disabled={isProcessingAI}
                      style={{ padding: '8px 20px', fontSize: '13px' }}
                    >
                      <Sparkles size={15} />
                      <span>Start AI Processing</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* Recent Imports Table */}
      <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Recent Material Master Imports
            </h3>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Historical log of ingested CPSE master catalogs, validation rates, and normalization status.
            </div>
          </div>

          <span className="badge badge-neutral" style={{ fontSize: '11px' }}>
            {recentImports.length} Total Batches
          </span>
        </div>

        <div className="table-container" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '110px' }}>Batch ID</th>
                <th>File Name</th>
                <th style={{ width: '100px' }}>CPSE</th>
                <th style={{ width: '80px' }}>Format</th>
                <th style={{ width: '130px', textAlign: 'right' }}>Records Detected</th>
                <th style={{ width: '120px', textAlign: 'right' }}>Valid Records</th>
                <th style={{ width: '160px' }}>Upload Date</th>
                <th style={{ width: '110px' }}>Status</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedImports.map((imp) => (
                <tr key={imp.id}>
                  <td>
                    <span className="code-pill">{imp.id}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: 'var(--text-primary)' }}>
                      {imp.fileName}
                    </div>
                  </td>
                  <td>
                    <span className={`cpse-tag ${imp.cpse.toLowerCase()}`}>{imp.cpse}</span>
                  </td>
                  <td>
                    <span className="format-badge">{imp.format}</span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {imp.recordsDetected.toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: '#15803d' }}>
                    {imp.validRecords.toLocaleString()}
                  </td>
                  <td style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                    {imp.uploadDate}
                  </td>
                  <td>
                    <span className="badge badge-approved">
                      <Check size={11} style={{ marginRight: '3px' }} /> {imp.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate && onNavigate('master')}
                      style={{ padding: '3px 8px', fontSize: '11px' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Floating-Style Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={recentImports.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[3, 4, 6]}
          itemName="batches"
        />
      </div>

      {/* Institutional Statutory Footer */}
      <footer className="institutional-footer">
        <div className="institutional-footer-row">
          <div className="institutional-watermark">
            <span>🏛️</span>
            <span>PRASHAM [प्रशम] • Ministry of Heavy Industries & Department of Public Enterprises (DPE)</span>
          </div>
          <div>
            <span>Automated Pre-Ingestion Data Quality & Validation Engine</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Schema Mapping & GeM GFR 2017 Pre-Processor v4.2</span>
        </div>
      </footer>

    </div>
  );
}
