import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import VendorCard from '../components/VendorCard'
import { VENDORS, VENDOR_CATEGORIES } from '../data/mockData'

function Services() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return VENDORS.filter((v) => {
      const matchesCategory = category === 'All' || v.category === category
      const matchesQuery = v.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const handleCategory = useCallback((cat) => setCategory(cat), [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <span className="eyebrow">Vendors &amp; services</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything your event needs</h1>
        <p className="mt-2 max-w-md text-sm text-plum-900/65 dark:text-cream-100/65">
          Venues, photographers, caterers and more — vetted, rated, and ready to book.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {VENDOR_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              data-cursor-hover
              className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                category === cat
                  ? 'bg-gradient-to-r from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold'
                  : 'glass text-plum-900/65 hover:text-plum-900 dark:text-cream-100/65 dark:hover:text-cream-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-plum-900/40 dark:text-cream-100/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vendors…"
            className="input-glass pl-10"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl py-20 text-center text-sm text-plum-900/55 dark:text-cream-100/55"
          >
            No vendors match "{query}" in {category}.
          </motion.div>
        ) : (
          <motion.div
            key={category + query}
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filtered.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Services
