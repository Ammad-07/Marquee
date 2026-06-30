import { Sparkles, Instagram, Twitter, Linkedin } from 'lucide-react'

function Footer() {
  return (
    <footer className="mt-24 border-t border-plum-900/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950">
                <Sparkles size={16} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-semibold">Marquee</span>
            </div>
            <p className="mt-3 text-sm text-plum-900/60 dark:text-cream-100/60">
              The booking desk for nights people remember.
            </p>
            <div className="mt-4 flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  data-cursor-hover
                  className="flex h-8 w-8 items-center justify-center rounded-full glass transition-transform hover:scale-110"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Plan" items={['Book an event', 'Check availability', 'Browse vendors', 'Pricing']} />
          <FooterColumn title="Company" items={['About', 'Careers', 'Press', 'Contact']} />
          <FooterColumn title="Support" items={['Help center', 'Cancellations', 'Trust & safety', 'Status']} />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-plum-900/10 pt-6 text-xs text-plum-900/50 dark:border-white/10 dark:text-cream-100/50 sm:flex-row">
          <span>© 2026 Marquee. A frontend UI concept — no real bookings are made.</span>
          <span className="font-mono">Built with React + Vite</span>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="text-sm text-plum-900/60 hover:text-spotlight-500 dark:text-cream-100/60 dark:hover:text-gold-400" data-cursor-hover>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footer
