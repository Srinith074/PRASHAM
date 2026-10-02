import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  Download,
  Fingerprint,
  Calendar,
  Building2,
  User,
  Filter,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  X,
  Layers
} from 'lucide-react';
import { CPSE_LIST } from '../data/mockData';
import Pagination from './Pagination';

// Initial Rich Audit Trail Events Log
const INITIAL_AUDIT_EVENTS = [
  {
    eventId: 'EVT-9942',
    timestamp: '02 Oct 2026, 18:42',
    dateSort: '2026-10-02T18:42:00',
    dateCategory: 'Today',
    user: 'Admin User',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'IOCL'],
    material: 'BHEL-FST-10921',
    materialName: 'Hex Bolt M10 × 50',
    action: 'Harmonization Approved',
    previousValue: 'BHEL-FST-10921',
    newValue: 'HMF-FAST-00128',
    aiConfidence: 96.8,
    decision: 'Approved',
    referenceId: 'HR-004821',
    hash: 'SHA256:8b4a2c1f...e993',
    traceability: {
      sourceRecords: [
        {
          cpse: 'BHEL',
          code: 'BHEL-FST-10921',
          desc: 'HEX BOLT M10X50 GR 8.8',
          plant: 'Haridwar HEEP',
          erp: 'SAP ECC 6.0',
          uom: 'EA',
          price: 84.50
        },
        {
          cpse: 'NTPC',
          code: 'NTPC-BLT-88231',
          desc: 'HEXAGONAL HEAD BOLT 10 MM X 50 MM CLASS 8.8',
          plant: 'Ramagundam STPP',
          erp: 'SAP S/4HANA',
          uom: 'NOS',
          price: 89.00
        },
        {
          cpse: 'IOCL',
          code: 'IOCL-FST-19283',
          desc: 'MS HEX HEAD BOLT M10*50, GR8.8',
          plant: 'Panipat Refinery',
          erp: 'Oracle EBS R12',
          uom: 'EA',
          price: 82.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-FAST-00128',
        standardDescription: 'Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8',
        standardUOM: 'EA',
        category: 'Fasteners & Hardware',
        unspsc: '31161620'
      },
      confidenceBreakdown: {
        overall: 96.8,
        attributeMatch: 100,
        semanticMatch: 97,
        specificationMatch: 95,
        uomMatch: 100
      },
      explanation: 'The records represent the same material based on dimensions, material grade, category and functional description. Differences are primarily naming and coding conventions.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Admin User (Dr. R. K. Verma, Chief Master Data Steward, DPE)',
        comment: 'Verified technical specification conformity across 3 CPSEs under ISO 4017 / IS 1364. Reconciled UOM to EA.',
        timestamp: '02 Oct 2026, 18:42 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '02 Oct 2026, 14:20 IST', detail: 'Ingested from BHEL Haridwar SAP master export.' },
        { step: 'NLP Token Normalization', timestamp: '02 Oct 2026, 14:22 IST', detail: 'Extracted attributes: M10, 50mm, Grade 8.8.' },
        { step: 'Vector Cosine Clustering', timestamp: '02 Oct 2026, 14:25 IST', detail: 'Grouped with NTPC-BLT-88231 and IOCL-FST-19283 (96.8% match).' },
        { step: 'Human Stewardship Review', timestamp: '02 Oct 2026, 16:40 IST', detail: 'Escalated to review queue as HR-004821.' },
        { step: 'Harmonization Approved', timestamp: '02 Oct 2026, 18:42 IST', detail: 'Published to National Master Catalog under HMF-FAST-00128.' }
      ]
    }
  },
  {
    eventId: 'EVT-9941',
    timestamp: '02 Oct 2026, 15:30',
    dateSort: '2026-10-02T15:30:00',
    dateCategory: 'Today',
    user: 'Dr. R. K. Verma',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'ONGC',
    participatingCPSEs: ['ONGC', 'GAIL'],
    material: 'ONGC-VAL-8821',
    materialName: 'Gate Valve DN100 Carbon Steel',
    action: 'Harmonization Approved',
    previousValue: 'ONGC-VAL-8821',
    newValue: 'HMF-VAL-00082',
    aiConfidence: 94.7,
    decision: 'Approved',
    referenceId: 'HR-004822',
    hash: 'SHA256:7c91a0ef...41d2',
    traceability: {
      sourceRecords: [
        {
          cpse: 'ONGC',
          code: 'ONGC-VAL-8821',
          desc: 'GATE VALVE 100 NB CS CL150 FLG',
          plant: 'Mumbai High Offshore',
          erp: 'SAP S/4HANA',
          uom: 'EA',
          price: 18400.00
        },
        {
          cpse: 'GAIL',
          code: 'GAIL-VLV-1029',
          desc: 'VALVE GATE 4 INCH 150# RF WCB TRIM 8',
          plant: 'Pata Petrochemical',
          erp: 'SAP ECC 6.0',
          uom: 'NOS',
          price: 17850.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-VAL-00082',
        standardDescription: 'Gate Valve, DN 100 (4 Inch), Class 150, Flanged RF, ASTM A216 WCB',
        standardUOM: 'NOS',
        category: 'Industrial Valves',
        unspsc: '40141607'
      },
      confidenceBreakdown: {
        overall: 94.7,
        attributeMatch: 98,
        semanticMatch: 96,
        specificationMatch: 94,
        uomMatch: 100
      },
      explanation: 'Records match nominal bore DN100 (4"), ASME B16.5 Class 150 flange connection, and ASTM A216 Gr WCB cast steel body. Minor variations in legacy description formatting.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
        comment: 'Validated valve body metallurgy and pressure ratings. GeM rate contract pooling approved.',
        timestamp: '02 Oct 2026, 15:30 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '02 Oct 2026, 11:10 IST', detail: 'Ingested from ONGC Western Onshore SAP master export.' },
        { step: 'NLP Token Normalization', timestamp: '02 Oct 2026, 11:14 IST', detail: 'Extracted attributes: 4 Inch, Class 150, WCB.' },
        { step: 'Vector Cosine Clustering', timestamp: '02 Oct 2026, 11:18 IST', detail: 'Matched with GAIL-VLV-1029 (94.7% match).' },
        { step: 'Human Stewardship Review', timestamp: '02 Oct 2026, 13:05 IST', detail: 'Escalated to review queue as HR-004822.' },
        { step: 'Harmonization Approved', timestamp: '02 Oct 2026, 15:30 IST', detail: 'Published to National Master Catalog under HMF-VAL-00082.' }
      ]
    }
  },
  {
    eventId: 'EVT-9940',
    timestamp: '02 Oct 2026, 12:15',
    dateSort: '2026-10-02T12:15:00',
    dateCategory: 'Today',
    user: 'AI Engine v4.2',
    userRole: 'Automated AI Pipeline',
    cpse: 'IOCL',
    participatingCPSEs: ['IOCL', 'BPCL'],
    material: 'IOCL-PIP-55102',
    materialName: 'Seamless Steel Pipe 4" Sch 40',
    action: 'Description Standardized',
    previousValue: 'CS SEAMLESS PIPE 4 INCH SCH 40 ASTM A106 GR.B',
    newValue: 'Pipe, Carbon Steel Seamless, ASTM A106 Gr. B, 4" NB (DN 100), Schedule 40',
    aiConfidence: 92.4,
    decision: 'Auto-Indexed',
    referenceId: 'HR-004823',
    hash: 'SHA256:3d1e44bc...987a',
    traceability: {
      sourceRecords: [
        {
          cpse: 'IOCL',
          code: 'IOCL-PIP-55102',
          desc: 'CS SEAMLESS PIPE 4 INCH SCH 40 ASTM A106 GR.B',
          plant: 'Mathura Refinery',
          erp: 'SAP ECC 6.0',
          uom: 'MTR',
          price: 1420.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-PIPE-00214',
        standardDescription: 'Pipe, Carbon Steel Seamless, ASTM A106 Gr. B, 4" NB (DN 100), Schedule 40, Beveled Ends',
        standardUOM: 'MTR',
        category: 'Piping & Tubes',
        unspsc: '40171501'
      },
      confidenceBreakdown: {
        overall: 92.4,
        attributeMatch: 96,
        semanticMatch: 93,
        specificationMatch: 91,
        uomMatch: 98
      },
      explanation: 'Confirmed dimensional parity for 4-inch nominal bore (DN100), Wall thickness Schedule 40 (6.02 mm), seamless construction under ASTM A106 Grade B.',
      humanDecision: {
        decision: 'Auto-Indexed',
        reviewer: 'AI Engine v4.2 (High-Confidence Autonomous Policy)',
        comment: 'High confidence threshold exceeded (≥90%). Description normalized into ISO standards format.',
        timestamp: '02 Oct 2026, 12:15 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '02 Oct 2026, 09:30 IST', detail: 'Ingested from IOCL Refineries Master export.' },
        { step: 'NLP Token Normalization', timestamp: '02 Oct 2026, 09:32 IST', detail: 'Extracted attributes: 4" NB, Sch 40, ASTM A106 Gr B.' },
        { step: 'Automated Description Standardization', timestamp: '02 Oct 2026, 12:15 IST', detail: 'Auto-indexed into National Master Catalog.' }
      ]
    }
  },
  {
    eventId: 'EVT-9939',
    timestamp: '01 Oct 2026, 17:10',
    dateSort: '2026-10-01T17:10:00',
    dateCategory: 'Last 24 Hours',
    user: 'Sh. Anoop Sundaram',
    userRole: 'Joint Director (Technical Procurement)',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'SAIL'],
    material: 'BHEL-BRG-2201',
    materialName: 'Deep Groove Ball Bearing 6205-2RS',
    action: 'Harmonization Approved',
    previousValue: 'BHEL-BRG-2201',
    newValue: 'HMF-BEAR-00045',
    aiConfidence: 97.1,
    decision: 'Approved',
    referenceId: 'HR-004824',
    hash: 'SHA256:1a8f9021...aa34',
    traceability: {
      sourceRecords: [
        {
          cpse: 'BHEL',
          code: 'BHEL-BRG-2201',
          desc: 'DEEP GROOVE BALL BRG 6205 2RS C3',
          plant: 'Bhopal Heavy Plant',
          erp: 'SAP ECC 6.0',
          uom: 'EA',
          price: 420.00
        },
        {
          cpse: 'SAIL',
          code: 'SAIL-BSP-4019',
          desc: 'BRG BALL RADIAL 6205-2RS1/C3 SKF/FAG',
          plant: 'Bhilai Steel Plant',
          erp: 'Oracle ERP',
          uom: 'NOS',
          price: 435.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-BEAR-00045',
        standardDescription: 'Radial Deep Groove Ball Bearing, 6205-2RS, Bore 25 mm, OD 52 mm, Width 15 mm, Dual Contact Seals',
        standardUOM: 'NOS',
        category: 'Mechanical Bearings',
        unspsc: '31171504'
      },
      confidenceBreakdown: {
        overall: 97.1,
        attributeMatch: 100,
        semanticMatch: 98,
        specificationMatch: 96,
        uomMatch: 100
      },
      explanation: 'International standard bearing designation 6205-2RS verified. Internal clearance C3 and nitrile rubber contact seals on both sides verified.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Sh. Anoop Sundaram (Joint Director, Technical Procurement)',
        comment: 'Direct manufacturer rate contract eliminates local distributor markups across BHEL and SAIL plants.',
        timestamp: '01 Oct 2026, 17:10 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '01 Oct 2026, 10:15 IST', detail: 'Ingested from SAIL Bhilai Steel ERP.' },
        { step: 'NLP Token Normalization', timestamp: '01 Oct 2026, 10:20 IST', detail: 'Extracted attributes: Bore 25mm, OD 52mm, 2RS, C3.' },
        { step: 'Harmonization Approved', timestamp: '01 Oct 2026, 17:10 IST', detail: 'Published to National Master Catalog under HMF-BEAR-00045.' }
      ]
    }
  },
  {
    eventId: 'EVT-9938',
    timestamp: '01 Oct 2026, 14:05',
    dateSort: '2026-10-01T14:05:00',
    dateCategory: 'Last 24 Hours',
    user: 'Dr. R. K. Verma',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'SAIL'],
    material: 'BHEL-PMP-4401',
    materialName: 'Centrifugal Slurry Impeller 150x125',
    action: 'Reclassification',
    previousValue: 'General Water Pumps',
    newValue: 'Heavy Duty Slurry Equipment (ASTM A532)',
    aiConfidence: 88.5,
    decision: 'Approved',
    referenceId: 'HR-004825',
    hash: 'SHA256:5e2b99aa...7182',
    traceability: {
      sourceRecords: [
        {
          cpse: 'BHEL',
          code: 'BHEL-PMP-4401',
          desc: 'IMPELLER FOR SLURRY PUMP 150X125 HIGH CHROME ALLOY 27%',
          plant: 'Ranipet Boiler Auxiliaries',
          erp: 'SAP ECC 6.0',
          uom: 'NOS',
          price: 112000.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-PMP-00091',
        standardDescription: 'Impeller, Centrifugal Slurry Pump, High Chrome Alloy 27% Cr, Size 150 × 125 mm, ASTM A532 Class III',
        standardUOM: 'NOS',
        category: 'Pumps & Rotating Equipment',
        unspsc: '40151508'
      },
      confidenceBreakdown: {
        overall: 88.5,
        attributeMatch: 91,
        semanticMatch: 89,
        specificationMatch: 86,
        uomMatch: 100
      },
      explanation: 'High-wear chromium alloy (27-28% Cr) verified for abrasive slurry service under ASTM A532 Class III. Reclassified from generic water pump spares.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
        comment: 'Reclassification to ASTM A532 Heavy Duty Slurry Equipment confirmed.',
        timestamp: '01 Oct 2026, 14:05 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '01 Oct 2026, 09:00 IST', detail: 'Ingested from BHEL Ranipet SAP master export.' },
        { step: 'Reclassification Approved', timestamp: '01 Oct 2026, 14:05 IST', detail: 'Reclassified and synchronized in National Master Catalog.' }
      ]
    }
  },
  {
    eventId: 'EVT-9937',
    timestamp: '30 Sep 2026, 16:20',
    dateSort: '2026-09-30T16:20:00',
    dateCategory: 'Last 7 Days',
    user: 'Er. S. Sengupta',
    userRole: 'Chief Materials Manager (BHEL)',
    cpse: 'NTPC',
    participatingCPSEs: ['NTPC', 'BHEL'],
    material: 'NTPC-SUB-4412',
    materialName: 'Transformer Bushing 33kV Porcelain',
    action: 'Harmonization Split',
    previousValue: 'HMF-ELE-00419',
    newValue: 'HMF-ELE-00419-HP (High Creepage)',
    aiConfidence: 78.2,
    decision: 'Split Approved',
    referenceId: 'HR-004828',
    hash: 'SHA256:4c1187ab...1234',
    traceability: {
      sourceRecords: [
        {
          cpse: 'NTPC',
          code: 'NTPC-SUB-4412',
          desc: '33KV TRANSFORMER BUSHING PORCELAIN HIGH CREEPAGE 31MM/KV',
          plant: 'Simhadri STPP',
          erp: 'SAP S/4HANA',
          uom: 'EA',
          price: 48000.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-ELE-00419-HP',
        standardDescription: 'Transformer Bushing, 33 kV, 630 A, High Creepage 31 mm/kV (Heavy Pollution Zone)',
        standardUOM: 'NOS',
        category: 'Electrical & Power',
        unspsc: '39121002'
      },
      confidenceBreakdown: {
        overall: 78.2,
        attributeMatch: 82,
        semanticMatch: 81,
        specificationMatch: 74,
        uomMatch: 100
      },
      explanation: 'AI detected that NTPC requires 31 mm/kV (Heavy Pollution) creepage distance, whereas BHEL requires 25 mm/kV. Split into separate items to prevent flashover risks.',
      humanDecision: {
        decision: 'Split Approved',
        reviewer: 'Er. S. Sengupta (Chief Materials Manager, BHEL)',
        comment: 'Confirmed critical creepage distance variance. Approved split into separate codes.',
        timestamp: '30 Sep 2026, 16:20 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '30 Sep 2026, 10:00 IST', detail: 'Ingested from NTPC Simhadri catalog.' },
        { step: 'Harmonization Split Approved', timestamp: '30 Sep 2026, 16:20 IST', detail: 'Splitting confirmed to safeguard electrical safety.' }
      ]
    }
  },
  {
    eventId: 'EVT-9936',
    timestamp: '29 Sep 2026, 11:45',
    dateSort: '2026-09-29T11:45:00',
    dateCategory: 'Last 7 Days',
    user: 'Sh. M. K. Narayanan',
    userRole: 'Master Data Auditor (HAL/DPE)',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'HAL'],
    material: 'BHEL-HSE-0012',
    materialName: 'Aerospace Spec Hydraulic Hose 3/8"',
    action: 'Harmonization Rejected',
    previousValue: 'BHEL-HSE-0012',
    newValue: 'Retained Legacy Identity',
    aiConfidence: 64.5,
    decision: 'Rejected',
    referenceId: 'HR-004816',
    hash: 'SHA256:2d9910aa...9911',
    traceability: {
      sourceRecords: [
        {
          cpse: 'BHEL',
          code: 'BHEL-HSE-0012',
          desc: 'HYDRAULIC HOSE 3/8" 3000 PSI GENERAL INDUSTRIAL',
          plant: 'Bhopal Heavy Electricals',
          erp: 'SAP ECC 6.0',
          uom: 'MTR',
          price: 680.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'CLUS-HSE-012',
        standardDescription: 'Hydraulic Hose, 3/8 Inch ID, Synthetic Rubber Wire Braid',
        standardUOM: 'MTR',
        category: 'Hydraulics',
        unspsc: '40142001'
      },
      confidenceBreakdown: {
        overall: 64.5,
        attributeMatch: 68,
        semanticMatch: 66,
        specificationMatch: 58,
        uomMatch: 100
      },
      explanation: 'MIL-DTL-83797 aerospace safety certification divergence detected between HAL airframe and BHEL general industrial applications.',
      humanDecision: {
        decision: 'Rejected',
        reviewer: 'Sh. M. K. Narayanan (Master Data Auditor, HAL/DPE)',
        comment: 'Rejected merger due to mandatory MIL-DTL-83797 aerospace safety certification differences.',
        timestamp: '29 Sep 2026, 11:45 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '29 Sep 2026, 09:00 IST', detail: 'Ingested from BHEL Bhopal master dump.' },
        { step: 'Harmonization Rejected', timestamp: '29 Sep 2026, 11:45 IST', detail: 'Rejected. Legacy identity preserved to prevent safety compliance breach.' }
      ]
    }
  },
  {
    eventId: 'EVT-9935',
    timestamp: '28 Sep 2026, 09:30',
    dateSort: '2026-09-28T09:30:00',
    dateCategory: 'Last 7 Days',
    user: 'Dr. R. K. Verma',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'BHEL',
    participatingCPSEs: ['BHEL', 'NTPC', 'ONGC', 'IOCL', 'SAIL'],
    material: 'BHEL-PBN-094821',
    materialName: 'Stainless Steel Hex Bolt M16 × 65',
    action: 'UOM Standardized',
    previousValue: 'SET',
    newValue: 'NOS (Unified ISO)',
    aiConfidence: 98.4,
    decision: 'Approved',
    referenceId: 'HR-004827',
    hash: 'SHA256:91aa887c...6611',
    traceability: {
      sourceRecords: [
        {
          cpse: 'BHEL',
          code: 'BHEL-PBN-094821',
          desc: 'HEX BOLT M16 X 65MM SS304 FULL THREAD IS 1364',
          plant: 'Haridwar HEEP',
          erp: 'SAP ECC 6.0',
          uom: 'NOS',
          price: 82.50
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-FAST-00304',
        standardDescription: 'Bolt, Hexagon Head, Full Thread, Stainless Steel 304 (A2-70), Size M16 × 65 mm, ISO 4017 / IS 1364',
        standardUOM: 'NOS',
        category: 'Fasteners',
        unspsc: '31161620'
      },
      confidenceBreakdown: {
        overall: 98.4,
        attributeMatch: 100,
        semanticMatch: 99,
        specificationMatch: 98,
        uomMatch: 100
      },
      explanation: 'Full thread hexagonal bolt in austenitic stainless steel grade 304 (A2-70). M16 diameter, 65mm shank length. Standard IS 1364 aligns with ISO 4017 and DIN 933.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
        comment: 'High-confidence exact specification match across 5 major CPSEs. Reconciled UOM to NOS.',
        timestamp: '28 Sep 2026, 09:30 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '28 Sep 2026, 08:30 IST', detail: 'Ingested from BHEL master export.' },
        { step: 'UOM Standardized & Approved', timestamp: '28 Sep 2026, 09:30 IST', detail: 'UOM reconciled to ISO standard NOS.' }
      ]
    }
  },
  {
    eventId: 'EVT-9934',
    timestamp: '27 Sep 2026, 14:10',
    dateSort: '2026-09-27T14:10:00',
    dateCategory: 'Last 7 Days',
    user: 'Admin User',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'GAIL',
    participatingCPSEs: ['GAIL', 'ONGC', 'IOCL'],
    material: 'GAIL-GA-3321',
    materialName: 'Ball Valve 2" Class 300 WCB/SS316',
    action: 'Harmonization Approved',
    previousValue: 'GAIL-GA-3321',
    newValue: 'HMF-VAL-00082',
    aiConfidence: 96.8,
    decision: 'Approved',
    referenceId: 'HR-004819',
    hash: 'SHA256:1a8f9021...aa34',
    traceability: {
      sourceRecords: [
        {
          cpse: 'GAIL',
          code: 'GAIL-GA-3321',
          desc: '2" BALL VALVE #300 RF A216 WCB TRIM 316 FULL BORE',
          plant: 'Pata Petrochem',
          erp: 'SAP ECC 6.0',
          uom: 'NOS',
          price: 41800.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-VAL-00082',
        standardDescription: 'Valve, Ball, Full Bore, Flanged RF, Class 300, Size 2 Inch (DN 50), Body ASTM A216 WCB, Trim SS316, API 6D',
        standardUOM: 'NOS',
        category: 'Valves & Actuators',
        unspsc: '40141607'
      },
      confidenceBreakdown: {
        overall: 96.8,
        attributeMatch: 98,
        semanticMatch: 96,
        specificationMatch: 96,
        uomMatch: 100
      },
      explanation: 'Hydrocarbon valve duplicate identified across oil & gas PSUs. 50mm equals 2 Inch; Class 300 equals 300#; A216 WCB equals Cast Carbon Steel; Trim CF8M is equivalent to SS316.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Admin User (Sh. Anoop Sundaram, Joint Director, Technical Procurement)',
        comment: 'Approved Ball Valve 2" Class 300 harmonization. Enabled bulk tender aggregation across 3 Oil & Gas CPSEs.',
        timestamp: '27 Sep 2026, 14:10 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '27 Sep 2026, 09:10 IST', detail: 'Ingested from GAIL master dump.' },
        { step: 'Harmonization Approved', timestamp: '27 Sep 2026, 14:10 IST', detail: 'Published to National Master Catalog under HMF-VAL-00082.' }
      ]
    }
  },
  {
    eventId: 'EVT-9933',
    timestamp: '26 Sep 2026, 10:25',
    dateSort: '2026-09-26T10:25:00',
    dateCategory: 'Last 7 Days',
    user: 'Dr. R. K. Verma',
    userRole: 'Chief Master Data Steward (DPE)',
    cpse: 'IOCL',
    participatingCPSEs: ['IOCL', 'GAIL'],
    material: 'IOCL-FLG-4401',
    materialName: 'Carbon Steel Flange 150# SORF 80 NB',
    action: 'Harmonization Approved',
    previousValue: 'IOCL-FLG-4401',
    newValue: 'HMF-FLG-00109',
    aiConfidence: 95.4,
    decision: 'Approved',
    referenceId: 'HR-004818',
    hash: 'SHA256:77b102aa...5512',
    traceability: {
      sourceRecords: [
        {
          cpse: 'IOCL',
          code: 'IOCL-FLG-4401',
          desc: 'FLG CS 80NB 150# SORF A105 SERRATED',
          plant: 'Panipat Refinery',
          erp: 'Oracle EBS R12',
          uom: 'NOS',
          price: 2150.00
        }
      ],
      aiRecommendation: {
        harmonizedCode: 'HMF-FLG-00109',
        standardDescription: 'Flange, Slip-On Raised Face (SORF), Class 150, Size 3 Inch (DN 80), ASTM A105 Carbon Steel, ASME B16.5',
        standardUOM: 'NOS',
        category: 'Piping & Flanges',
        unspsc: '40171501'
      },
      confidenceBreakdown: {
        overall: 95.4,
        attributeMatch: 97,
        semanticMatch: 95,
        specificationMatch: 94,
        uomMatch: 100
      },
      explanation: 'Reconciled legacy descriptions into ISO/IS standard. ASME B16.5 flange rating validated.',
      humanDecision: {
        decision: 'Approved',
        reviewer: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
        comment: 'Reconciled legacy descriptions into ISO/IS standard. ASME B16.5 flange rating validated.',
        timestamp: '26 Sep 2026, 10:25 IST'
      },
      timeline: [
        { step: 'Ingestion & File Parse', timestamp: '26 Sep 2026, 08:00 IST', detail: 'Ingested from IOCL Panipat export.' },
        { step: 'Harmonization Approved', timestamp: '26 Sep 2026, 10:25 IST', detail: 'Published to National Master Catalog under HMF-FLG-00109.' }
      ]
    }
  }
];

export default function AuditTrail({ onNavigate }) {
  // Event Log State
  const [events] = useState(INITIAL_AUDIT_EVENTS);

  // Active Selected Event for Detail Drawer
  const [selectedEvent, setSelectedEvent] = useState(null);

  // 6 Required Filters State
  const [filterDate, setFilterDate] = useState('All Dates');
  const [filterCPSE, setFilterCPSE] = useState('ALL');
  const [filterUser, setFilterUser] = useState('All Users');
  const [filterAction, setFilterAction] = useState('All Actions');
  const [filterMaterial, setFilterMaterial] = useState('');
  const [filterReferenceId, setFilterReferenceId] = useState('');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Date Filter
      if (filterDate !== 'All Dates') {
        if (filterDate === 'Today' && evt.dateCategory !== 'Today') return false;
        if (filterDate === 'Last 24 Hours' && evt.dateCategory !== 'Today' && evt.dateCategory !== 'Last 24 Hours') return false;
        if (filterDate === 'Last 7 Days' && evt.dateCategory === 'Older') return false;
      }

      // CPSE Filter
      if (filterCPSE !== 'ALL') {
        const matchesCPSE = evt.cpse === filterCPSE || evt.participatingCPSEs?.includes(filterCPSE);
        if (!matchesCPSE) return false;
      }

      // User Filter
      if (filterUser !== 'All Users' && evt.user !== filterUser) {
        return false;
      }

      // Action Filter
      if (filterAction !== 'All Actions' && evt.action !== filterAction) {
        return false;
      }

      // Material Search
      if (filterMaterial.trim()) {
        const q = filterMaterial.toLowerCase();
        const matchMatCode = evt.material.toLowerCase().includes(q);
        const matchMatName = evt.materialName?.toLowerCase().includes(q);
        if (!matchMatCode && !matchMatName) return false;
      }

      // Reference ID Search
      if (filterReferenceId.trim()) {
        const q = filterReferenceId.toLowerCase();
        if (!evt.referenceId.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [events, filterDate, filterCPSE, filterUser, filterAction, filterMaterial, filterReferenceId]);

  // Paginated Events
  const paginatedEvents = useMemo(() => {
    return filteredEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [filteredEvents, currentPage, pageSize]);

  // Reset Filters
  const handleResetFilters = () => {
    setFilterDate('All Dates');
    setFilterCPSE('ALL');
    setFilterUser('All Users');
    setFilterAction('All Actions');
    setFilterMaterial('');
    setFilterReferenceId('');
    setCurrentPage(1);
  };

  // Export Audit CSV
  const handleExportCSV = () => {
    const csvRows = [];
    csvRows.push(['PRASHAM CPSE MATERIAL MASTER - STATUTORY GOVERNANCE AUDIT TRAIL LOG']);
    csvRows.push(['Timestamp', 'User', 'CPSE', 'Material', 'Action', 'Previous Value', 'New Value', 'AI Confidence', 'Decision', 'Reference ID', 'Cryptographic Hash']);

    filteredEvents.forEach(evt => {
      csvRows.push([
        evt.timestamp,
        evt.user,
        evt.cpse,
        evt.material,
        evt.action,
        evt.previousValue,
        evt.newValue,
        `${evt.aiConfidence}%`,
        evt.decision,
        evt.referenceId,
        evt.hash
      ]);
    });

    const csvContent = csvRows.map(row => row.map(val => `"${val}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'CPSE_Audit_Trail_Log_2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Header */}
      <div className="view-header">
        <div className="view-title-group">
          <h1>
            <span>Audit Trail</span>
            <span className="badge badge-approved">
              <Fingerprint size={12} style={{ marginRight: '4px' }} />
              SHA-256 Tamper-Evident Chain
            </span>
          </h1>
          <div className="view-subtitle">
            Complete traceability of AI recommendations, human decisions and material master changes.
          </div>
        </div>

        <div className="view-actions">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {onNavigate && (
              <button className="btn btn-outline btn-sm" onClick={() => onNavigate('review')}>
                <ShieldCheck size={14} />
                <span>Review Queue</span>
              </button>
            )}

            <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
              <Download size={14} />
              <span>Export Audit Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statutory Governance Compliance Banner */}
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
              Central Vigilance Commission (CVC) & GeM Governance Audit Standard
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              All algorithmic recommendations, human steward approvals, and ERP attribute overrides are immutably signed.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Audit Events
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {events.length} Verified Records
            </div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-subtle)' }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Chain Integrity
            </div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#15803d' }}>
              100% Intact
            </div>
          </div>
        </div>
      </div>

      {/* 6 Mandatory Filters Toolbar (Date, CPSE, User, Action, Material, Reference ID) */}
      <div className="card-section" style={{ padding: '16px 20px', backgroundColor: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Filter size={15} color="var(--accent-primary)" />
            <h3 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Audit Filters & Query Builder
            </h3>
          </div>

          {(filterDate !== 'All Dates' || filterCPSE !== 'ALL' || filterUser !== 'All Users' || filterAction !== 'All Actions' || filterMaterial || filterReferenceId) && (
            <button
              className="btn btn-outline btn-sm"
              onClick={handleResetFilters}
              style={{ fontSize: '11.5px', padding: '4px 8px' }}
            >
              <RotateCcw size={12} style={{ marginRight: '4px' }} />
              Reset Filters
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '12px'
        }}>

          {/* 1. Date */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <Calendar size={11} style={{ display: 'inline', marginRight: '3px' }} /> Date
            </label>
            <select
              className="select-filter"
              style={{ width: '100%' }}
              value={filterDate}
              onChange={(e) => {
                setFilterDate(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Dates">All Dates</option>
              <option value="Today">Today (02 Oct)</option>
              <option value="Last 24 Hours">Last 24 Hours</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>

          {/* 2. CPSE */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <Building2 size={11} style={{ display: 'inline', marginRight: '3px' }} /> CPSE
            </label>
            <select
              className="select-filter"
              style={{ width: '100%' }}
              value={filterCPSE}
              onChange={(e) => {
                setFilterCPSE(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="ALL">All CPSEs</option>
              {CPSE_LIST.filter(c => c.id !== 'ALL').map(c => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>
          </div>

          {/* 3. User */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <User size={11} style={{ display: 'inline', marginRight: '3px' }} /> User
            </label>
            <select
              className="select-filter"
              style={{ width: '100%' }}
              value={filterUser}
              onChange={(e) => {
                setFilterUser(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Users">All Users</option>
              <option value="Admin User">Admin User</option>
              <option value="Dr. R. K. Verma">Dr. R. K. Verma</option>
              <option value="AI Engine v4.2">AI Engine v4.2</option>
              <option value="Sh. Anoop Sundaram">Sh. Anoop Sundaram</option>
              <option value="Sh. M. K. Narayanan">Sh. M. K. Narayanan</option>
              <option value="Er. S. Sengupta">Er. S. Sengupta</option>
            </select>
          </div>

          {/* 4. Action */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <Filter size={11} style={{ display: 'inline', marginRight: '3px' }} /> Action
            </label>
            <select
              className="select-filter"
              style={{ width: '100%' }}
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All Actions">All Actions</option>
              <option value="Harmonization Approved">Harmonization Approved</option>
              <option value="Harmonization Rejected">Harmonization Rejected</option>
              <option value="Description Standardized">Description Standardized</option>
              <option value="Reclassification">Reclassification</option>
              <option value="UOM Standardized">UOM Standardized</option>
              <option value="Harmonization Split">Harmonization Split</option>
            </select>
          </div>

          {/* 5. Material */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <Search size={11} style={{ display: 'inline', marginRight: '3px' }} /> Material
            </label>
            <input
              type="text"
              placeholder="e.g. BHEL-FST, Bolt, Valve..."
              value={filterMaterial}
              onChange={(e) => {
                setFilterMaterial(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)'
              }}
            />
          </div>

          {/* 6. Reference ID */}
          <div>
            <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase' }}>
              <Search size={11} style={{ display: 'inline', marginRight: '3px' }} /> Reference ID
            </label>
            <input
              type="text"
              placeholder="e.g. HR-004821..."
              value={filterReferenceId}
              onChange={(e) => {
                setFilterReferenceId(e.target.value);
                setCurrentPage(1);
              }}
              style={{
                width: '100%',
                padding: '6px 8px',
                fontSize: '12px',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-xs)'
              }}
            />
          </div>

        </div>
      </div>

      {/* Event Log Table */}
      <div className="card-section">
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Showing <strong>{filteredEvents.length}</strong> of <strong>{events.length}</strong> events in audit log
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Click any row to open the complete material lifecycle history drawer
          </span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '135px' }}>Timestamp</th>
                <th style={{ width: '130px' }}>User</th>
                <th style={{ width: '80px' }}>CPSE</th>
                <th style={{ width: '140px' }}>Material</th>
                <th style={{ width: '160px' }}>Action</th>
                <th style={{ width: '150px' }}>Previous Value</th>
                <th style={{ width: '160px' }}>New Value</th>
                <th style={{ width: '110px' }}>AI Confidence</th>
                <th style={{ width: '110px' }}>Decision</th>
                <th style={{ width: '100px' }}>Reference ID</th>
                <th style={{ width: '80px', textAlign: 'center' }}>History</th>
              </tr>
            </thead>
            <tbody>
              {paginatedEvents.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No audit trail events match the selected criteria.
                  </td>
                </tr>
              ) : (
                paginatedEvents.map((evt) => {
                  const isApproved = evt.decision === 'Approved' || evt.decision === 'Split Approved';
                  const isRejected = evt.decision === 'Rejected';
                  const isAuto = evt.decision === 'Auto-Indexed';

                  return (
                    <tr
                      key={evt.eventId}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedEvent(evt)}
                    >
                      {/* 1. Timestamp */}
                      <td style={{ fontSize: '11.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                        {evt.timestamp}
                      </td>

                      {/* 2. User */}
                      <td>
                        <div style={{ fontWeight: 600, fontSize: '12px', color: 'var(--text-primary)' }}>
                          {evt.user}
                        </div>
                      </td>

                      {/* 3. CPSE */}
                      <td>
                        <span className={`cpse-tag ${evt.cpse.toLowerCase()}`}>{evt.cpse}</span>
                      </td>

                      {/* 4. Material */}
                      <td>
                        <span className="code-pill">{evt.material}</span>
                      </td>

                      {/* 5. Action */}
                      <td style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {evt.action}
                      </td>

                      {/* 6. Previous Value */}
                      <td style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {evt.previousValue}
                      </td>

                      {/* 7. New Value */}
                      <td style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {evt.newValue.startsWith('HMF-') ? (
                          <span className="code-pill harmonized">{evt.newValue}</span>
                        ) : (
                          <span>{evt.newValue}</span>
                        )}
                      </td>

                      {/* 8. AI Confidence */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <div style={{ width: '40px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                            <div
                              style={{
                                width: `${evt.aiConfidence}%`,
                                height: '100%',
                                backgroundColor: evt.aiConfidence >= 90 ? '#10b981' : (evt.aiConfidence >= 75 ? '#f59e0b' : '#ef4444')
                              }}
                            />
                          </div>
                          <span style={{ fontSize: '11.5px', fontWeight: 700, color: evt.aiConfidence >= 90 ? '#15803d' : '#b45309' }}>
                            {evt.aiConfidence}%
                          </span>
                        </div>
                      </td>

                      {/* 9. Decision */}
                      <td>
                        {isApproved && (
                          <span className="badge badge-approved">
                            <CheckCircle2 size={11} style={{ marginRight: '3px' }} /> {evt.decision}
                          </span>
                        )}
                        {isRejected && (
                          <span className="badge badge-rejected">
                            <XCircle size={11} style={{ marginRight: '3px' }} /> {evt.decision}
                          </span>
                        )}
                        {isAuto && (
                          <span className="badge badge-neutral">
                            <Sparkles size={11} color="#0284c7" style={{ marginRight: '3px' }} /> {evt.decision}
                          </span>
                        )}
                      </td>

                      {/* 10. Reference ID */}
                      <td>
                        <span className="code-pill" style={{ fontWeight: 700, backgroundColor: '#eff6ff', color: 'var(--accent-primary)', border: '1px solid var(--accent-border)' }}>
                          {evt.referenceId}
                        </span>
                      </td>

                      {/* 11. Action / History Button */}
                      <td style={{ textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '3px 8px', fontSize: '11px' }}
                          onClick={() => setSelectedEvent(evt)}
                        >
                          View
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
          totalItems={filteredEvents.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 25]}
          itemName="audit events"
        />
      </div>

      {/* ========================================================================= */}
      {/* DETAIL DRAWER: COMPLETE HISTORY & TRACEABILITY OF A MATERIAL              */}
      {/* ========================================================================= */}
      {selectedEvent && selectedEvent.traceability && (
        <div className="drawer-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="drawer-panel" style={{ width: '740px' }} onClick={(e) => e.stopPropagation()}>

            {/* Drawer Header */}
            <div className="drawer-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={18} color="var(--accent-primary)" />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Complete Material Lifecycle History & Traceability
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Reference: <strong>{selectedEvent.referenceId}</strong> • Material: <strong>{selectedEvent.material}</strong> ({selectedEvent.materialName})
                </div>
              </div>

              <button
                onClick={() => setSelectedEvent(null)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} color="var(--text-muted)" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="drawer-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

              {/* 1. SOURCE RECORDS */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} color="var(--accent-primary)" />
                    <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                      1. Source Records ({selectedEvent.traceability.sourceRecords.length} Participating CPSEs)
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Original ERP Catalog Exports
                  </span>
                </div>

                <div className="table-container" style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th style={{ width: '70px' }}>CPSE</th>
                        <th style={{ width: '130px' }}>Original Code</th>
                        <th>ERP Raw Description</th>
                        <th style={{ width: '120px' }}>Plant / ERP</th>
                        <th style={{ width: '50px' }}>UOM</th>
                        <th style={{ width: '80px', textAlign: 'right' }}>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEvent.traceability.sourceRecords.map((r) => (
                        <tr key={r.code}>
                          <td><span className={`cpse-tag ${r.cpse.toLowerCase()}`}>{r.cpse}</span></td>
                          <td><span className="code-pill">{r.code}</span></td>
                          <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 600 }}>
                            {r.desc}
                          </td>
                          <td style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                            {r.plant}<br />
                            <span style={{ color: 'var(--text-muted)' }}>{r.erp}</span>
                          </td>
                          <td><span className="badge badge-neutral">{r.uom}</span></td>
                          <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{r.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. AI RECOMMENDATION */}
              <div style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Sparkles size={15} color="#0284c7" />
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase' }}>
                    2. AI Recommendation
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#0369a1', fontWeight: 600 }}>Proposed Harmonized Code</div>
                    <div style={{ marginTop: '2px' }}>
                      <span className="code-pill harmonized" style={{ fontSize: '13px', fontWeight: 800 }}>
                        {selectedEvent.traceability.aiRecommendation.harmonizedCode}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#0369a1', fontWeight: 600 }}>Standardized Description</div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {selectedEvent.traceability.aiRecommendation.standardDescription}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '10px', fontSize: '11.5px', color: '#0369a1', borderTop: '1px solid #e0f2fe', paddingTop: '8px' }}>
                  <span>Category: <strong>{selectedEvent.traceability.aiRecommendation.category}</strong></span>
                  <span>Standard UOM: <strong>{selectedEvent.traceability.aiRecommendation.standardUOM}</strong></span>
                  <span>UNSPSC: <strong>{selectedEvent.traceability.aiRecommendation.unspsc}</strong></span>
                </div>
              </div>

              {/* 3. CONFIDENCE */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    3. AI Confidence Evaluation
                  </span>
                  <span className="badge badge-approved" style={{ fontSize: '12px', fontWeight: 700 }}>
                    Overall Match: {selectedEvent.traceability.confidenceBreakdown.overall}%
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                  <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attribute Match</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
                      {selectedEvent.traceability.confidenceBreakdown.attributeMatch}%
                    </div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Semantic Match</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
                      {selectedEvent.traceability.confidenceBreakdown.semanticMatch}%
                    </div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Specification</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
                      {selectedEvent.traceability.confidenceBreakdown.specificationMatch}%
                    </div>
                  </div>
                  <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>UOM Parity</div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#15803d' }}>
                      {selectedEvent.traceability.confidenceBreakdown.uomMatch}%
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. EXPLANATION */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid var(--accent-primary)',
                borderRadius: '0 var(--radius-xs) var(--radius-xs) 0',
                padding: '12px 16px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  4. Explanation & Alignment Rationale:
                </div>
                <p style={{ margin: 0, fontSize: '12.5px', lineHeight: 1.45, fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                  “{selectedEvent.traceability.explanation}”
                </p>
              </div>

              {/* 5. HUMAN DECISION */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    5. Human Decision & Governance Audit
                  </span>
                  <span className={`badge ${selectedEvent.traceability.humanDecision.decision === 'Approved' ? 'badge-approved' : 'badge-rejected'}`}>
                    {selectedEvent.traceability.humanDecision.decision}
                  </span>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  Reviewer: <strong>{selectedEvent.traceability.humanDecision.reviewer}</strong>
                </div>

                <div style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '8px 12px',
                  fontSize: '12px',
                  lineHeight: 1.4
                }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>Steward Comments: </span>
                  <span>{selectedEvent.traceability.humanDecision.comment}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  <span>Digital Integrity Hash: <code style={{ fontFamily: 'var(--font-mono)' }}>{selectedEvent.hash}</code></span>
                  <span>Verified: <strong>{selectedEvent.traceability.humanDecision.timestamp}</strong></span>
                </div>
              </div>

              {/* 6. TIMESTAMP & CHRONOLOGICAL LIFECYCLE */}
              <div style={{
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <Clock size={15} color="var(--accent-primary)" />
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase' }}>
                    6. Chronological Material Lifecycle Timeline
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedEvent.traceability.timeline.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '10px',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {step.step}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                            {step.timestamp}
                          </span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="drawer-footer">
              <div style={{ display: 'flex', gap: '8px' }}>
                {onNavigate && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => {
                      setSelectedEvent(null);
                      onNavigate('crosswalk');
                    }}
                  >
                    <Layers size={13} style={{ marginRight: '4px' }} />
                    View in Crosswalk
                  </button>
                )}
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSelectedEvent(null)}
              >
                Close Trace Drawer
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
            <span>CVC Guidelines on Procurement Transparency & CAG Audit Traceability</span>
          </div>
        </div>
        <div className="institutional-footer-row" style={{ color: 'var(--text-light)', fontSize: '10.5px' }}>
          <span>Fictional demonstration data generated for Smart India Hackathon evaluation — Not actual government records.</span>
          <span>Cryptographic Hash Ledger (SHA-256) • Immutable Event Pipeline v4.2</span>
        </div>
      </footer>

    </div>
  );
}
