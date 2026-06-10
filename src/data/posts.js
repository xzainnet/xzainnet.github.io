export const posts = [
  {
    id: 'idor-license-api-enumeration',
    slug: 'idor-license-api-enumeration',
    title: "IDOR in License Verification API Enables Full Investor Database Enumeration",
    excerpt:
      "How partial input acceptance in a government investment platform's license verification endpoint allowed enumeration of thousands of investor records — leaking company names, shareholder identities, financial data, and personal contact information with only 10,000 API requests.",
    date: '2026-05-20',
    readTime: '13 min',
    severity: 'High',
    bounty: 'SAR 5,651',
    platform: 'Bug Bounty',
    tags: ['IDOR', 'API', 'Enumeration', 'PII', 'Bug Bounty', 'Government'],
    category: 'Bug Bounty',
    coverGradient: 'from-orange-900/40 via-cyber-bg to-cyber-bg',
    accentColor: 'orange',
  },
  {
    id: 'mass-idor-citizen-data-leak',
    slug: 'mass-idor-citizen-data-leak',
    title: "Critical Mass Enumeration IDOR Leads to Leak of Millions of Citizens' Data",
    excerpt:
      "A deep-dive into a critical Mass IDOR vulnerability discovered during a freelance Android app penetration test — where sequential AES-encrypted user IDs in an undocumented API exposed the personal information of millions of citizens.",
    date: '2026-03-10',
    readTime: '18 min',
    severity: 'Critical',
    bounty: null,
    platform: 'Freelance',
    tags: ['IDOR', 'Android', 'Flutter', 'Frida', 'Reverse Engineering', 'AES', 'Mobile Pentest'],
    category: 'Penetration Testing',
    coverGradient: 'from-red-900/40 via-cyber-bg to-cyber-bg',
    accentColor: 'red',
  },
]

export const getPost = (slug) => posts.find((p) => p.slug === slug)

export const severityColor = {
  Critical: 'red',
  High:     'orange',
  Medium:   'yellow',
  Low:      'blue',
  Info:     'purple',
}
