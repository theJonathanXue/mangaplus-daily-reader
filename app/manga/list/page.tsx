import { auth } from 'app/auth'
import { getAllMangaList, getAllUserMangaList } from '../../lib/db'
import MangaList from './mangaList'

export default async function MangaListPage() {
  let session = await auth()

  if (!session) {
    return <p className='mt-4 text-gray-400'>No data available.</p>
  }
  const [userMangaList, mangaList] = await Promise.all([
    getAllUserMangaList(parseInt(session?.user?.id!)),
    getAllMangaList(),
  ])

  if (!mangaList || mangaList.length === 0) {
    return <p className='mt-4 text-gray-400'>No data available.</p>
  }

  return (
    <div className='flex flex-col  bg-black font-roboto'>
      <MangaList
        mangaList={mangaList}
        userMangaList={userMangaList}
        userId={parseInt(session?.user?.id!)}
      />
    </div>
  )
}
