import { useState, useCallback, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/booking', label: 'Book an Event' },
  { to: '/scheduler', label: 'Availability' },
  { to: '/services', label: 'Vendors' },
  { to: '/dashboard', label: 'Dashboard' },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const closeMenu = useCallback(() => setOpen(false), [])

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl glass-strong px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2" data-cursor-hover>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold">
            <Sparkles size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Marquee</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              data-cursor-hover
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/70 dark:bg-white/10 text-plum-900 dark:text-cream-50'
                    : 'text-plum-900/70 dark:text-cream-100/70 hover:text-plum-900 dark:hover:text-cream-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavLink to="/booking" className="btn-primary hidden text-sm md:inline-flex" data-cursor-hover>
            Book now
          </NavLink>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full glass md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            data-cursor-hover
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass-strong md:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${
                      isActive ? 'bg-white/70 dark:bg-white/10' : 'text-plum-900/70 dark:text-cream-100/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default memo(Navbar)
