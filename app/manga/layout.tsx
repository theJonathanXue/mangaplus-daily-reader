import Navbar from '../components/mangaNavBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col  bg-[#191919] font-roboto h-screen no-scrollbar overflow-y-auto'>
      <Navbar />
      <div className=''>{children}</div>
    </div>
  )
}
