import { redirect } from 'next/navigation';

export default function RootLayout() {
  // Redirect to default locale
  redirect('/en');
}
