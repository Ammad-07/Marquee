import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark and light mode"
      data-cursor-hover
      className="relative flex h-9 w-16 items-center rounded-full glass px-1 transition-colors"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-spotlight-500 text-velvet-950 shadow-glow-gold"
        style={{ marginLeft: isDark ? 'auto' : 0 }}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </motion.div>
    </button>
  )
}

export default ThemeToggle
