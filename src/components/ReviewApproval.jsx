import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Search,
  Filter,
  ArrowRight,
  FileCheck,
  History,
  Building2,
  Sparkles,
  X,
  RotateCcw
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';
import Pagination from './Pagination';

// Initial Review Cases Queue (Strictly following Human-in-the-Loop enterprise requirements)
const INITIAL_CASES = [
  {
    caseId: 'HR-004821',
    material: 'Hex Bolt M10 × 50',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'IOCL'],
    category: 'Fasteners',
    recommendationType: 'Merge',
    harmonizedCode: 'HMF-FAST-00128',
    standardizedDescription: 'Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8',
    confidence: 96.8,
    reason: 'Same dimensions and grade',
    created: '2h ago',
    ageCategory: 'Today',
    priority: 'High',
    status: 'Pending Review',
    metrics: {
      similarity: 96.8,
      attributeMatch: 100,
      semanticMatch: 97,
      specificationMatch: 95,
      uomMatch: 100
    },
    reasoning: 'The records represent the same material based on dimensions, material grade, category and functional description. Differences are primarily naming and coding conventions.',
    sourceRecords: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-FST-10921',
        originalDescription: 'HEX BOLT M10X50 GR 8.8',
        plant: 'Haridwar HEEP',
        erpSystem: 'SAP ECC 6.0',
        uom: 'EA',
        price: 84.50,
        specs: 'Thread M10, Length 50mm, Carbon Steel Class 8.8'
      },
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-BLT-88231',
        originalDescription: 'HEXAGONAL HEAD BOLT 10 MM X 50 MM CLASS 8.8',
        plant: 'Ramagundam STPP',
        erpSystem: 'SAP S/4HANA',
        uom: 'NOS',
        price: 89.00,
        specs: 'Thread 10mm, Length 50mm, Class 8.8 Medium Carbon'
      },
      {
        cpse: 'IOCL',
        originalCode: 'IOCL-FST-19283',
        originalDescription: 'MS HEX HEAD BOLT M10*50, GR8.8',
        plant: 'Panipat Refinery',
        erpSystem: 'Oracle E-Business Suite R12',
        uom: 'EA',
        price: 82.00,
        specs: 'Metric M10x50, Tensile Strength 800 MPa, Class 8.8'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004822',
    material: 'Gate Valve DN100 Carbon Steel',
    cpse: 'ONGC',
    participatingCPSEs: ['ONGC', 'GAIL'],
    category: 'Industrial Valves',
    recommendationType: 'Merge',
    harmonizedCode: 'HMF-VAL-00082',
    standardizedDescription: 'Gate Valve, DN 100 (4 Inch), Class 150, Flanged RF, ASTM A216 WCB',
    confidence: 94.7,
    reason: 'Equal pressure rating Class 150 & flange standard',
    created: '4h ago',
    ageCategory: 'Today',
    priority: 'High',
    status: 'Pending Review',
    metrics: {
      similarity: 94.7,
      attributeMatch: 98,
      semanticMatch: 96,
      specificationMatch: 94,
      uomMatch: 100
    },
    reasoning: 'The records represent the same material based on nominal bore (DN100 / 4"), ASME B16.5 Class 150 flange connection, and ASTM A216 Gr WCB cast steel body. Minor variations in legacy description abbreviation conventions.',
    sourceRecords: [
      {
        cpse: 'ONGC',
        originalCode: 'ONGC-VAL-8821',
        originalDescription: 'GATE VALVE 100 NB CS CL150 FLG',
        plant: 'Mumbai High Offshore Assets',
        erpSystem: 'SAP S/4HANA',
        uom: 'EA',
        price: 18400.00,
        specs: 'Nominal Bore 100mm, Class 150, Flanged Ends'
      },
      {
        cpse: 'GAIL',
        originalCode: 'GAIL-VLV-1029',
        originalDescription: 'VALVE GATE 4 INCH 150# RF WCB TRIM 8',
        plant: 'Pata Petrochemical Complex',
        erpSystem: 'SAP ECC 6.0',
        uom: 'NOS',
        price: 17850.00,
        specs: 'Size 4", 150# RF, Cast WCB Body, API 600 Trim 8'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004823',
    material: 'Seamless Steel Pipe 4" Sch 40',
    cpse: 'IOCL',
    participatingCPSEs: ['IOCL', 'BPCL'],
    category: 'Piping & Tubes',
    recommendationType: 'Standardize Description',
    harmonizedCode: 'HMF-PIPE-00214',
    standardizedDescription: 'Pipe, Carbon Steel Seamless, ASTM A106 Gr. B, 4" NB (DN 100), Schedule 40, Beveled Ends',
    confidence: 92.4,
    reason: 'Equivalent ASTM A106 Grade B schedule',
    created: '6h ago',
    ageCategory: 'Today',
    priority: 'Medium',
    status: 'Pending Review',
    metrics: {
      similarity: 92.4,
      attributeMatch: 96,
      semanticMatch: 93,
      specificationMatch: 91,
      uomMatch: 98
    },
    reasoning: 'Confirmed metallurgical and dimensional parity under ASTM A106 Grade B carbon steel for high-temperature process piping. Schedule 40 (6.02mm wall thickness) matches exactly across refinery pipeline catalogs.',
    sourceRecords: [
      {
        cpse: 'IOCL',
        originalCode: 'IOCL-PIP-55102',
        originalDescription: 'CS SEAMLESS PIPE 4 INCH SCH 40 ASTM A106 GR.B',
        plant: 'Mathura Refinery',
        erpSystem: 'SAP ECC 6.0',
        uom: 'MTR',
        price: 1420.00,
        specs: 'DN 100mm, OD 114.3mm, WT 6.02mm, ASTM A106 Gr B'
      },
      {
        cpse: 'BPCL',
        originalCode: 'BPCL-P-9021',
        originalDescription: 'PIPE CS SMLS 100NB SCH40 A106-B BE',
        plant: 'Mumbai Refinery',
        erpSystem: 'SAP S/4HANA',
        uom: 'MTR',
        price: 1450.00,
        specs: '100 NB, Schedule 40, Beveled End, Seamless Carbon'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004824',
    material: 'Deep Groove Ball Bearing 6205-2RS',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'SAIL'],
    category: 'Mechanical Bearings',
    recommendationType: 'Merge',
    harmonizedCode: 'HMF-BEAR-00045',
    standardizedDescription: 'Radial Deep Groove Ball Bearing, 6205-2RS, Bore 25 mm, OD 52 mm, Width 15 mm, Dual Contact Seals',
    confidence: 97.1,
    reason: 'Identical bore 25mm, OD 52mm, rubber seal',
    created: '1d ago',
    ageCategory: 'Last 24 Hours',
    priority: 'High',
    status: 'Pending Review',
    metrics: {
      similarity: 97.1,
      attributeMatch: 100,
      semanticMatch: 98,
      specificationMatch: 96,
      uomMatch: 100
    },
    reasoning: 'Standard ISO international bearing designation 6205-2RS verified. Internal radial clearance C3, dual nitrile rubber seals, and standard dynamic load rating (14 kN) verified across plant motor maintenance inventories.',
    sourceRecords: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-BRG-2201',
        originalDescription: 'DEEP GROOVE BALL BRG 6205 2RS C3',
        plant: 'Bhopal Heavy Electrical Plant',
        erpSystem: 'SAP ECC 6.0',
        uom: 'EA',
        price: 420.00,
        specs: '25x52x15 mm, 2RS Rubber Seals, Clearance C3'
      },
      {
        cpse: 'SAIL',
        originalCode: 'SAIL-BSP-4019',
        originalDescription: 'BRG BALL RADIAL 6205-2RS1/C3 SKF/FAG',
        plant: 'Bhilai Steel Plant',
        erpSystem: 'Oracle ERP',
        uom: 'NOS',
        price: 435.00,
        specs: '6205 Deep Groove Ball, Dual Contact Seals C3'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004825',
    material: 'Centrifugal Slurry Impeller 150x125',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'SAIL'],
    category: 'Pumps & Rotating Equipment',
    recommendationType: 'Reclassify',
    harmonizedCode: 'HMF-PMP-00091',
    standardizedDescription: 'Impeller, Centrifugal Slurry Pump, High Chrome Alloy 27% Cr, Size 150 × 125 mm, ASTM A532 Class III',
    confidence: 88.5,
    reason: 'Slurry pump vs clear water pump classification discrepancy',
    created: '1d ago',
    ageCategory: 'Last 24 Hours',
    priority: 'Medium',
    status: 'Pending Review',
    metrics: {
      similarity: 88.5,
      attributeMatch: 91,
      semanticMatch: 89,
      specificationMatch: 86,
      uomMatch: 100
    },
    reasoning: 'High-wear chromium alloy (27-28% Cr) verified for abrasive slurry service under ASTM A532 Class III. One legacy catalog misclassified the item under generic water pump spares. Reclassification to Heavy Duty Slurry Equipment is recommended.',
    sourceRecords: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-PMP-4401',
        originalDescription: 'IMPELLER FOR SLURRY PUMP 150X125 HIGH CHROME ALLOY 27%',
        plant: 'Ranipet Boiler Auxiliaries Plant',
        erpSystem: 'SAP ECC 6.0',
        uom: 'NOS',
        price: 112000.00,
        specs: '150x125 mm, High Chrome 27% Cr, ASTM A532 Cl III'
      },
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-GEN-3004',
        originalDescription: 'PUMP IMPELLER C.I. HIGH CHROMIUM 28% CR ASTM A532 FOR ASH WATER',
        plant: 'Korba Super Thermal Power Plant',
        erpSystem: 'SAP S/4HANA',
        uom: 'NOS',
        price: 125000.00,
        specs: 'Ash Slurry Handling, 28% Chromium Alloy, 150/125'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004826',
    material: 'LT XLPE Copper Cable 4C x 16 sq mm',
    cpse: 'NTPC',
    participatingCPSEs: ['NTPC', 'BHEL'],
    category: 'Electrical & Instrumentation',
    recommendationType: 'Standardize Description',
    harmonizedCode: 'HMF-ELE-00332',
    standardizedDescription: 'Cable, 1.1 kV Grade, 4 Core × 16 sq. mm, Stranded Copper Conductor, XLPE Insulated, Armoured, IS 7098 Part 1',
    confidence: 95.3,
    reason: 'Standard 1.1kV IS 7098 Part 1 conformity',
    created: '2d ago',
    ageCategory: 'Last 7 Days',
    priority: 'Low',
    status: 'Pending Review',
    metrics: {
      similarity: 95.3,
      attributeMatch: 99,
      semanticMatch: 96,
      specificationMatch: 94,
      uomMatch: 100
    },
    reasoning: 'Conforms to Indian Standard IS 7098 Part 1 for 1100V cross-linked polyethylene insulated, galvanized round steel wire armored stranded copper power cable.',
    sourceRecords: [
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-CBL-11029',
        originalDescription: 'CABLE XLPE 4CX16 SQMM ARMOURED COPPER 1.1KV',
        plant: 'Vindhyachal STPP',
        erpSystem: 'SAP S/4HANA',
        uom: 'MTR',
        price: 380.00,
        specs: '1.1kV, 4C x 16 sq mm, XLPE/PVC/Armoured Cu'
      },
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-ELE-6712',
        originalDescription: '1.1 KV 4 CORE 16 SQMM CU ARMOURED XLPE CABLE IS 7098',
        plant: 'Tiruchirappalli HPBP',
        erpSystem: 'SAP ECC 6.0',
        uom: 'MTR',
        price: 375.00,
        specs: 'IS 7098 Part 1, 4C 16 sq mm Copper Armoured'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004827',
    material: 'Stainless Steel Hex Bolt M16 × 65',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'ONGC', 'IOCL', 'SAIL'],
    category: 'Fasteners',
    recommendationType: 'Merge',
    harmonizedCode: 'HMF-FAST-00304',
    standardizedDescription: 'Bolt, Hexagon Head, Full Thread, Stainless Steel 304 (A2-70), Size M16 × 65 mm, ISO 4017 / IS 1364',
    confidence: 98.4,
    reason: 'ISO 4017 / IS 1364 SS304 exact parity',
    created: '3d ago',
    ageCategory: 'Last 7 Days',
    priority: 'High',
    status: 'Pending Review',
    metrics: {
      similarity: 98.4,
      attributeMatch: 100,
      semanticMatch: 99,
      specificationMatch: 98,
      uomMatch: 100
    },
    reasoning: 'Full-thread hexagonal head bolt in austenitic stainless steel grade 304 (A2-70). M16 thread diameter and 65mm shank length. Standard IS 1364 aligns with ISO 4017 and DIN 933 across all 5 CPSE enterprise ERP inventories.',
    sourceRecords: [
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-PBN-094821',
        originalDescription: 'HEX BOLT M16 X 65MM SS304 FULL THREAD IS 1364',
        plant: 'Haridwar HEEP',
        erpSystem: 'SAP ECC 6.0',
        uom: 'NOS',
        price: 82.50,
        specs: 'SS304, M16x65mm, Full Thread, IS 1364'
      },
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-ST-88401',
        originalDescription: 'SS 304 BOLT HEX HEAD M16*65 WITH NUT',
        plant: 'Ramagundam STPP',
        erpSystem: 'SAP S/4HANA',
        uom: 'SET',
        price: 94.00,
        specs: 'SS304 A2-70, Hex Head M16x65'
      },
      {
        cpse: 'ONGC',
        originalCode: 'ONGC-OFF-1092',
        originalDescription: 'FASTENER BOLT HEX M16X65 304SS ASTM A193 B8',
        plant: 'Mumbai High Offshore',
        erpSystem: 'SAP S/4HANA',
        uom: 'EA',
        price: 98.00,
        specs: 'ASTM A193 B8 (304SS), M16x65 Hex Head'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  },
  {
    caseId: 'HR-004828',
    material: 'Transformer Bushing 33kV Porcelain',
    cpse: 'NTPC',
    participatingCPSEs: ['NTPC', 'BHEL'],
    category: 'Electrical & Power',
    recommendationType: 'Split',
    harmonizedCode: 'HMF-ELE-00419',
    standardizedDescription: 'Transformer Bushing, 33 kV, 630 A, Oil-Impregnated Paper (OIP), Porcelain Insulator, High Creepage',
    confidence: 78.2,
    reason: 'Distinct creepage distance specification detected',
    created: '4d ago',
    ageCategory: 'Last 7 Days',
    priority: 'High',
    status: 'Pending Review',
    metrics: {
      similarity: 78.2,
      attributeMatch: 82,
      semanticMatch: 81,
      specificationMatch: 74,
      uomMatch: 100
    },
    reasoning: 'AI detected that NTPC specification requires 31 mm/kV (Heavy Pollution Zone) creepage distance, whereas BHEL specification is rated for 25 mm/kV (Medium Pollution). Recommending splitting into two distinct harmonized identities to prevent substation flashover.',
    sourceRecords: [
      {
        cpse: 'NTPC',
        originalCode: 'NTPC-SUB-4412',
        originalDescription: '33KV TRANSFORMER BUSHING PORCELAIN HIGH CREEPAGE 31MM/KV',
        plant: 'Simhadri Super Thermal Power',
        erpSystem: 'SAP S/4HANA',
        uom: 'EA',
        price: 48000.00,
        specs: '33kV, 31 mm/kV High Creepage, Heavy Pollution'
      },
      {
        cpse: 'BHEL',
        originalCode: 'BHEL-TRF-9018',
        originalDescription: 'BUSHING 33KV 630A PORCELAIN OIP MEDIUM CREEPAGE 25MM/KV',
        plant: 'Bhopal Transformer Division',
        erpSystem: 'SAP ECC 6.0',
        uom: 'NOS',
        price: 42500.00,
        specs: '33kV 630A, 25 mm/kV Medium Creepage'
      }
    ],
    reviewer: null,
    timestamp: null,
    reviewerComment: ''
  }
];

// Initial Approval History Audit Log
const INITIAL_APPROVAL_HISTORY = [
  {
    historyId: 'HIST-9901',
    caseId: 'HR-004819',
    material: 'Ball Valve 2" Class 300 Flanged RF WCB/SS316',
    decision: 'Approved',
    reviewer: 'Sh. Anoop Sundaram (Joint Director, Technical Procurement)',
    timestamp: '2026-10-01 16:30:15 IST',
    comment: 'Approved for consolidated bulk tendering on GeM. Dimensions, metallurgy, and ASME B16.34 ratings verified across ONGC, IOCL, and GAIL.',
    targetCode: 'HMF-VLV-00082'
  },
  {
    historyId: 'HIST-9902',
    caseId: 'HR-004818',
    material: 'Carbon Steel Flange 150# SORF 80 NB',
    decision: 'Approved',
    reviewer: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
    timestamp: '2026-09-30 14:15:20 IST',
    comment: 'Reconciled legacy descriptions into ISO/IS standard. ASME B16.5 flange rating validated.',
    targetCode: 'HMF-FLG-00109'
  },
  {
    historyId: 'HIST-9903',
    caseId: 'HR-004817',
    material: 'Turbine Oil ISO VG 46 Mineral Lubricant',
    decision: 'More Info Requested',
    reviewer: 'Er. S. Sengupta (Chief Materials Manager, BHEL)',
    timestamp: '2026-09-29 11:20:00 IST',
    comment: 'Requested OEM formulation sheet and demulsibility test reports from IOCL/HPCL suppliers before authorizing merger.',
    targetCode: 'HMF-LUB-00012'
  },
  {
    historyId: 'HIST-9904',
    caseId: 'HR-004816',
    material: 'Aerospace Spec Hydraulic Hose 3/8" High Pressure',
    decision: 'Rejected',
    reviewer: 'Sh. M. K. Narayanan (Master Data Auditor, HAL/DPE)',
    timestamp: '2026-09-28 17:45:10 IST',
    comment: 'Rejected merger due to mandatory MIL-DTL-83797 aerospace safety certification differences between HAL airframe and BHEL general hydraulic plant applications.',
    targetCode: 'CLUS-HSE-012'
  }
];

// Pure external generators for timestamps & sequence IDs
let historyCounter = 9910;
function getNextHistoryId() {
  historyCounter += 1;
  return `HIST-${historyCounter}`;
}

function getActionTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').slice(0, 19) + ' IST';
}

export default function ReviewApproval({
  selectedCPSE = 'ALL',
  onSelectCPSE,
  showToast,
  onNavigate
}) {
  // Cases State
  const [cases, setCases] = useState(INITIAL_CASES);
  const [approvalHistory, setApprovalHistory] = useState(INITIAL_APPROVAL_HISTORY);

  // Active Case under Detailed Review Workspace
  const [activeCase, setActiveCase] = useState(null);
  const [sessionTimestamp] = useState(() => '2026-10-02 21:45:00 IST');

  // Decision Form State
  const [reviewerComment, setReviewerComment] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('Material specification mismatch');
  const [showInfoForm, setShowInfoForm] = useState(false);
  const [infoRecipient, setInfoRecipient] = useState('BHEL');
  const [infoQuestion, setInfoQuestion] = useState('');
  const [showApproveConfirmModal, setShowApproveConfirmModal] = useState(false);

  // Top Filters State
  const [filterPriority, setFilterPriority] = useState('All Priorities');
  const [filterCategory, setFilterCategory] = useState('All Categories');
  const [filterConfidence, setFilterConfidence] = useState('All Confidence');
  const [filterAge, setFilterAge] = useState('All Ages');
  const [filterRecType, setFilterRecType] = useState('All Recommendations');
  const [searchQuery, setSearchQuery] = useState('');

  // View Mode: 'queue' or 'history'
  const [viewMode, setViewMode] = useState('queue');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  // Filtered Queue Cases
  const filteredCases = useMemo(() => {
    return cases.filter(item => {
      // CPSE Filter
      if (selectedCPSE && selectedCPSE !== 'ALL') {
        const matchesCPSE = item.cpse === selectedCPSE || item.participatingCPSEs.includes(selectedCPSE);
        if (!matchesCPSE) return false;
      }

      // Priority Filter
      if (filterPriority !== 'All Priorities' && item.priority !== filterPriority) {
        return false;
      }

      // Category Filter
      if (filterCategory !== 'All Categories' && item.category !== filterCategory) {
        return false;
      }

      // Confidence Filter
      if (filterConfidence !== 'All Confidence') {
        if (filterConfidence === 'High (≥90%)' && item.confidence < 90) return false;
        if (filterConfidence === 'Medium (75%-89%)' && (item.confidence < 75 || item.confidence >= 90)) return false;
        if (filterConfidence === 'Low (<75%)' && item.confidence >= 75) return false;
      }

      // Age Filter
      if (filterAge !== 'All Ages') {
        if (filterAge === 'Today' && item.ageCategory !== 'Today') return false;
        if (filterAge === 'Last 24 Hours' && item.ageCategory !== 'Last 24 Hours' && item.ageCategory !== 'Today') return false;
        if (filterAge === 'Last 7 Days' && item.ageCategory === 'Older') return false;
        if (filterAge === 'Older' && item.ageCategory !== 'Older') return false;
      }

      // Recommendation Type
      if (filterRecType !== 'All Recommendations' && item.recommendationType !== filterRecType) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = item.caseId.toLowerCase().includes(q);
        const matchMat = item.material.toLowerCase().includes(q);
        const matchCpse = item.cpse.toLowerCase().includes(q) || item.participatingCPSEs.some(c => c.toLowerCase().includes(q));
        const matchReason = item.reason.toLowerCase().includes(q);
        const matchCode = item.harmonizedCode.toLowerCase().includes(q);
        if (!matchId && !matchMat && !matchCpse && !matchReason && !matchCode) {
          return false;
        }
      }

      return true;
    });
  }, [cases, selectedCPSE, filterPriority, filterCategory, filterConfidence, filterAge, filterRecType, searchQuery]);

  // Paginated Cases
  const paginatedCases = useMemo(() => {
    return filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredCases, currentPage, pageSize]);

  // Key KPI Counts
  const pendingCount = cases.filter(c => c.status === 'Pending Review').length;
  const highPriorityCount = cases.filter(c => c.priority === 'High' && c.status === 'Pending Review').length;
  const avgConfidence = (cases.reduce((acc, c) => acc + c.confidence, 0) / cases.length).toFixed(1);

  // Open Detailed Review Workspace
  const handleOpenWorkspace = (c) => {
    setActiveCase(c);
    setReviewerComment(c.reviewerComment || '');
    setShowRejectForm(false);
    setShowInfoForm(false);
    setInfoQuestion('');
  };

  // Close Workspace
  const handleCloseWorkspace = () => {
    setActiveCase(null);
    setShowRejectForm(false);
    setShowInfoForm(false);
    setShowApproveConfirmModal(false);
  };

  // APPROVE Action
  const handleApprove = () => {
    if (!activeCase) return;

    const timestamp = getActionTimestamp();
    const stewardName = 'Dr. R. K. Verma, Chief Master Data Steward (DPE)';
    const comment = reviewerComment.trim() || 'Approved. Verified dimensions, technical grade parity, and standard crosswalk conformity.';

    // Update case status
    setCases(prev => prev.map(c => {
      if (c.caseId === activeCase.caseId) {
        return {
          ...c,
          status: 'Approved',
          reviewer: stewardName,
          timestamp,
          reviewerComment: comment
        };
      }
      return c;
    }));

    // Prepend to Approval History
    const historyItem = {
      historyId: getNextHistoryId(),
      caseId: activeCase.caseId,
      material: activeCase.material,
      decision: 'Approved',
      reviewer: stewardName,
      timestamp,
      comment,
      targetCode: activeCase.harmonizedCode
    };
    setApprovalHistory(prev => [historyItem, ...prev]);

    if (showToast) {
      showToast(`Case ${activeCase.caseId} approved and published to the National Master Catalog.`);
    }

    handleCloseWorkspace();
  };

  // REJECT Action
  const handleConfirmReject = () => {
    if (!activeCase) return;

    const timestamp = getActionTimestamp();
    const stewardName = 'Dr. R. K. Verma, Chief Master Data Steward (DPE)';
    const comment = `Rejected: [${rejectionReason}] ${reviewerComment.trim() || 'Specification divergence incompatible with single national identity.'}`;

    setCases(prev => prev.map(c => {
      if (c.caseId === activeCase.caseId) {
        return {
          ...c,
          status: 'Rejected',
          reviewer: stewardName,
          timestamp,
          reviewerComment: comment
        };
      }
      return c;
    }));

    const historyItem = {
      historyId: getNextHistoryId(),
      caseId: activeCase.caseId,
      material: activeCase.material,
      decision: 'Rejected',
      reviewer: stewardName,
      timestamp,
      comment,
      targetCode: activeCase.harmonizedCode
    };
    setApprovalHistory(prev => [historyItem, ...prev]);

    if (showToast) {
      showToast(`Harmonization recommendation for ${activeCase.caseId} rejected. Audit justification recorded.`);
    }

    handleCloseWorkspace();
  };

  // REQUEST MORE INFO Action
  const handleConfirmInfoRequest = () => {
    if (!activeCase) return;

    const timestamp = getActionTimestamp();
    const stewardName = 'Dr. R. K. Verma, Chief Master Data Steward (DPE)';
    const query = infoQuestion.trim() || 'Please submit plant metallurgy inspection test certificate (EN 10204 3.1) and OEM dimensional drawing.';
    const comment = `Information Requested from ${infoRecipient}: "${query}"`;

    setCases(prev => prev.map(c => {
      if (c.caseId === activeCase.caseId) {
        return {
          ...c,
          status: 'More Info Requested',
          reviewer: stewardName,
          timestamp,
          reviewerComment: comment
        };
      }
      return c;
    }));

    const historyItem = {
      historyId: getNextHistoryId(),
      caseId: activeCase.caseId,
      material: activeCase.material,
      decision: 'More Info Requested',
      reviewer: stewardName,
      timestamp,
      comment,
      targetCode: activeCase.harmonizedCode
    };
    setApprovalHistory(prev => [historyItem, ...prev]);

    if (showToast) {
      showToast(`Clarification request dispatched to ${infoRecipient} Material Planning Office.`);
    }

    handleCloseWorkspace();
  };

  // Reset Filters
  const handleResetFilters = () => {
    setFilterPriority('All Priorities');
    setFilterCategory('All Categories');
    setFilterConfidence('All Confidence');
    setFilterAge('All Ages');
    setFilterRecType('All Recommendations');
    setSearchQuery('');
    setCurrentPage(1);
    if (onSelectCPSE) onSelectCPSE('ALL');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Official Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Review Queue</span>
            <span className={`badge ${pendingCount > 0 ? 'badge-pending' : 'badge-approved'}`}>
              {pendingCount} Pending Governance Decisions
            </span>
          </h1>
          <div className="view-subtitle">
            Review and approve AI-generated material harmonization recommendations.
          </div>
        </div>

        <div className="view-actions">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              className={`btn ${viewMode === 'queue' ? 'btn-primary' : 'btn-outline'} btn-sm`}
              onClick={() => setViewMode('queue')}
            >
              <FileCheck size={14} />
              <span>Review Queue ({cases.filter(c => c.status === 'Pending Review').length})</span>
            </button>
            <button
              className={`btn ${viewMode === 'history' ? 'btn-primary' : 'btn-outline'} btn-sm`}
              onClick={() => setViewMode('history')}
            >
              <History size={14} />
              <span>Approval History ({approvalHistory.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Governance & Compliance Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-subtle)',
        borderLeft: '4px solid var(--accent-primary)',
        borderRadius: 'var(--radius-sm)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={18} color="var(--accent-primary)" />
          <div>
            <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Human-in-the-Loop Material Master Stewardship Authority
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Steward: <strong>Dr. R. K. Verma</strong> (Chief Master Data Steward, DPE) • Governance: <strong>CVC & GeM Public Procurement Rules</strong>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Queue Velocity
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {cases.length} Total Cases
            </div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              High Priority
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>
              {highPriorityCount} Urgent
            </div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Mean Confidence
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>
              {avgConfidence}%
            </div>
          </div>
        </div>
      </div>

      {viewMode === 'queue' ? (
        <>
          {/* Top Filters Toolbar */}
          <div className="card-section" style={{ padding: '14px 18px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Row 1: Search & Reset */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px' }}>
                  <div className="search-bar" style={{ width: '100%', maxWidth: '380px' }}>
                    <Search size={14} className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search Case ID, material, reason, code..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                  {(searchQuery || filterPriority !== 'All Priorities' || filterCategory !== 'All Categories' || filterConfidence !== 'All Confidence' || filterAge !== 'All Ages' || filterRecType !== 'All Recommendations' || (selectedCPSE && selectedCPSE !== 'ALL')) && (
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={handleResetFilters}
                      title="Reset all filters"
                      style={{ padding: '6px 10px', fontSize: '11.5px' }}
                    >
                      <RotateCcw size={12} style={{ marginRight: '4px' }} />
                      Reset Filters
                    </button>
                  )}
                </div>

                <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                  Showing <strong>{filteredCases.length}</strong> of <strong>{cases.length}</strong> cases in queue
                </div>
              </div>

              {/* Row 2: Mandatory Filters (Priority, CPSE, Category, Confidence, Age, Recommendation Type) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '10px',
                paddingTop: '8px',
                borderTop: '1px solid var(--border-subtle)'
              }}>

                {/* Priority */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    Priority
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
                    value={filterPriority}
                    onChange={(e) => {
                      setFilterPriority(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All Priorities">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* CPSE */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    CPSE
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
                    value={selectedCPSE || 'ALL'}
                    onChange={(e) => {
                      if (onSelectCPSE) onSelectCPSE(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="ALL">All CPSEs</option>
                    {CPSE_LIST.filter(c => c.id !== 'ALL').map(c => (
                      <option key={c.id} value={c.id}>{c.shortName}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    Category
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
                    value={filterCategory}
                    onChange={(e) => {
                      setFilterCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All Categories">All Categories</option>
                    <option value="Fasteners">Fasteners</option>
                    <option value="Industrial Valves">Industrial Valves</option>
                    <option value="Piping & Tubes">Piping & Tubes</option>
                    <option value="Mechanical Bearings">Mechanical Bearings</option>
                    <option value="Pumps & Rotating Equipment">Pumps & Rotating Equipment</option>
                    <option value="Electrical & Instrumentation">Electrical & Instrumentation</option>
                    <option value="Electrical & Power">Electrical & Power</option>
                  </select>
                </div>

                {/* Confidence */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    Confidence
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
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

                {/* Age */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    Age
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
                    value={filterAge}
                    onChange={(e) => {
                      setFilterAge(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All Ages">All Ages</option>
                    <option value="Today">Today (&lt;12h)</option>
                    <option value="Last 24 Hours">Last 24 Hours</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Older">Older</option>
                  </select>
                </div>

                {/* Recommendation Type */}
                <div>
                  <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
                    Rec Type
                  </label>
                  <select
                    className="select-filter"
                    style={{ width: '100%' }}
                    value={filterRecType}
                    onChange={(e) => {
                      setFilterRecType(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="All Recommendations">All Types</option>
                    <option value="Merge">Merge</option>
                    <option value="Split">Split</option>
                    <option value="Reclassify">Reclassify</option>
                    <option value="Standardize Description">Standardize Description</option>
                  </select>
                </div>

              </div>
            </div>
          </div>

          {/* Main Queue Table */}
          <div className="card-section">
            <div className="table-container desktop-only">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '110px' }}>Case ID</th>
                    <th style={{ minWidth: '180px' }}>Material</th>
                    <th style={{ width: '120px' }}>CPSE</th>
                    <th style={{ width: '140px' }}>AI Recommendation</th>
                    <th style={{ width: '120px' }}>Confidence</th>
                    <th style={{ minWidth: '220px' }}>Reason</th>
                    <th style={{ width: '90px' }}>Created</th>
                    <th style={{ width: '90px' }}>Priority</th>
                    <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <Filter size={24} color="#94a3b8" />
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>No review cases match the selected filters.</span>
                          <button className="btn btn-outline btn-sm" onClick={handleResetFilters}>
                            Clear All Filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    paginatedCases.map((item) => {
                      const isPending = item.status === 'Pending Review';
                      const isApproved = item.status === 'Approved';
                      const isRejected = item.status === 'Rejected';
                      const isInfoRequested = item.status === 'More Info Requested';

                      return (
                        <tr
                          key={item.caseId}
                          style={{
                            cursor: 'pointer',
                            backgroundColor: !isPending ? '#fafafa' : undefined
                          }}
                          onClick={() => handleOpenWorkspace(item)}
                        >
                          {/* Case ID */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span className="code-pill" style={{ fontWeight: 700 }}>
                                {item.caseId}
                              </span>
                            </div>
                          </td>

                          {/* Material */}
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12.5px' }}>
                              {item.material}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                              {item.category} • {item.sourceRecords.length} Related Records
                            </div>
                          </td>

                          {/* CPSE */}
                          <td>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              <span className={`cpse-tag ${item.cpse.toLowerCase()}`}>
                                {item.cpse}
                              </span>
                              {item.participatingCPSEs.filter(c => c !== item.cpse).slice(0, 1).map(c => (
                                <span key={c} className="badge badge-neutral" style={{ fontSize: '10px', padding: '1px 4px' }}>
                                  +{item.participatingCPSEs.length - 1}
                                </span>
                              ))}
                            </div>
                          </td>

                          {/* AI Recommendation */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span className="badge badge-neutral" style={{ fontWeight: 600, fontSize: '11px' }}>
                                {item.recommendationType}
                              </span>
                            </div>
                          </td>

                          {/* Confidence */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '45px', height: '5px', backgroundColor: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                <div
                                  style={{
                                    width: `${item.confidence}%`,
                                    height: '100%',
                                    backgroundColor: item.confidence >= 90 ? '#10b981' : item.confidence >= 75 ? '#f59e0b' : '#ef4444'
                                  }}
                                />
                              </div>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: item.confidence >= 90 ? '#15803d' : '#b45309' }}>
                                {item.confidence}%
                              </span>
                            </div>
                          </td>

                          {/* Reason */}
                          <td>
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                              {item.reason}
                            </div>
                          </td>

                          {/* Created */}
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
                              <Clock size={11} />
                              <span>{item.created}</span>
                            </div>
                          </td>

                          {/* Priority */}
                          <td>
                            <span className={`priority-pill ${item.priority.toLowerCase()}`}>
                              {item.priority}
                            </span>
                          </td>

                          {/* Action */}
                          <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                            {isPending ? (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleOpenWorkspace(item)}
                                style={{ padding: '4px 10px', fontSize: '12px' }}
                              >
                                Review
                              </button>
                            ) : (
                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleOpenWorkspace(item)}
                                style={{ padding: '4px 8px', fontSize: '11px' }}
                              >
                                {isApproved && 'Approved'}
                                {isRejected && 'Rejected'}
                                {isInfoRequested && 'Requested'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Queue Cards View */}
            <div className="mobile-only" style={{ padding: '12px' }}>
              {paginatedCases.map((item) => (
                <div
                  key={item.caseId}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    marginBottom: '10px'
                  }}
                  onClick={() => handleOpenWorkspace(item)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span className="code-pill">{item.caseId}</span>
                    <span className={`badge ${item.priority === 'High' ? 'badge-rejected' : 'badge-pending'}`} style={{ fontSize: '10.5px' }}>
                      {item.priority} Priority
                    </span>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {item.material}
                  </div>

                  <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="cpse-tag">{item.cpse}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.category}</span>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px', backgroundColor: 'var(--bg-subtle)', padding: '8px', borderRadius: 'var(--radius-xs)' }}>
                    <strong>AI Recommendation:</strong> {item.recommendationType} ({item.confidence}% confidence)
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.reason}</div>
                  </div>

                  <button
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', minHeight: '44px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenWorkspace(item);
                    }}
                  >
                    Open Review Workspace
                  </button>
                </div>
              ))}
            </div>

            {/* Compact Floating-Style Pagination */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredCases.length}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              onPageSizeChange={setPageSize}
              pageSizeOptions={[6, 12, 24]}
              itemName="cases"
            />
          </div>

          {/* Embedded Approval History Section (Bottom Summary) */}
          <div className="card-section" style={{ padding: '16px 20px', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={16} color="var(--accent-primary)" />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Recent Governance Decisions & Audit Trail
                </h3>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setViewMode('history')}
                style={{ fontSize: '11.5px', padding: '4px 8px' }}
              >
                View Full Audit History ({approvalHistory.length})
              </button>
            </div>

            <div className="table-container" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>Case ID</th>
                    <th>Material</th>
                    <th style={{ width: '130px' }}>Decision</th>
                    <th style={{ width: '220px' }}>Reviewer</th>
                    <th style={{ width: '150px' }}>Timestamp</th>
                    <th>Audit Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalHistory.slice(0, 3).map((hist) => (
                    <tr key={hist.historyId}>
                      <td><span className="code-pill">{hist.caseId}</span></td>
                      <td style={{ fontWeight: 600, fontSize: '12px' }}>{hist.material}</td>
                      <td>
                        {hist.decision === 'Approved' && (
                          <span className="badge badge-approved"><CheckCircle2 size={11} style={{ marginRight: '3px' }} /> Approved</span>
                        )}
                        {hist.decision === 'Rejected' && (
                          <span className="badge badge-rejected"><XCircle size={11} style={{ marginRight: '3px' }} /> Rejected</span>
                        )}
                        {hist.decision === 'More Info Requested' && (
                          <span className="badge badge-pending"><HelpCircle size={11} style={{ marginRight: '3px' }} /> Info Requested</span>
                        )}
                      </td>
                      <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>{hist.reviewer}</td>
                      <td style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{hist.timestamp}</td>
                      <td style={{ fontSize: '11.5px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        “{hist.comment}”
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Full Approval History View */
        <div className="card-section" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Approval History & Statutory Audit Log
              </h2>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Immutable historical record of all human steward approvals, rejections, and clarification requests.
              </div>
            </div>

            <button className="btn btn-outline btn-sm" onClick={() => setViewMode('queue')}>
              <ArrowRight size={13} style={{ transform: 'rotate(180deg)', marginRight: '4px' }} />
              Back to Review Queue
            </button>
          </div>

          <div className="table-container" style={{ border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '110px' }}>Case ID</th>
                  <th style={{ minWidth: '180px' }}>Material</th>
                  <th style={{ width: '140px' }}>Target Code</th>
                  <th style={{ width: '130px' }}>Decision</th>
                  <th style={{ width: '240px' }}>Reviewer</th>
                  <th style={{ width: '160px' }}>Timestamp</th>
                  <th style={{ minWidth: '240px' }}>Steward Comments / Audit Rationale</th>
                </tr>
              </thead>
              <tbody>
                {approvalHistory.map((hist) => (
                  <tr key={hist.historyId}>
                    <td><span className="code-pill" style={{ fontWeight: 700 }}>{hist.caseId}</span></td>
                    <td style={{ fontWeight: 600, fontSize: '12.5px' }}>{hist.material}</td>
                    <td><span className="code-pill harmonized">{hist.targetCode}</span></td>
                    <td>
                      {hist.decision === 'Approved' && (
                        <span className="badge badge-approved"><CheckCircle2 size={11} style={{ marginRight: '3px' }} /> Approved</span>
                      )}
                      {hist.decision === 'Rejected' && (
                        <span className="badge badge-rejected"><XCircle size={11} style={{ marginRight: '3px' }} /> Rejected</span>
                      )}
                      {hist.decision === 'More Info Requested' && (
                        <span className="badge badge-pending"><HelpCircle size={11} style={{ marginRight: '3px' }} /> Info Requested</span>
                      )}
                    </td>
                    <td style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {hist.reviewer}
                    </td>
                    <td style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {hist.timestamp}
                    </td>
                    <td style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      <div style={{ backgroundColor: '#f8fafc', padding: '6px 10px', borderRadius: 'var(--radius-xs)', borderLeft: '3px solid var(--accent-primary)' }}>
                        “{hist.comment}”
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DETAILED REVIEW WORKSPACE (MODAL / FULL GOVERNANCE DIALOG)               */}
      {/* ========================================================================= */}
      {activeCase && (
        <div className="review-workspace-overlay" onClick={handleCloseWorkspace}>
          <div className="review-workspace-dialog" onClick={(e) => e.stopPropagation()}>

            {/* Workspace Header */}
            <div className="review-workspace-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="code-pill" style={{ fontSize: '13px', fontWeight: 800, padding: '4px 8px' }}>
                  {activeCase.caseId}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                      {activeCase.material}
                    </h2>
                    <span className={`priority-pill ${activeCase.priority.toLowerCase()}`}>
                      {activeCase.priority} Priority
                    </span>
                    <span className="badge badge-neutral">
                      {activeCase.category}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Created <strong>{activeCase.created}</strong> by AI Harmonization Engine v4.2 • Recommendation: <strong>{activeCase.recommendationType}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCloseWorkspace}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: 'var(--radius-xs)',
                  color: 'var(--text-muted)'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Workspace Body */}
            <div className="review-workspace-body">

              {/* 1. SOURCE RECORDS */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} color="var(--accent-primary)" />
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      SOURCE RECORDS ({activeCase.sourceRecords.length} Cross-CPSE Legacy Records)
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Extracted from participating enterprise SAP and Oracle ERP material masters
                  </span>
                </div>

                <div className="source-records-box">
                  <div className="table-container" style={{ margin: 0 }}>
                    <table className="data-table" style={{ margin: 0 }}>
                      <thead>
                        <tr>
                          <th style={{ width: '80px' }}>CPSE</th>
                          <th style={{ width: '140px' }}>Original Code</th>
                          <th>Original Description</th>
                          <th style={{ width: '160px' }}>Plant / Operating Unit</th>
                          <th style={{ width: '130px' }}>ERP System</th>
                          <th style={{ width: '60px' }}>UOM</th>
                          <th style={{ width: '90px', textAlign: 'right' }}>Unit Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeCase.sourceRecords.map((rec) => (
                          <tr key={rec.originalCode}>
                            <td>
                              <span className={`cpse-tag ${rec.cpse.toLowerCase()}`}>{rec.cpse}</span>
                            </td>
                            <td>
                              <span className="code-pill">{rec.originalCode}</span>
                            </td>
                            <td>
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                                {rec.originalDescription}
                              </div>
                              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                Specs: {rec.specs}
                              </div>
                            </td>
                            <td style={{ fontSize: '11.5px' }}>{rec.plant}</td>
                            <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{rec.erpSystem}</td>
                            <td>
                              <span className="badge badge-neutral" style={{ fontWeight: 600 }}>{rec.uom}</span>
                            </td>
                            <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--text-primary)' }}>
                              ₹{rec.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* 2. AI ANALYSIS & METRICS */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <Sparkles size={15} color="#0284c7" />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    AI ANALYSIS & HARMONIZATION EVALUATION
                  </span>
                </div>

                {/* 5 Metrics Cards: Similarity, Attribute Match, Semantic Match, Specification Match, UOM Match */}
                <div className="ai-metrics-grid">
                  <div className="ai-metric-card highlight">
                    <div className="ai-metric-label">Similarity</div>
                    <div className="ai-metric-value" style={{ color: '#0284c7' }}>{activeCase.metrics.similarity}%</div>
                    <div className="ai-metric-bar">
                      <div className="ai-metric-bar-fill" style={{ width: `${activeCase.metrics.similarity}%`, backgroundColor: '#0284c7' }} />
                    </div>
                  </div>

                  <div className="ai-metric-card">
                    <div className="ai-metric-label">Attribute Match</div>
                    <div className="ai-metric-value" style={{ color: '#16a34a' }}>{activeCase.metrics.attributeMatch}%</div>
                    <div className="ai-metric-bar">
                      <div className="ai-metric-bar-fill" style={{ width: `${activeCase.metrics.attributeMatch}%` }} />
                    </div>
                  </div>

                  <div className="ai-metric-card">
                    <div className="ai-metric-label">Semantic Match</div>
                    <div className="ai-metric-value" style={{ color: '#16a34a' }}>{activeCase.metrics.semanticMatch}%</div>
                    <div className="ai-metric-bar">
                      <div className="ai-metric-bar-fill" style={{ width: `${activeCase.metrics.semanticMatch}%` }} />
                    </div>
                  </div>

                  <div className="ai-metric-card">
                    <div className="ai-metric-label">Specification Match</div>
                    <div className="ai-metric-value" style={{ color: '#16a34a' }}>{activeCase.metrics.specificationMatch}%</div>
                    <div className="ai-metric-bar">
                      <div className="ai-metric-bar-fill" style={{ width: `${activeCase.metrics.specificationMatch}%` }} />
                    </div>
                  </div>

                  <div className="ai-metric-card">
                    <div className="ai-metric-label">UOM Match</div>
                    <div className="ai-metric-value" style={{ color: '#16a34a' }}>{activeCase.metrics.uomMatch}%</div>
                    <div className="ai-metric-bar">
                      <div className="ai-metric-bar-fill" style={{ width: `${activeCase.metrics.uomMatch}%` }} />
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Banner */}
                <div style={{
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
                        AI Recommendation:
                      </span>
                      <span className="code-pill harmonized" style={{ fontSize: '13px', fontWeight: 800 }}>
                        {activeCase.recommendationType === 'Split' ? 'Split into Separate Codes' : `Map to ${activeCase.harmonizedCode}`}
                      </span>
                    </div>

                    <div style={{ fontSize: '11.5px', color: '#0369a1' }}>
                      Proposed Standard Description: <strong>{activeCase.standardizedDescription}</strong>
                    </div>
                  </div>
                </div>

                {/* Reasoning Callout */}
                <div style={{
                  backgroundColor: '#f8fafc',
                  borderLeft: '4px solid var(--accent-primary)',
                  borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                  padding: '12px 14px',
                  fontSize: '12.5px',
                  lineHeight: 1.5,
                  color: 'var(--text-secondary)'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Reasoning & Alignment Rationale:
                  </div>
                  <p style={{ margin: 0, fontStyle: 'italic' }}>
                    “{activeCase.reasoning}”
                  </p>
                </div>
              </div>

              {/* 3. DECISION & GOVERNANCE CONTROLS */}
              <div className="decision-controls-block">
                <div className="decision-meta-row">
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Assigned Reviewer
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Dr. R. K. Verma, Chief Master Data Steward (DPE)
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Current Timestamp
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                      {activeCase.timestamp || sessionTimestamp}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                      Current Case State
                    </div>
                    <div>
                      {activeCase.status === 'Pending Review' && <span className="badge badge-pending">Pending Review</span>}
                      {activeCase.status === 'Approved' && <span className="badge badge-approved">Approved</span>}
                      {activeCase.status === 'Rejected' && <span className="badge badge-rejected">Rejected</span>}
                      {activeCase.status === 'More Info Requested' && <span className="badge badge-neutral">Info Requested</span>}
                    </div>
                  </div>
                </div>

                {/* Reviewer Comment / Audit Justification Input */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Reviewer Governance Comment / Technical Rationale:
                    </label>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      (Recorded in Permanent CVC / GeM Audit Log)
                    </span>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Enter governance notes, engineering verification findings, or audit justification..."
                    value={reviewerComment}
                    onChange={(e) => setReviewerComment(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      fontSize: '12px',
                      border: '1px solid var(--border-medium)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-sans)',
                      lineHeight: 1.4
                    }}
                  />

                  {/* Quick Phrase Chips */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <button
                      type="button"
                      className="badge badge-neutral"
                      style={{ cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setReviewerComment('Verified dimensions, technical grade parity, and standard crosswalk conformity.')}
                    >
                      + Verified dimensions & grade
                    </button>
                    <button
                      type="button"
                      className="badge badge-neutral"
                      style={{ cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setReviewerComment('Cross-CPSE engineering specifications confirmed identical. Suitable for consolidated tendering.')}
                    >
                      + Spec parity confirmed
                    </button>
                    <button
                      type="button"
                      className="badge badge-neutral"
                      style={{ cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setReviewerComment('Approved for joint CPSE bulk procurement pooling under National Master Catalog.')}
                    >
                      + Joint procurement ready
                    </button>
                    <button
                      type="button"
                      className="badge badge-neutral"
                      style={{ cursor: 'pointer', border: '1px solid var(--border-subtle)' }}
                      onClick={() => setReviewerComment('Reconciled legacy Unit of Measure (UOM) to standardized ISO EA.')}
                    >
                      + Reconciled UOM
                    </button>
                  </div>
                </div>

                {/* Sub-form: Reject Specification Form */}
                {showRejectForm && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '14px'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#991b1b', marginBottom: '8px' }}>
                      Rejection Justification & Discrepancy Recording:
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      <select
                        className="select-filter"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        style={{ border: '1px solid #f87171' }}
                      >
                        <option value="Material specification mismatch">Material specification mismatch</option>
                        <option value="Pressure rating / class divergence">Pressure rating / class divergence</option>
                        <option value="Safety-critical certification difference">Safety-critical certification difference</option>
                        <option value="Dimensional envelope incompatibility">Dimensional envelope incompatibility</option>
                        <option value="Plant-specific non-interchangeable spare">Plant-specific non-interchangeable spare</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowRejectForm(false)}>
                        Cancel
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={handleConfirmReject}>
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-form: Request More Information Form */}
                {showInfoForm && (
                  <div style={{
                    backgroundColor: '#fffbeb',
                    border: '1px solid #fde68a',
                    padding: '14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '14px'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '12.5px', color: '#92400e', marginBottom: '8px' }}>
                      Request Technical Clarification from Participating CPSE:
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                      <select
                        className="select-filter"
                        value={infoRecipient}
                        onChange={(e) => setInfoRecipient(e.target.value)}
                        style={{ width: '180px', border: '1px solid #f59e0b' }}
                      >
                        {activeCase.participatingCPSEs.map(c => (
                          <option key={c} value={c}>{c} Material Planning</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Enter specific clarification question (e.g., submit mill test certificate or drawing)..."
                        value={infoQuestion}
                        onChange={(e) => setInfoQuestion(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '6px 10px',
                          fontSize: '12px',
                          border: '1px solid #f59e0b',
                          borderRadius: 'var(--radius-xs)'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => setShowInfoForm(false)}>
                        Cancel
                      </button>
                      <button className="btn btn-warning btn-sm" onClick={handleConfirmInfoRequest}>
                        Dispatch Clarification Request
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Decision Action Buttons */}
                {!showRejectForm && !showInfoForm && (
                  <div className="decision-buttons-row">
                    <button
                      className="btn-decision approve"
                      onClick={() => setShowApproveConfirmModal(true)}
                    >
                      <CheckCircle2 size={16} />
                      <span>Approve</span>
                    </button>

                    <button
                      className="btn-decision reject"
                      onClick={() => setShowRejectForm(true)}
                    >
                      <XCircle size={16} />
                      <span>Reject</span>
                    </button>

                    <button
                      className="btn-decision info"
                      onClick={() => setShowInfoForm(true)}
                    >
                      <HelpCircle size={16} />
                      <span>Request More Information</span>
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Workspace Footer */}
            <div className="review-workspace-footer">
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {onNavigate && (
                  <>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        handleCloseWorkspace();
                        onNavigate('master');
                      }}
                    >
                      View in Master Catalog
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        handleCloseWorkspace();
                        onNavigate('crosswalk');
                      }}
                    >
                      View in Material Crosswalk
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => {
                        handleCloseWorkspace();
                        onNavigate('audit');
                      }}
                    >
                      View Audit Log
                    </button>
                  </>
                )}
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleCloseWorkspace}
              >
                Close Workspace
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Confirmation Dialog: Approval & Master Catalog Promotion */}
      {showApproveConfirmModal && activeCase && (
        <div className="confirm-modal-overlay" onClick={() => setShowApproveConfirmModal(false)}>
          <div className="confirm-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-header">
              <div className="confirm-modal-title">
                <ShieldCheck size={16} color="#16a34a" />
                <span>Confirm Harmonization Approval</span>
              </div>
              <button
                onClick={() => setShowApproveConfirmModal(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div className="confirm-modal-body">
              <div style={{ marginBottom: '10px' }}>
                You are authorizing the statutory harmonization and catalog promotion for:
              </div>
              <div style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '12px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                  Case: {activeCase.caseId} • {activeCase.material}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Target Unified Code: <strong>{activeCase.harmonizedCode}</strong>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Participating CPSEs: {activeCase.participatingCPSEs.join(', ')}
                </div>
                <div style={{ fontSize: '11px', color: '#15803d', fontWeight: 600, marginTop: '2px' }}>
                  AI Confidence: {activeCase.confidence}% (Attribute Match 100%, Spec Match 95%)
                </div>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: '1.45' }}>
                By approving, you certify that technical specifications, dimensions, and metallurgy have been validated under ISO/IS standards and GFR 2017 public procurement transparency requirements. An immutable cryptographic record will be dispatched to the Statutory Audit Trail.
              </div>
            </div>

            <div className="confirm-modal-footer">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowApproveConfirmModal(false)}>
                Cancel
              </button>
              <button className="btn btn-success btn-sm" onClick={handleApprove}>
                <CheckCircle2 size={13} style={{ marginRight: '4px' }} />
                Approve & Publish Catalog
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
            <span>CVC Guidelines on Procurement Transparency Compliant</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Human-in-the-Loop Governance Matrix v4.2</span>
        </div>
      </footer>

    </div>
  );
}
