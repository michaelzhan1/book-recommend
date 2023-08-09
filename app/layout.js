import './globals.css'
import { Roboto } from 'next/font/google'

const robotoMono = Roboto({ subsets: ['latin'], weight: ['300'] })

export const metadata = {
  title: 'Your Bookshelf',
  description: 'Bookshelf app using Google Books API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} bg-gray-200`}>{children}</body>
    </html>
  )
}
