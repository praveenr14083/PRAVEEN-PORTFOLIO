'use client'
import { motion } from 'motion/react'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo / Name Animation */}
        <div className="flex gap-1 text-3xl font-bold tracking-widest">
          {'PRAVEEN'.split('').map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.4,
                ease: 'easeOut',
              }}
              className="text-foreground"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-[2px] bg-muted overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-primary-color"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Sub Text */}
        <motion.p
          className="text-xs uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Crafting Experience...
        </motion.p>
      </div>

      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary-color/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  )
}
