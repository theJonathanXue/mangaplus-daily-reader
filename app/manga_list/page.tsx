import { auth, signOut } from 'app/auth'
import { getAllMangaList, getAllUserMangaList } from '../lib/db'
import Navbar from '../components/Navbar'
import UserMangaList from './userMangaList'

export default async function MangaListPage() {
  let session = await auth()
  const [userMangaList, mangaList] = await Promise.all([
    getAllUserMangaList(parseInt(session?.user?.id!)),
    getAllMangaList(),
  ])

  if (!mangaList || mangaList.length === 0) {
    return <p className='mt-4 text-gray-400'>No data available.</p>
  }

  return (
    <div className='flex flex-col  bg-black'>
      <Navbar />
      <UserMangaList
        mangaList={mangaList}
        userMangaList={userMangaList}
        userId={parseInt(session?.user?.id!)}
      />
    </div>
  )
}
