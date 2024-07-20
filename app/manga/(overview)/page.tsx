import { auth } from 'app/auth'
import { getAllUserMangaList } from '../../lib/db'
import UserMangaList from './userMangaList'

export default async function MangaListPage() {
  let session = await auth()
  const userMangaList = await getAllUserMangaList(parseInt(session?.user?.id!))

  return (
    <div className='flex flex-col  bg-black font-roboto h-full'>
      <UserMangaList userMangaList={userMangaList} />
    </div>
  )
}
