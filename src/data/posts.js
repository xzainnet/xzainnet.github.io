export const posts = [
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
