import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Shield, Terminal, Bug, Globe, Award, ChevronRight,
  ArrowRight, Code2, Lock, Database,
} from 'lucide-react'
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'

const TYPING_STRINGS = [
  'Bug Bounty Hunter',
  'Penetration Tester',
  'Security Researcher',
  'Web Hacker',
  'CTF Player',
]

function TypingText() {
  const [strIdx, setStrIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    const current = TYPING_STRINGS[strIdx]
    let timeout

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 80)
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, 45)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setStrIdx((s) => (s + 1) % TYPING_STRINGS.length)
    }
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, strIdx])

  return (
    <span className="text-cyber-green glow-text-green">
      {displayed}
      <span className="animate-[typeCursor_1s_step-end_infinite]">|</span>
    </span>
  )
}

const STATS = [
  { label: 'Bugs Found',    value: '10+',  icon: Bug,      color: 'text-cyber-red' },
  { label: 'Total Bounty',  value: '$1K', icon: Award,    color: 'text-cyber-green' },
  { label: 'Writeups',      value: '1',  icon: Terminal, color: 'text-cyber-blue' },
  { label: 'Platforms',     value: '1',    icon: Globe,    color: 'text-cyber-purple' },
]

const SKILLS = [
  { label: 'Web Development',                level: 95, hex: '#00ff88' },
  { label: 'Python',                         level: 92, hex: '#00ff88' },
  { label: 'Reverse Engineering',            level: 92, hex: '#00ff88' },
  { label: 'Web Penetration Testing',        level: 85, hex: '#00cfff' },
  { label: 'Penetration Testing',            level: 85, hex: '#00cfff' },
  { label: 'Governance, Risk & Compliance',  level: 85, hex: '#00cfff' },
  { label: 'Mobile App Penetration Testing', level: 70, hex: '#facc15' },
]

const TOOLS = [
  'Burp Suite', 'Frida', 'Apktool', 'Blutter', 'Objection',
  'Nmap', 'Metasploit', 'SQLmap', 'MobSF', 'Jadx',
]

export default function Home() {
  return (
    <main className="relative z-10">
      {/* Hero */}
      <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-green/30 bg-cyber-green/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-mono text-xs text-cyber-green">Available for opportunities</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-green to-cyber-blue">
                Yousef Zain
              </span>
            </h1>

            <div className="text-xl lg:text-2xl font-mono mb-6 h-8">
              <TypingText />
            </div>

            <p className="text-gray-400 leading-relaxed mb-8 max-w-lg">
              I break things legally. Security researcher focused on web
              application hacking, bug bounty programs, and adversarial
              simulation. I document everything I learn so others can too.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/blog" className="btn-primary">
                Read Writeups
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-ghost">
                About Me
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Terminal snippet */}
            <div className="mt-10 glass-card p-4 max-w-md font-mono text-xs">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/70" />
                <span className="ml-2 text-gray-600">terminal</span>
              </div>
              <div className="space-y-1 text-gray-400">
                <p><span className="text-cyber-green">❯</span> whoami</p>
                <p className="text-gray-300">yousef-zain</p>
                <p><span className="text-cyber-green">❯</span> cat specialties.txt</p>
                <p className="text-cyber-blue">Metasploit, IDA, Ffuf, Nuclei, Wpscan</p>
                <p><span className="text-cyber-green">❯</span> echo $STATUS</p>
                <p className="text-cyber-green">hunting<span className="animate-[typeCursor_1s_step-end_infinite]">_</span></p>
              </div>
            </div>
          </motion.div>

          {/* Right — animated shield */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-72 h-72 animate-float">
              {/* Outer rings */}
              <div className="absolute inset-0 rounded-full border border-cyber-green/10 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full border border-cyber-blue/10 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
              <div className="absolute inset-8 rounded-full border border-cyber-purple/10 animate-spin" style={{ animationDuration: '10s' }} />

              {/* Center */}
              <div className="absolute inset-12 rounded-full bg-cyber-green/5 border border-cyber-green/20 flex items-center justify-center glow-border-green">
                <Shield className="w-20 h-20 text-cyber-green opacity-80" />
              </div>

              {/* Orbiting dots */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-cyber-green/60"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${deg}deg) translateX(120px) translateY(-50%)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5 text-center hover:border-cyber-green/20 transition-colors"
            >
              <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
              <div className="text-2xl font-bold text-white font-mono">{value}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-5 h-5 text-cyber-green" />
            <h2 className="section-heading">Skills & Expertise</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              {SKILLS.map(({ label, level, hex }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="font-mono text-sm text-gray-300 min-w-0 leading-snug">{label}</span>
                    <span className="font-mono text-xs flex-shrink-0" style={{ color: hex }}>{level}%</span>
                  </div>
                  <div className="h-1.5 bg-cyber-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: hex }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h3 className="font-mono text-sm text-gray-500 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4" /> Toolbox
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border text-xs font-mono text-gray-300 hover:border-cyber-green/40 hover:text-cyber-green transition-colors cursor-default"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>

              <div className="mt-6 glass-card p-4">
                <p className="font-mono text-xs text-gray-500 mb-2">// certifications</p>
                {['OSCP (in progress)', 'eJPT — eLearnSecurity', 'Python Essentials 2 - NetAcademy'].map((cert) => (
                  <div key={cert} className="flex items-center gap-2 py-1.5 border-b border-cyber-border/30 last:border-0">
                    <Database className="w-3 h-3 text-cyber-purple flex-shrink-0" />
                    <span className="text-xs font-mono text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent posts */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-cyber-green" />
              <h2 className="section-heading">Latest Writeups</h2>
            </div>
            <Link to="/blog" className="btn-ghost text-xs py-1.5">
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(0, 3).map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
