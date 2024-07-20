import './globals.css'

let title = 'mangaplus-daily-reader'
let description =
  'Automatically open tabs for all updated Shonen Jump chapters that you are currently reading from https://mangaplus.shueisha.co.jp/'

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  metadataBase: new URL('https://mangaplus-daily-reader-frontend.vercel.app/'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className='flex flex-col  bg-black font-roboto h-screen no-scrollbar overflow-y-auto'>
        {children}
      </body>
    </html>
  )
}
