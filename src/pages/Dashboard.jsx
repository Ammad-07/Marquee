import { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Plus, Sparkles } from 'lucide-react'
import EventCard from '../components/EventCard'
import AnimatedCounter from '../components/AnimatedCounter'
import { useBookings } from '../context/BookingsContext'

const TABS = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
]

function Dashboard() {
  const { upcoming, past, cancelled, cancelBooking } = useBookings()
  const [activeTab, setActiveTab] = useState('upcoming')

  const lists = useMemo(() => ({ upcoming, past, cancelled }), [upcoming, past, cancelled])
  const activeList = lists[activeTab]

  const totalGuests = useMemo(
    () => upcoming.reduce((sum, e) => sum + e.guests, 0),
    [upcoming]
  )
  const totalSpend = useMemo(
    () => [...upcoming, ...past].reduce((sum, e) => sum + e.price, 0),
    [upcoming, past]
  )

  const handleCancel = useCallback((id) => cancelBooking(id), [cancelBooking])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Your dashboard</span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Every event, one screen</h1>
        </div>
        <Link to="/booking" className="btn-primary text-sm" data-cursor-hover>
          <Plus size={15} /> New booking
        </Link>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Upcoming events" value={upcoming.length} icon={Sparkles} />
        <StatCard label="Total guests" value={totalGuests} icon={LayoutGrid} />
        <StatCard label="Lifetime spend" value={totalSpend} prefix="$" icon={Sparkles} />
        <StatCard label="Vendors booked" value={8} icon={LayoutGrid} />
      </div>

      {/* ---------- Tabs ---------- */}
      <div className="mb-6 flex items-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            data-cursor-hover
            className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'text-velvet-950' : 'text-plum-900/55 hover:text-plum-900 dark:text-cream-100/55 dark:hover:text-cream-50'
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="active-tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-spotlight-500"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">
              {tab.label} <span className="opacity-60">({lists[tab.id].length})</span>
            </span>
          </button>
        ))}
      </div>

      {/* ---------- Event list ---------- */}
      <AnimatePresence mode="wait">
        {activeList.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass flex flex-col items-center justify-center gap-3 rounded-2xl py-20 text-center"
          >
            <Sparkles className="text-spotlight-500 dark:text-gold-400" />
            <p className="text-sm text-plum-900/60 dark:text-cream-100/60">Nothing here yet.</p>
            <Link to="/booking" className="btn-secondary text-sm" data-cursor-hover>
              Book your first event
            </Link>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 lg:grid-cols-2"
          >
            <AnimatePresence>
              {activeList.map((event) => (
                <EventCard key={event.id} event={event} onCancel={activeTab === 'upcoming' ? handleCancel : undefined} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function StatCard({ label, value, prefix = '', icon: Icon }) {
  return (
    <div className="glass rounded-2xl p-4">
      <Icon size={16} className="text-spotlight-500 dark:text-gold-400" />
      <div className="mt-3 font-mono text-xl font-semibold sm:text-2xl">
        {prefix}
        <AnimatedCounter value={value} />
      </div>
      <p className="mt-1 text-[11px] text-plum-900/55 dark:text-cream-100/55">{label}</p>
    </div>
  )
}

export default Dashboard
