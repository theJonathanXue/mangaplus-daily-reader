'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Updates', href: '/manga' },
  {
    name: 'Manga List',
    href: '/manga/list',
  },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <div className='ml-[2.5rem] uppercase tracking-[.15em] leading-[100px] self-center'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'inline-block text-[#bebebe] hover:text-[#ffd600] mr-[1.5rem] ml-[1.5rem]',
              {
                ' text-[#ffd600]': pathname === link.href,
              }
            )}
          >
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </div>
  )
}
