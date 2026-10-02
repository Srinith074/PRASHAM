# PRASHAM [प्रशम] — CPSE Material Code Standardization & Harmonization Platform
> **AI-Driven Standardization and Harmonization of Material Codes Across CPSEs**  
> *Smart India Hackathon (SIH) Enterprise Solution for Central Public Sector Enterprises*

---

## 🌟 Executive Overview
Different Indian Central Public Sector Enterprises (e.g., **BHEL, NTPC, IOCL, ONGC, SAIL, GAIL, COAL INDIA**) maintain distinct, siloed material code standards, naming formats, cataloging taxonomy, and ERP schemas for the exact same physical industrial items.

**PRASHAM** utilizes an AI/ML normalization engine, semantic vector embeddings, and an enterprise crosswalk resolver to ingest legacy material codes, identify cross-enterprise duplicates, generate standardized descriptions, and establish a **Single National Harmonized Identity** across all CPSE material catalogs.

---

## 🚀 Key Modules Built

1. **Material Harmonization Dashboard** (`/dashboard`)
   - 6 KPI tracking cards: Total Material Records (1.28M+), Unique Materials, Potential Duplicates, AI Matches Generated, Harmonization Rate (68.4%), Pending Human Review.
   - Interactive CPSE selector with real-time dynamic re-aggregation.
   - Multi-CPSE status breakdown and confidence distribution charts.

2. **Material Master Catalog** (`/master`)
   - Complete unified view across participating CPSEs (BHEL, NTPC, ONGC, IOCL, SAIL, GAIL).
   - Rich column view: Material Code, CPSE, Material Description, Normalized Description, Category, UOM, Specifications, Harmonized Code, Similarity Score, Status.
   - Drawer slide-over for deep material inspection, ERP legacy metadata, attribute badges, and AI parity indicators.

3. **AI Harmonization Engine** (`/harmonize`)
   - Flagship transformation engine comparing legacy CPSE records side-by-side.
   - Token-level normalization breakdown (Attribute extraction: Thread, Grade, Dimensions, Metallurgy).
   - Real-time generation of the unified **Harmonized Material Identity** (`HMF-FAST-00128`).
   - One-click approval to publish into the National Master Catalog.

4. **Duplicate Detection & Entity Resolution** (`/duplicates`)
   - Cluster-based deduplication groups (Near-identical, Semantic duplicates, Specification variants).
   - Side-by-side attribute comparison matrix with visual difference highlighting.
   - Actionable workflows: Merge into Harmonized ID, Mark as Unique, Flag for Review.

5. **Material Code Crosswalk (Cross-CPSE Mapping)** (`/crosswalk`)
   - **Visual Hierarchical Mapping**: Restrained, elegant tree using structured lines and boxes (Root Harmonized Identity $\rightarrow$ CPSE Branches $\rightarrow$ Legacy Material Codes).
   - **Detailed Crosswalk Matrix**: Harmonized Code, CPSE, Original Code, Original Description, Standard Description, Confidence, Mapping Status.
   - **Multi-parameter Filtering**: Filter by CPSE, Category, Mapping Status, and Confidence tier (≥90%, 75-89%, <75%).
   - **Inspection & AI Reasoning Modal**: Click any crosswalk mapping to inspect source ERP plant, unit contract pricing, metallurgy verification, and AI alignment rationale.
   - **Export Crosswalk**: Formatted CSV download for integration into external procurement and ERP data pipelines.

6. **Review Queue & Governance Station (Human Review & Approval)** (`/review`)
   - **Human-in-the-Loop Model**: Controlled enterprise governance console complying with Central Vigilance Commission (CVC) and GeM public procurement directives.
   - **Top Multi-Attribute Filters**: Priority (High/Medium/Low), CPSE, Category, Confidence Tier, Age (Today/24h/7d/Older), and Recommendation Type (Merge/Split/Reclassify/Standardize Description).
   - **Main Stewardship Queue**: Case ID (`HR-004821`), Material, CPSE, AI Recommendation, Confidence Meter, Technical Reason, Creation Age, and Priority Badges.
   - **Detailed Review Workspace**:
     - **Source Records**: Multi-CPSE side-by-side legacy ERP attributes, plant locations, and contract prices.
     - **AI Analysis**: 5-factor evaluation matrix (Similarity 96.8%, Attribute Match 100%, Semantic Match 97%, Specification Match 95%, UOM Match 100%).
     - **AI Recommendation & Reasoning**: Full explainability breakdown justifying cross-enterprise parity.
     - **Controlled Decision Actions**: `Approve`, `Reject` (with justification logging), and `Request More Information` (with target CPSE query routing).
   - **Approval History Section**: Immutable statutory audit trail logging Reviewer (`Dr. R. K. Verma, Chief Master Data Steward`), timestamps, decisions, and comments.

7. **Data Import & Pre-Ingestion Validation Pipeline** (`/import`)
   - **Multi-Format Dropzone**: Native drag-and-drop supporting `CSV`, `XLSX`, and `JSON` material master dumps up to 100 MB.
   - **ERP Schema Field Specifications**: Explicit display of **Required Fields** (*Material Code, Material Description, UOM, Category*) and **Optional Fields** (*Manufacturer, Part Number, Specification, Material Type, Plant, Procurement Group*).
   - **5-Stage Automated Validation Pipeline**: File Validation $\rightarrow$ Schema Mapping $\rightarrow$ Data Quality Check $\rightarrow$ Normalization $\rightarrow$ AI Harmonization.
   - **Pre-Ingestion Audit Metrics**: Real-time evaluation of Records Detected (`24,820`), Valid Records (`24,392`), Missing Descriptions (`182`), Invalid UOM (`91`), and Duplicate Codes (`155`).
   - **Start AI Processing**: Automated trigger for vector embedding creation, attribute extraction, and crosswalk indexing.
   - **Recent Imports Table**: Historical audit log of uploaded enterprise batches with valid record ratios and processing status.

8. **Harmonization Analytics** (`/analytics`)
   - **Harmonization Progress**: Monthly trend trajectory tracking catalog ingestion and standardization growth from 26.2% to 68.4%.
   - **Duplicate Reduction**: Comparative before-and-after analysis showing `126,480` detected duplicates reduced by `98,742` resolved entries (78.1% resolution rate).
   - **CPSE Comparison Matrix**: Enterprise-level breakdown table across BHEL, NTPC, IOCL, ONGC, SAIL, and GAIL (Material Records, Duplicates, Harmonized, Pending Review, Data Quality Index).
   - **Category Duplication Analysis**: Ranking of procurement commodities with highest redundancy (Fasteners 28.4%, Valves 24.1%, Piping 21.6%, Bearings 19.8%).
   - **AI Performance Metrics**: Evaluation of 98,742 total AI matches, 95.7% approval accuracy, 94.8% average confidence, and 14.2% human review escalation.
   - **Potential Procurement Impact (DEMO Estimates)**: Carefully labeled prototype estimates (*126,480 potential duplicate materials, 18,420 consolidation opportunities, ₹548.6 Cr standardization scope*) with prominent statutory disclaimer banner: *“Illustrative prototype estimates — not actual CPSE savings.”*
   - **Export Report**: Automated CSV export generating an executive analytics briefing.

9. **Audit Trail & Governance Log** (`/audit`)
   - **Complete Traceability**: Regulatory-grade event log recording AI recommendations, human stewardship approvals, and material master mutations under CVC/CAG compliance standards.
   - **10 Enterprise Event Log Columns**:
     - **Timestamp**: e.g., `02 Oct 2026, 18:42`
     - **User**: e.g., `Admin User`
     - **CPSE**: e.g., `BHEL`
     - **Material**: e.g., `BHEL-FST-10921`
     - **Action**: e.g., `Harmonization Approved`
     - **Previous Value**: e.g., `BHEL-FST-10921`
     - **New Value**: e.g., `HMF-FAST-00128`
     - **AI Confidence**: e.g., `96.8%`
     - **Decision**: e.g., `Approved`
     - **Reference ID**: e.g., `HR-004821`
   - **Multi-Factor Filtering**: 6 dedicated operational filters (`Date`, `CPSE`, `User`, `Action`, `Material`, `Reference ID`) plus rapid filter reset.
   - **Interactive Traceability Detail Drawer**: Slide-over panel exposing the complete material lifecycle across 6 statutory dimensions:
     - **Source Records**: Multi-CPSE legacy ERP attributes (BHEL, NTPC, IOCL), plant locations, ERP instances, UOMs, and contract prices.
     - **AI Recommendation**: Standardized unified code, canonical nomenclature, standard UOM, and UNSPSC classification.
     - **Confidence Breakdown**: Dimensional score matrix (Attribute 100%, Semantic 97%, Specification 95%, UOM 100%, Overall 96.8%).
     - **Technical Explanation**: Comprehensive reasoning justifying equivalence across naming conventions and coding formats.
     - **Human Decision**: Verifiable record of the human reviewer, official comments, timestamp, and cryptographic hash verification.
     - **Lifecycle Timeline**: Chronological event sequence from ingestion to token extraction, vector cosine clustering, stewardship review, and final catalog publish.
   - **Export Audit Log**: Formatted CSV download for statutory auditing and vigilance compliance.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19 + Vite 8
- **Icons**: Lucide React
- **Linter**: Oxlint (0 warnings, 0 errors)
- **Design System**: Sovereign India Digital Design System (Ashoka Blue `#0a2540`, Tri-color saffron accent `#ff6b35`, Indian forest emerald `#10b981`, clean enterprise typography).

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run Oxlint validation
npm run lint

# Production build
npm run build
```

*Access the running platform at `http://localhost:5173`.*
#   P R A S H A M  
 