import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4 uses `requestLocale` Promise
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  const validLocale = (locale && locales.includes(locale as Locale)) ? locale : 'en';

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  }
})
