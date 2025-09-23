import { DocumentRow } from '@/components/DocumentTable';

// Helper to generate dummy documents per archive with consistent shape
export function generateDocs(count: number, archiveTitle: string): DocumentRow[] {
  const rows: DocumentRow[] = [];
  for (let i = 1; i <= count; i++) {
    const id = i;
    const padded = String(i).padStart(3, '0');
    rows.push({
      id,
      numberTitle: `${archivePrefix(archiveTitle)}-${padded} • ${archiveTitle} Document ${i}`,
      description: `Auto-generated sample document ${i} for ${archiveTitle}. Replace with real data later.`,
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
