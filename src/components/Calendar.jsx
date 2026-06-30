import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SLOT_STATUS } from '../data/mockData'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const STATUS_DOT = {
  [SLOT_STATUS.AVAILABLE]: 'bg-stage-500',
  [SLOT_STATUS.LIMITED]: 'bg-gold-400',
  [SLOT_STATUS.BOOKED]: 'bg-rose-500/70',
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function Calendar({ year, month, slots, selectedDate, onSelectDate, onPrevMonth, onNextMonth, compact = false }) {
  const today = useMemo(() => new Date(), [])
  const monthLabel = useMemo(
    () => new Date(year, month, 1).toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
    [year, month]
  )

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const arr = []
    for (let i = 0; i < firstDay; i++) arr.push(null)
    for (let d = 1; d <= daysInMonth; d++) arr.push(d)
    return arr
  }, [year, month])

  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">{monthLabel}</h3>
        <div className="flex gap-1">
          <button
            onClick={onPrevMonth}
            aria-label="Previous month"
            data-cursor-hover
            className="flex h-8 w-8 items-center justify-center rounded-full glass transition-transform hover:scale-110"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            onClick={onNextMonth}
            aria-label="Next month"
            data-cursor-hover
            className="flex h-8 w-8 items-center justify-center rounded-full glass transition-transform hover:scale-110"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-plum-900/40 dark:text-cream-100/40">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />
          const dateObj = new Date(year, month, day)
          const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const status = slots[key]
          const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const isSelected = selectedDate && isSameDay(dateObj, selectedDate)
          const isToday = isSameDay(dateObj, today)
          const disabled = isPast || status === SLOT_STATUS.BOOKED

          return (
            <motion.button
              key={idx}
              whileHover={!disabled ? { scale: 1.1 } : {}}
              whileTap={!disabled ? { scale: 0.92 } : {}}
              disabled={disabled}
              data-cursor-hover
              onClick={() => onSelectDate(dateObj, key)}
              className={`relative flex flex-col items-center justify-center rounded-xl text-xs font-medium transition-colors ${
                compact ? 'h-9' : 'h-11'
              } ${
                isSelected
                  ? 'bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold'
                  : disabled
                    ? 'cursor-not-allowed text-plum-900/25 line-through dark:text-cream-100/20'
                    : 'text-plum-900/80 hover:bg-white/70 dark:text-cream-100/80 dark:hover:bg-white/10'
              } ${isToday && !isSelected ? 'ring-1 ring-gold-400/60' : ''}`}
            >
              {day}
              {status && !isSelected && (
                <span className={`absolute bottom-1 h-1 w-1 rounded-full ${STATUS_DOT[status]}`} />
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-plum-900/10 pt-3 text-[11px] text-plum-900/55 dark:border-white/10 dark:text-cream-100/55">
        <Legend color="bg-stage-500" label="Available" />
        <Legend color="bg-gold-400" label="Limited" />
        <Legend color="bg-rose-500/70" label="Booked" />
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} /> {label}
    </span>
  )
}

export default memo(Calendar)
