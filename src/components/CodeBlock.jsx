import { useState } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const customStyle = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'transparent',
    margin: 0,
    padding: '1.25rem',
    fontSize: '0.8rem',
    lineHeight: '1.7',
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  },
}

export default function CodeBlock({ code, language = 'bash', filename }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-cyber-border bg-cyber-surface">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-cyber-bg/60 border-b border-cyber-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/70" />
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <Terminal className="w-3 h-3" />
            <span className="font-mono text-xs">{filename || language}</span>
          </div>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-cyber-green transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-cyber-green" />
              <span className="text-cyber-green">copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              copy
            </>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={customStyle}
        showLineNumbers
        wrapLines
        customStyle={{ background: 'transparent' }}
        lineNumberStyle={{ color: '#374151', fontSize: '0.7rem', minWidth: '2rem', paddingRight: '1rem' }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
