'use client'

interface Manga {
  title: string
  cover_src: string
  title_src: string
  latest_chapter_src: string
  latest_chapter_date: string
  update_day_of_week: string | null
}

import { useState } from 'react'
import { deleteUserManga, insertUserManga } from './actions'

export default function UserMangaList({
  mangaList,
  userMangaList,
  userId,
}: {
  mangaList: Manga[]
  userMangaList: Manga[]
  userId: number
}) {
  const [userMangas, setUserMangas] = useState(userMangaList)
  const handleAddRemoveManga = async (manga: Manga) => {
    console.log(userMangaList)
    if (userMangas.some((um) => um.title === manga.title)) {
      // Remove manga
      await deleteUserManga(userId, manga.title)
      setUserMangas(userMangas.filter((um) => um.title !== manga.title))
    } else {
      // Add manga
      await insertUserManga(userId, manga.title)
      setUserMangas([...userMangas, manga])
    }
  }

  return (
    <div className='relative mb-[30px]'>
      <div className='flex align-center flex-row flex-nowrap mb-[8px] text-white p-4'>
        <h2>User Manga List</h2>
      </div>
      <div className='flex justify-center flex-wrap'>
        {userMangas.length ? (
          userMangas.map((manga) => (
            <div
              className='flex-[0_0_calc(10%-15px)] p-[5px] min-w-[150px]'
              key={manga.title}
              onClick={() => handleAddRemoveManga(manga)}
            >
              <img src={manga.cover_src} alt={manga.title} className='w-full' />
              <div className='flex'>
                <p className='mt-[4px] text-white'>{manga.title}</p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex'>
            <p className='mt-[4px] text-white'>No manga in list</p>
          </div>
        )}
      </div>
      <div className='flex align-center flex-row flex-nowrap mb-[8px] text-white p-4'>
        <h2>All Manga List</h2>
      </div>
      <div className='flex justify-center flex-wrap'>
        {/* {/* <h2>Your Manga List</h2>
        <div className='carousel'>
          {userMangas.map((manga) => (
            <img key={manga.title} src={manga.cover_src} alt={manga.title} />
          ))}
        </div> */}
        {/* <button onClick={saveUserMangaList}>Save User Manga List</button> */}
        {/* <!-- ✅ Grid Section - Starts Here 👇 --> */}
        {mangaList.map((manga) => (
          <div
            className='flex-[0_0_calc(10%-15px)] p-[5px] min-w-[150px]'
            key={manga.title}
            onClick={() => handleAddRemoveManga(manga)}
          >
            <img src={manga.cover_src} alt={manga.title} className='w-full' />
            <div className='flex'>
              <p className='mt-[4px] text-white'>{manga.title}</p>
            </div>
          </div>
        ))}
        {/* <button onClick={openSelectedDaysChapters}>Read Chapters</button> */}
      </div>
    </div>
  )

  async function saveUserMangaList() {
    // find difference between start user manga list and editted user manga list
  }

  // async function openSelectedDaysChapters() {
  //   const today = new Date().toISOString().split('T')[0]
  //   userMangas.forEach((manga) => {
  //     if (manga.latest_chapter_date === today) {
  //       window.open(manga.latest_chapter_src, '_blank')
  //     }
  //   })
  // }
}
