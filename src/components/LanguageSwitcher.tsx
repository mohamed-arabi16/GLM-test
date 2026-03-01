'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Languages } from 'lucide-react'

const locales = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ar', name: 'العربية', flag: '🇹🇷' }
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
    setIsOpen(false)
  }

  const currentLocale = locales.find(l => l.code === locale)

  return (
    <div className="relative">
      <motion.button
        data-interactive
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button flex items-center space-x-2 px-4 py-2 rounded-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Languages className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLocale?.flag} {currentLocale?.name}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 z-50 glass-card rounded-lg p-2 min-w-[150px]"
            dir={locale === 'ar' ? 'rtl' : 'ltr'}
          >
            {locales.map((loc) => (
              <motion.button
                key={loc.code}
                data-interactive
                onClick={() => switchLocale(loc.code)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all ${
                  locale === loc.code
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted/50'
                }`}
                whileHover={{ x: locale === 'ar' ? -5 : 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-xl">{loc.flag}</span>
                <span className="font-medium">{loc.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
