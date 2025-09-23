import { DocumentRow } from '@/components/DocumentTable';

// Helper to generate dummy documents per archive with consistent, folder-specific content
export function generateDocs(count: number, archiveTitle: string): DocumentRow[] {
  const rows: DocumentRow[] = [];
  const prefix = archivePrefix(archiveTitle);
  for (let i = 1; i <= count; i++) {
    const id = i;
    const padded = String(i).padStart(3, '0');
    const { codeLabel, description } = folderSpecificContent(archiveTitle, i);
    rows.push({
      id,
      // Rendered as: CODE (bold, top) + label (second line) in table
      numberTitle: `${prefix}-${padded} • ${codeLabel}`,
      description,
      documentDate: randomDateThisYear(),
      contributors: sampleContributors(i),
      archive: archiveTitle,
      updatedCreatedBy: sampleUpdatedBy(i),
    });
  }
  return rows;
}

function archivePrefix(title: string): string {
  // Make a short code from words
  const words = title
    .replace(/[^A-Za-z0-9 &]/g, '')
    .split(/\s+|&/)
    .filter(Boolean);
  const initials = words.map(w => w.trim()[0]?.toUpperCase()).slice(0, 3).join('');
  return initials || 'DOC';
}

function randomDateThisYear(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1).getTime();
  const end = new Date(now.getFullYear(), 11, 31).getTime();
  const t = Math.floor(Math.random() * (end - start)) + start;
  const d = new Date(t);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

function sampleContributors(i: number): string[] {
  const people = ['Aldi P.', 'Nia K.', 'Ahmad R.', 'Budi S.', 'Citra L.', 'Dewi A.'];
  return [people[i % people.length]];
}

function sampleUpdatedBy(i: number): string {
  const creators = ['Aldi P.', 'Nia K.', 'Ahmad R.', 'Budi S.'];
  const updaters = ['Rina T.', 'Sari M.', 'Yoga N.', 'Tono H.'];
  return `${updaters[i % updaters.length]} / ${creators[(i + 1) % creators.length]}`;
}

// Folder-specific label/description sets so every archive feels relevant
function folderSpecificContent(archiveTitle: string, i: number): { codeLabel: string; description: string } {
  const pick = (arr: string[]) => arr[i % arr.length];
  const title = archiveTitle.toLowerCase();

  if (title.includes('license')) {
    const labels = ['LICENSE AGREEMENT', 'RENEWAL NOTICE', 'SSL CERTIFICATE', 'SOFTWARE EULA'];
    const desc = [
      'Official licensing or renewal documentation for company assets and software.',
      'Certificate and license registry for compliance and audit readiness.',
      'Terms, keys, and entitlement details for internal use.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('finance')) {
    const labels = ['INVOICE', 'EXPENSE REPORT', 'BUDGET PLAN', 'FINANCIAL STATEMENT'];
    const desc = [
      'Financial transaction records and supporting statements for review.',
      'Budgeting, accounting notes, and monthly reconciliation documents.',
      'Expense breakdowns and approvals for operational activities.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('human resources')) {
    const labels = ['EMPLOYEE CONTRACT', 'POLICY MEMO', 'RECRUITMENT PLAN', 'PERFORMANCE REVIEW'];
    const desc = [
      'HR policies, contracts, and personnel administrative records.',
      'Hiring plans, performance cycles, and internal policy references.',
      'Documents for onboarding, appraisal, and organizational updates.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('operation')) {
    const labels = ['SOP', 'MAINTENANCE SCHEDULE', 'OPERATIONAL REPORT', 'CHECKLIST'];
    const desc = [
      'Standard operating procedures and daily operational references.',
      'Planned maintenance, task logs, and compliance checklists.',
      'Routine reports to monitor service and production activities.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('legal')) {
    const labels = ['AGREEMENT', 'NDA', 'COMPLIANCE REPORT', 'LEGAL OPINION'];
    const desc = [
      'Legal contracts, opinions, and compliance documentation.',
      'Confidentiality and regulatory documents for audit purposes.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('quality')) {
    const labels = ['TEST PLAN', 'QA REPORT', 'QUALITY CHECKLIST', 'INCIDENT REPORT'];
    const desc = [
      'Quality standards, validations, and release readiness documents.',
      'Defect logs, test results, and continuous improvement notes.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('marketing') || title.includes('communication')) {
    const labels = ['CAMPAIGN BRIEF', 'BRAND GUIDELINES', 'PRESS RELEASE', 'CONTENT PLAN'];
    const desc = [
      'Marketing materials, briefs, and communications references.',
      'Brand assets and messaging guidance for public channels.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('procurement')) {
    const labels = ['PURCHASE ORDER', 'VENDOR CONTRACT', 'RFQ', 'PROPOSAL EVALUATION'];
    const desc = [
      'Procurement paperwork, contracts, and sourcing documentation.',
      'Quotations and evaluation notes for vendor selections.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('research') || title.includes('development')) {
    const labels = ['RESEARCH REPORT', 'PROTOTYPE SPEC', 'EXPERIMENT LOG', 'TECHNICAL NOTE'];
    const desc = [
      'Studies, prototypes, and experimental results for internal R&D.',
      'Specifications and iteration records for product development.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('security')) {
    const labels = ['VULNERABILITY REPORT', 'ACCESS CONTROL POLICY', 'PENETRATION TEST', 'INCIDENT RESPONSE'];
    const desc = [
      'Security advisories, assessment results, and response procedures.',
      'Policies and reviews to strengthen security posture.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('facilities') || title.includes('maintenance')) {
    const labels = ['WORK ORDER', 'INSPECTION REPORT', 'MAINTENANCE LOG', 'ASSET CHECKLIST'];
    const desc = [
      'Facilities operations, maintenance logs, and inspection records.',
      'Asset management references and routine work orders.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('supply chain')) {
    const labels = ['SHIPMENT PLAN', 'INVENTORY REPORT', 'LOGISTICS CONTRACT', 'SUPPLIER ASSESSMENT'];
    const desc = [
      'Supply planning, inventory tracking, and logistics documentation.',
      'Supplier relations and performance evaluation records.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('customer service')) {
    const labels = ['SLA DOCUMENT', 'TICKET SUMMARY', 'TRAINING GUIDE', 'FEEDBACK REPORT'];
    const desc = [
      'Customer support policies, SLAs, and service reports.',
      'Training and feedback documents for service excellence.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('strategy') || title.includes('planning')) {
    const labels = ['STRATEGIC PLAN', 'ROADMAP', 'KPI DASHBOARD', 'MEETING MINUTES'];
    const desc = [
      'Company plans, goals, and progress tracking documentation.',
      'Roadmaps and KPIs for execution and alignment.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  if (title.includes('health') || title.includes('safety') || title.includes('environment')) {
    const labels = ['HSE POLICY', 'SAFETY REPORT', 'ENVIRONMENTAL AUDIT', 'RISK ASSESSMENT'];
    const desc = [
      'Health, safety, and environment documentation and audits.',
      'Risk assessments and compliance references for HSE.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  // Personal archive (private documents)
  if (title.includes('personal')) {
    const labels = [
      'IDENTITY CARD',
      'FAMILY CARD',
      'TAX ID',
      'DRIVER LICENSE',
      'PASSPORT',
      'BANK STATEMENT',
      'PAYSLIP',
      'CERTIFICATE',
      'MEDICAL RECORD',
      'INSURANCE POLICY',
      'RENT AGREEMENT',
      'UTILITY BILL',
      'EDUCATION TRANSCRIPT',
      'VACCINATION CARD',
      'EMPLOYMENT LETTER',
      'REFERENCE LETTER',
      'BIRTH CERTIFICATE',
      'MARRIAGE CERTIFICATE',
      'DIVORCE CERTIFICATE',
      'NPWP CARD',
      'BPJS CARD',
      'DRIVING PERMIT',
      'VEHICLE REGISTRATION',
      'HEALTH INSURANCE',
      'PENSION STATEMENT',
      'SAVINGS BOOK',
      'CREDIT CARD STATEMENT',
      'LOAN AGREEMENT',
      'PROPERTY TAX',
      'EMERGENCY CONTACT FORM',
    ];
    const desc = [
      'Confidential personal document stored for private reference and verification.',
      'Official record used for identity, finance, or administrative purposes.',
      'Scanned copy of personal paperwork for secure digital archive.',
      'Document for compliance, travel, insurance, or employment needs.',
    ];
    return { codeLabel: pick(labels), description: pick(desc) };
  }

  // Fallback
  const labels = ['DOCUMENT', 'RECORD', 'NOTE', 'MEMO'];
  const desc = ['General internal documentation.'];
  return { codeLabel: pick(labels), description: pick(desc) };
}
