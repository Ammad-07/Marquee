import { memo } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import OptimizedImage from './OptimizedImage'
import StarRating from './StarRating'

function VendorCard({ vendor }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      data-cursor-hover
      className="group glass overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-glow"
    >
      <div className="relative">
        <OptimizedImage src={vendor.image} alt={vendor.name} aspect="aspect-[4/3]" />
        <span className="absolute left-3 top-3 rounded-full bg-velvet-950/70 px-3 py-1 text-[11px] font-medium text-cream-50 backdrop-blur">
          {vendor.category}
        </span>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spotlight-500/0 via-spotlight-500/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:from-spotlight-500/20" />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base font-semibold">{vendor.name}</h3>
        <div className="mt-1.5">
          <StarRating rating={vendor.rating} reviews={vendor.reviews} />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {vendor.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-plum-900/5 px-2.5 py-1 text-[11px] text-plum-900/60 dark:bg-white/5 dark:text-cream-100/60"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-plum-900/10 pt-3 dark:border-white/10">
          <span className="flex items-center gap-1 text-xs text-plum-900/50 dark:text-cream-100/50">
            <MapPin size={12} /> Gujranwala
          </span>
          <span className="font-mono text-sm font-semibold text-spotlight-500 dark:text-gold-400">
            from ${vendor.priceFrom.toLocaleString()}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(VendorCard)
