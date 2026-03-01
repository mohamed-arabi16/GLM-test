'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function WeirdCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Morphing effect
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000
  const scale = useTransform(mouseX, [0, windowWidth], [1, 1.5])
  const rotate = useTransform(mouseY, [0, windowHeight], [0, 360])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)

    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('[data-interactive]')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('[data-interactive]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : clicking ? 0.8 : 1,
          borderRadius: isHovering ? '50%' : clicking ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '50%',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full bg-white/80 backdrop-blur-sm border-2 border-white/50" />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: useSpring(mouseX, { damping: 40, stiffness: 400 }),
          y: useSpring(mouseY, { damping: 40, stiffness: 400 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 0.6,
        }}
      >
        <div className="w-full h-full bg-primary rounded-full" />
      </motion.div>

      {/* Weird shape followers */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9997] hidden lg:block"
        style={{
          x: useSpring(mouseX, { damping: 60, stiffness: 200 }),
          y: useSpring(mouseY, { damping: 60, stiffness: 200 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full border border-primary/30 rounded-full" />
      </motion.div>

      {/* Another weird shape */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 pointer-events-none z-[9996] hidden lg:block"
        style={{
          x: useSpring(mouseX, { damping: 80, stiffness: 150 }),
          y: useSpring(mouseY, { damping: 80, stiffness: 150 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="w-full h-full border border-accent/20" style={{
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%'
        }} />
      </motion.div>
    </>
  )
}
