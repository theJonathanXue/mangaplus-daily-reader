'use client'

import { useState } from 'react'
import Notification from './notification'
import { deleteUserManga, insertUserManga } from './actions'

interface Manga {
  title: string
  cover_src: string
  title_src: string
  latest_chapter_src: string
  latest_chapter_date: string
  update_day_of_week: string | null
}

export default function MangaList({
  mangaList,
  userMangaList,
  userId,
}: {
  mangaList: Manga[]
  userMangaList: Manga[]
  userId: number
}) {
  const [userMangas, setUserMangas] = useState(userMangaList || [])
  const [notification, setNotification] = useState({
    message: '',
    visible: false,
  })

  const handleAddRemoveManga = async (manga: Manga) => {
    try {
      if (userMangas.some((um) => um.title === manga.title)) {
        // Remove manga
        await deleteUserManga(userId, manga.title)
        setUserMangas(userMangas.filter((um) => um.title !== manga.title))
        setNotification({
          message: `${manga.title} removed from your list`,
          visible: true,
        })
      } else {
        // Add manga
        await insertUserManga(userId, manga.title)
        setUserMangas([...userMangas, manga])
        setNotification({
          message: `${manga.title} added to your list`,
          visible: true,
        })
      }
    } catch (error) {
      // Handle error if necessary
      console.error('Error handling manga:', error)
    }
  }

  const handleNotificationClose = () => {
    setNotification({ ...notification, visible: false })
  }

  return (
    <div className='relative'>
      <Notification
        message={notification.message}
        visible={notification.visible}
        onClose={handleNotificationClose}
      />
      <div className='flex align-center flex-row flex-nowrap text-white p-4 justify-between items-center min-h-[77px]'>
        <h2>User Manga List</h2>
      </div>
      <div className='flex justify-center flex-wrap bg-[#191919] min-h-[380px] p-[10px]'>
        {userMangas.length ? (
          userMangas.map((manga) => (
            <div
              className='flex-[0_0_calc(10%-15px)] p-[5px] min-w-[150px]'
              key={manga.title}
              onClick={() => handleAddRemoveManga(manga)}
            >
              <img src={manga.cover_src} alt={manga.title} className='w-full' />
              <div className='flex'>
                <p className='mt-[4px] text-white font-[500]'>{manga.title}</p>
              </div>
            </div>
          ))
        ) : (
          <div className='flex'>
            <p className='mt-[4px] text-white self-center'>No manga in list</p>
          </div>
        )}
      </div>
      <div className='flex align-center flex-row flex-nowrap text-white p-4 justify-between items-center min-h-[77px]'>
        <h2>All Manga List</h2>
      </div>
      <div className='flex justify-center flex-wrap bg-[#191919] pt-[10px]'>
        {mangaList.map((manga) => (
          <div
            className='flex-[0_0_calc(10%-15px)] p-[5px] min-w-[150px]'
            key={manga.title}
            onClick={() => handleAddRemoveManga(manga)}
          >
            <img src={manga.cover_src} alt={manga.title} className='w-full' />
            <div className='flex'>
              <p className='mt-[4px] text-white font-[500] text-[1rem]'>
                {manga.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
