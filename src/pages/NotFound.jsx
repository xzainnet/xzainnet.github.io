import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Terminal, AlertTriangle, ArrowRight } from 'lucide-react'

const LINES = [
  { delay: 0.3,  color: 'text-gray-500',   text: '❯ GET {path} HTTP/1.1' },
  { delay: 0.7,  color: 'text-gray-600',   text: '> Host: xzainnet.github.io' },
  { delay: 1.0,  color: 'text-gray-600',   text: '> Accept: text/html' },
  { delay: 1.3,  color: 'text-gray-500',   text: '' },
  { delay: 1.6,  color: 'text-cyber-red',  text: '< HTTP/1.1 404 Not Found' },
  { delay: 1.9,  color: 'text-gray-600',   text: '< Server: GitHub.com' },
  { delay: 2.2,  color: 'text-gray-600',   text: '< Content-Length: 0' },
  { delay: 2.5,  color: 'text-gray-500',   text: '' },
  { delay: 2.8,  color: 'text-cyber-red',  text: '[!] Target unreachable — page does not exist' },
]

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-16">
      <div className="max-w-2xl w-full">

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card mb-8 overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-4 py-2.5 bg-cyber-bg/60 border-b border-cyber-border">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/70" />
            <div className="flex items-center gap-1.5 ml-2 text-gray-600">
              <Terminal className="w-3 h-3" />
              <span className="font-mono text-xs">http — request log</span>
            </div>
          </div>

          {/* Log lines */}
          <div className="p-4 font-mono text-xs space-y-1">
            {LINES.map(({ delay, color, text }, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay, duration: 0.25 }}
                className={color}
              >
                {text.replace('{path}', pathname)}
              </motion.p>
            ))}

            {/* Blinking cursor line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.1 }}
              className="text-cyber-green"
            >
              ❯{' '}
              <span className="animate-[typeCursor_1s_step-end_infinite]">|</span>
            </motion.p>
          </div>
        </motion.div>

        {/* 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 120 }}
          className="text-center mb-6"
        >
          <div className="relative inline-block">
            {/* Glow layers */}
            <span
              aria-hidden
              className="absolute inset-0 text-[9rem] sm:text-[12rem] font-black font-mono leading-none text-cyber-red/10 blur-2xl select-none"
            >
              404
            </span>
            <span
              aria-hidden
              className="absolute inset-0 text-[9rem] sm:text-[12rem] font-black font-mono leading-none text-cyber-red/25 blur-md select-none"
            >
              404
            </span>
            {/* Main number */}
            <h1 className="relative text-[9rem] sm:text-[12rem] font-black font-mono leading-none text-transparent bg-clip-text bg-gradient-to-b from-cyber-red via-cyber-red/80 to-cyber-red/20 select-none">
              404
            </h1>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-red/30 bg-cyber-red/5 mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-cyber-red" />
            <span className="font-mono text-xs text-cyber-red tracking-wider">PAGE NOT FOUND</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            The target you're looking for doesn't exist, was moved, or never existed.
            Double-check the URL or navigate back to safety.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4" />
            ~/home
          </Link>
          <Link to="/blog" className="btn-ghost">
            View Writeups
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-600 hover:text-cyber-green transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            go back
          </button>
        </motion.div>

      </div>
    </main>
  )
}
