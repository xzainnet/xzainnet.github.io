import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Terminal, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

const NAV_ITEMS = [
  { to: '/',       label: '~/home',    exact: true },
  { to: '/about',  label: '~/about' },
  { to: '/blog',   label: '~/blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-cyber-bg/80 backdrop-blur-xl border-b border-cyber-border/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center group-hover:bg-cyber-green/20 transition-colors">
            <Shield className="w-4 h-4 text-cyber-green" />
          </div>
          <span className="font-mono font-semibold text-white text-sm">
            <span className="text-cyber-green">yousef</span>
            <span className="text-gray-500">@</span>
            <span className="text-cyber-blue">sec</span>
            <span className="text-gray-500 animate-[typeCursor_1s_step-end_infinite]">_</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                clsx('nav-link', isActive && 'active')
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="https://www.linkedin.com/in/yousef-zain/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost py-1.5 text-xs"
          >
            <Terminal className="w-3.5 h-3.5" />
            LinkedIn
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-cyber-bg/95 backdrop-blur-xl border-b border-cyber-border/60 px-6 pb-5 pt-2"
          >
            {NAV_ITEMS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'block py-3 font-mono text-sm border-b border-cyber-border/30 last:border-0',
                    isActive ? 'text-cyber-green' : 'text-gray-400'
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
