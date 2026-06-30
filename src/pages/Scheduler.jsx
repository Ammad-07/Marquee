import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, ArrowRight, Info } from 'lucide-react'
import Calendar from '../components/Calendar'
import { generateMonthSlots, SLOT_STATUS } from '../data/mockData'

const STATUS_COPY = {
  [SLOT_STATUS.AVAILABLE]: { title: 'Wide open', body: 'All time slots are free on this date. First come, first served.' },
  [SLOT_STATUS.LIMITED]: { title: 'Limited slots', body: 'A few time slots are already reserved — book soon to lock yours in.' },
  [SLOT_STATUS.BOOKED]: { title: 'Fully booked', body: 'This date is taken. Try a nearby day on the calendar.' },
}

function Scheduler() {
  const navigate = useNavigate()
  const [cursor, setCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)

  const slots = useMemo(() => generateMonthSlots(cursor.year, cursor.month), [cursor])

  const selectedStatus = selectedKey ? slots[selectedKey] : null

  const handleSelectDate = useCallback((dateObj, key) => {
    setSelectedDate(dateObj)
    setSelectedKey(key)
  }, [])

  const prevMonth = useCallback(() => {
    setCursor((c) => {
      const m = c.month === 0 ? 11 : c.month - 1
      const y = c.month === 0 ? c.year - 1 : c.year
      return { year: y, month: m }
    })
  }, [])

  const nextMonth = useCallback(() => {
    setCursor((c) => {
      const m = c.month === 11 ? 0 : c.month + 1
      const y = c.month === 11 ? c.year + 1 : c.year
      return { year: y, month: m }
    })
  }, [])

  const counts = useMemo(() => {
    const values = Object.values(slots)
    return {
      available: values.filter((s) => s === SLOT_STATUS.AVAILABLE).length,
      limited: values.filter((s) => s === SLOT_STATUS.LIMITED).length,
      booked: values.filter((s) => s === SLOT_STATUS.BOOKED).length,
    }
  }, [slots])

  const goToBooking = useCallback(() => {
    navigate('/booking')
  }, [navigate])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Live availability</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Real-time scheduler</h1>
          <p className="mt-2 max-w-md text-sm text-plum-900/65 dark:text-cream-100/65">
            Browse open dates across every venue. Status updates instantly as slots fill.
          </p>
        </div>
        <div className="flex gap-3">
          <StatPill label="Open" value={counts.available} color="bg-stage-500" />
          <StatPill label="Limited" value={counts.limited} color="bg-gold-400" />
          <StatPill label="Booked" value={counts.booked} color="bg-rose-500/70" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <Calendar
          year={cursor.year}
          month={cursor.month}
          slots={slots}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        <div className="glass-strong h-fit rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-spotlight-500 dark:text-gold-400" />
            <h3 className="font-display text-base font-semibold">Date details</h3>
          </div>

          <AnimatePresence mode="wait">
            {!selectedKey ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 flex items-start gap-2 text-sm text-plum-900/55 dark:text-cream-100/55"
              >
                <Info size={14} className="mt-0.5 shrink-0" /> Select a date on the calendar to see its availability.
              </motion.p>
            ) : (
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-4"
              >
                <p className="font-mono text-xs text-plum-900/50 dark:text-cream-100/50">
                  {selectedDate?.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <h4 className="mt-2 font-display text-lg font-semibold">
                  {selectedStatus ? STATUS_COPY[selectedStatus].title : 'Date passed'}
                </h4>
                <p className="mt-1 text-sm text-plum-900/65 dark:text-cream-100/65">
                  {selectedStatus ? STATUS_COPY[selectedStatus].body : 'This date is in the past.'}
                </p>

                {selectedStatus && selectedStatus !== SLOT_STATUS.BOOKED && (
                  <button onClick={goToBooking} className="btn-primary mt-5 w-full text-sm" data-cursor-hover>
                    Book this date <ArrowRight size={14} />
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value, color }) {
  return (
    <div className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {value} {label}
    </div>
  )
}

export default Scheduler
