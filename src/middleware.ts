import createMiddleware from 'next-intl/middleware';
import { locales } from '@/i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
