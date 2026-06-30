import { useState, useMemo, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart, Cake, Briefcase, Music, Gem, GraduationCap,
  Users, Clock, Check, ArrowRight, ArrowLeft, Camera,
  UtensilsCrossed, Flower2, Music2, Lightbulb, Ticket,
} from 'lucide-react'
import Calendar from '../components/Calendar'
import { EVENT_TYPES, PACKAGE_TIERS, ADDONS, TIME_SLOTS, generateMonthSlots } from '../data/mockData'
import { useBookings } from '../context/BookingsContext'

const ICONS = { Heart, Cake, Briefcase, Music, Gem, GraduationCap, Camera, UtensilsCrossed, Flower2, Music2, Lightbulb }
const STEPS = ['Occasion', 'Date & time', 'Package', 'Review']

function Booking() {
  const location = useLocation()
  const navigate = useNavigate()
  const { addBooking } = useBookings()

  const [step, setStep] = useState(0)
  const [eventTypeId, setEventTypeId] = useState(location.state?.eventType ?? EVENT_TYPES[0].id)
  const [guests, setGuests] = useState(80)
  const [calendarCursor, setCalendarCursor] = useState(() => {
    const now = new Date()
    return { year: now.getFullYear(), month: now.getMonth() }
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDateKey, setSelectedDateKey] = useState(null)
  const [time, setTime] = useState(null)
  const [packageId, setPackageId] = useState(PACKAGE_TIERS[0].id)
  const [addons, setAddons] = useState([])
  const [hostName, setHostName] = useState('')

  const slots = useMemo(
    () => generateMonthSlots(calendarCursor.year, calendarCursor.month),
    [calendarCursor]
  )

  const eventType = useMemo(() => EVENT_TYPES.find((e) => e.id === eventTypeId), [eventTypeId])
  const pkg = useMemo(() => PACKAGE_TIERS.find((p) => p.id === packageId), [packageId])

  const addonTotal = useMemo(
    () => addons.reduce((sum, id) => sum + (ADDONS.find((a) => a.id === id)?.price ?? 0), 0),
    [addons]
  )

  const subtotal = useMemo(() => {
    if (!eventType) return 0
    return Math.round((eventType.basePrice + eventType.perGuest * guests) * pkg.multiplier)
  }, [eventType, guests, pkg])

  const total = useMemo(() => subtotal + addonTotal, [subtotal, addonTotal])

  const toggleAddon = useCallback((id) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]))
  }, [])

  const handleSelectDate = useCallback((dateObj, key) => {
    setSelectedDate(dateObj)
    setSelectedDateKey(key)
    setTime(null)
  }, [])

  const prevMonth = useCallback(() => {
    setCalendarCursor((c) => {
      const m = c.month === 0 ? 11 : c.month - 1
      const y = c.month === 0 ? c.year - 1 : c.year
      return { year: y, month: m }
    })
  }, [])

  const nextMonth = useCallback(() => {
    setCalendarCursor((c) => {
      const m = c.month === 11 ? 0 : c.month + 1
      const y = c.month === 11 ? c.year + 1 : c.year
      return { year: y, month: m }
    })
  }, [])

  const canAdvance = useMemo(() => {
    if (step === 0) return Boolean(eventTypeId) && guests > 0
    if (step === 1) return Boolean(selectedDateKey) && Boolean(time)
    if (step === 2) return Boolean(packageId)
    return true
  }, [step, eventTypeId, guests, selectedDateKey, time, packageId])

  const goNext = useCallback(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), [])
  const goBack = useCallback(() => setStep((s) => Math.max(s - 1, 0)), [])

  const handleConfirm = useCallback(() => {
    addBooking({
      title: `${hostName ? hostName + ' — ' : ''}${eventType.label} Event`,
      type: eventType.label,
      date: selectedDateKey,
      time,
      guests,
      venue: 'To be assigned',
      price: total,
      cover: `https://picsum.photos/seed/marquee-new-${eventTypeId}/600/400`,
    })
    navigate('/dashboard')
  }, [addBooking, hostName, eventType, selectedDateKey, time, guests, total, eventTypeId, navigate])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10">
        <span className="eyebrow">Book an event</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Let's find your date</h1>
      </div>

      <Stepper step={step} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* ---------- Form steps ---------- */}
        <div className="glass min-h-[420px] rounded-2xl p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrap key="step0">
                <FieldLabel>Event type</FieldLabel>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {EVENT_TYPES.map((type) => {
                    const Icon = ICONS[type.icon]
                    const active = type.id === eventTypeId
                    return (
                      <button
                        key={type.id}
                        onClick={() => setEventTypeId(type.id)}
                        data-cursor-hover
                        className={`flex flex-col items-start gap-2 rounded-xl p-4 text-left transition-all ${
                          active
                            ? 'bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold'
                            : 'glass hover:shadow-glow'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-semibold">{type.label}</span>
                        <span className={`text-[11px] ${active ? 'text-velvet-950/70' : 'text-plum-900/50 dark:text-cream-100/50'}`}>
                          {type.description}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <FieldLabel className="mt-7">Guest count</FieldLabel>
                <div className="flex items-center gap-4">
                  <Users size={18} className="text-spotlight-500 dark:text-gold-400" />
                  <input
                    type="range"
                    min={10}
                    max={500}
                    step={10}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    data-cursor-hover
                    className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-plum-900/10 accent-spotlight-500 dark:bg-white/10"
                  />
                  <span className="w-16 text-right font-mono text-sm font-semibold">{guests}</span>
                </div>

                <FieldLabel className="mt-7">Your name (optional)</FieldLabel>
                <input
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                  placeholder="e.g. Ammad Khan"
                  className="input-glass"
                />
              </StepWrap>
            )}

            {step === 1 && (
              <StepWrap key="step1">
                <FieldLabel>Pick a date</FieldLabel>
                <Calendar
                  year={calendarCursor.year}
                  month={calendarCursor.month}
                  slots={slots}
                  selectedDate={selectedDate}
                  onSelectDate={handleSelectDate}
                  onPrevMonth={prevMonth}
                  onNextMonth={nextMonth}
                />

                <FieldLabel className="mt-7">Pick a time</FieldLabel>
                {selectedDateKey ? (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setTime(slot)}
                        data-cursor-hover
                        className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                          time === slot
                            ? 'bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold'
                            : 'glass hover:shadow-glow'
                        }`}
                      >
                        <Clock size={12} /> {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-plum-900/50 dark:text-cream-100/50">Choose a date above to see open time slots.</p>
                )}
              </StepWrap>
            )}

            {step === 2 && (
              <StepWrap key="step2">
                <FieldLabel>Package</FieldLabel>
                <div className="grid gap-3 sm:grid-cols-3">
                  {PACKAGE_TIERS.map((tier) => {
                    const active = tier.id === packageId
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setPackageId(tier.id)}
                        data-cursor-hover
                        className={`flex flex-col items-start gap-1.5 rounded-xl p-4 text-left transition-all ${
                          active
                            ? 'bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold'
                            : 'glass hover:shadow-glow'
                        }`}
                      >
                        <span className="text-sm font-semibold">{tier.label}</span>
                        <span className={`text-[11px] ${active ? 'text-velvet-950/70' : 'text-plum-900/50 dark:text-cream-100/50'}`}>
                          {tier.blurb}
                        </span>
                        <span className="mt-1 font-mono text-xs">×{tier.multiplier}</span>
                      </button>
                    )
                  })}
                </div>

                <FieldLabel className="mt-7">Add-ons</FieldLabel>
                <div className="grid gap-2 sm:grid-cols-2">
                  {ADDONS.map((addon) => {
                    const Icon = ICONS[addon.icon]
                    const active = addons.includes(addon.id)
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        data-cursor-hover
                        className={`flex items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm transition-all ${
                          active ? 'glass shadow-glow ring-1 ring-gold-400/60' : 'glass'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon size={15} className="text-spotlight-500 dark:text-gold-400" /> {addon.label}
                        </span>
                        <span className="flex items-center gap-2 font-mono text-xs">
                          +${addon.price}
                          {active && <Check size={13} className="text-spotlight-500 dark:text-gold-400" />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </StepWrap>
            )}

            {step === 3 && (
              <StepWrap key="step3">
                <FieldLabel>Review your booking</FieldLabel>
                <ul className="space-y-3 text-sm">
                  <ReviewRow label="Occasion" value={eventType.label} />
                  <ReviewRow label="Date" value={selectedDateKey ? new Date(`${selectedDateKey}T00:00:00`).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' }) : '—'} />
                  <ReviewRow label="Time" value={time ?? '—'} />
                  <ReviewRow label="Guests" value={guests} />
                  <ReviewRow label="Package" value={pkg.label} />
                  <ReviewRow label="Add-ons" value={addons.length ? addons.map((id) => ADDONS.find((a) => a.id === id)?.label).join(', ') : 'None'} />
                </ul>
                <button onClick={handleConfirm} className="btn-primary mt-7 w-full sm:w-auto" data-cursor-hover>
                  <Ticket size={16} /> Confirm booking
                </button>
              </StepWrap>
            )}
          </AnimatePresence>

          {step < 3 && (
            <div className="mt-8 flex items-center justify-between border-t border-plum-900/10 pt-5 dark:border-white/10">
              <button
                onClick={goBack}
                disabled={step === 0}
                data-cursor-hover
                className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-plum-900/60 transition disabled:opacity-0 dark:text-cream-100/60"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={goNext}
                disabled={!canAdvance}
                data-cursor-hover
                className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                Continue <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ---------- Live price summary ---------- */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="ticket-stub glass-strong p-6">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Price estimate</span>
              <Ticket size={16} className="text-gold-400" />
            </div>

            <motion.div
              key={total}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 font-mono text-4xl font-semibold gradient-text"
            >
              ${total.toLocaleString()}
            </motion.div>
            <p className="mt-1 text-xs text-plum-900/50 dark:text-cream-100/50">Estimated total, taxes not included</p>

            <div className="ticket-perforation my-5 h-px w-full" />

            <ul className="space-y-2 text-xs text-plum-900/65 dark:text-cream-100/65">
              <li className="flex justify-between"><span>Base + guests ({guests})</span><span className="font-mono">${Math.round((eventType?.basePrice ?? 0) + (eventType?.perGuest ?? 0) * guests).toLocaleString()}</span></li>
              <li className="flex justify-between"><span>{pkg.label} package</span><span className="font-mono">×{pkg.multiplier}</span></li>
              <li className="flex justify-between"><span>Add-ons</span><span className="font-mono">${addonTotal.toLocaleString()}</span></li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-1.5">
              <Badge>{eventType?.label}</Badge>
              {selectedDateKey && <Badge>{selectedDateKey}</Badge>}
              {time && <Badge>{time}</Badge>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stepper({ step }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 items-center gap-2">
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
              i <= step ? 'bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950' : 'glass text-plum-900/40 dark:text-cream-100/40'
            }`}
          >
            {i + 1}
          </div>
          <span className={`hidden text-xs font-medium sm:inline ${i <= step ? '' : 'text-plum-900/40 dark:text-cream-100/40'}`}>{label}</span>
          {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? 'bg-gold-400' : 'bg-plum-900/10 dark:bg-white/10'}`} />}
        </div>
      ))}
    </div>
  )
}

function StepWrap({ children, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function FieldLabel({ children, className = '' }) {
  return <p className={`mb-3 text-xs font-semibold uppercase tracking-wide text-plum-900/50 dark:text-cream-100/50 ${className}`}>{children}</p>
}

function ReviewRow({ label, value }) {
  return (
    <li className="flex items-center justify-between border-b border-plum-900/10 pb-2 dark:border-white/10">
      <span className="text-plum-900/55 dark:text-cream-100/55">{label}</span>
      <span className="font-medium">{value}</span>
    </li>
  )
}

function Badge({ children }) {
  return <span className="rounded-full bg-plum-900/5 px-2.5 py-1 text-[11px] font-medium dark:bg-white/5">{children}</span>
}

export default Booking
