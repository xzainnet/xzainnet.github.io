import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, DollarSign, Bug } from 'lucide-react'
import clsx from 'clsx'

const SEVERITY_STYLES = {
  Critical: 'tag-red',
  High:     'bg-orange-500/10 text-orange-400 border-orange-500/30',
  Medium:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  Low:      'tag-blue',
}

const CAT_STYLES = {
  'Bug Bounty':          'tag-green',
  'Penetration Testing': 'tag-purple',
}

export default function PostCard({ post, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block glass-card hover:border-cyber-green/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.06)] group overflow-hidden"
      >
        {/* Top gradient bar */}
        <div className={clsx('h-0.5 w-full bg-gradient-to-r', post.coverGradient.split(' ')[0], 'to-cyber-blue/60')} />

        <div className="p-6">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={clsx('tag', CAT_STYLES[post.category] || 'tag-blue')}>
              {post.category}
            </span>
            {post.severity && (
              <span className={clsx('tag', SEVERITY_STYLES[post.severity] || 'tag-blue')}>
                {post.severity}
              </span>
            )}
            {post.bounty && (
              <span className="tag bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                <DollarSign className="w-2.5 h-2.5 mr-0.5" />
                {post.bounty}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold text-white group-hover:text-cyber-green transition-colors mb-2 leading-snug">
            {post.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono bg-cyber-surface text-gray-500 border border-cyber-border/50">
                #{tag.toLowerCase().replace(/\s+/g, '-')}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
              {post.platform && (
                <span className="flex items-center gap-1">
                  <Bug className="w-3 h-3" />
                  {post.platform}
                </span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyber-green group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
