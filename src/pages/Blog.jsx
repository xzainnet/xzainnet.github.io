import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Terminal } from 'lucide-react'
import PostCard from '../components/PostCard'
import { posts } from '../data/posts'
import clsx from 'clsx'

const ALL_TAGS = ['All', ...Array.from(new Set(posts.flatMap((p) => p.tags)))]
const CATEGORIES = ['All', 'Bug Bounty', 'Penetration Testing']

export default function Blog() {
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('All')
  const [tag,      setTag]      = useState('All')

  const filtered = posts.filter((p) => {
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchCat = category === 'All' || p.category === category
    const matchTag = tag === 'All' || p.tags.includes(tag)
    return matchSearch && matchCat && matchTag
  })

  return (
    <main className="relative z-10 pt-24 pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-5 h-5 text-cyber-green" />
            <span className="font-mono text-xs text-cyber-green">ls ./writeups</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Security Writeups</h1>
          <p className="text-gray-400 text-sm max-w-xl">
            Detailed technical writeups on bug bounty findings, penetration testing engagements,
            and security research. All vulnerabilities were reported responsibly.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search writeups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-cyber-surface border border-cyber-border rounded-lg pl-10 pr-4 py-2.5 text-sm font-mono text-gray-300 placeholder-gray-600 focus:outline-none focus:border-cyber-green/50 transition-colors"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-gray-500" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={clsx(
                  'px-3 py-1 rounded-full text-xs font-mono transition-colors border',
                  category === cat
                    ? 'bg-cyber-green/10 border-cyber-green/40 text-cyber-green'
                    : 'bg-transparent border-cyber-border text-gray-500 hover:border-cyber-green/20 hover:text-gray-300'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tag filter */}
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.slice(0, 12).map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={clsx(
                  'px-2.5 py-0.5 rounded text-xs font-mono transition-colors',
                  tag === t
                    ? 'bg-cyber-blue/15 text-cyber-blue border border-cyber-blue/30'
                    : 'bg-cyber-surface text-gray-600 border border-cyber-border/50 hover:text-gray-400'
                )}
              >
                {t === 'All' ? 'all' : `#${t.toLowerCase().replace(/\s+/g, '-')}`}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <p className="font-mono text-xs text-gray-600 mb-5">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          {search && ` for "${search}"`}
        </p>

        {/* Posts grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card">
            <Terminal className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="font-mono text-gray-500 text-sm">No writeups found</p>
            <p className="font-mono text-xs text-gray-600 mt-1">try a different search or filter</p>
          </div>
        )}
      </div>
    </main>
  )
}
