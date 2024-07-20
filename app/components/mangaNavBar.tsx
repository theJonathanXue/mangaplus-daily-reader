import { signOut } from 'app/auth'
import NavLinks from './navLinks'

export default function Navbar() {
  return (
    <nav>
      <div className='bg-[#191919] flex items-center max-h-[82px] py-0 pr-[2rem]'>
        <a href='https://mangaplus.shueisha.co.jp/updates'>
          <div className='w-[150px] relative top-[15px] z-[2]'>
            <img
              src='https://mangaplus.shueisha.co.jp/img/web_logo_190118_light-txt.06756983.png'
              className='w-full'
            />
            <div className='bg-[url(https://mangaplus.shueisha.co.jp/img/web_logo_190118_light-luffy.bcf5fcca.png)] bg-cover w-full h-full absolute inline-block	top-0 left-0'></div>
          </div>
        </a>

        <NavLinks />
        <div className='ml-auto relative'>
          <SignOut />
        </div>
      </div>
    </nav>
  )
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <button className='text-white' type='submit'>
        Sign out
      </button>
    </form>
  )
}
