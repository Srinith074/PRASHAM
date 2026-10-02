// Mock Data for PRASHAM - CPSE Material Standardization & Harmonization Platform

export const CPSE_LIST = [
  { id: 'ALL', code: 'ALL', name: 'All CPSEs', shortName: 'All CPSEs', sector: 'Inter-CPSE Consolidated', recordsCount: 148250, duplicatesIdentified: 19420, savingsEst: '₹284.50 Cr' },
  { id: 'BHEL', code: 'BHEL', name: 'Bharat Heavy Electricals Limited', shortName: 'BHEL', sector: 'Heavy Engineering & Power Plant Equipment', recordsCount: 32410, duplicatesIdentified: 4890, savingsEst: '₹62.40 Cr' },
  { id: 'NTPC', code: 'NTPC', name: 'NTPC Limited', shortName: 'NTPC', sector: 'Power Generation & Renewables', recordsCount: 28940, duplicatesIdentified: 4120, savingsEst: '₹54.80 Cr' },
  { id: 'ONGC', code: 'ONGC', name: 'Oil and Natural Gas Corporation Limited', shortName: 'ONGC', sector: 'Oil & Natural Gas Exploration & Production', recordsCount: 26800, duplicatesIdentified: 3210, savingsEst: '₹48.90 Cr' },
  { id: 'IOCL', code: 'IOCL', name: 'Indian Oil Corporation Limited', shortName: 'IOCL', sector: 'Refining, Pipelines & Petroleum Marketing', recordsCount: 31200, duplicatesIdentified: 3880, savingsEst: '₹51.20 Cr' },
  { id: 'GAIL', code: 'GAIL', name: 'GAIL (India) Limited', shortName: 'GAIL', sector: 'Natural Gas Processing & Petrochemicals', recordsCount: 14500, duplicatesIdentified: 1720, savingsEst: '₹26.50 Cr' },
  { id: 'SAIL', code: 'SAIL', name: 'Steel Authority of India Limited', shortName: 'SAIL', sector: 'Steel & Metallurgy Manufacturing Plants', recordsCount: 22800, duplicatesIdentified: 3150, savingsEst: '₹34.10 Cr' },
  { id: 'HAL', code: 'HAL', name: 'Hindustan Aeronautics Limited', shortName: 'HAL', sector: 'Aerospace & Defense Production', recordsCount: 11600, duplicatesIdentified: 450, savingsEst: '₹6.60 Cr' }
];

export const CATEGORIES = [
  'All Categories',
  'Fasteners & Hardware',
  'Pumps & Rotating Equipment',
  'Valves & Actuators',
  'Piping & Tubing',
  'Bearings & Transmission',
  'Lubricants & Chemicals',
  'Electrical & Instrumentation',
  'Structural & Metals',
  'Seals & Gaskets',
  'Hoses & Fittings',
  'Aerospace & Defense Components'
];

export const RAW_MATERIALS = [
  // Cluster 1: SS304 Hex Bolt M16x65
  {
    id: 'MAT-RAW-001',
    cpse: 'BHEL',
    legacyCode: 'BHEL-PBN-094821',
    plant: 'BHEL Haridwar HEEP',
    rawDescription: 'HEX BOLT M16 X 65MM SS304 FULL THREAD IS 1364',
    category: 'Fasteners & Hardware',
    uom: 'NOS',
    annualQty: 45000,
    unitPrice: 82.50,
    totalSpend: 3712500,
    clusterId: 'CLUS-FST-001',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    status: 'Harmonized',
    normalizedTokens: ['BOLT', 'HEXAGON', 'FULL_THREAD', 'SS304', 'M16', '65MM', 'IS_1364'],
    extractedSpecs: { noun: 'BOLT', modifier: 'HEX HEAD', material: 'SS 304', diameter: '16 MM', length: '65 MM', thread: 'FULL THREAD', standard: 'IS 1364' }
  },
  {
    id: 'MAT-RAW-002',
    cpse: 'NTPC',
    legacyCode: 'NTPC-ST-88401',
    plant: 'NTPC Ramagundam STPP',
    rawDescription: 'SS 304 BOLT HEX HEAD M16*65 WITH NUT',
    category: 'Fasteners & Hardware',
    uom: 'SET',
    annualQty: 38000,
    unitPrice: 94.00,
    totalSpend: 3572000,
    clusterId: 'CLUS-FST-001',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    status: 'Harmonized',
    normalizedTokens: ['BOLT', 'HEX_HEAD', 'SS304', 'M16', '65MM', 'WITH_NUT'],
    extractedSpecs: { noun: 'BOLT', modifier: 'HEX HEAD', material: 'STAINLESS STEEL 304', diameter: '16 MM', length: '65 MM', thread: 'METRIC', standard: 'ISO 4017' }
  },
  {
    id: 'MAT-RAW-003',
    cpse: 'ONGC',
    legacyCode: 'ONGC-OFF-1092',
    plant: 'ONGC Mumbai High Offshore',
    rawDescription: 'FASTENER BOLT HEX M16X65 304SS ASTM A193 B8',
    category: 'Fasteners & Hardware',
    uom: 'EA',
    annualQty: 32000,
    unitPrice: 98.00,
    totalSpend: 3136000,
    clusterId: 'CLUS-FST-001',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    status: 'Harmonized',
    normalizedTokens: ['FASTENER', 'BOLT', 'HEX', 'M16', '65MM', 'SS304', 'ASTM_A193_B8'],
    extractedSpecs: { noun: 'FASTENER', modifier: 'BOLT HEX', material: '304SS (ASTM A193 B8)', diameter: '16 MM', length: '65 MM', thread: 'METRIC', standard: 'ASTM A193' }
  },
  {
    id: 'MAT-RAW-004',
    cpse: 'IOCL',
    legacyCode: 'IOCL-M-440291',
    plant: 'IOCL Panipat Refinery',
    rawDescription: 'BOLT, HEX, STAINLESS STEEL 304, SIZE M16 X 65 LG',
    category: 'Fasteners & Hardware',
    uom: 'NO',
    annualQty: 42000,
    unitPrice: 79.00,
    totalSpend: 3318000,
    clusterId: 'CLUS-FST-001',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    status: 'Harmonized',
    normalizedTokens: ['BOLT', 'HEX', 'STAINLESS_STEEL_304', 'M16', '65MM'],
    extractedSpecs: { noun: 'BOLT', modifier: 'HEX HEAD', material: 'STAINLESS STEEL 304', diameter: '16 MM', length: '65 MM', thread: 'METRIC COARSE', standard: 'DIN 933' }
  },
  {
    id: 'MAT-RAW-005',
    cpse: 'SAIL',
    legacyCode: 'SAIL-BSP-7721',
    plant: 'SAIL Bhilai Steel Plant',
    rawDescription: 'HEX HD BOLT M16X65 MM S.S. 304 GRADE',
    category: 'Fasteners & Hardware',
    uom: 'PCS',
    annualQty: 27000,
    unitPrice: 85.00,
    totalSpend: 2295000,
    clusterId: 'CLUS-FST-001',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    status: 'Harmonized',
    normalizedTokens: ['BOLT', 'HEX_HEAD', 'M16', '65MM', 'SS304'],
    extractedSpecs: { noun: 'BOLT', modifier: 'HEX HEAD', material: 'S.S. 304 GRADE', diameter: '16 MM', length: '65 MM', thread: 'METRIC', standard: 'IS 1364' }
  },

  // Cluster 2: Slurry Pump Impeller
  {
    id: 'MAT-RAW-006',
    cpse: 'BHEL',
    legacyCode: 'BHEL-PMP-4401',
    plant: 'BHEL Bhopal Heavy Plant',
    rawDescription: 'IMPELLER FOR SLURRY PUMP 150X125 HIGH CHROME ALLOY 27%',
    category: 'Pumps & Rotating Equipment',
    uom: 'NOS',
    annualQty: 180,
    unitPrice: 112000,
    totalSpend: 20160000,
    clusterId: 'CLUS-PMP-002',
    harmonizedCode: 'CPSE-PMP-IMP-HCR-150125',
    status: 'Harmonized',
    normalizedTokens: ['IMPELLER', 'PUMP_SLURRY', '150X125', 'HIGH_CHROME_27%'],
    extractedSpecs: { noun: 'IMPELLER', equipment: 'SLURRY PUMP', material: 'HIGH CHROME ALLOY 27% CR', size: '150X125 MM', standard: 'ASTM A532' }
  },
  {
    id: 'MAT-RAW-007',
    cpse: 'NTPC',
    legacyCode: 'NTPC-GEN-3004',
    plant: 'NTPC Vindhyachal Super Thermal',
    rawDescription: 'PUMP IMPELLER C.I. HIGH CHROMIUM 28% CR ASTM A532 FOR ASH WATER',
    category: 'Pumps & Rotating Equipment',
    uom: 'NOS',
    annualQty: 240,
    unitPrice: 125000,
    totalSpend: 30000000,
    clusterId: 'CLUS-PMP-002',
    harmonizedCode: 'CPSE-PMP-IMP-HCR-150125',
    status: 'Harmonized',
    normalizedTokens: ['IMPELLER', 'PUMP', 'HIGH_CHROME_28%', 'ASTM_A532', 'ASH_WATER_SLURRY'],
    extractedSpecs: { noun: 'IMPELLER', equipment: 'ASH WATER SLURRY PUMP', material: 'HIGH CHROMIUM 28% CR', size: '150X125 MM', standard: 'ASTM A532 CLASS III' }
  },
  {
    id: 'MAT-RAW-008',
    cpse: 'SAIL',
    legacyCode: 'SAIL-RSP-9902',
    plant: 'SAIL Rourkela Steel Plant',
    rawDescription: 'HIGH CHROME IMPELLER 150/125 SLURRY APPLICATION',
    category: 'Pumps & Rotating Equipment',
    uom: 'SET',
    annualQty: 110,
    unitPrice: 118000,
    totalSpend: 12980000,
    clusterId: 'CLUS-PMP-002',
    harmonizedCode: 'CPSE-PMP-IMP-HCR-150125',
    status: 'Harmonized',
    normalizedTokens: ['IMPELLER', 'HIGH_CHROME', '150X125', 'SLURRY'],
    extractedSpecs: { noun: 'IMPELLER', equipment: 'SLURRY PUMP', material: 'HIGH CHROME ALLOY', size: '150/125 MM', standard: 'ASTM A532' }
  },

  // Cluster 3: Ball Valve 2" Class 300
  {
    id: 'MAT-RAW-009',
    cpse: 'ONGC',
    legacyCode: 'ONGC-VAL-551',
    plant: 'ONGC Hazira Processing Plant',
    rawDescription: '2 INCH BALL VALVE CL 300 FLANGED CS BODY SS316 BALL API 6D',
    category: 'Valves & Actuators',
    uom: 'NOS',
    annualQty: 1200,
    unitPrice: 42500,
    totalSpend: 51000000,
    clusterId: 'CLUS-VLV-003',
    harmonizedCode: 'CPSE-VLV-BAL-WCB-050300',
    status: 'Harmonized',
    normalizedTokens: ['VALVE_BALL', '2_INCH', 'CLASS_300', 'FLANGED', 'CS_BODY_WCB', 'BALL_SS316', 'API_6D'],
    extractedSpecs: { noun: 'VALVE', type: 'BALL', size: '2 INCH (DN 50)', rating: 'CLASS 300', ends: 'FLANGED RF', body: 'CS (ASTM A216 WCB)', trim: 'SS316', standard: 'API 6D' }
  },
  {
    id: 'MAT-RAW-010',
    cpse: 'IOCL',
    legacyCode: 'IOCL-REF-7128',
    plant: 'IOCL Paradip Refinery',
    rawDescription: 'VALVE BALL 50MM 300# FLG WCB / CF8M LEVER OPERATED',
    category: 'Valves & Actuators',
    uom: 'EA',
    annualQty: 950,
    unitPrice: 44200,
    totalSpend: 41990000,
    clusterId: 'CLUS-VLV-003',
    harmonizedCode: 'CPSE-VLV-BAL-WCB-050300',
    status: 'Harmonized',
    normalizedTokens: ['VALVE_BALL', '50MM', 'CLASS_300', 'FLANGED', 'BODY_WCB', 'TRIM_CF8M', 'LEVER'],
    extractedSpecs: { noun: 'VALVE', type: 'BALL', size: '50 MM (2 INCH)', rating: '300#', ends: 'FLG RF', body: 'ASTM A216 WCB', trim: 'CF8M (SS316)', standard: 'ASME B16.34' }
  },
  {
    id: 'MAT-RAW-011',
    cpse: 'GAIL',
    legacyCode: 'GAIL-GA-3321',
    plant: 'GAIL Pata Petrochemical Complex',
    rawDescription: '2" BALL VALVE #300 RF A216 WCB TRIM 316 FULL BORE',
    category: 'Valves & Actuators',
    uom: 'NOS',
    annualQty: 680,
    unitPrice: 41800,
    totalSpend: 28424000,
    clusterId: 'CLUS-VLV-003',
    harmonizedCode: 'CPSE-VLV-BAL-WCB-050300',
    status: 'Harmonized',
    normalizedTokens: ['VALVE_BALL', '2_INCH', '300#', 'RF', 'A216_WCB', 'TRIM_316', 'FULL_BORE'],
    extractedSpecs: { noun: 'VALVE', type: 'BALL FULL BORE', size: '2 INCH', rating: '300# RF', ends: 'FLANGED', body: 'ASTM A216 WCB', trim: 'SS316', standard: 'API 6D' }
  },

  // Cluster 4: Carbon Steel Seamless Pipe 4" Sch 40
  {
    id: 'MAT-RAW-012',
    cpse: 'IOCL',
    legacyCode: 'IOCL-PIP-1002',
    plant: 'IOCL Mathura Refinery',
    rawDescription: 'PIPE CS SMLS 100 NB SCH 40 ASTM A106 GR B BEVEL END',
    category: 'Piping & Tubing',
    uom: 'MTR',
    annualQty: 48000,
    unitPrice: 2850,
    totalSpend: 136800000,
    clusterId: 'CLUS-PIP-004',
    harmonizedCode: 'CPSE-PIP-SML-CSB-100040',
    status: 'Harmonized',
    normalizedTokens: ['PIPE', 'SEAMLESS', 'CARBON_STEEL', '100NB', 'SCH_40', 'ASTM_A106_GR_B', 'BEVEL_END'],
    extractedSpecs: { noun: 'PIPE', form: 'SEAMLESS', material: 'CARBON STEEL ASTM A106 GR B', size: '100 NB (4 INCH)', wall: 'SCH 40', ends: 'BEVELED', standard: 'ASME B36.10M' }
  },
  {
    id: 'MAT-RAW-013',
    cpse: 'GAIL',
    legacyCode: 'GAIL-PL-9021',
    plant: 'GAIL HVJ Gas Pipeline Project',
    rawDescription: '4 INCH SEAMLESS PIPE A106-B SCH40 6M LENGTH',
    category: 'Piping & Tubing',
    uom: 'M',
    annualQty: 36000,
    unitPrice: 2980,
    totalSpend: 107280000,
    clusterId: 'CLUS-PIP-004',
    harmonizedCode: 'CPSE-PIP-SML-CSB-100040',
    status: 'Harmonized',
    normalizedTokens: ['PIPE', '4_INCH', 'SEAMLESS', 'A106_B', 'SCH40', '6M_LENGTH'],
    extractedSpecs: { noun: 'PIPE', form: 'SEAMLESS', material: 'ASTM A106 GRADE B', size: '4 INCH', wall: 'SCHEDULE 40', ends: 'PLAIN / BEVEL', standard: 'ASTM A106' }
  },
  {
    id: 'MAT-RAW-014',
    cpse: 'ONGC',
    legacyCode: 'ONGC-DRL-4819',
    plant: 'ONGC Ankleshwar Asset',
    rawDescription: 'CARBON STEEL PIPE SEAMLESS 4" NOMINAL SCH 40 BEVELED ASTM A106B',
    category: 'Piping & Tubing',
    uom: 'MTR',
    annualQty: 32000,
    unitPrice: 2920,
    totalSpend: 93440000,
    clusterId: 'CLUS-PIP-004',
    harmonizedCode: 'CPSE-PIP-SML-CSB-100040',
    status: 'Harmonized',
    normalizedTokens: ['PIPE', 'CARBON_STEEL', 'SEAMLESS', '4_INCH', 'SCH_40', 'BEVELED', 'ASTM_A106B'],
    extractedSpecs: { noun: 'PIPE', form: 'SEAMLESS', material: 'CARBON STEEL ASTM A106 GRADE B', size: '4 INCH NOMINAL', wall: 'SCH 40', ends: 'BEVELED', standard: 'API 5L / ASTM A106' }
  },

  // Cluster 5: Deep Groove Ball Bearing 6308-2RS
  {
    id: 'MAT-RAW-015',
    cpse: 'BHEL',
    legacyCode: 'BHEL-BRG-6308',
    plant: 'BHEL Trichy Boiler Plant',
    rawDescription: 'DEEP GROOVE BALL BEARING 6308 2RS C3 SKF/FAG',
    category: 'Bearings & Transmission',
    uom: 'NOS',
    annualQty: 14000,
    unitPrice: 890,
    totalSpend: 12460000,
    clusterId: 'CLUS-BRG-005',
    harmonizedCode: 'CPSE-BRG-DGB-040090',
    status: 'Harmonized',
    normalizedTokens: ['BEARING', 'BALL_DEEP_GROOVE', '6308', '2RS', 'CLEARANCE_C3'],
    extractedSpecs: { noun: 'BEARING', type: 'DEEP GROOVE BALL', model: '6308', seal: '2RS (DOUBLE RUBBER SEAL)', clearance: 'C3', bore: '40 MM', od: '90 MM', width: '23 MM', standard: 'ISO 15' }
  },
  {
    id: 'MAT-RAW-016',
    cpse: 'SAIL',
    legacyCode: 'SAIL-DSP-4011',
    plant: 'SAIL Durgapur Steel Plant',
    rawDescription: 'BEARING BALL 6308-2RS1/C3 DIMS 40X90X23 MM',
    category: 'Bearings & Transmission',
    uom: 'PCS',
    annualQty: 11500,
    unitPrice: 915,
    totalSpend: 10522500,
    clusterId: 'CLUS-BRG-005',
    harmonizedCode: 'CPSE-BRG-DGB-040090',
    status: 'Harmonized',
    normalizedTokens: ['BEARING', 'BALL', '6308_2RS1', 'C3', '40X90X23'],
    extractedSpecs: { noun: 'BEARING', type: 'BALL BEARING', model: '6308', seal: '2RS1', clearance: 'C3', bore: '40 MM', od: '90 MM', width: '23 MM', standard: 'DIN 625' }
  },
  {
    id: 'MAT-RAW-017',
    cpse: 'NTPC',
    legacyCode: 'NTPC-EL-8812',
    plant: 'NTPC Korba Thermal Power Station',
    rawDescription: 'RADIAL BALL BEARING RUBBER SEALED BOTH SIDES 6308 2RS C3 CLEARANCE',
    category: 'Bearings & Transmission',
    uom: 'NOS',
    annualQty: 16200,
    unitPrice: 875,
    totalSpend: 14175000,
    clusterId: 'CLUS-BRG-005',
    harmonizedCode: 'CPSE-BRG-DGB-040090',
    status: 'Harmonized',
    normalizedTokens: ['BEARING', 'RADIAL_BALL', 'RUBBER_SEALED_BOTH_SIDES', '6308', '2RS', 'C3'],
    extractedSpecs: { noun: 'BEARING', type: 'RADIAL BALL', model: '6308', seal: '2RS', clearance: 'C3', bore: '40 MM', od: '90 MM', width: '23 MM', standard: 'ISO 15' }
  },

  // Cluster 7: Spiral Wound Gasket 3" Class 300 (Pending Review)
  {
    id: 'MAT-RAW-018',
    cpse: 'ONGC',
    legacyCode: 'ONGC-GSK-3001',
    plant: 'ONGC Uran Terminal',
    rawDescription: 'SPIRAL WOUND GASKET 3 INCH 300# SS316 GRAPHITE ASME B16.20',
    category: 'Seals & Gaskets',
    uom: 'NOS',
    annualQty: 6500,
    unitPrice: 1250,
    totalSpend: 8125000,
    clusterId: 'CLUS-GSK-007',
    harmonizedCode: 'CPSE-GSK-SPW-316-080300',
    status: 'Pending Review',
    normalizedTokens: ['GASKET', 'SPIRAL_WOUND', '3_INCH', '300#', 'SS316', 'GRAPHITE', 'ASME_B16.20'],
    extractedSpecs: { noun: 'GASKET', type: 'SPIRAL WOUND', size: '3 INCH (80 NB)', rating: 'CLASS 300', winding: 'SS 316', filler: 'FLEXIBLE GRAPHITE', standard: 'ASME B16.20' }
  },
  {
    id: 'MAT-RAW-019',
    cpse: 'IOCL',
    legacyCode: 'IOCL-MN-9921',
    plant: 'IOCL Haldia Refinery',
    rawDescription: 'SP WOUND GASKET 80 NB CL-300 WITH SS316 INNER RING & FG FILLER',
    category: 'Seals & Gaskets',
    uom: 'EA',
    annualQty: 5800,
    unitPrice: 1390,
    totalSpend: 8062000,
    clusterId: 'CLUS-GSK-007',
    harmonizedCode: 'CPSE-GSK-SPW-316-080300',
    status: 'Pending Review',
    normalizedTokens: ['GASKET', 'SPIRAL_WOUND', '80NB', 'CLASS_300', 'INNER_RING_SS316', 'FG_FILLER'],
    extractedSpecs: { noun: 'GASKET', type: 'SPIRAL WOUND', size: '80 NB', rating: 'CLASS 300', winding: 'SS 316', filler: 'FG (FLEXIBLE GRAPHITE)', rings: 'INNER RING SS316', standard: 'ASME B16.20' }
  },
  {
    id: 'MAT-RAW-020',
    cpse: 'GAIL',
    legacyCode: 'GAIL-GS-104',
    plant: 'GAIL Vijaipur Compressor Station',
    rawDescription: '3" METALLIC GASKET CLASS 300 ASME B16.20 316L/GRAPHITE',
    category: 'Seals & Gaskets',
    uom: 'NOS',
    annualQty: 4200,
    unitPrice: 1310,
    totalSpend: 5502000,
    clusterId: 'CLUS-GSK-007',
    harmonizedCode: 'CPSE-GSK-SPW-316-080300',
    status: 'Pending Review',
    normalizedTokens: ['GASKET', 'METALLIC_SPIRAL', '3_INCH', 'CLASS_300', '316L', 'GRAPHITE'],
    extractedSpecs: { noun: 'GASKET', type: 'METALLIC SPIRAL WOUND', size: '3 INCH', rating: 'CLASS 300', winding: 'SS 316L', filler: 'GRAPHITE', standard: 'ASME B16.20' }
  },

  // Cluster 8: Electric Motor 45 kW 4-Pole (Pending Review)
  {
    id: 'MAT-RAW-021',
    cpse: 'BHEL',
    legacyCode: 'BHEL-MOT-4501',
    plant: 'BHEL Bhopal Electrical Machines',
    rawDescription: '3 PH SQUIRREL CAGE INDUCTION MOTOR 45KW 4 POLE FOOT MTG IE3 EFFICIENCY 415V',
    category: 'Electrical & Instrumentation',
    uom: 'NOS',
    annualQty: 85,
    unitPrice: 285000,
    totalSpend: 24225000,
    clusterId: 'CLUS-ELE-008',
    harmonizedCode: 'CPSE-ELE-MOT-45K-4P415',
    status: 'Pending Review',
    normalizedTokens: ['MOTOR', '3_PHASE', 'INDUCTION', '45KW', '4_POLE', 'FOOT_MOUNT', 'IE3', '415V'],
    extractedSpecs: { noun: 'MOTOR', type: '3-PHASE INDUCTION SQUIRREL CAGE', power: '45 KW', poles: '4 POLE', mounting: 'FOOT (B3)', efficiency: 'IE3', voltage: '415 V', standard: 'IS/IEC 60034' }
  },
  {
    id: 'MAT-RAW-022',
    cpse: 'NTPC',
    legacyCode: 'NTPC-EM-2290',
    plant: 'NTPC Sipat Super Thermal',
    rawDescription: '45 KW 4 POLE TEFC INDUCTION MOTOR 415V 50HZ FRAME 225M B3',
    category: 'Electrical & Instrumentation',
    uom: 'NOS',
    annualQty: 110,
    unitPrice: 260000,
    totalSpend: 28600000,
    clusterId: 'CLUS-ELE-008',
    harmonizedCode: 'CPSE-ELE-MOT-45K-4P415',
    status: 'Pending Review',
    normalizedTokens: ['MOTOR', '45KW', '4_POLE', 'TEFC', 'INDUCTION', '415V', 'FRAME_225M', 'B3'],
    extractedSpecs: { noun: 'MOTOR', type: 'INDUCTION TEFC', power: '45 KW', poles: '4 POLE', mounting: 'B3 FOOT', frame: '225M', voltage: '415 V 50 HZ', standard: 'IS 12615' }
  },
  {
    id: 'MAT-RAW-023',
    cpse: 'SAIL',
    legacyCode: 'SAIL-BSL-6612',
    plant: 'SAIL Bokaro Steel Plant',
    rawDescription: 'LT INDUCTION MOTOR 45 KW 1480 RPM 415 VOLT 50 HZ FOOT MOUNTED',
    category: 'Electrical & Instrumentation',
    uom: 'NOS',
    annualQty: 95,
    unitPrice: 272000,
    totalSpend: 25840000,
    clusterId: 'CLUS-ELE-008',
    harmonizedCode: 'CPSE-ELE-MOT-45K-4P415',
    status: 'Pending Review',
    normalizedTokens: ['MOTOR', 'LT_INDUCTION', '45KW', '1480RPM', '415V', '50HZ', 'FOOT_MOUNTED'],
    extractedSpecs: { noun: 'MOTOR', type: 'LT INDUCTION', power: '45 KW', speed: '1480 RPM (4 POLE)', mounting: 'FOOT MOUNTED', voltage: '415 V', standard: 'IS 325' }
  },

  // Cluster 12: Hydraulic Hose 1/2" (Rejected / Incompatible)
  {
    id: 'MAT-RAW-024',
    cpse: 'BHEL',
    legacyCode: 'BHEL-HSE-0012',
    plant: 'BHEL Hyderabad Industrial Systems',
    rawDescription: 'HYDRAULIC HOSE 1/2 INCH 2 WIRE BRAIDED WP 275 BAR EN 853 2SN',
    category: 'Hoses & Fittings',
    uom: 'MTR',
    annualQty: 5400,
    unitPrice: 620,
    totalSpend: 3348000,
    clusterId: 'CLUS-HSE-012',
    harmonizedCode: 'CPSE-HSE-HYD-2WB-012000',
    status: 'Rejected',
    normalizedTokens: ['HOSE', 'HYDRAULIC', '1/2_INCH', '2_WIRE_BRAID', 'WP_275BAR', 'EN_853_2SN'],
    extractedSpecs: { noun: 'HOSE', type: 'HYDRAULIC 2 WIRE', size: '1/2 INCH', pressure: '275 BAR', standard: 'EN 853 2SN' }
  },
  {
    id: 'MAT-RAW-025',
    cpse: 'HAL',
    legacyCode: 'HAL-AERO-HSE-90',
    plant: 'HAL Aircraft Division Bangalore',
    rawDescription: 'AIRCRAFT HYDRAULIC HOSE FLAME RETARDANT 1/2" MIL-DTL-83797 3000 PSI AERO CERT',
    category: 'Hoses & Fittings',
    uom: 'MTR',
    annualQty: 1200,
    unitPrice: 4800,
    totalSpend: 5760000,
    clusterId: 'CLUS-HSE-012',
    harmonizedCode: 'CPSE-HSE-HYD-2WB-012000',
    status: 'Rejected',
    normalizedTokens: ['HOSE', 'AIRCRAFT_HYDRAULIC', 'FLAME_RETARDANT', '1/2_INCH', 'MIL_DTL_83797', 'AERO_CERT'],
    extractedSpecs: { noun: 'HOSE', type: 'AIRCRAFT HYDRAULIC', size: '1/2 INCH', rating: '3000 PSI', certification: 'MIL-DTL-83797 AERO FLAME RETARDANT', standard: 'MIL-SPEC' }
  },

  // Unique Materials (No Cross-CPSE Duplicates)
  {
    id: 'MAT-RAW-026',
    cpse: 'HAL',
    legacyCode: 'HAL-AERO-TI64-01',
    plant: 'HAL LCA Tejas Division Bangalore',
    rawDescription: 'TITANIUM ALLOY SHEET GRADE 5 TI-6AL-4V AMS 4911 THICKNESS 2.5 MM',
    category: 'Aerospace & Defense Components',
    uom: 'SHT',
    annualQty: 320,
    unitPrice: 145000,
    totalSpend: 46400000,
    clusterId: null,
    harmonizedCode: 'CPSE-AER-SHT-TI6-002500',
    status: 'Unique Master Record',
    normalizedTokens: ['TITANIUM_ALLOY', 'SHEET', 'GRADE_5_TI6AL4V', 'AMS_4911', 'THK_2.5MM'],
    extractedSpecs: { noun: 'SHEET', material: 'TITANIUM TI-6AL-4V GRADE 5', thickness: '2.5 MM', specification: 'AMS 4911', standard: 'AEROSPACE MATERIAL SPEC' }
  },
  {
    id: 'MAT-RAW-027',
    cpse: 'ONGC',
    legacyCode: 'ONGC-DRL-COL-89',
    plant: 'ONGC Drilling Services Mehsana',
    rawDescription: 'DRILL COLLAR 6-1/2 INCH OD NON-MAGNETIC MONEL ALLOY 4-1/2 IF CONN',
    category: 'Piping & Tubing',
    uom: 'NOS',
    annualQty: 45,
    unitPrice: 1250000,
    totalSpend: 56250000,
    clusterId: null,
    harmonizedCode: 'CPSE-DRL-COL-NMG-065000',
    status: 'Unique Master Record',
    normalizedTokens: ['DRILL_COLLAR', '6-1/2_INCH', 'NON_MAGNETIC', 'MONEL_ALLOY', '4-1/2_IF'],
    extractedSpecs: { noun: 'DRILL COLLAR', material: 'NON-MAGNETIC MONEL ALLOY', od: '6.5 INCH', connection: '4-1/2 INCH IF', standard: 'API SPEC 7-1' }
  }
];

export const HARMONIZATION_CLUSTERS = [
  {
    clusterId: 'CLUS-FLAGSHIP-M10',
    clusterName: 'Hexagonal Head Bolt M10 x 50 mm Grade 8.8',
    category: 'Fasteners',
    unspsc: '31161620',
    harmonizedCode: 'HMF-FAST-00128',
    standardizedDescription: 'Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8',
    standardUOM: 'EA',
    material: 'Carbon Steel',
    grade: '8.8',
    dimensions: 'M10 × 50 mm',
    confidenceScore: 96.8,
    status: 'Pending Review',
    recommendation: 'Merge into existing harmonized material',
    decisionReason: 'High semantic and attribute-level similarity.',
    reviewNotes: 'Verified identical metric pitch, shank length 50mm, grade 8.8 high tensile steel across BHEL, NTPC, and IOCL plant procurement inventories.',
    annualQuantityConsolidated: 142000,
    annualSpendConsolidated: 12496000,
    estimatedSavingsPercent: 18.2,
    estimatedSavingsValue: 2274272,
    participatingCPSEs: ['BHEL', 'NTPC', 'IOCL'],
    memberLegacyCodes: [
      {
        cpse: 'BHEL',
        code: 'BHEL-FST-10921',
        desc: 'HEX BOLT M10X50 GR 8.8',
        uom: 'EA',
        price: 84.50,
        plant: 'BHEL Haridwar HEEP',
        erpSystem: 'SAP ECC 6.0',
        lastPoDate: '2026-08-14',
        annualQty: 54000
      },
      {
        cpse: 'NTPC',
        code: 'NTPC-BLT-88231',
        desc: 'HEXAGONAL HEAD BOLT 10 MM X 50 MM CLASS 8.8',
        uom: 'NOS',
        price: 89.00,
        plant: 'NTPC Ramagundam STPP',
        erpSystem: 'SAP S/4HANA',
        lastPoDate: '2026-09-02',
        annualQty: 46000
      },
      {
        cpse: 'IOCL',
        code: 'IOCL-FST-19283',
        desc: 'MS HEX HEAD BOLT M10*50, GR8.8',
        uom: 'EA',
        price: 82.00,
        plant: 'IOCL Panipat Refinery',
        erpSystem: 'Oracle E-Business Suite R12',
        lastPoDate: '2026-07-28',
        annualQty: 42000
      }
    ],
    matchedAttributes: [
      { label: 'Same material category', detail: 'Fasteners & Hardware', match: true },
      { label: 'Same dimensions', detail: 'Thread: M10 (10 mm), Length: 50 mm', match: true },
      { label: 'Same grade', detail: 'Property Class 8.8 Medium Carbon Steel', match: true },
      { label: 'Same functional purpose', detail: 'Standard Hexagonal Head External Fastener', match: true },
      { label: 'Equivalent terminology', detail: 'Bolt ≅ Hex Bolt ≅ Hex Head Bolt', match: true },
      { label: 'Compatible UOM', detail: 'EA ≅ NOS unified to Standard ISO EA', match: true }
    ],
    detectedVariations: [
      { original: 'BOLT / HEX BOLT', context: 'Naming convention syntax (Noun-first vs Modifier-first)' },
      { original: '10MM / M10', context: 'Metric thread representation (10 mm with space vs M10)' },
      { original: 'GR 8.8 / GRADE 8.8', context: 'Abbreviation convention (GR 8.8 vs CLASS 8.8 vs GR8.8)' },
      { original: 'Different CPSE coding conventions', context: 'BHEL-FST vs NTPC-BLT vs IOCL-FST legacy taxonomies' }
    ],
    aiExplainability: {
      summary: 'Matched because the records share the same material category, dimensions, grade and functional description. Minor differences were detected in naming convention and word order.',
      confidenceBreakdown: [
        { factor: 'Dimensional Equivalence (M10 x 50mm)', score: 98, weight: '30%', status: 'Exact' },
        { factor: 'Metallurgical Grade (Class 8.8 / Carbon Steel)', score: 96, weight: '30%', status: 'Exact' },
        { factor: 'Semantic Description Similarity', score: 97, weight: '20%', status: 'Harmonized' },
        { factor: 'Functional Purpose & Application', score: 96, weight: '20%', status: 'Verified' }
      ],
      tokenAlignment: [
        { raw: 'HEX BOLT / HEXAGONAL HEAD BOLT / MS HEX HEAD BOLT', normalized: 'Hexagonal Head Bolt', matchType: 'Exact Synonym' },
        { raw: 'M10X50 / 10 MM X 50 MM / M10*50', normalized: 'M10 × 50 mm', matchType: 'Standardized Dimension' },
        { raw: 'GR 8.8 / CLASS 8.8 / GR8.8', normalized: 'Grade 8.8', matchType: 'Harmonized Property Class' }
      ]
    }
  },
  {
    clusterId: 'CLUS-FST-001',
    clusterName: 'Stainless Steel Hex Bolt M16 x 65mm Full Thread',
    category: 'Fasteners & Hardware',
    unspsc: '31161620',
    harmonizedCode: 'CPSE-FST-BLT-304-M16065',
    standardizedDescription: 'BOLT, HEXAGON HEAD, FULL THREAD, STAINLESS STEEL 304 (A2-70), SIZE M16 X 65 MM, ISO 4017 / IS 1364',
    standardUOM: 'NOS',
    confidenceScore: 98.4,
    status: 'Approved',
    approvedBy: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
    approvedDate: '2026-09-18 14:22:10',
    reviewNotes: 'High-confidence exact specification match across 5 major CPSEs. Reconciled UOM to NOS. IS 1364 aligns with ISO 4017 and DIN 933.',
    annualQuantityConsolidated: 184000,
    annualSpendConsolidated: 16033500,
    estimatedSavingsPercent: 19.4,
    estimatedSavingsValue: 3110499,
    participatingCPSEs: ['BHEL', 'NTPC', 'ONGC', 'IOCL', 'SAIL'],
    memberLegacyCodes: [
      { cpse: 'BHEL', code: 'BHEL-PBN-094821', desc: 'HEX BOLT M16 X 65MM SS304 FULL THREAD IS 1364', uom: 'NOS', price: 82.50 },
      { cpse: 'NTPC', code: 'NTPC-ST-88401', desc: 'SS 304 BOLT HEX HEAD M16*65 WITH NUT', uom: 'SET', price: 94.00 },
      { cpse: 'ONGC', code: 'ONGC-OFF-1092', desc: 'FASTENER BOLT HEX M16X65 304SS ASTM A193 B8', uom: 'EA', price: 98.00 },
      { cpse: 'IOCL', code: 'IOCL-M-440291', desc: 'BOLT, HEX, STAINLESS STEEL 304, SIZE M16 X 65 LG', uom: 'NO', price: 79.00 },
      { cpse: 'SAIL', code: 'SAIL-BSP-7721', desc: 'HEX HD BOLT M16X65 MM S.S. 304 GRADE', uom: 'PCS', price: 85.00 }
    ],
    aiExplainability: {
      summary: 'AI detected 5 duplicate records for Hexagonal Head Bolt M16x65 in SS304 across 5 separate CPSE Enterprise ERPs with differing legacy descriptions, abbreviations, and UOM syntax.',
      confidenceBreakdown: [
        { factor: 'Dimensional Equivalence (M16 x 65mm)', score: 100, weight: '30%', status: 'Exact' },
        { factor: 'Metallurgical Grade (SS304 / A2-70 / ASTM A193 B8)', score: 98, weight: '30%', status: 'Equivalent' },
        { factor: 'Standard Alignment (IS 1364 vs ISO 4017 vs DIN 933)', score: 97, weight: '20%', status: 'Harmonized' },
        { factor: 'Thread & Head Form (Hex Head Full Thread)', score: 98, weight: '20%', status: 'Verified' }
      ],
      tokenAlignment: [
        { raw: 'HEX BOLT / BOLT HEX / HEX HD BOLT', normalized: 'BOLT, HEXAGON HEAD', matchType: 'Exact Synonym' },
        { raw: 'SS304 / 304SS / S.S. 304 GRADE', normalized: 'STAINLESS STEEL 304', matchType: 'Standardized Grade' },
        { raw: 'M16 X 65MM / M16*65 / M16X65 LG', normalized: 'SIZE M16 X 65 MM', matchType: 'Unified Dimension' },
        { raw: 'IS 1364 / DIN 933 / ISO 4017', normalized: 'ISO 4017 / IS 1364', matchType: 'Harmonized Standard' }
      ]
    }
  },
  {
    clusterId: 'CLUS-PMP-002',
    clusterName: 'Centrifugal Slurry Pump Impeller High Chrome 150x125mm',
    category: 'Pumps & Rotating Equipment',
    unspsc: '40151508',
    harmonizedCode: 'CPSE-PMP-IMP-HCR-150125',
    standardizedDescription: 'IMPELLER, CENTRIFUGAL PUMP, SLURRY SERVICE, HIGH CHROME ALLOY 27% CR, SIZE 150 X 125 MM, ASTM A532 CLASS III TYPE A',
    standardUOM: 'NOS',
    confidenceScore: 95.2,
    status: 'Approved',
    approvedBy: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
    approvedDate: '2026-09-20 11:05:44',
    reviewNotes: 'Confirmed interchangeability for ash slurry and tailing slurry handling. NTPC 28% and BHEL 27% high chrome fall under ASTM A532 Class III Grade A (23-30% Cr).',
    annualQuantityConsolidated: 530,
    annualSpendConsolidated: 63140000,
    estimatedSavingsPercent: 14.8,
    estimatedSavingsValue: 9344720,
    participatingCPSEs: ['BHEL', 'NTPC', 'SAIL'],
    memberLegacyCodes: [
      { cpse: 'BHEL', code: 'BHEL-PMP-4401', desc: 'IMPELLER FOR SLURRY PUMP 150X125 HIGH CHROME ALLOY 27%', uom: 'NOS', price: 112000 },
      { cpse: 'NTPC', code: 'NTPC-GEN-3004', desc: 'PUMP IMPELLER C.I. HIGH CHROMIUM 28% CR ASTM A532 FOR ASH WATER', uom: 'NOS', price: 125000 },
      { cpse: 'SAIL', code: 'SAIL-RSP-9902', desc: 'HIGH CHROME IMPELLER 150/125 SLURRY APPLICATION', uom: 'SET', price: 118000 }
    ],
    aiExplainability: {
      summary: 'Cross-CPSE duplication detected in high-wear slurry pump impellers. Chemical composition and dimensional envelope matched across power and steel plant inventories.',
      confidenceBreakdown: [
        { factor: 'Dimensional Envelope (150x125 mm suction/discharge)', score: 99, weight: '35%', status: 'Exact' },
        { factor: 'Alloy Classification (ASTM A532 Class III High Chrome)', score: 94, weight: '35%', status: 'Harmonized' },
        { factor: 'Application Duty (Slurry / Ash Handling)', score: 92, weight: '30%', status: 'Matched' }
      ],
      tokenAlignment: [
        { raw: 'IMPELLER FOR SLURRY PUMP / PUMP IMPELLER', normalized: 'IMPELLER, CENTRIFUGAL PUMP', matchType: 'Exact Category' },
        { raw: '27% CR / 28% CR ASTM A532 / HIGH CHROME', normalized: 'HIGH CHROME ALLOY 27% CR, ASTM A532 CL III', matchType: 'Standard Chemistry' },
        { raw: '150X125 / 150/125', normalized: '150 X 125 MM', matchType: 'Standard Dimension' }
      ]
    }
  },
  {
    clusterId: 'CLUS-VLV-003',
    clusterName: 'Ball Valve 2 Inch Class 300 Flanged RF WCB/SS316',
    category: 'Valves & Actuators',
    unspsc: '40141607',
    harmonizedCode: 'CPSE-VLV-BAL-WCB-050300',
    standardizedDescription: 'VALVE, BALL, FULL BORE, FLANGED RF, CLASS 300, SIZE 2 INCH (DN 50), BODY ASTM A216 WCB, BALL/TRIM SS316, API 6D / ASME B16.34',
    standardUOM: 'NOS',
    confidenceScore: 96.8,
    status: 'Approved',
    approvedBy: 'Sh. Anoop Sundaram (Joint Director, Technical Procurement)',
    approvedDate: '2026-09-22 16:40:12',
    reviewNotes: 'Standard API 6D hydrocarbon process valve. Cross-entity procurement pooling between ONGC, IOCL, and GAIL provides immediate bargaining power.',
    annualQuantityConsolidated: 2830,
    annualSpendConsolidated: 121414000,
    estimatedSavingsPercent: 21.0,
    estimatedSavingsValue: 25496940,
    participatingCPSEs: ['ONGC', 'IOCL', 'GAIL'],
    memberLegacyCodes: [
      { cpse: 'ONGC', code: 'ONGC-VAL-551', desc: '2 INCH BALL VALVE CL 300 FLANGED CS BODY SS316 BALL API 6D', uom: 'NOS', price: 42500 },
      { cpse: 'IOCL', code: 'IOCL-REF-7128', desc: 'VALVE BALL 50MM 300# FLG WCB / CF8M LEVER OPERATED', uom: 'EA', price: 44200 },
      { cpse: 'GAIL', code: 'GAIL-GA-3321', desc: '2" BALL VALVE #300 RF A216 WCB TRIM 316 FULL BORE', uom: 'NOS', price: 41800 }
    ],
    aiExplainability: {
      summary: 'Hydrocarbon valve duplicate identified across oil & gas PSUs. 50mm equals 2 Inch; Class 300 equals 300#; A216 WCB equals Cast Carbon Steel; Trim CF8M is equivalent to SS316.',
      confidenceBreakdown: [
        { factor: 'Pressure Rating & Nominal Bore (2" / Class 300)', score: 100, weight: '30%', status: 'Exact' },
        { factor: 'Body Metallurgy (ASTM A216 Gr. WCB)', score: 98, weight: '25%', status: 'Exact' },
        { factor: 'Trim Material (SS316 / CF8M)', score: 96, weight: '25%', status: 'Equivalent' },
        { factor: 'Design Standard (API 6D / ASME B16.34)', score: 93, weight: '20%', status: 'Aligned' }
      ],
      tokenAlignment: [
        { raw: '2 INCH / 50MM / 2"', normalized: 'SIZE 2 INCH (DN 50)', matchType: 'Imperial-Metric Conversion' },
        { raw: 'CL 300 / 300# / #300 RF', normalized: 'CLASS 300 FLANGED RF', matchType: 'Standard Pressure Rating' },
        { raw: 'CS BODY / WCB / A216 WCB', normalized: 'ASTM A216 WCB', matchType: 'Material Norm' },
        { raw: 'SS316 BALL / CF8M / TRIM 316', normalized: 'BALL/TRIM SS316 (CF8M)', matchType: 'Metallurgy Crosswalk' }
      ]
    }
  },
  {
    clusterId: 'CLUS-PIP-004',
    clusterName: 'Carbon Steel Seamless Pipe 4" Sch 40 ASTM A106 Gr B',
    category: 'Piping & Tubing',
    unspsc: '40171601',
    harmonizedCode: 'CPSE-PIP-SML-CSB-100040',
    standardizedDescription: 'PIPE, SEAMLESS, CARBON STEEL, ASTM A106 GRADE B, NOMINAL SIZE 4 INCH (100 NB), SCHEDULE 40, BEVELED ENDS (ASME B36.10M)',
    standardUOM: 'MTR',
    confidenceScore: 99.1,
    status: 'Approved',
    approvedBy: 'Dr. R. K. Verma (Chief Master Data Steward, DPE)',
    approvedDate: '2026-09-24 10:15:33',
    reviewNotes: 'Highest spend item in piping category. Exact duplicate across refinery, gas pipeline, and onshore exploration units.',
    annualQuantityConsolidated: 116000,
    annualSpendConsolidated: 337520000,
    estimatedSavingsPercent: 16.5,
    estimatedSavingsValue: 55690800,
    participatingCPSEs: ['IOCL', 'GAIL', 'ONGC'],
    memberLegacyCodes: [
      { cpse: 'IOCL', code: 'IOCL-PIP-1002', desc: 'PIPE CS SMLS 100 NB SCH 40 ASTM A106 GR B BEVEL END', uom: 'MTR', price: 2850 },
      { cpse: 'GAIL', code: 'GAIL-PL-9021', desc: '4 INCH SEAMLESS PIPE A106-B SCH40 6M LENGTH', uom: 'M', price: 2980 },
      { cpse: 'ONGC', code: 'ONGC-DRL-4819', desc: 'CARBON STEEL PIPE SEAMLESS 4" NOMINAL SCH 40 BEVELED ASTM A106B', uom: 'MTR', price: 2920 }
    ],
    aiExplainability: {
      summary: '100 NB equals 4 Inch; SMLS equals Seamless; A106 GR B equals A106-B. Complete dimensional and metallurgical match.',
      confidenceBreakdown: [
        { factor: 'Material Grade (ASTM A106 Gr. B Seamless)', score: 100, weight: '35%', status: 'Exact' },
        { factor: 'Dimensional Match (4" NB / Sch 40)', score: 100, weight: '35%', status: 'Exact' },
        { factor: 'End Preparation & Tolerance (Beveled Ends)', score: 97, weight: '30%', status: 'Aligned' }
      ],
      tokenAlignment: [
        { raw: 'PIPE CS SMLS / SEAMLESS PIPE', normalized: 'PIPE, SEAMLESS, CARBON STEEL', matchType: 'Standard Syntax' },
        { raw: '100 NB / 4 INCH / 4" NOMINAL', normalized: 'SIZE 4 INCH (100 NB)', matchType: 'Metric/Imperial Unified' },
        { raw: 'SCH 40 / SCH40', normalized: 'SCHEDULE 40 (ASME B36.10M)', matchType: 'Wall Standard' }
      ]
    }
  },
  {
    clusterId: 'CLUS-BRG-005',
    clusterName: 'Deep Groove Ball Bearing 6308-2RS C3 (40x90x23mm)',
    category: 'Bearings & Transmission',
    unspsc: '31171504',
    harmonizedCode: 'CPSE-BRG-DGB-040090',
    standardizedDescription: 'BEARING, BALL, DEEP GROOVE, DOUBLE RUBBER CONTACT SEAL (2RS), RADIAL INTERNAL CLEARANCE C3, BORE 40 MM, OD 90 MM, WIDTH 23 MM, ISO 15',
    standardUOM: 'NOS',
    confidenceScore: 99.6,
    status: 'Approved',
    approvedBy: 'Sh. Anoop Sundaram (Joint Director, Technical Procurement)',
    approvedDate: '2026-09-25 09:30:00',
    reviewNotes: 'Standard ISO 15 rolling bearing envelope. Overlapping procurement between BHEL, SAIL, and NTPC.',
    annualQuantityConsolidated: 41700,
    annualSpendConsolidated: 37157500,
    estimatedSavingsPercent: 18.2,
    estimatedSavingsValue: 6762665,
    participatingCPSEs: ['BHEL', 'SAIL', 'NTPC'],
    memberLegacyCodes: [
      { cpse: 'BHEL', code: 'BHEL-BRG-6308', desc: 'DEEP GROOVE BALL BEARING 6308 2RS C3 SKF/FAG', uom: 'NOS', price: 890 },
      { cpse: 'SAIL', code: 'SAIL-DSP-4011', desc: 'BEARING BALL 6308-2RS1/C3 DIMS 40X90X23 MM', uom: 'PCS', price: 915 },
      { cpse: 'NTPC', code: 'NTPC-EL-8812', desc: 'RADIAL BALL BEARING RUBBER SEALED BOTH SIDES 6308 2RS C3 CLEARANCE', uom: 'NOS', price: 875 }
    ],
    aiExplainability: {
      summary: 'ISO designation 6308 specifies 40mm bore, 90mm outer diameter, 23mm width. 2RS / 2RS1 denotes dual rubber contact seals; C3 denotes high-temp/high-speed internal radial clearance.',
      confidenceBreakdown: [
        { factor: 'Bearing Model & Envelope (6308 / 40x90x23mm)', score: 100, weight: '40%', status: 'Exact' },
        { factor: 'Sealing Specification (2RS Rubber Double Contact)', score: 99, weight: '30%', status: 'Exact' },
        { factor: 'Radial Clearance (C3 Clearance)', score: 100, weight: '30%', status: 'Exact' }
      ],
      tokenAlignment: [
        { raw: '6308 2RS / 6308-2RS1 / 6308 2RS', normalized: 'MODEL 6308-2RS', matchType: 'Standard ISO Code' },
        { raw: 'C3 / C3 CLEARANCE', normalized: 'CLEARANCE C3', matchType: 'Standard' },
        { raw: 'DIMS 40X90X23 MM', normalized: 'BORE 40 MM, OD 90 MM, WIDTH 23 MM', matchType: 'Verified Dimension' }
      ]
    }
  },
  {
    clusterId: 'CLUS-GSK-007',
    clusterName: 'Spiral Wound Gasket 3" Class 300 SS316 Graphite Filler',
    category: 'Seals & Gaskets',
    unspsc: '31401601',
    harmonizedCode: 'CPSE-GSK-SPW-316-080300',
    standardizedDescription: 'GASKET, SPIRAL WOUND, ASME B16.20, SIZE 3 INCH (80 NB), CLASS 300, WINDING SS316 WITH FLEXIBLE GRAPHITE FILLER, CS OUTER CENTERING RING',
    standardUOM: 'NOS',
    confidenceScore: 88.5,
    status: 'Pending Review',
    approvedBy: null,
    approvedDate: null,
    reviewNotes: 'Flagged for Human Steward: IOCL legacy record specifies SS316 Inner Ring, whereas ONGC and GAIL do not mention Inner Ring. Steward must decide if inner ring is mandatory for unified specification.',
    annualQuantityConsolidated: 16500,
    annualSpendConsolidated: 21689000,
    estimatedSavingsPercent: 15.0,
    estimatedSavingsValue: 3253350,
    participatingCPSEs: ['ONGC', 'IOCL', 'GAIL'],
    memberLegacyCodes: [
      { cpse: 'ONGC', code: 'ONGC-GSK-3001', desc: 'SPIRAL WOUND GASKET 3 INCH 300# SS316 GRAPHITE ASME B16.20', uom: 'NOS', price: 1250 },
      { cpse: 'IOCL', code: 'IOCL-MN-9921', desc: 'SP WOUND GASKET 80 NB CL-300 WITH SS316 INNER RING & FG FILLER', uom: 'EA', price: 1390 },
      { cpse: 'GAIL', code: 'GAIL-GS-104', desc: '3" METALLIC GASKET CLASS 300 ASME B16.20 316L/GRAPHITE', uom: 'NOS', price: 1310 }
    ],
    aiExplainability: {
      summary: 'High semantic similarity (88.5%). Minor attribute discrepancy detected: IOCL explicitly requires SS316 Inner Ring (Type CGI), while ONGC and GAIL records lack inner ring specification.',
      confidenceBreakdown: [
        { factor: 'Dimensional & Rating Match (3" / Class 300)', score: 100, weight: '35%', status: 'Exact' },
        { factor: 'Winding & Filler Metallurgy (SS316 / Flexible Graphite)', score: 95, weight: '35%', status: 'Compatible' },
        { factor: 'Inner Retaining Ring Requirement', score: 70, weight: '30%', status: 'Discrepancy (Requires Review)' }
      ],
      tokenAlignment: [
        { raw: '3 INCH / 80 NB / 3"', normalized: 'SIZE 3 INCH (80 NB)', matchType: 'Harmonized' },
        { raw: '300# / CL-300 / CLASS 300', normalized: 'CLASS 300', matchType: 'Exact' },
        { raw: 'WITH SS316 INNER RING vs [Not Specified]', normalized: 'INNER RING REQ PENDING REVIEW', matchType: 'Spec Variance' }
      ]
    }
  },
  {
    clusterId: 'CLUS-ELE-008',
    clusterName: '3-Phase Induction Motor 45 kW 4-Pole 415V Foot-Mounted',
    category: 'Electrical & Instrumentation',
    unspsc: '26101108',
    harmonizedCode: 'CPSE-ELE-MOT-45K-4P415',
    standardizedDescription: 'MOTOR, ELECTRIC, THREE-PHASE INDUCTION, SQUIRREL CAGE, RATING 45 KW (60 HP), 4 POLE, 1480 RPM, 415V 50HZ, FRAME 225M, FOOT MOUNTED (B3), EFFICIENCY CLASS IE3, IS/IEC 60034',
    standardUOM: 'NOS',
    confidenceScore: 84.2,
    status: 'Pending Review',
    approvedBy: null,
    approvedDate: null,
    reviewNotes: 'Flagged for Human Steward: BHEL specifies Premium Efficiency IE3, whereas SAIL legacy record references older IS 325 standard (IE1/IE2). Recommended to standardize on IE3 under National Energy Conservation Code.',
    annualQuantityConsolidated: 290,
    annualSpendConsolidated: 78665000,
    estimatedSavingsPercent: 17.5,
    estimatedSavingsValue: 13766375,
    participatingCPSEs: ['BHEL', 'NTPC', 'SAIL'],
    memberLegacyCodes: [
      { cpse: 'BHEL', code: 'BHEL-MOT-4501', desc: '3 PH SQUIRREL CAGE INDUCTION MOTOR 45KW 4 POLE FOOT MTG IE3 EFFICIENCY 415V', uom: 'NOS', price: 285000 },
      { cpse: 'NTPC', code: 'NTPC-EM-2290', desc: '45 KW 4 POLE TEFC INDUCTION MOTOR 415V 50HZ FRAME 225M B3', uom: 'NOS', price: 260000 },
      { cpse: 'SAIL', code: 'SAIL-BSL-6612', desc: 'LT INDUCTION MOTOR 45 KW 1480 RPM 415 VOLT 50 HZ FOOT MOUNTED', uom: 'NOS', price: 272000 }
    ],
    aiExplainability: {
      summary: '45 kW 4-Pole 415V motor in Frame 225M B3 foot mounting. Core electrical parameters identical; energy efficiency level variance detected across legacy master files.',
      confidenceBreakdown: [
        { factor: 'Rating & Speed (45 kW / 1480 RPM / 4 Pole)', score: 100, weight: '35%', status: 'Exact' },
        { factor: 'Frame & Mounting (Frame 225M, B3 Foot)', score: 95, weight: '25%', status: 'Exact' },
        { factor: 'Voltage & Frequency (415V 50Hz 3-Phase)', score: 100, weight: '20%', status: 'Exact' },
        { factor: 'Efficiency Class (IE3 vs Unspecified)', score: 62, weight: '20%', status: 'Policy Upgrade Required' }
      ],
      tokenAlignment: [
        { raw: '3 PH SQUIRREL CAGE / INDUCTION MOTOR / LT INDUCTION', normalized: 'MOTOR, ELECTRIC 3-PH INDUCTION', matchType: 'Harmonized' },
        { raw: '45KW 4 POLE / 45 KW 1480 RPM', normalized: '45 KW, 4 POLE (1480 RPM)', matchType: 'Exact Match' },
        { raw: 'IE3 EFFICIENCY vs [Omitted]', normalized: 'EFFICIENCY CLASS IE3 RECOMMENDED', matchType: 'Standard Upgrade' }
      ]
    }
  },
  {
    clusterId: 'CLUS-HSE-012',
    clusterName: 'Hydraulic Hose 1/2" 2-Wire (Industrial vs Aerospace Certification)',
    category: 'Hoses & Fittings',
    unspsc: '40142009',
    harmonizedCode: 'CPSE-HSE-HYD-2WB-012000',
    standardizedDescription: 'HOSE, HYDRAULIC, HIGH PRESSURE, 2-WIRE BRAIDED SYNTHETIC RUBBER, NOMINAL BORE 1/2 INCH (DN 12), WORKING PRESSURE 275 BAR (4000 PSI), EN 853 2SN / SAE 100R2AT',
    standardUOM: 'MTR',
    confidenceScore: 69.3,
    status: 'Rejected',
    approvedBy: 'Sh. M. K. Narayanan (Defense Master Data Auditor)',
    approvedDate: '2026-09-26 15:10:00',
    reviewNotes: 'Rejected Harmonization: HAL item is certified for military aerospace ground equipment under MIL-DTL-83797 with flame retardancy. Cannot be unified with standard industrial workshop hose from BHEL. Kept as distinct master items.',
    annualQuantityConsolidated: 6600,
    annualSpendConsolidated: 9108000,
    estimatedSavingsPercent: 0,
    estimatedSavingsValue: 0,
    participatingCPSEs: ['BHEL', 'HAL'],
    memberLegacyCodes: [
      { cpse: 'BHEL', code: 'BHEL-HSE-0012', desc: 'HYDRAULIC HOSE 1/2 INCH 2 WIRE BRAIDED WP 275 BAR EN 853 2SN', uom: 'MTR', price: 620 },
      { cpse: 'HAL', code: 'HAL-AERO-HSE-90', desc: 'AIRCRAFT HYDRAULIC HOSE FLAME RETARDANT 1/2" MIL-DTL-83797 3000 PSI AERO CERT', uom: 'MTR', price: 4800 }
    ],
    aiExplainability: {
      summary: 'AI flagged critical standard conflict. While geometry (1/2" ID) is similar, defense aviation standard MIL-DTL-83797 with flame resistance is non-substitutable with general industrial EN 853.',
      confidenceBreakdown: [
        { factor: 'Dimensional Equivalence (1/2" Nominal Bore)', score: 98, weight: '30%', status: 'Matched' },
        { factor: 'Working Pressure (275 Bar vs 210 Bar / 3000 PSI)', score: 82, weight: '20%', status: 'Variance' },
        { factor: 'Certification Standards (EN 853 Industrial vs MIL-DTL Aerospace)', score: 32, weight: '50%', status: 'Critical Non-Compliance' }
      ],
      tokenAlignment: [
        { raw: 'HYDRAULIC HOSE 1/2 INCH', normalized: 'HOSE, HYDRAULIC 1/2 INCH', matchType: 'Geometry Match' },
        { raw: 'EN 853 2SN vs MIL-DTL-83797 AERO CERT', normalized: 'INCOMPATIBLE CERTIFICATIONS', matchType: 'Conflict' }
      ]
    }
  }
];

export const CROSSWALK_DATA = [
  { legacyCode: 'BHEL-PBN-094821', cpse: 'BHEL', harmonizedCode: 'CPSE-FST-BLT-304-M16065', category: 'Fasteners & Hardware', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP ECC)', lastSync: '2026-09-28 08:30:15' },
  { legacyCode: 'NTPC-ST-88401', cpse: 'NTPC', harmonizedCode: 'CPSE-FST-BLT-304-M16065', category: 'Fasteners & Hardware', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-28 09:12:44' },
  { legacyCode: 'ONGC-OFF-1092', cpse: 'ONGC', harmonizedCode: 'CPSE-FST-BLT-304-M16065', category: 'Fasteners & Hardware', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-28 09:45:00' },
  { legacyCode: 'IOCL-M-440291', cpse: 'IOCL', harmonizedCode: 'CPSE-FST-BLT-304-M16065', category: 'Fasteners & Hardware', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-28 10:02:11' },
  { legacyCode: 'SAIL-BSP-7721', cpse: 'SAIL', harmonizedCode: 'CPSE-FST-BLT-304-M16065', category: 'Fasteners & Hardware', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (Oracle EBS)', lastSync: '2026-09-28 10:20:19' },

  { legacyCode: 'BHEL-PMP-4401', cpse: 'BHEL', harmonizedCode: 'CPSE-PMP-IMP-HCR-150125', category: 'Pumps & Rotating Equipment', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP ECC)', lastSync: '2026-09-27 14:15:20' },
  { legacyCode: 'NTPC-GEN-3004', cpse: 'NTPC', harmonizedCode: 'CPSE-PMP-IMP-HCR-150125', category: 'Pumps & Rotating Equipment', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-27 14:40:55' },
  { legacyCode: 'SAIL-RSP-9902', cpse: 'SAIL', harmonizedCode: 'CPSE-PMP-IMP-HCR-150125', category: 'Pumps & Rotating Equipment', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (Oracle EBS)', lastSync: '2026-09-27 15:02:10' },

  { legacyCode: 'ONGC-VAL-551', cpse: 'ONGC', harmonizedCode: 'CPSE-VLV-BAL-WCB-050300', category: 'Valves & Actuators', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-26 11:10:02' },
  { legacyCode: 'IOCL-REF-7128', cpse: 'IOCL', harmonizedCode: 'CPSE-VLV-BAL-WCB-050300', category: 'Valves & Actuators', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-26 11:35:12' },
  { legacyCode: 'GAIL-GA-3321', cpse: 'GAIL', harmonizedCode: 'CPSE-VLV-BAL-WCB-050300', category: 'Valves & Actuators', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-26 12:01:40' },

  { legacyCode: 'IOCL-PIP-1002', cpse: 'IOCL', harmonizedCode: 'CPSE-PIP-SML-CSB-100040', category: 'Piping & Tubing', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-25 16:20:00' },
  { legacyCode: 'GAIL-PL-9021', cpse: 'GAIL', harmonizedCode: 'CPSE-PIP-SML-CSB-100040', category: 'Piping & Tubing', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-25 16:50:33' },
  { legacyCode: 'ONGC-DRL-4819', cpse: 'ONGC', harmonizedCode: 'CPSE-PIP-SML-CSB-100040', category: 'Piping & Tubing', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-25 17:15:10' },

  { legacyCode: 'BHEL-BRG-6308', cpse: 'BHEL', harmonizedCode: 'CPSE-BRG-DGB-040090', category: 'Bearings & Transmission', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP ECC)', lastSync: '2026-09-25 11:00:15' },
  { legacyCode: 'SAIL-DSP-4011', cpse: 'SAIL', harmonizedCode: 'CPSE-BRG-DGB-040090', category: 'Bearings & Transmission', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (Oracle EBS)', lastSync: '2026-09-25 11:22:40' },
  { legacyCode: 'NTPC-EL-8812', cpse: 'NTPC', harmonizedCode: 'CPSE-BRG-DGB-040090', category: 'Bearings & Transmission', status: 'Mapped & Active', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-25 11:45:00' },

  { legacyCode: 'ONGC-GSK-3001', cpse: 'ONGC', harmonizedCode: 'CPSE-GSK-SPW-316-080300', category: 'Seals & Gaskets', status: 'Pending Review Approval', erpSyncStatus: 'Pending Master Publish', lastSync: '-' },
  { legacyCode: 'IOCL-MN-9921', cpse: 'IOCL', harmonizedCode: 'CPSE-GSK-SPW-316-080300', category: 'Seals & Gaskets', status: 'Pending Review Approval', erpSyncStatus: 'Pending Master Publish', lastSync: '-' },
  { legacyCode: 'GAIL-GS-104', cpse: 'GAIL', harmonizedCode: 'CPSE-GSK-SPW-316-080300', category: 'Seals & Gaskets', status: 'Pending Review Approval', erpSyncStatus: 'Pending Master Publish', lastSync: '-' },

  { legacyCode: 'HAL-AERO-TI64-01', cpse: 'HAL', harmonizedCode: 'CPSE-AER-SHT-TI6-002500', category: 'Aerospace & Defense Components', status: 'Unique Master Record', erpSyncStatus: 'Synchronized (Baan ERP)', lastSync: '2026-09-20 10:14:00' },
  { legacyCode: 'ONGC-DRL-COL-89', cpse: 'ONGC', harmonizedCode: 'CPSE-DRL-COL-NMG-065000', category: 'Piping & Tubing', status: 'Unique Master Record', erpSyncStatus: 'Synchronized (SAP S/4HANA)', lastSync: '2026-09-20 10:18:22' }
];

export const AUDIT_TRAIL_LOG = [
  {
    id: 'AUD-9941',
    timestamp: '2026-10-02 11:35:10',
    actor: 'Dr. R. K. Verma',
    role: 'Chief Master Data Steward (DPE)',
    cpse: 'Multi-CPSE',
    action: 'HARMONIZATION_APPROVAL',
    targetCode: 'CPSE-FST-BLT-304-M16065',
    details: 'Approved harmonization of 5 legacy records into unified standard code. Confidence score 98.4%. Standard UOM set to NOS.',
    hash: 'SHA256:8b4a2c1f...e993'
  },
  {
    id: 'AUD-9940',
    timestamp: '2026-10-01 16:42:18',
    actor: 'AI Master Data Engine',
    role: 'Automated AI Pipeline v4.2',
    cpse: 'NTPC, BHEL, SAIL',
    action: 'CLUSTER_GENERATED',
    targetCode: 'CLUS-ELE-008',
    details: 'Identified 3-member cluster for 45 kW Induction Motor with 84.2% semantic similarity. Flagged efficiency class discrepancy for steward review.',
    hash: 'SHA256:7c91a0ef...41d2'
  },
  {
    id: 'AUD-9939',
    timestamp: '2026-10-01 14:10:05',
    actor: 'Sh. M. K. Narayanan',
    role: 'Master Data Auditor (HAL/DPE)',
    cpse: 'HAL, BHEL',
    action: 'REJECTION_SUBMITTED',
    targetCode: 'CLUS-HSE-012',
    details: 'Rejected merger of HAL-AERO-HSE-90 with BHEL-HSE-0012 due to safety-critical aerospace certification divergence (MIL-DTL-83797).',
    hash: 'SHA256:3d1e44bc...987a'
  },
  {
    id: 'AUD-9938',
    timestamp: '2026-09-30 09:20:45',
    actor: 'Sh. Anoop Sundaram',
    role: 'Joint Director (Technical Procurement)',
    cpse: 'ONGC, IOCL, GAIL',
    action: 'HARMONIZATION_APPROVAL',
    targetCode: 'CPSE-VLV-BAL-WCB-050300',
    details: 'Approved Ball Valve 2" Class 300 harmonization. Enabled bulk tender aggregation across 3 Oil & Gas CPSEs.',
    hash: 'SHA256:1a8f9021...aa34'
  },
  {
    id: 'AUD-9937',
    timestamp: '2026-09-29 17:15:30',
    actor: 'AI Ingestion Pipeline',
    role: 'Data Normalizer Engine',
    cpse: 'IOCL',
    action: 'BATCH_INGESTION',
    targetCode: 'BATCH-IOCL-2026-09',
    details: 'Successfully ingested and normalized 3,450 material master records from IOCL Panipat & Paradip SAP S/4HANA instances.',
    hash: 'SHA256:f410bb01...56cc'
  },
  {
    id: 'AUD-9936',
    timestamp: '2026-09-29 11:05:12',
    actor: 'System Admin',
    role: 'Platform Administrator',
    cpse: 'Government e-Marketplace (GeM)',
    action: 'API_CONNECTOR_SYNC',
    targetCode: 'CONN-GEM-CPSE-01',
    details: 'Refreshed GeM National Material Code catalog synchronization schema. 4,820 harmonized CPSE codes published to GeM Master Data Repository.',
    hash: 'SHA256:4421cc89...99bb'
  }
];

export const ANALYTICS_DATA = {
  kpis: {
    totalRecordsIngested: 148250,
    normalizedRecords: 142100,
    duplicatePairsDetected: 19420,
    harmonizationRatePercent: 78.4,
    estimatedProcurementSavingsCr: 284.50,
    dataQualityIndexBefore: 51.2,
    dataQualityIndexAfter: 94.8,
    activeCPSEsCount: 7
  },
  categoryDistribution: [
    { category: 'Piping & Tubing', count: 34200, duplicateCount: 5800, savingsCr: 88.4, color: '#1e3a8a' },
    { category: 'Fasteners & Hardware', count: 28400, duplicateCount: 4900, savingsCr: 42.1, color: '#2563eb' },
    { category: 'Valves & Actuators', count: 22100, duplicateCount: 3200, savingsCr: 64.8, color: '#3b82f6' },
    { category: 'Electrical & Instrumentation', count: 19800, duplicateCount: 2100, savingsCr: 36.2, color: '#60a5fa' },
    { category: 'Bearings & Transmission', count: 16500, duplicateCount: 1950, savingsCr: 24.5, color: '#93c5fd' },
    { category: 'Pumps & Rotating Equipment', count: 14200, duplicateCount: 1100, savingsCr: 18.5, color: '#bfdbfe' },
    { category: 'Others (Metals, Lubricants, Seals)', count: 13050, duplicateCount: 370, savingsCr: 10.0, color: '#cbd5e1' }
  ],
  cpseHarmonizationStats: [
    { cpse: 'BHEL', totalIngested: 32410, harmonized: 25900, pending: 4100, unique: 2410, duplicateRate: '15.1%', savingsEstCr: 62.4 },
    { cpse: 'NTPC', totalIngested: 28940, harmonized: 23150, pending: 3800, unique: 1990, duplicateRate: '14.2%', savingsEstCr: 54.8 },
    { cpse: 'IOCL', totalIngested: 31200, harmonized: 24960, pending: 4200, unique: 2040, duplicateRate: '12.4%', savingsEstCr: 51.2 },
    { cpse: 'ONGC', totalIngested: 26800, harmonized: 20630, pending: 3900, unique: 2270, duplicateRate: '12.0%', savingsEstCr: 48.9 },
    { cpse: 'SAIL', totalIngested: 22800, harmonized: 17780, pending: 3200, unique: 1820, duplicateRate: '13.8%', savingsEstCr: 34.1 },
    { cpse: 'GAIL', totalIngested: 14500, harmonized: 11600, pending: 1800, unique: 1100, duplicateRate: '11.9%', savingsEstCr: 26.5 },
    { cpse: 'HAL', totalIngested: 11600, harmonized: 2800, pending: 950, unique: 7850, duplicateRate: '3.9%', savingsEstCr: 6.6 }
  ],
  dataQualityDimensions: [
    { dimension: 'Completeness of Technical Attributes', before: 42.0, after: 96.5, note: 'AI extracted missing attributes from legacy long texts' },
    { dimension: 'Standardization of Units of Measure (UOM)', before: 54.2, after: 99.1, note: 'Unified NOS, EA, SET, PCS, NO into standardized ISO UOM' },
    { dimension: 'Description Syntax Conformity (Noun-Modifier)', before: 31.8, after: 94.2, note: 'Enforced structured taxonomy: [Noun], [Modifier], [Material], [Size], [Spec]' },
    { dimension: 'Cross-Standard Reference Mapping (IS/ASTM/DIN/ISO)', before: 48.6, after: 91.8, note: 'Inter-standard equivalence matrix applied' },
    { dimension: 'Duplication Index (Uncontrolled Redundancy)', before: 28.5, after: 4.2, note: 'Reduced uncontrolled cross-plant and cross-CPSE duplicates by 85%' }
  ]
};

export const MASTER_RECORDS = [
  {
    materialCode: 'BHEL-MAT-10283',
    cpse: 'BHEL',
    materialDescription: 'Hexagonal Head Bolt M10 x 50 mm',
    normalizedDescription: 'Hex Bolt M10 × 50 mm',
    category: 'Fasteners',
    uom: 'EA',
    specification: 'Grade 8.8',
    harmonizedCode: 'HMF-FAST-00128',
    similarity: 96,
    status: 'Harmonized',
    lastUpdated: '2026-09-28',
    manufacturer: 'TVS Fasteners / Sundram Fasteners',
    partNumber: 'TVS-M10-50-88-IS1364',
    technicalSpecification: 'High tensile metric hex head bolt, Grade 8.8 medium carbon steel quenched & tempered, coarse pitch 1.5mm, IS 1364 Part 1 / ISO 4014.',
    aiNormalization: {
      cleanedDescription: 'Hex Bolt M10 × 50 mm, Grade 8.8',
      extractedAttributes: { Noun: 'Bolt', Modifier: 'Hexagonal Head', Thread: 'M10 (Pitch 1.5)', Length: '50 mm', Grade: '8.8 High Tensile', Standard: 'IS 1364 / ISO 4014' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Hexagonal Head Bolt → Hex Bolt; 10 x 50 mm → M10 × 50 mm'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-FAST-00128',
      similarityScore: 96,
      confidence: 'High (96.4%)',
      matchingRecords: [
        { code: 'NTPC-M-83921', cpse: 'NTPC', desc: 'Bolt Hex Head 10mm X 50', similarity: 94 },
        { code: 'IOCL-FST-9912', cpse: 'IOCL', desc: 'Hex Bolt M10x50 Gr 8.8 with Nut', similarity: 91 }
      ],
      explanation: 'Matched because the records share the same material category (Fasteners), thread diameter (M10), length (50 mm), material grade (Class 8.8), and functional head geometry. Minor differences were detected in naming convention and word order.'
    }
  },
  {
    materialCode: 'NTPC-M-83921',
    cpse: 'NTPC',
    materialDescription: 'Bolt Hex Head 10mm X 50',
    normalizedDescription: 'Hex Bolt M10 × 50 mm',
    category: 'Fasteners',
    uom: 'EA',
    specification: 'Grade 8.8',
    harmonizedCode: 'HMF-FAST-00128',
    similarity: 94,
    status: 'Harmonized',
    lastUpdated: '2026-09-29',
    manufacturer: 'Unbrako India',
    partNumber: 'UNB-HEX-1050-88',
    technicalSpecification: 'Metric hex head cap screw, Class 8.8 alloy steel, nominal diameter 10mm, length 50mm, zinc clear passivated, ISO 4017.',
    aiNormalization: {
      cleanedDescription: 'Hex Bolt M10 × 50 mm, Grade 8.8',
      extractedAttributes: { Noun: 'Bolt', Modifier: 'Hex Head', Thread: 'M10', Length: '50 mm', Grade: 'Class 8.8', Standard: 'ISO 4017' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Bolt Hex Head → Hex Bolt; 10mm X 50 → M10 × 50 mm'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-FAST-00128',
      similarityScore: 94,
      confidence: 'High (94.2%)',
      matchingRecords: [
        { code: 'BHEL-MAT-10283', cpse: 'BHEL', desc: 'Hexagonal Head Bolt M10 x 50 mm', similarity: 96 }
      ],
      explanation: 'Matched because the records share the same material category, dimensions, grade and functional description. Minor differences were detected in naming convention and word order.'
    }
  },
  {
    materialCode: 'ONGC-VAL-8821',
    cpse: 'ONGC',
    materialDescription: 'Gate Valve 100 NB CS',
    normalizedDescription: 'Gate Valve DN100 Carbon Steel',
    category: 'Valves',
    uom: 'EA',
    specification: 'Carbon Steel (ASTM A216 WCB)',
    harmonizedCode: 'HMF-VAL-00082',
    similarity: 91,
    status: 'Review Required',
    lastUpdated: '2026-10-01',
    manufacturer: 'L&T Valves Limited',
    partNumber: 'LNT-100-GV-150-WCB',
    technicalSpecification: 'Bolted bonnet outside screw and yoke (OS&Y) gate valve, size 100 NB (4"), rating Class 150, flanged RF ASME B16.5, body ASTM A216 WCB, Trim 8.',
    aiNormalization: {
      cleanedDescription: 'Gate Valve DN100 Carbon Steel, Class 150',
      extractedAttributes: { Noun: 'Gate Valve', Size: '100 NB (DN100 / 4")', Material: 'Carbon Steel ASTM A216 WCB', Rating: 'Class 150', Trim: 'API Trim 8', Standard: 'API 600' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: '100 NB → DN100 (4"); CS → Carbon Steel (ASTM A216 WCB)'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-VAL-00082',
      similarityScore: 91,
      confidence: 'Medium (91.0%)',
      matchingRecords: [
        { code: 'IOCL-VAL-3091', cpse: 'IOCL', desc: 'Valve Gate 4 Inch CS 150# Flanged', similarity: 95 },
        { code: 'GAIL-VLV-1102', cpse: 'GAIL', desc: '4" Bolted Bonnet Gate Valve A216 WCB', similarity: 92 }
      ],
      explanation: 'High semantic match with IOCL and GAIL hydrocarbon process valves. Flagged for review due to trim material specification variance (Trim 8 vs Trim 5 stellite) between offshore and pipeline specs.'
    }
  },
  {
    materialCode: 'IOCL-VAL-3091',
    cpse: 'IOCL',
    materialDescription: 'Valve Gate 4 Inch CS 150# Flanged',
    normalizedDescription: 'Gate Valve DN100 Carbon Steel',
    category: 'Valves',
    uom: 'EA',
    specification: 'ASTM A216 Gr. WCB',
    harmonizedCode: 'HMF-VAL-00082',
    similarity: 95,
    status: 'Harmonized',
    lastUpdated: '2026-09-27',
    manufacturer: 'BDK Valves / Circor',
    partNumber: 'BDK-GV-04-150-RF',
    technicalSpecification: 'Gate valve API 600 bolted bonnet, size 4" (DN100), Class 150, raised face flanged, body cast steel WCB, flexible wedge, handwheel operated.',
    aiNormalization: {
      cleanedDescription: 'Gate Valve DN100 Carbon Steel, Class 150',
      extractedAttributes: { Noun: 'Gate Valve', Size: '4 Inch (DN100)', Rating: '150# RF', Material: 'ASTM A216 WCB', Ends: 'Flanged RF', Standard: 'API 600 / ASME B16.34' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Valve Gate 4 Inch → Gate Valve DN100; 150# → Class 150'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-VAL-00082',
      similarityScore: 95,
      confidence: 'High (95.5%)',
      matchingRecords: [
        { code: 'ONGC-VAL-8821', cpse: 'ONGC', desc: 'Gate Valve 100 NB CS', similarity: 91 },
        { code: 'GAIL-VLV-1102', cpse: 'GAIL', desc: '4" Bolted Bonnet Gate Valve A216 WCB', similarity: 92 }
      ],
      explanation: 'Matched because 4 Inch equals 100 NB (DN100), 150# equals Class 150, and CS matches ASTM A216 WCB. Exact dimensional and pressure envelope equivalence.'
    }
  },
  {
    materialCode: 'GAIL-PIP-4491',
    cpse: 'GAIL',
    materialDescription: 'Seamless Pipe 4" Sch 40 A106 Gr B',
    normalizedDescription: 'CS Seamless Pipe 4" Sch 40',
    category: 'Piping',
    uom: 'MTR',
    specification: 'ASTM A106 Grade B',
    harmonizedCode: 'HMF-PIPE-00214',
    similarity: 98,
    status: 'Harmonized',
    lastUpdated: '2026-09-25',
    manufacturer: 'Jindal SAW / Maharashtra Seamless',
    partNumber: 'JSAW-SMLS-100-SCH40',
    technicalSpecification: 'Carbon steel seamless line pipe, nominal pipe size 4" (100 NB), wall thickness Schedule 40 (6.02 mm), material ASTM A106 Grade B, beveled ends.',
    aiNormalization: {
      cleanedDescription: 'CS Seamless Pipe 4" Sch 40, ASTM A106 Gr B',
      extractedAttributes: { Noun: 'Pipe', Form: 'Seamless', Size: '4 Inch (100 NB)', Schedule: 'Sch 40', Material: 'ASTM A106 Gr B', Ends: 'Beveled' },
      standardizedUom: 'MTR (Linear Meters)',
      standardizedTerminology: 'Seamless Pipe 4" → CS Seamless Pipe 4"; Sch 40 → Schedule 40'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-PIPE-00214',
      similarityScore: 98,
      confidence: 'High (98.6%)',
      matchingRecords: [
        { code: 'ONGC-DRL-4819', cpse: 'ONGC', desc: 'Carbon Steel Pipe Seamless 4" Nominal Sch 40 Beveled', similarity: 97 },
        { code: 'IOCL-PIP-1002', cpse: 'IOCL', desc: 'Pipe CS SMLS 100 NB Sch 40 ASTM A106 Gr B', similarity: 99 }
      ],
      explanation: 'Matched because the records share identical steel metallurgy (ASTM A106 Gr B), size (4 Inch / 100 NB), wall schedule (Schedule 40), and seamless manufacturing process.'
    }
  },
  {
    materialCode: 'BHEL-BRG-6308',
    cpse: 'BHEL',
    materialDescription: 'Deep Groove Ball Bearing 6308 2RS C3',
    normalizedDescription: 'Deep Groove Ball Bearing 6308-2RS C3',
    category: 'Bearings',
    uom: 'EA',
    specification: 'ISO 15 / C3 Clearance',
    harmonizedCode: 'HMF-BEAR-00045',
    similarity: 99,
    status: 'Harmonized',
    lastUpdated: '2026-09-24',
    manufacturer: 'SKF India / FAG Schaeffler',
    partNumber: 'SKF-6308-2RS1-C3',
    technicalSpecification: 'Single row deep groove ball bearing with contact rubber seals on both sides (2RS), radial internal clearance C3, bore 40 mm, outer diameter 90 mm, width 23 mm.',
    aiNormalization: {
      cleanedDescription: 'Deep Groove Ball Bearing 6308-2RS C3',
      extractedAttributes: { Noun: 'Bearing', Type: 'Deep Groove Ball', Model: '6308', Sealing: '2RS (Double Rubber)', Clearance: 'C3', Bore: '40 mm', OD: '90 mm', Width: '23 mm' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Deep Groove Ball Bearing 6308 2RS C3 → Bearing, Ball, Deep Groove 6308-2RS C3'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-BEAR-00045',
      similarityScore: 99,
      confidence: 'High (99.6%)',
      matchingRecords: [
        { code: 'SAIL-DSP-4011', cpse: 'SAIL', desc: 'Bearing Ball 6308-2RS1/C3 Dims 40x90x23 mm', similarity: 98 },
        { code: 'NTPC-EL-8812', cpse: 'NTPC', desc: 'Radial Ball Bearing Rubber Sealed Both Sides 6308 2RS C3', similarity: 97 }
      ],
      explanation: 'Matched because ISO 6308 designates exact 40x90x23mm envelope. 2RS indicates dual rubber contact seals and C3 specifies standard thermal radial clearance across power and steel plant inventories.'
    }
  },
  {
    materialCode: 'ONGC-GSK-3001',
    cpse: 'ONGC',
    materialDescription: 'Spiral Wound Gasket 3 Inch 300# SS316 Graphite',
    normalizedDescription: 'Spiral Wound Gasket 3" Class 300 SS316',
    category: 'Gaskets',
    uom: 'EA',
    specification: 'ASME B16.20 / SS316 Graphite',
    harmonizedCode: 'HMF-SEAL-00319',
    similarity: 88,
    status: 'Review Required',
    lastUpdated: '2026-10-02',
    manufacturer: 'Flexitallic / Goodrich Gaskets',
    partNumber: 'FLX-SWG-3-300-316-FG',
    technicalSpecification: 'Spiral wound metallic gasket for ASME B16.5 flanges, nominal pipe size 3" (80 NB), pressure Class 300, SS316 winding with flexible graphite filler, carbon steel outer centering ring.',
    aiNormalization: {
      cleanedDescription: 'Spiral Wound Gasket 3" Class 300 SS316 Graphite',
      extractedAttributes: { Noun: 'Gasket', Form: 'Spiral Wound', Size: '3 Inch (80 NB)', Rating: 'Class 300', Winding: 'SS316', Filler: 'Flexible Graphite', Standard: 'ASME B16.20' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Spiral Wound Gasket 3 Inch 300# → Gasket, Spiral Wound 3" Class 300'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-SEAL-00319',
      similarityScore: 88,
      confidence: 'Medium (88.5%)',
      matchingRecords: [
        { code: 'IOCL-MN-9921', cpse: 'IOCL', desc: 'SP Wound Gasket 80 NB CL-300 with SS316 Inner Ring', similarity: 89 },
        { code: 'GAIL-GS-104', cpse: 'GAIL', desc: '3" Metallic Gasket Class 300 316L/Graphite', similarity: 87 }
      ],
      explanation: 'Matched because dimensions (3" / 80 NB) and pressure rating (Class 300) align. Flagged for review because IOCL specifies an SS316 inner retaining ring (Type CGI) whereas ONGC record omits inner ring requirement.'
    }
  },
  {
    materialCode: 'BHEL-MOT-4501',
    cpse: 'BHEL',
    materialDescription: '3 PH Squirrel Cage Induction Motor 45kW 4 Pole Foot MTG IE3',
    normalizedDescription: '3-Phase Induction Motor 45 kW 4-Pole',
    category: 'Electrical',
    uom: 'EA',
    specification: 'IS/IEC 60034 IE3 Efficiency',
    harmonizedCode: 'HMF-ELEC-00502',
    similarity: 84,
    status: 'Review Required',
    lastUpdated: '2026-10-01',
    manufacturer: 'Bharat Bijlee / ABB India',
    partNumber: 'ABB-M3BP-225M-45KW',
    technicalSpecification: 'Low voltage 3-phase squirrel cage induction motor, 45 kW (60 HP), 4 pole, synchronous speed 1500 RPM, 415 V ±10%, 50 Hz, frame size 225M, foot mounting B3, efficiency class IE3 premium.',
    aiNormalization: {
      cleanedDescription: '3-Phase Induction Motor 45 kW 4-Pole 415V IE3',
      extractedAttributes: { Noun: 'Motor', Type: '3-Phase Squirrel Cage Induction', Power: '45 kW (60 HP)', Poles: '4 Pole (1480 RPM)', Frame: '225M', Mounting: 'B3 Foot Mounted', Voltage: '415V 50Hz', Efficiency: 'IE3 Premium' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: '3 PH Squirrel Cage → 3-Phase Induction; Foot MTG → Foot Mounted (B3)'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-ELEC-00502',
      similarityScore: 84,
      confidence: 'Medium (84.2%)',
      matchingRecords: [
        { code: 'NTPC-EM-2290', cpse: 'NTPC', desc: '45 KW 4 Pole TEFC Induction Motor 415V Frame 225M', similarity: 86 },
        { code: 'SAIL-BSL-6612', cpse: 'SAIL', desc: 'LT Induction Motor 45 KW 1480 RPM 415V Foot Mounted', similarity: 82 }
      ],
      explanation: 'Matched electrical rating (45 kW, 4-Pole, 415V, Frame 225M). Flagged for review because SAIL legacy record does not mandate IE3 efficiency (older IS 325 standard), while BHEL and NTPC require IE3 compliance.'
    }
  },
  {
    materialCode: 'HAL-AERO-HSE-90',
    cpse: 'HAL',
    materialDescription: 'Aircraft Hydraulic Hose Flame Retardant 1/2" MIL-DTL-83797',
    normalizedDescription: 'Hydraulic Hose 1/2" Aero Spec',
    category: 'Hoses',
    uom: 'MTR',
    specification: 'MIL-DTL-83797 (Flame Retardant)',
    harmonizedCode: 'HMF-HOSE-00091',
    similarity: 69,
    status: 'Rejected',
    lastUpdated: '2026-09-26',
    manufacturer: 'Aeroquip / Eaton Aerospace',
    partNumber: 'AE-83797-08-FR',
    technicalSpecification: 'Flexible medium pressure Teflon/synthetic rubber hydraulic hose assembly with fire sleeve, 1/2" nominal bore, operating pressure 3000 PSI, certified for military aviation ground support under MIL-DTL-83797.',
    aiNormalization: {
      cleanedDescription: 'Aircraft Hydraulic Hose 1/2" Flame Retardant MIL-DTL-83797',
      extractedAttributes: { Noun: 'Hose', Type: 'Aircraft Hydraulic', Size: '1/2 Inch (DN12)', Pressure: '3000 PSI', Cert: 'MIL-DTL-83797 Flame Retardant' },
      standardizedUom: 'MTR (Linear Meters)',
      standardizedTerminology: 'Aircraft Hydraulic Hose Flame Retardant → Hose, Hydraulic, Aviation Spec'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-HOSE-00091',
      similarityScore: 69,
      confidence: 'Low (69.3%)',
      matchingRecords: [
        { code: 'BHEL-HSE-0012', cpse: 'BHEL', desc: 'Hydraulic Hose 1/2 Inch 2 Wire Braided WP 275 Bar EN 853', similarity: 69 }
      ],
      explanation: 'Merger rejected by Master Data Steward. Although nominal bore (1/2") is identical, military aviation flame certification (MIL-DTL-83797) is strictly incompatible with industrial workshop grade EN 853 hose.'
    }
  },
  {
    materialCode: 'HAL-AERO-TI64-01',
    cpse: 'HAL',
    materialDescription: 'Titanium Alloy Sheet Grade 5 Ti-6Al-4V AMS 4911 2.5mm',
    normalizedDescription: 'Titanium Sheet Gr 5 Ti-6Al-4V 2.5mm',
    category: 'Metals & Alloys',
    uom: 'EA',
    specification: 'AMS 4911 / Grade 5 Ti-6Al-4V',
    harmonizedCode: 'HMF-AERO-00004',
    similarity: 100,
    status: 'Unmatched',
    lastUpdated: '2026-09-20',
    manufacturer: 'MIDHANI (Mishra Dhatu Nigam)',
    partNumber: 'MDN-TI64-AMS4911-25',
    technicalSpecification: 'High strength alpha-beta titanium alloy sheet, nominal thickness 2.50 mm, solution treated and aged, conforming to aerospace material specification AMS 4911 / ASTM B265 Grade 5 for airframe structure.',
    aiNormalization: {
      cleanedDescription: 'Titanium Sheet Grade 5 Ti-6Al-4V 2.5mm AMS 4911',
      extractedAttributes: { Noun: 'Sheet', Material: 'Titanium Ti-6Al-4V Grade 5', Thickness: '2.5 mm', Specification: 'AMS 4911', Standard: 'Aerospace Material Spec' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Titanium Alloy Sheet Grade 5 → Titanium Sheet Gr 5'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-AERO-00004',
      similarityScore: 100,
      confidence: 'Unique (No Duplicate Candidates)',
      matchingRecords: [],
      explanation: 'Classified as a unique specialized master item. Aerospace grade Ti-6Al-4V sheet AMS 4911 is maintained solely in HAL defense inventory with zero overlap across commercial CPSEs.'
    }
  },
  {
    materialCode: 'SAIL-PBN-1011',
    cpse: 'SAIL',
    materialDescription: 'Hex Bolt M10 x 50mm Cl 8.8 Black Finish',
    normalizedDescription: 'Hex Bolt M10 × 50 mm',
    category: 'Fasteners',
    uom: 'EA',
    specification: 'Grade 8.8',
    harmonizedCode: 'HMF-FAST-00128',
    similarity: 93,
    status: 'Harmonized',
    lastUpdated: '2026-09-27',
    manufacturer: 'Pooja Forge / Precision Fasteners',
    partNumber: 'PF-HEX-1050-88-BLK',
    technicalSpecification: 'High tensile hexagonal head screw, ISO 4017 / IS 1364, metric M10 coarse pitch, length 50 mm, property Class 8.8, black oxide chemical conversion coating.',
    aiNormalization: {
      cleanedDescription: 'Hex Bolt M10 × 50 mm, Grade 8.8',
      extractedAttributes: { Noun: 'Bolt', Modifier: 'Hex Head', Thread: 'M10', Length: '50 mm', Grade: 'Class 8.8', Coating: 'Black Oxide' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Cl 8.8 → Grade 8.8; Hex Bolt M10 x 50mm → Hex Bolt M10 × 50 mm'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-FAST-00128',
      similarityScore: 93,
      confidence: 'High (93.5%)',
      matchingRecords: [
        { code: 'BHEL-MAT-10283', cpse: 'BHEL', desc: 'Hexagonal Head Bolt M10 x 50 mm', similarity: 96 },
        { code: 'NTPC-M-83921', cpse: 'NTPC', desc: 'Bolt Hex Head 10mm X 50', similarity: 94 }
      ],
      explanation: 'Matched because the records share the same material category, dimensions, grade and functional description. Minor differences were detected in naming convention and surface finish specification.'
    }
  },
  {
    materialCode: 'IOCL-LUB-2041',
    cpse: 'IOCL',
    materialDescription: 'Industrial Gear Oil ISO VG 220 Servo Mesh SP 220',
    normalizedDescription: 'Industrial Gear Oil ISO VG 220',
    category: 'Lubricants',
    uom: 'LTR',
    specification: 'ISO VG 220 / DIN 51517-3 CLP',
    harmonizedCode: 'HMF-LUB-00015',
    similarity: 97,
    status: 'Harmonized',
    lastUpdated: '2026-09-29',
    manufacturer: 'Indian Oil Corporation Ltd (SERVO Division)',
    partNumber: 'SRV-MSH-SP220-B210',
    technicalSpecification: 'High performance extreme pressure industrial enclosed gear lubricant, kinematic viscosity 220 cSt @ 40°C, sulphur-phosphorus additive system conforming to DIN 51517 Part 3 (CLP) and AGMA 9005-E02.',
    aiNormalization: {
      cleanedDescription: 'Industrial Gear Oil ISO VG 220, DIN 51517-3 CLP',
      extractedAttributes: { Noun: 'Gear Oil', Type: 'Industrial Enclosed Gear', Viscosity: 'ISO VG 220 (220 cSt @ 40C)', Standard: 'DIN 51517 Part 3 CLP', Additive: 'Extreme Pressure (EP)' },
      standardizedUom: 'LTR (Liters)',
      standardizedTerminology: 'Servo Mesh SP 220 → ISO VG 220 Industrial Gear Oil'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-LUB-00015',
      similarityScore: 97,
      confidence: 'High (97.4%)',
      matchingRecords: [
        { code: 'BHEL-OIL-0022', cpse: 'BHEL', desc: 'Enclosed Gear Oil EP ISO VG 220 Viscosity 220 cSt', similarity: 98 },
        { code: 'SAIL-LUB-8810', cpse: 'SAIL', desc: 'Heavy Duty Gearbox Lubricant ISO VG 220 DIN 51517 CLP', similarity: 96 }
      ],
      explanation: 'Matched because viscosity grade (ISO VG 220) and technical performance specification (DIN 51517-3 CLP / AGMA EP) are identical across refinery, turbine and steel rolling mill records.'
    }
  },
  {
    materialCode: 'NTPC-PMP-5521',
    cpse: 'NTPC',
    materialDescription: 'Boiler Feed Pump Mechanical Seal Cartridge 65mm Plan 23',
    normalizedDescription: 'Mechanical Seal Cartridge 65mm Plan 23',
    category: 'Seals',
    uom: 'EA',
    specification: 'API 682 4th Ed / Carbon vs SiC',
    harmonizedCode: 'HMF-SEAL-00441',
    similarity: 89,
    status: 'Review Required',
    lastUpdated: '2026-09-30',
    manufacturer: 'John Crane / EagleBurgmann India',
    partNumber: 'JC-5610Q-65MM-P23',
    technicalSpecification: 'Cartridge single mechanical seal for boiler feedwater pump high-temperature service, shaft size 65 mm, piping plan 23 with pumping ring, silicon carbide vs premium carbon faces, Kalrez secondary seals.',
    aiNormalization: {
      cleanedDescription: 'Mechanical Seal Cartridge 65mm Plan 23, API 682',
      extractedAttributes: { Noun: 'Mechanical Seal', Form: 'Cartridge Assembly', Shaft: '65 mm', Plan: 'API Plan 23', Faces: 'Silicon Carbide vs Carbon', Application: 'Boiler Feed Pump' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'Boiler Feed Pump Mechanical Seal Cartridge → Mechanical Seal Cartridge 65mm'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-SEAL-00441',
      similarityScore: 89,
      confidence: 'Medium (89.1%)',
      matchingRecords: [
        { code: 'BHEL-PMP-SL-65', cpse: 'BHEL', desc: 'Shaft Seal 65mm Single Cartridge Plan 23 High Temp Feed Water', similarity: 91 },
        { code: 'IOCL-PMP-9102', cpse: 'IOCL', desc: 'Mechanical Seal 65mm Cartridge API 682 Arrangement 1', similarity: 87 }
      ],
      explanation: 'Matched shaft diameter (65 mm) and flush Plan 23 configuration. Flagged for review because NTPC requires Kalrez FFKM elastomeric secondary seals, whereas BHEL record allows Aflas.'
    }
  },
  {
    materialCode: 'SAIL-RSP-7712',
    cpse: 'SAIL',
    materialDescription: 'Carbon Steel Seamless Pipe 100 NB Sch 40 ASTM A106 Gr B',
    normalizedDescription: 'CS Seamless Pipe 4" Sch 40',
    category: 'Piping',
    uom: 'MTR',
    specification: 'ASTM A106 Grade B',
    harmonizedCode: 'HMF-PIPE-00214',
    similarity: 96,
    status: 'Harmonized',
    lastUpdated: '2026-09-26',
    manufacturer: 'Tata Steel / Maharashtra Seamless',
    partNumber: 'TSL-SMLS-100NB-SCH40',
    technicalSpecification: 'Seamless carbon steel pipe for high-temperature service, 100 NB (4" NPS), wall thickness Schedule 40 (6.02 mm), material ASTM A106 Grade B, plain beveled ends.',
    aiNormalization: {
      cleanedDescription: 'CS Seamless Pipe 4" Sch 40, ASTM A106 Gr B',
      extractedAttributes: { Noun: 'Pipe', Form: 'Seamless', Size: '100 NB (4 Inch)', Schedule: 'Sch 40 (6.02 mm)', Material: 'ASTM A106 Grade B' },
      standardizedUom: 'MTR (Linear Meters)',
      standardizedTerminology: '100 NB → 4" (DN100); Carbon Steel Seamless Pipe → CS Seamless Pipe'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-PIPE-00214',
      similarityScore: 96,
      confidence: 'High (96.8%)',
      matchingRecords: [
        { code: 'GAIL-PIP-4491', cpse: 'GAIL', desc: 'Seamless Pipe 4" Sch 40 A106 Gr B', similarity: 98 },
        { code: 'ONGC-DRL-4819', cpse: 'ONGC', desc: 'Carbon Steel Pipe Seamless 4" Nominal Sch 40 Beveled', similarity: 97 }
      ],
      explanation: 'Matched because the records share identical steel metallurgy (ASTM A106 Gr B), size (4 Inch / 100 NB), wall schedule (Schedule 40), and seamless manufacturing process.'
    }
  },
  {
    materialCode: 'GAIL-INS-9012',
    cpse: 'GAIL',
    materialDescription: 'Smart Differential Pressure Transmitter 4-20mA HART 0-100 kPa',
    normalizedDescription: 'Diff Pressure Transmitter 4-20mA HART',
    category: 'Instrumentation',
    uom: 'NOS',
    specification: 'IEC 61508 SIL2 / Ex-d IIC T6',
    harmonizedCode: 'HMF-INST-00109',
    similarity: 95,
    status: 'Harmonized',
    lastUpdated: '2026-09-28',
    manufacturer: 'Yokogawa / Emerson Rosemount',
    partNumber: 'EMR-3051CD-2-A-22-A1A',
    technicalSpecification: 'Coplanar differential pressure transmitter, span 0 to 100 kPa (0 to 1000 mbar), 4-20 mA DC output with HART protocol, silicone fill fluid, 316L SST process isolator diaphragms, explosion proof flameproof Ex d.',
    aiNormalization: {
      cleanedDescription: 'Diff Pressure Transmitter 0-100 kPa 4-20mA HART SIL2',
      extractedAttributes: { Noun: 'Transmitter', Type: 'Differential Pressure (DP)', Range: '0-100 kPa', Output: '4-20 mA with HART', Certification: 'SIL 2 / Ex-d Flameproof' },
      standardizedUom: 'NOS (Numbers)',
      standardizedTerminology: 'Smart Differential Pressure Transmitter → Diff Pressure Transmitter 4-20mA HART'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-INST-00109',
      similarityScore: 95,
      confidence: 'High (95.0%)',
      matchingRecords: [
        { code: 'IOCL-INST-4401', cpse: 'IOCL', desc: 'DP Transmitter 0-1 bar 4-20mA HART Smart Flameproof', similarity: 96 },
        { code: 'ONGC-INST-0091', cpse: 'ONGC', desc: 'Differential Pressure Transmitter 4-20mA HART SS316 Diaphragm', similarity: 94 }
      ],
      explanation: 'Matched sensor type (Differential Pressure), analog + digital signal (4-20 mA HART), hazardous area protection (Ex d), and calibrated span range (100 kPa = 1 bar).'
    }
  },
  {
    materialCode: 'ONGC-PMP-1104',
    cpse: 'ONGC',
    materialDescription: 'API 610 Centrifugal Slurry Pump Impeller CD4MCuN Duplex',
    normalizedDescription: 'Slurry Pump Impeller Duplex SS',
    category: 'Pumps',
    uom: 'EA',
    specification: 'ASTM A890 Gr 1B (CD4MCuN)',
    harmonizedCode: 'HMF-PMP-00062',
    similarity: 82,
    status: 'Review Required',
    lastUpdated: '2026-10-02',
    manufacturer: 'Flowserve / Sulzer India',
    partNumber: 'FLS-CP-IMP-100-CD4M',
    technicalSpecification: 'Closed centrifugal pump impeller for API 610 BB2 process pump, offshore seawater injection / produced water service, super duplex stainless steel casting ASTM A890 Grade 1B CD4MCuN, diameter 320 mm.',
    aiNormalization: {
      cleanedDescription: 'Centrifugal Slurry Pump Impeller Duplex SS ASTM A890 1B',
      extractedAttributes: { Noun: 'Impeller', Pump: 'API 610 Centrifugal', Material: 'Super Duplex SS (ASTM A890 Gr 1B / CD4MCuN)', Diameter: '320 mm', Application: 'Produced Water / Slurry' },
      standardizedUom: 'EA (Unified Piece UOM)',
      standardizedTerminology: 'API 610 Centrifugal Slurry Pump Impeller → Slurry Pump Impeller Duplex SS'
    },
    aiHarmonization: {
      suggestedCommonCode: 'HMF-PMP-00062',
      similarityScore: 82,
      confidence: 'Medium (82.4%)',
      matchingRecords: [
        { code: 'BHEL-PMP-0991', cpse: 'BHEL', desc: 'Closed Impeller 320mm Duplex Steel for Seawater Pump', similarity: 85 },
        { code: 'IOCL-PMP-7740', cpse: 'IOCL', desc: 'Centrifugal Pump Impeller Duplex SS 320mm API 610', similarity: 83 }
      ],
      explanation: 'Matched envelope geometry (320mm diameter closed impeller) and metallurgy (Duplex stainless steel). Sent to review because ONGC requires NACE MR0175 sour service compliance certification.'
    }
  }
];

export const DUPLICATE_GROUPS = [
  {
    groupId: 'DUP-000182',
    materialCategory: 'Fasteners',
    cpses: ['BHEL', 'NTPC', 'IOCL'],
    recordsCount: 7,
    similarity: 98.2,
    duplicateType: 'Near-identical',
    status: 'Review',
    harmonizedTarget: 'HMF-FAST-00128',
    standardDescription: 'Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 98.2,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'Identical nominal thread diameter (M10), pitch, shank length (50 mm), property class (8.8), and functional geometry across BHEL, NTPC, and IOCL inventories.'
    },
    records: [
      {
        id: 'REC-BHEL-01',
        cpse: 'BHEL',
        code: 'BHEL-FST-10921',
        description: 'HEX BOLT M10X50 GR 8.8',
        dimensions: 'M10 × 50 mm',
        material: 'Carbon Steel',
        grade: '8.8',
        uom: 'EA',
        manufacturer: 'Sundram Fasteners Ltd',
        partNumber: 'SFL-M10-50-88',
        plant: 'Haridwar HEEP',
        unitPrice: 84.50
      },
      {
        id: 'REC-NTPC-02',
        cpse: 'NTPC',
        code: 'NTPC-BLT-88231',
        description: 'HEXAGONAL HEAD BOLT 10 MM X 50 MM CLASS 8.8',
        dimensions: '10 mm × 50 mm',
        material: 'Medium Carbon Steel',
        grade: 'Class 8.8',
        uom: 'NOS',
        manufacturer: 'Unbrako India',
        partNumber: 'UNB-HEX-1050-88',
        plant: 'Ramagundam STPP',
        unitPrice: 89.00
      },
      {
        id: 'REC-IOCL-03',
        cpse: 'IOCL',
        code: 'IOCL-FST-19283',
        description: 'MS HEX HEAD BOLT M10*50, GR8.8',
        dimensions: 'M10 * 50',
        material: 'Mild Steel / Carbon Steel',
        grade: 'GR8.8',
        uom: 'EA',
        manufacturer: 'Pooja Forge Limited',
        partNumber: 'PF-10-50-88-ZN',
        plant: 'Panipat Refinery',
        unitPrice: 82.00
      }
    ]
  },
  {
    groupId: 'DUP-000194',
    materialCategory: 'Industrial Valves',
    cpses: ['ONGC', 'GAIL'],
    recordsCount: 4,
    similarity: 94.7,
    duplicateType: 'Semantic duplicate',
    status: 'Review',
    harmonizedTarget: 'HMF-VAL-00082',
    standardDescription: 'Gate Valve DN100 (4") Class 150 Flanged Carbon Steel WCB',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 94.7,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'Nominal diameter (100 NB = 4 Inch) and pressure rating (Class 150 = 150#) are identical. Minor differences in legacy long text descriptions and trim specifications.'
    },
    records: [
      {
        id: 'REC-ONGC-01',
        cpse: 'ONGC',
        code: 'ONGC-VAL-8821',
        description: 'Gate Valve 100 NB CS 150# Flanged API 600',
        dimensions: '100 NB (DN100)',
        material: 'Carbon Steel (ASTM A216 WCB)',
        grade: 'Class 150 RF',
        uom: 'EA',
        manufacturer: 'L&T Valves Limited',
        partNumber: 'LNT-100-GV-150',
        plant: 'Mumbai High Offshore',
        unitPrice: 38500
      },
      {
        id: 'REC-GAIL-02',
        cpse: 'GAIL',
        code: 'GAIL-VLV-1102',
        description: '4" Bolted Bonnet Gate Valve A216 WCB 150# RF',
        dimensions: '4 Inch (100 mm)',
        material: 'Cast Steel A216 WCB',
        grade: 'Class 150',
        uom: 'NOS',
        manufacturer: 'BDK Valves / Circor',
        partNumber: 'BDK-GV-04-150-RF',
        plant: 'Vijaipur Compressor Station',
        unitPrice: 39800
      }
    ]
  },
  {
    groupId: 'DUP-000210',
    materialCategory: 'Piping & Line Pipes',
    cpses: ['GAIL', 'IOCL', 'ONGC'],
    recordsCount: 5,
    similarity: 97.4,
    duplicateType: 'Near-identical',
    status: 'Review',
    harmonizedTarget: 'HMF-PIPE-00214',
    standardDescription: 'Seamless Carbon Steel Pipe 4" (100 NB) Sch 40 ASTM A106 Gr B',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 97.4,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'ASTM A106 Grade B specification, 4" nominal size (100 NB), wall schedule 40 (6.02 mm), and seamless form factor match across all records.'
    },
    records: [
      {
        id: 'REC-GAIL-03',
        cpse: 'GAIL',
        code: 'GAIL-PIP-4491',
        description: 'Seamless Pipe 4" Sch 40 A106 Gr B',
        dimensions: '4 Inch / Sch 40',
        material: 'ASTM A106 Grade B',
        grade: 'Schedule 40',
        uom: 'MTR',
        manufacturer: 'Jindal SAW Limited',
        partNumber: 'JSAW-SMLS-100-SCH40',
        plant: 'HVJ Gas Pipeline Project',
        unitPrice: 2850
      },
      {
        id: 'REC-IOCL-04',
        cpse: 'IOCL',
        code: 'IOCL-PIP-1002',
        description: 'Pipe CS SMLS 100 NB Sch 40 ASTM A106 Gr B',
        dimensions: '100 NB / Sch 40',
        material: 'CS (ASTM A106-B)',
        grade: 'Standard Weight',
        uom: 'MTR',
        manufacturer: 'Maharashtra Seamless Ltd',
        partNumber: 'MSL-4IN-SCH40-SMLS',
        plant: 'Mathura Refinery',
        unitPrice: 2890
      },
      {
        id: 'REC-ONGC-05',
        cpse: 'ONGC',
        code: 'ONGC-DRL-4819',
        description: 'Carbon Steel Pipe Seamless 4" Nominal Sch 40 Beveled',
        dimensions: '4" NPS / 6.02mm WT',
        material: 'Carbon Steel A106-B',
        grade: 'Sch 40 Beveled',
        uom: 'MTR',
        manufacturer: 'Tata Steel Tubes Division',
        partNumber: 'TSL-SMLS-100NB',
        plant: 'Mehsana Asset',
        unitPrice: 2940
      }
    ]
  },
  {
    groupId: 'DUP-000225',
    materialCategory: 'Bearings & Transmission',
    cpses: ['BHEL', 'SAIL', 'NTPC'],
    recordsCount: 6,
    similarity: 98.9,
    duplicateType: 'Near-identical',
    status: 'Approved',
    harmonizedTarget: 'HMF-BEAR-00045',
    standardDescription: 'Deep Groove Ball Bearing 6308-2RS C3 (40 × 90 × 23 mm)',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 98.9,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'ISO 6308 dimensions (40x90x23mm), double rubber contact seals (2RS/2RS1), and C3 radial internal thermal clearance match across power and steel plants.'
    },
    records: [
      {
        id: 'REC-BHEL-04',
        cpse: 'BHEL',
        code: 'BHEL-BRG-6308',
        description: 'Deep Groove Ball Bearing 6308 2RS C3',
        dimensions: '40 × 90 × 23 mm',
        material: 'High Carbon Chromium Steel',
        grade: 'ISO 15 / C3 Clearance',
        uom: 'EA',
        manufacturer: 'SKF India Limited',
        partNumber: 'SKF-6308-2RS1-C3',
        plant: 'Bhopal Heavy Electricals',
        unitPrice: 890
      },
      {
        id: 'REC-SAIL-05',
        cpse: 'SAIL',
        code: 'SAIL-DSP-4011',
        description: 'Bearing Ball 6308-2RS1/C3 Dims 40x90x23 mm',
        dimensions: '40x90x23 mm',
        material: 'Bearing Steel 100Cr6',
        grade: 'DIN 625-1 / C3',
        uom: 'PCS',
        manufacturer: 'FAG Schaeffler India',
        partNumber: 'FAG-6308-2RSR-C3',
        plant: 'Durgapur Steel Plant',
        unitPrice: 915
      },
      {
        id: 'REC-NTPC-06',
        cpse: 'NTPC',
        code: 'NTPC-EL-8812',
        description: 'Radial Ball Bearing Rubber Sealed Both Sides 6308 2RS C3',
        dimensions: '40 mm ID × 90 mm OD × 23 mm W',
        material: 'SAE 52100 Alloy Steel',
        grade: 'Radial C3 Fit',
        uom: 'NOS',
        manufacturer: 'NBC Bearings (NEI Ltd)',
        partNumber: 'NBC-6308-2RS-C3',
        plant: 'Korba Thermal Power',
        unitPrice: 875
      }
    ]
  },
  {
    groupId: 'DUP-000241',
    materialCategory: 'Lubricants & Oils',
    cpses: ['IOCL', 'BHEL', 'SAIL'],
    recordsCount: 3,
    similarity: 96.5,
    duplicateType: 'Semantic duplicate',
    status: 'Review',
    harmonizedTarget: 'HMF-LUB-00015',
    standardDescription: 'Industrial Gear Oil ISO VG 220 Extreme Pressure DIN 51517-3 CLP',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 96.5,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'Kinematic viscosity 220 cSt @ 40°C, extreme pressure sulphur-phosphorus additive system, and DIN 51517-3 CLP standards match exactly.'
    },
    records: [
      {
        id: 'REC-IOCL-06',
        cpse: 'IOCL',
        code: 'IOCL-LUB-2041',
        description: 'Industrial Gear Oil ISO VG 220 Servo Mesh SP 220',
        dimensions: '220 cSt @ 40°C',
        material: 'Mineral Base Oil + EP Additives',
        grade: 'ISO VG 220 / DIN 51517-3',
        uom: 'LTR',
        manufacturer: 'Indian Oil Corporation Ltd (SERVO)',
        partNumber: 'SRV-MSH-SP220',
        plant: 'Koyali Refinery',
        unitPrice: 215
      },
      {
        id: 'REC-BHEL-07',
        cpse: 'BHEL',
        code: 'BHEL-OIL-0022',
        description: 'Enclosed Gear Oil EP ISO VG 220 Viscosity 220 cSt',
        dimensions: 'VG 220 (220 mm²/s)',
        material: 'Petroleum Hydrocarbon Blend',
        grade: 'DIN 51517 CLP / AGMA 9005',
        uom: 'LTR',
        manufacturer: 'Bharat Petroleum (Mak Lubricants)',
        partNumber: 'MAK-AMOCAM-220',
        plant: 'Trichy High Pressure Boiler Plant',
        unitPrice: 220
      }
    ]
  },
  {
    groupId: 'DUP-000258',
    materialCategory: 'Seals & Gaskets',
    cpses: ['ONGC', 'IOCL', 'GAIL'],
    recordsCount: 4,
    similarity: 88.5,
    duplicateType: 'Attribute variance',
    status: 'Review',
    harmonizedTarget: 'HMF-SEAL-00319',
    standardDescription: 'Spiral Wound Gasket 3" Class 300 ASME B16.20 SS316 with Graphite',
    aiAssessment: {
      verdict: 'High probability of duplicate material.',
      confidence: 88.5,
      recommendedAction: 'Map to existing harmonized material.',
      rationale: 'Dimensional envelope (3" / 80 NB) and pressure rating (Class 300) align. Flagged for review due to variance in inner retaining ring specification (Type CGI vs Type CG).'
    },
    records: [
      {
        id: 'REC-ONGC-07',
        cpse: 'ONGC',
        code: 'ONGC-GSK-3001',
        description: 'Spiral Wound Gasket 3 Inch 300# SS316 Graphite ASME B16.20',
        dimensions: '3" (80 NB) Class 300',
        material: 'SS316 Winding / Graphite Filler',
        grade: 'Class 300 RF',
        uom: 'NOS',
        manufacturer: 'Flexitallic India',
        partNumber: 'FLX-SWG-3-300',
        plant: 'Uran Gas Terminal',
        unitPrice: 1250
      },
      {
        id: 'REC-IOCL-08',
        cpse: 'IOCL',
        code: 'IOCL-MN-9921',
        description: 'SP Wound Gasket 80 NB CL-300 with SS316 Inner Ring & FG Filler',
        dimensions: '80 NB (3 Inch)',
        material: 'SS316 / Flexible Graphite / Inner Ring',
        grade: 'CL-300 ASME B16.20',
        uom: 'EA',
        manufacturer: 'Goodrich Gaskets Private Ltd',
        partNumber: 'GG-SWG-CGI-80-300',
        plant: 'Haldia Refinery',
        unitPrice: 1390
      }
    ]
  }
];



