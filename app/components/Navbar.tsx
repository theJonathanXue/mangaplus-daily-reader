import { signOut } from 'app/auth'

export default function Navbar() {
  return (
    <nav className='bg-gray-800 p-4 flex justify-between items-center'>
      <div className='text-white'>Manga Reader</div>
      <SignOut />
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
