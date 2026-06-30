import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

function AnimatedCounter({ value, suffix = '', duration = 1.6, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration, bounce: 0 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  const display = useRef(null)

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (display.current) {
        display.current.textContent = Math.round(latest).toLocaleString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, suffix])

  return (
    <motion.span ref={ref} className={className}>
      <span ref={display}>0{suffix}</span>
    </motion.span>
  )
}

export default AnimatedCounter
