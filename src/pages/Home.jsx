import { lazy, Suspense, useRef, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarCheck, Search, PartyPopper, Heart, Cake, Briefcase, Music, Gem, GraduationCap } from 'lucide-react'
import AnimatedCounter from '../components/AnimatedCounter'
import VendorCard from '../components/VendorCard'
import { EVENT_TYPES, STATS, VENDORS, TESTIMONIALS } from '../data/mockData'

// Hero3D pulls in the Three.js stack — split into its own chunk so the
// rest of the landing page paints immediately while it streams in.
const Hero3D = lazy(() => import('../components/Hero3D'))

const ICONS = { Heart, Cake, Briefcase, Music, Gem, GraduationCap }

const PROCESS_STEPS = [
  { n: '01', title: 'Tell us the occasion', body: 'Pick an event type, guest count, and the vibe you want.', icon: PartyPopper },
  { n: '02', title: 'Check live availability', body: 'See open, limited, and booked dates on the real-time calendar.', icon: CalendarCheck },
  { n: '03', title: 'Compare vetted vendors', body: 'Filter venues, caterers, and photographers by rating and price.', icon: Search },
]

function HeroFallback() {
  return (
    <div className="flex h-[360px] w-full items-center justify-center sm:h-[440px] lg:h-[520px]">
      <div className="skeleton h-56 w-56 rounded-full sm:h-72 sm:w-72" />
    </div>
  )
}

function Home() {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const fgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  const featuredVendors = useMemo(() => VENDORS.slice(0, 3), [])

  const scrollToProcess = useCallback(() => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden px-4 pt-10 sm:pt-16">
        <div className="absolute inset-0 -z-10 bg-marquee-gradient" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="eyebrow">Booking desk for unforgettable nights</span>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Plan it. Book it.
              <br />
              <span className="gradient-text">Light up the room.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-plum-900/70 dark:text-cream-100/70">
              Marquee puts venues, vendors, and live availability in one place — so the only thing
              left to plan is what you'll wear.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/booking" className="btn-primary" data-cursor-hover>
                Start booking <ArrowRight size={16} />
              </Link>
              <button onClick={scrollToProcess} className="btn-secondary" data-cursor-hover>
                See how it works
              </button>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.id}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-semibold text-spotlight-500 dark:text-gold-400">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dd className="mt-1 text-xs text-plum-900/55 dark:text-cream-100/55">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <Suspense fallback={<HeroFallback />}>
              <Hero3D />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-24">
        <div className="mb-12 max-w-xl">
          <span className="eyebrow">How it works</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Three steps to a booked date</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-spotlight-500 dark:text-gold-400">{step.n}</span>
                <step.icon size={20} className="text-spotlight-500 dark:text-gold-400" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-plum-900/65 dark:text-cream-100/65">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- Parallax banner ---------- */}
      <section ref={parallaxRef} className="relative my-8 overflow-hidden py-28">
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 bg-marquee-gradient opacity-80" />
        <motion.div style={{ y: bgY }} className="absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-spotlight-500/20 blur-3xl" />
        <motion.div style={{ y: fgY }} className="absolute -right-10 bottom-0 -z-10 h-80 w-80 rounded-full bg-stage-500/20 blur-3xl" />
        <motion.div
          style={{ y: fgY }}
          className="mx-auto max-w-3xl px-4 text-center"
        >
          <p className="font-display text-2xl font-medium leading-snug sm:text-3xl">
            "Every detail — venue, light, sound, and seating — arranged before the first guest arrives."
          </p>
          <span className="mt-4 block text-sm text-plum-900/55 dark:text-cream-100/55">The Marquee promise</span>
        </motion.div>
      </section>

      {/* ---------- Event types ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Occasions</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built for every kind of night</h2>
          </div>
          <Link to="/booking" className="hidden items-center gap-1 text-sm font-medium text-spotlight-500 dark:text-gold-400 sm:flex" data-cursor-hover>
            See pricing <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {EVENT_TYPES.map((type, i) => {
            const Icon = ICONS[type.icon]
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <Link
                  to="/booking"
                  state={{ eventType: type.id }}
                  data-cursor-hover
                  className="group flex flex-col items-center gap-3 rounded-2xl glass p-5 text-center transition-shadow hover:shadow-glow"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-400/20 to-spotlight-500/20 text-spotlight-500 transition-colors group-hover:from-gold-400 group-hover:to-spotlight-500 group-hover:text-velvet-950 dark:text-gold-400">
                    {Icon && <Icon size={18} />}
                  </span>
                  <span className="text-sm font-medium">{type.label}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ---------- Vendor preview ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Trusted vendors</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A shortlist, already vetted</h2>
          </div>
          <Link to="/services" className="hidden items-center gap-1 text-sm font-medium text-spotlight-500 dark:text-gold-400 sm:flex" data-cursor-hover>
            Browse all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10">
          <span className="eyebrow">Said after the lights came up</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Hosts who booked with Marquee</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass flex flex-col justify-between rounded-2xl p-6"
            >
              <blockquote className="text-sm leading-relaxed text-plum-900/80 dark:text-cream-100/80">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-spotlight-500 text-xs font-semibold text-velvet-950">
                  {t.initials}
                </span>
                <span>
                  <span className="block text-sm font-medium">{t.name}</span>
                  <span className="block text-xs text-plum-900/50 dark:text-cream-100/50">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="glass-strong relative overflow-hidden rounded-4xl px-6 py-16 text-center">
          <div className="absolute inset-0 -z-10 bg-marquee-gradient" />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Your date is still open. Not for long.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-plum-900/65 dark:text-cream-100/65">
            Start a booking in under two minutes — no account, no back-and-forth.
          </p>
          <Link to="/booking" className="btn-primary mt-7 inline-flex" data-cursor-hover>
            Book your event <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
