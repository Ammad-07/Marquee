import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A "spotlight" cursor — ties to the events/stage-lighting concept.
 * Only activates on fine-pointer (desktop) devices; touch devices are
 * untouched so mobile UX never degrades.
 */
function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 320, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 320, mass: 0.4 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    setEnabled(isFine)
    if (!isFine) return undefined

    document.documentElement.classList.add('custom-cursor-active')

    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover], input, select')) {
        setHovering(true)
      }
    }
    const handleOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover], input, select')) {
        setHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mouseover', handleOver)
    window.addEventListener('mouseout', handleOut)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleOver)
      window.removeEventListener('mouseout', handleOut)
    }
  }, [cursorX, cursorY])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: hovering ? 64 : 28,
            height: hovering ? 64 : 28,
            opacity: hovering ? 0.55 : 0.35,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full bg-gradient-to-br from-gold-400 via-spotlight-500 to-stage-500 blur-md"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-cream-50"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
        }}
      />
    </>
  )
}

export default CustomCursor
