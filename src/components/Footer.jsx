import { Link } from 'react-router-dom'
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react'

const SOCIAL = [
  { icon: Github,   href: 'https://github.com/xzainnet',    label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yousef-zain', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:yousefzain06@outlook.sa', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-cyber-border/40 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-cyber-green" />
            <span className="font-mono text-sm text-gray-500">
              <span className="text-cyber-green">yousef</span>@<span className="text-cyber-blue">sec</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-cyber-border flex items-center justify-center text-gray-500 hover:text-cyber-green hover:border-cyber-green/40 transition-colors"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <p className="font-mono text-xs text-gray-600">
            © {new Date().getFullYear()} — built with{' '}
            <span className="text-cyber-red">♥</span> &amp; caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}
