import { Package } from 'lucide-react'

const Logo = () => {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/30">
        <Package size={20} aria-hidden="true" />
      </span>

      <span className="text-lg font-bold tracking-tight text-slate-900">
        Product<span className="text-indigo-600">Hub</span>
      </span>
    </span>
  )
}

export default Logo
