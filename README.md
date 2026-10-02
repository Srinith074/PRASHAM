PRASHAM [प्रशम]
AI-Driven Standardization & Harmonization of Material Codes Across CPSEs

One material. Multiple codes. One harmonized identity.

PRASHAM is an AI-powered platform designed to standardize, identify, and harmonize material codes and descriptions across Central Public Sector Enterprises (CPSEs).

The platform addresses the challenge of fragmented material master data, where the same or equivalent industrial materials may exist under different codes, descriptions, units, specifications, and classification systems across organizations.

🚀 Overview

Central Public Sector Enterprises such as BHEL, NTPC, ONGC, IOCL, SAIL, and GAIL maintain large material catalogs across procurement, inventory, maintenance, and ERP systems.

The same physical material can be represented differently across enterprises.

For example:

BHEL
BHEL-FST-10921
HEX BOLT M10X50 GR 8.8

NTPC
NTPC-BLT-88231
HEXAGONAL HEAD BOLT 10MM X 50MM CLASS 8.8

IOCL
IOCL-FST-19283
MS HEX HEAD BOLT M10*50 GR 8.8

These records may represent the same material despite having different codes and descriptions.

PRASHAM uses AI-assisted normalization, semantic similarity, attribute extraction, duplicate detection, and human-in-the-loop validation to identify such relationships and create a common Harmonized Material Identity.

🎯 Problem Statement

Different CPSEs may maintain independent material master databases and coding conventions.

This can result in:

Duplicate material records
Inconsistent material descriptions
Multiple codes for equivalent materials
Different naming conventions
Inconsistent units of measurement
Difficult cross-CPSE material discovery
Manual data-cleaning effort
Challenges in creating a unified material master
Reduced visibility into equivalent materials

PRASHAM provides an intelligent layer for discovering, understanding, standardizing, and harmonizing material information across participating organizations.

💡 Solution

PRASHAM combines multiple AI-assisted capabilities:

AI-Based Material Normalization

Converts inconsistent material descriptions into standardized representations.

Semantic Matching

Identifies materials that are conceptually similar even when different terminology, abbreviations, or word ordering is used.

Attribute Extraction

Extracts important technical attributes such as:

Dimensions
Grade
Material
Thread
Pressure rating
Voltage
Capacity
UOM
Technical specifications
Duplicate Detection

Identifies potential duplicate or equivalent material records across CPSE catalogs.

Harmonized Material Identity

Maps equivalent material records to a common harmonized identity.

Explainable AI

Provides the reasoning behind each recommendation using:

Similarity score
Attribute matching
Specification matching
UOM compatibility
Detected differences
Source records
Human-in-the-Loop Validation

AI recommendations can be reviewed and approved by authorized users before important material mappings are finalized.

🧠 Core Workflow
CPSE Material Data
        ↓
Data Ingestion
        ↓
Validation & Normalization
        ↓
Attribute Extraction
        ↓
Semantic Similarity Analysis
        ↓
Duplicate / Equivalent Material Detection
        ↓
AI Harmonization Recommendation
        ↓
Human Review & Approval
        ↓
Harmonized Material Identity
        ↓
Cross-CPSE Mapping
        ↓
Audit & Traceability
🚀 Key Features
1. Material Harmonization Dashboard

A centralized dashboard providing an overview of material standardization across participating CPSEs.

Features
Total material records
Unique materials
Potential duplicates
AI-generated matches
Harmonization progress
Pending reviews
CPSE-level summaries
Material category analysis
Confidence distribution
2. Material Master

A unified view of material records across participating CPSEs.

Information Displayed
Material Code
CPSE
Material Description
Normalized Description
Category
UOM
Technical Specification
Harmonized Code
Similarity Score
Harmonization Status

Users can inspect individual materials and view their original records, normalized attributes, AI analysis, and cross-CPSE mappings.

3. AI Harmonization Engine

The flagship feature of PRASHAM.

The engine compares material records and generates an AI-assisted harmonization recommendation using semantic and attribute-level similarities.

Example

Source Records

BHEL
HEX BOLT M10X50 GR 8.8

NTPC
HEXAGONAL HEAD BOLT 10MM X 50MM CLASS 8.8

IOCL
MS HEX HEAD BOLT M10*50 GR 8.8
Harmonized Result
Harmonized Code:
HMF-FAST-00128

Standard Description:
Hexagonal Head Bolt, M10 × 50 mm, Grade 8.8

Similarity:
96.8%

The system also provides an explanation of the attributes and evidence contributing to the recommendation.

4. Duplicate Detection

Identifies potential duplicate and semantically equivalent material records.

Duplicate groups can include:

Near-identical materials
Semantic duplicates
Specification-equivalent materials
Potential variants
Records requiring manual review

Users can compare source records and inspect the attributes responsible for the similarity recommendation.

5. Material Code Crosswalk

Creates a relationship between CPSE-specific material codes and a common harmonized material identity.

Example:

                 HMF-FAST-00128
                        │
          ┌─────────────┼─────────────┐
          │             │             │
        BHEL          NTPC          IOCL
          │             │             │
 BHEL-FST-10921  NTPC-BLT-88231  IOCL-FST-19283

The crosswalk provides traceability between legacy material codes and their proposed harmonized identity.

Crosswalk Capabilities
CPSE filtering
Category filtering
Mapping status
Confidence filtering
Source record inspection
AI reasoning
Exportable crosswalk data
6. Human Review & Approval

PRASHAM follows a Human-in-the-Loop approach.

AI recommendations can be:

Approved
Rejected
Sent for further review
Returned for additional information

The review interface provides:

Source material records
AI recommendation
Similarity score
Attribute comparison
Technical reasoning
Reviewer decision
Reviewer comments
Timestamp

This ensures that important material-master decisions can remain under human oversight.

7. Data Import & Validation

The platform supports material-master ingestion through:

CSV
XLSX
JSON
Validation Workflow
File Validation
      ↓
Schema Mapping
      ↓
Data Quality Check
      ↓
Normalization
      ↓
AI Harmonization
Required Fields
Material Code
Material Description
UOM
Category
Optional Fields
Manufacturer
Part Number
Specification
Material Type
Plant
Procurement Group
8. Harmonization Analytics

Provides insights into material standardization and data quality.

Analytics Include
Harmonization progress
Duplicate material trends
CPSE comparison
Category-level duplication
AI matching statistics
Review workload
Material data quality indicators
Potential consolidation opportunities

The prototype also demonstrates how harmonization data could be used to identify potential procurement and catalog-standardization opportunities.

Note: All numerical values displayed in the prototype are illustrative demonstration data and do not represent actual CPSE statistics or savings.

9. Audit & Traceability

PRASHAM provides a structured history of material harmonization activities.

Typical audit information includes:

Timestamp
User
CPSE
Material
Action
Previous Value
New Value
AI Confidence
Decision
Reference ID

A material's lifecycle can be traced through:

Data Ingestion
      ↓
Normalization
      ↓
Attribute Extraction
      ↓
AI Matching
      ↓
Recommendation
      ↓
Human Review
      ↓
Approval
      ↓
Harmonized Catalog

This provides a foundation for transparent and traceable material-master governance.

🤖 AI Approach

PRASHAM uses multiple complementary techniques for material harmonization.

1. Data Normalization

Standardizes:

Case
Abbreviations
Units
Symbols
Spacing
Naming conventions

Example:

10MM X 50
10 MM × 50 MM
M10*50

can be converted into a common representation.

2. Attribute Extraction

Important technical information is extracted from material descriptions.

Example:

HEX BOLT M10X50 GR 8.8

becomes:

Type       → Hex Bolt
Diameter   → M10
Length     → 50 mm
Grade      → 8.8
3. Semantic Similarity

Semantic representations are used to identify materials that have similar meaning even when their descriptions differ significantly.

4. Attribute-Level Matching

The system compares important material attributes including:

Dimensions
Material
Grade
UOM
Technical specifications
Category
5. Explainable Recommendation

Multiple matching signals are combined to generate a recommendation.

Semantic Similarity
        +
Attribute Similarity
        +
Specification Match
        +
UOM Compatibility
        ↓
Harmonization Recommendation
6. Human Validation

The final decision can be reviewed by an authorized user.

AI Recommendation
        +
Human Validation
        =
Controlled Harmonization
🏗️ System Architecture
┌──────────────────────────────────────────┐
│              CPSE Data Sources           │
│                                          │
│ BHEL │ NTPC │ ONGC │ IOCL │ SAIL │ GAIL│
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│          Data Ingestion Layer            │
│        CSV │ XLSX │ JSON │ ERP           │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│       Normalization & Validation         │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│          AI / ML Processing              │
│                                          │
│ Attribute Extraction                     │
│ Semantic Matching                        │
│ Duplicate Detection                      │
│ Material Classification                  │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│       Harmonization & Crosswalk          │
│                                          │
│ CPSE Code → Harmonized Identity          │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│       Human Review & Governance          │
└────────────────────┬─────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────┐
│       Harmonized Material Master         │
└──────────────────────────────────────────┘
🖥️ Prototype Modules
Module	Route	Purpose
Dashboard	/dashboard	Overall harmonization overview
Material Master	/master	Explore material records
AI Harmonization	/harmonize	Generate and review AI mappings
Duplicate Detection	/duplicates	Identify potential duplicates
Crosswalk	/crosswalk	Map CPSE codes to harmonized identities
Review Queue	/review	Human review and approval
Data Import	/import	Upload and validate material data
Analytics	/analytics	Analyze harmonization progress
Audit Trail	/audit	Trace material and decision history
🎨 User Experience

PRASHAM follows a premium, minimal enterprise design approach.

Design Principles
Clean information hierarchy
Data-first interface
Minimal color palette
Professional typography
Floating navigation
Responsive mobile navigation
Responsive tables
Explainable AI interfaces
Consistent components
Accessible controls
Minimal visual distractions

The prototype is designed for both desktop and mobile experiences.

🛠️ Technology Stack
Frontend
React 19
Vite
JavaScript / TypeScript
Lucide React
AI / Data Processing

The proposed architecture can integrate:

NLP-based normalization
Semantic embeddings
Vector similarity search
Attribute extraction
Entity resolution
Classification models
Development Tools
Git
GitHub
npm
Oxlint
📊 Prototype Data

The prototype uses synthetic and illustrative material records to demonstrate the proposed solution.

Example organizations include:

BHEL
NTPC
ONGC
IOCL
SAIL
GAIL

The sample organizations, material codes, descriptions, metrics, and records shown in the prototype are intended for demonstration purposes.

They should not be interpreted as actual CPSE material-master records.

Similarly, numerical values displayed in the prototype are illustrative.

For example:

1.28M Material Records
126,480 Potential Duplicates
98,742 AI Matches
68.4% Harmonization Rate
₹548.6 Cr Standardization Scope

These figures are prototype demonstration values and do not represent actual CPSE datasets, operational performance, or financial savings.

🔐 Responsible AI & Governance

PRASHAM is designed around a human-in-the-loop workflow.

The prototype demonstrates:

Explainable AI recommendations
Confidence indicators
Source-record traceability
Human approval
Decision history
Audit events
Controlled material mapping

A production implementation would additionally require organization-specific requirements for:

Authentication and authorization
Data security
ERP integration
Data privacy
Audit policies
Data retention
Model validation
Governance
Regulatory compliance
🚀 Running Locally
1. Clone the repository
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
2. Install dependencies
npm install
3. Start the development server
npm run dev

Open:

http://localhost:5173
4. Run linting
npm run lint
5. Create a production build
npm run build
🌐 Deployment

The frontend can be deployed using:

GitHub Pages
Vercel
Netlify
Other static hosting platforms

For the SIH prototype, the application can be published through GitHub Pages for easy access and demonstration.

🔮 Future Scope
ERP Integration

Integration with enterprise systems such as:

SAP
Oracle
Other CPSE ERP platforms
Advanced AI Models

Future versions can incorporate:

Domain-specific language models
Fine-tuned embedding models
Multilingual material understanding
Advanced entity-resolution models
Domain-specific material classifiers
Unified Material Repository

A governed harmonized material repository could provide a common reference layer across participating organizations.

Intelligent Procurement

Harmonized material identities could support:

Cross-CPSE material discovery
Standardized procurement descriptions
Supplier comparison
Procurement analytics
Inventory intelligence
Duplicate catalog reduction
Continuous Learning

Human reviewer decisions can be used as feedback to improve future material-matching recommendations.

🎯 Expected Impact

PRASHAM aims to help organizations move from:

Multiple Codes
Multiple Descriptions
Multiple Catalogs
        ↓
Fragmented Material Information

towards:

Unified Material Understanding
        ↓
Harmonized Material Identity
        ↓
Cross-CPSE Visibility
        ↓
Improved Material Data Governance

The objective is not simply to remove duplicate codes.

The larger goal is to establish a common semantic understanding of industrial materials across CPSEs.

🏆 Smart India Hackathon

Project: PRASHAM [प्रशम]

Problem Statement:
AI-Driven Standardization and Harmonization of Material Codes Across CPSEs

Category:
Software

Solution Type:
AI-powered Material Master Standardization & Harmonization Platform

Focus Areas:

Artificial Intelligence
Natural Language Processing
Semantic Matching
Entity Resolution
Material Master Data
Data Standardization
Enterprise Procurement
Human-in-the-Loop AI
📌 Disclaimer

PRASHAM is an SIH prototype developed to demonstrate the proposed solution concept.

All organizations, material records, material codes, metrics, AI confidence values, financial figures, and analytics shown in the prototype are illustrative unless explicitly stated otherwise.

The prototype does not represent an official CPSE system, government database, procurement platform, or production deployment.

⭐ Vision

One material. Multiple codes. One harmonized identity.

PRASHAM aims to provide the intelligence layer required to discover, understand, standardize, and harmonize material information across CPSEs while keeping critical decisions transparent, explainable, and human-validated.
