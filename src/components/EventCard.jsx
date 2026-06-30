import { memo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, MapPin, X } from 'lucide-react'
import OptimizedImage from './OptimizedImage'

const STATUS_STYLES = {
  upcoming: 'bg-stage-500/15 text-stage-500 dark:text-stage-400',
  past: 'bg-plum-900/10 text-plum-900/60 dark:bg-white/10 dark:text-cream-100/60',
  cancelled: 'bg-rose-500/15 text-rose-500',
}

function EventCard({ event, onCancel }) {
  const dateLabel = new Date(`${event.date}T00:00:00`).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="ticket-stub glass flex flex-col overflow-hidden sm:flex-row"
    >
      <div className="sm:w-44">
        <OptimizedImage src={event.cover} alt={event.title} aspect="aspect-[4/3] sm:aspect-square" />
      </div>

      <div className="ticket-perforation hidden w-px sm:block" />

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold leading-snug">{event.title}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLES[event.status]}`}>
              {event.status}
            </span>
          </div>
          <p className="mt-1 text-xs text-plum-900/50 dark:text-cream-100/50">{event.type}</p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-plum-900/70 dark:text-cream-100/70">
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {dateLabel}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} /> {event.time}</span>
          <span className="flex items-center gap-1.5"><Users size={13} /> {event.guests} guests</span>
          <span className="flex items-center gap-1.5"><MapPin size={13} /> {event.venue}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-plum-900/10 pt-3 dark:border-white/10">
          <span className="font-mono text-sm font-semibold text-spotlight-500 dark:text-gold-400">
            ${event.price.toLocaleString()}
          </span>
          {event.status === 'upcoming' && onCancel && (
            <button
              onClick={() => onCancel(event.id)}
              data-cursor-hover
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-plum-900/60 transition hover:bg-rose-500/10 hover:text-rose-500 dark:text-cream-100/60"
            >
              <X size={12} /> Cancel
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default memo(EventCard)
