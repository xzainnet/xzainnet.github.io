import { motion } from 'framer-motion'
import {
  Shield, MapPin, Mail, Github, Linkedin,
  Calendar, Award, BookOpen, Cpu, Target, Star,
} from 'lucide-react'

const TIMELINE = [
  {
    year: '2025',
    title: 'Cybersecurity Engineer Intern',
    org: 'Saudi Aramco Mobil Refinery Company, SAMREF',
    location: 'Yanbu, SA',
    desc: 'Focused on Governance, Risk Management, and Compliance (GRC) systems, performing risk assessments and vulnerability management.',
    achievements: [
      'Created Automated Risk & Compliance Reports',
      'Enhanced Email Security',
      'Implemented Risk & Compliance Escalation Internal Policies',
    ],
    color: 'cyber-green',
  },
  {
    year: '2021 – 2026',
    title: 'B.Sc. Computer Engineering',
    org: 'Yanbu Industrial College',
    location: 'Yanbu, SA',
    desc: 'Specialized in Programming and Embedded Systems with focus on Electronics and Electrical Circuits Design. GPA: 3.91/4.0',
    achievements: [
      'First Honor Class',
      'Accomplished IoT & AI Based Projects',
    ],
    color: 'cyber-blue',
  },
]

const CERTS = [
  { name: 'Certificate of Excellence', org: 'Yanbu Industrial College', date: '2025', status: 'Awarded',   color: 'green' },
  { name: 'eJPT',                      org: 'eLearnSecurity',           date: '2025', status: 'Certified', color: 'green' },
  { name: 'Python Essentials 2',       org: 'NetAcademy',               date: '2025', status: 'Certified', color: 'green' },
  { name: 'CSS (Basic)',               org: 'HackerRank',               date: '2025', status: 'Certified', color: 'green' },
  { name: 'Java (Basic)',              org: 'HackerRank',               date: '2025', status: 'Certified', color: 'green' },
  { name: 'C# (Basic)',                org: 'HackerRank',               date: '2021', status: 'Certified', color: 'green' },
]

const SKILLS = [
  { name: 'Web Development',                          category: 'Development',          proficiency: 95 },
  { name: 'Python',                                   category: 'Development',          proficiency: 92 },
  { name: 'Reverse Engineering',                      category: 'Security',             proficiency: 92 },
  { name: 'Web Penetration Testing',                  category: 'Security',             proficiency: 85 },
  { name: 'Penetration Testing',                      category: 'Security',             proficiency: 85 },
  { name: 'Governance, Risk Management & Compliance', category: 'Security',             proficiency: 85 },
  { name: 'Mobile App Penetration Testing',           category: 'Security',             proficiency: 70 },
]

const PROJECTS = [
  {
    name: 'Risk-AI: Risk Intelligence System',
    desc: 'Intelligent system that collects environmental measurements (CO₂, acetone), analyzes risk levels, and performs automated risk assessments using DeepSeek LLM.',
    tech: ['React.js', 'TypeScript', 'SQLite', 'Flask', 'Tailwind CSS'],
    color: 'cyber-green',
  },
  {
    name: 'Logistic Shield',
    desc: 'AI model built with Machine Learning to classify malicious web user input. Targets SQLi, XSS, SSTI, and other common web vulnerabilities.',
    tech: ['Python', 'Jupyter', 'Machine Learning', 'Sklearn', 'Pandas'],
    color: 'cyber-blue',
  },
  {
    name: 'Packet Sniffer in C',
    desc: 'Low-level packet sniffer built from scratch in C. Used for malware analysis and identifying malicious network connections.',
    tech: ['C Language', 'Windows API'],
    link: 'https://github.com/xzainnet/C-Packet-Sniffer',
    color: 'cyber-purple',
  },
]

const levelLabel = (p) => p >= 90 ? 'Expert' : p >= 80 ? 'Professional' : p >= 70 ? 'Intermediate' : 'Beginner'
const levelColor = (p) => p >= 90 ? '#00ff88' : p >= 80 ? '#00cfff' : p >= 70 ? '#facc15' : '#9ca3af'
const levelTextClass = (p) => p >= 90 ? 'text-cyber-green' : p >= 80 ? 'text-cyber-blue' : p >= 70 ? 'text-yellow-400' : 'text-gray-400'

export default function About() {
  return (
    <main className="relative z-10 pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Profile hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 mb-10"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyber-green/20 to-cyber-blue/20 border border-cyber-green/30 flex items-center justify-center glow-border-green">
                <Shield className="w-14 h-14 text-cyber-green" />
              </div>
              <span className="absolute -bottom-1.5 -right-1.5 bg-cyber-green text-cyber-bg text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                SEC
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-0.5">Yousef Zain Aldeen</h1>
              <p className="text-cyber-green font-mono text-sm mb-3">
                Developer · Security Professional · Computer Engineer
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-mono mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" /> Medina, Saudi Arabia
                </span>
                <a
                  href="https://www.linkedin.com/in/yousef-zain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyber-green transition-colors"
                >
                  <Linkedin className="w-3 h-3" /> linkedin.com/in/yousef-zain
                </a>
                <a
                  href="https://github.com/xzainnet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyber-green transition-colors"
                >
                  <Github className="w-3 h-3" /> github.com/xzainnet
                </a>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-5">
                Computer Engineering graduate (GPA 3.91/4.0, First Honor) with five years of experience
                in programming and two years in cybersecurity. Interned at{' '}
                <span className="text-cyber-green font-semibold">Saudi Aramco Mobil Refinery Company (SAMREF)</span> as a
                Cybersecurity Engineer focused on GRC, risk assessments, and vulnerability management.
                Passionate about offensive security, building security tools, and sharing knowledge
                through writeups.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {[
                  { icon: Github,   href: 'https://github.com/xzainnet',                  label: 'GitHub' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/yousef-zain/',      label: 'LinkedIn' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyber-border hover:border-cyber-green/40 hover:text-cyber-green text-gray-400 text-xs font-mono transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Timeline */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-cyber-green" />
                <h2 className="section-heading text-xl">Experience & Education</h2>
              </div>

              <div className="relative pl-5 border-l border-cyber-border space-y-8">
                {TIMELINE.map(({ year, title, org, location, desc, achievements, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="relative"
                  >
                    <div className={`absolute -left-[21px] w-3 h-3 rounded-full bg-${color} border-2 border-cyber-bg`} />
                    <span className={`font-mono text-xs text-${color} mb-1 block`}>{year}</span>
                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                    <p className="text-cyber-blue font-mono text-xs mb-1">{org}</p>
                    <p className="text-gray-600 font-mono text-xs mb-2 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" />{location}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-2">{desc}</p>
                    <ul className="space-y-1">
                      {achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className={`text-${color} mt-0.5`}>→</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Cpu className="w-4 h-4 text-cyber-green" />
                <h2 className="section-heading text-xl">Technical Skills</h2>
              </div>

              <div className="glass-card p-5 space-y-4">
                {SKILLS.map(({ name, proficiency, category }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div>
                        <span className="font-mono text-sm text-gray-300">{name}</span>
                        <span className="font-mono text-xs text-gray-600 ml-2">{category}</span>
                      </div>
                      <span className={`font-mono text-xs ${levelTextClass(proficiency)}`}>
                        {levelLabel(proficiency)} ({proficiency}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: levelColor(proficiency) }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.07 + 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-4 h-4 text-cyber-green" />
                <h2 className="section-heading text-xl">Notable Projects</h2>
              </div>

              <div className="space-y-4">
                {PROJECTS.map(({ name, desc, tech, link, color }, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className={`font-mono font-semibold text-sm text-${color}`}>{name}</h3>
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-gray-500 hover:text-cyber-green transition-colors flex items-center gap-1 flex-shrink-0"
                        >
                          <Github className="w-3 h-3" /> View
                        </a>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3">{desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-xs font-mono bg-cyber-surface text-gray-500 border border-cyber-border/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-cyber-green" />
                <h3 className="font-mono font-semibold text-white text-sm">Certifications</h3>
              </div>
              <div className="space-y-1">
                {CERTS.map(({ name, org, date, status }) => (
                  <div key={name} className="py-2 border-b border-cyber-border/30 last:border-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-xs text-white font-semibold leading-snug">{name}</p>
                        <p className="font-mono text-xs text-gray-500">{org} · {date}</p>
                      </div>
                      <span className="tag tag-green text-xs flex-shrink-0">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Focus areas */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-cyber-green" />
                <h3 className="font-mono font-semibold text-white text-sm">Focus Areas</h3>
              </div>
              {[
                'Web Application Security',
                'GRC & Compliance',
                'Vulnerability Management',
                'Security Tool Development',
                'Bug Bounty Hunting',
                'Risk Assessment',
              ].map((area) => (
                <div key={area} className="flex items-center gap-2 py-1.5 border-b border-cyber-border/30 last:border-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green flex-shrink-0" />
                  <span className="text-xs font-mono text-gray-300">{area}</span>
                </div>
              ))}
            </motion.section>

            {/* Quick stats */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-cyber-green" />
                <h3 className="font-mono font-semibold text-white text-sm">Quick Facts</h3>
              </div>
              {[
                { label: 'GPA',          value: '3.91 / 4.0',   color: 'cyber-green' },
                { label: 'Honor Class',  value: 'First',       color: 'cyber-green' },
                { label: 'Experience',   value: '5 yrs coding',color: 'cyber-blue'  },
                { label: 'Sec XP',       value: '2+ years',    color: 'cyber-blue'  },
                { label: 'Location',     value: 'Medina, SA',   color: 'cyber-purple'},
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center justify-between py-1.5 border-b border-cyber-border/30 last:border-0">
                  <span className="font-mono text-xs text-gray-500">{label}</span>
                  <span className={`font-mono text-xs font-semibold text-${color}`}>{value}</span>
                </div>
              ))}
            </motion.section>
          </div>
        </div>
      </div>
    </main>
  )
}
