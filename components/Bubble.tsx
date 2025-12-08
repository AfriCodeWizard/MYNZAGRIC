'use client'

import { motion } from 'framer-motion'

interface BubbleProps {
  size: number
  left: number
  delay: number
  duration: number
}

export default function Bubble({ size, left, delay, duration }: BubbleProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: `inset 0 0 ${size * 0.3}px rgba(255,255,255,0.3), 0 0 ${size * 0.4}px rgba(255,255,255,0.2)`,
      }}
      initial={{ bottom: '-10%', opacity: 0, scale: 0.8 }}
      animate={{
        bottom: '110%',
        opacity: [0, 0.4, 0.3, 0.2, 0],
        scale: [0.8, 1, 1.1, 1.2],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
      aria-hidden="true"
    />
  )
}

