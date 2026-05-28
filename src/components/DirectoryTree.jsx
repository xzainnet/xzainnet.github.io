import { Folder, FolderOpen, File, FileCode, FileText, Settings } from 'lucide-react'

function getIcon(name, isDir) {
  if (isDir) return FolderOpen
  const ext = name.split('.').pop()
  if (['py', 'js', 'jsx', 'ts', 'tsx', 'sh', 'php', 'rb'].includes(ext)) return FileCode
  if (['txt', 'md', 'log', 'conf', 'yaml', 'yml', 'json'].includes(ext)) return FileText
  if (['config', 'cfg', 'ini', 'env'].includes(ext)) return Settings
  return File
}

function getColor(name, isDir) {
  if (isDir) return 'text-cyber-blue'
  const ext = name.split('.').pop()
  if (['py'].includes(ext)) return 'text-cyber-green'
  if (['js', 'jsx', 'ts', 'tsx'].includes(ext)) return 'text-yellow-400'
  if (['sh', 'bash'].includes(ext)) return 'text-cyber-green'
  if (['php'].includes(ext)) return 'text-cyber-purple'
  if (['conf', 'yaml', 'yml', 'config', 'env'].includes(ext)) return 'text-cyber-purple'
  if (['txt', 'md', 'log'].includes(ext)) return 'text-gray-400'
  return 'text-gray-300'
}

function TreeNode({ node, depth = 0 }) {
  const Icon = getIcon(node.name, node.type === 'dir')
  const color = getColor(node.name, node.type === 'dir')

  return (
    <div>
      <div
        className={`flex items-center gap-1.5 py-0.5 hover:bg-cyber-bg/50 rounded px-1 transition-colors ${color}`}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
      >
        <Icon className="w-3.5 h-3.5 flex-shrink-0 opacity-80" />
        <span className="font-mono text-xs">{node.name}</span>
        {node.annotation && (
          <span className="text-gray-600 font-mono text-xs ml-2">// {node.annotation}</span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function DirectoryTree({ title, tree }) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-cyber-border bg-cyber-surface">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-cyber-bg/60 border-b border-cyber-border">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/70" />
        </div>
        <Folder className="w-3.5 h-3.5 text-cyber-blue" />
        <span className="font-mono text-xs text-gray-400">{title || 'directory'}</span>
      </div>
      <div className="p-3 overflow-x-auto">
        {tree.map((node, i) => (
          <TreeNode key={i} node={node} />
        ))}
      </div>
    </div>
  )
}
