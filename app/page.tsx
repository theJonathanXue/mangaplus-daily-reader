import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex h-screen bg-black'>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <img src='https://mangaplus.shueisha.co.jp/img/web_logo_190118_light-txt.06756983.png' />
        <div className='text-center max-w-screen-sm mb-10'>
          <h1 className='text-stone-200 font-bold text-2xl'>
            Mangaplus Daily Reader
          </h1>
          <p className='text-stone-400 mt-5'>
            Open new tabs for all of the latest daily chapter updates from{' '}
            <a
              href='https://mangaplus.shueisha.co.jp/updates'
              target='_blank'
              rel='noopener noreferrer'
              className='text-stone-400 underline hover:text-stone-200 transition-all'
            >
              Mangaplus
            </a>{' '}
          </p>
        </div>
        <div className='flex space-x-3'>
          <Link
            href='/manga'
            className='text-stone-400 underline hover:text-stone-200 transition-all'
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
