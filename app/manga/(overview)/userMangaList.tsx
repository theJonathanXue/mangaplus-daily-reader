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

export default function UserMangaList({
  userMangaList,
}: {
  userMangaList: Manga[]
}) {
  const [userMangas, setUserMangas] = useState(userMangaList || null)

  const [filter, setFilter] = useState('today')
  const filteredMangas = userMangas.filter((manga) => {
    if (filter === 'today') {
      const today = new Date().getDate().toString()
      const day = manga.latest_chapter_date.split(' ')[1].replace(',', '')

      return day === today
    }
    if (filter === 'all') {
      return true
    }
    return manga.update_day_of_week === filter
  })

  const openAllTabs = () => {
    filteredMangas.forEach((manga) => {
      window.open(manga.latest_chapter_src, '_blank')
    })
  }

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  return (
    <div className='relative '>
      <div className='flex align-center flex-row flex-nowrap text-white bg-black p-4 justify-between items-center min-h-[77px]'>
        <h2>User Manga List</h2>
        <button
          onClick={openAllTabs}
          className='bg-black border-[#ffd600] text-[#ffd600] 
        rounded-[5px] text-center p-0 h-[45px] leading-[45px] min-w-[100px]
        font-light uppercase tracker-[.2rem] block border-[1px] border-solid'
        >
          Open Tabs
        </button>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='bg-black border-[#ffd600] text-[#ffd600] 
        rounded-[5px] text-center h-[45px] leading-[45px] min-w-[150px]
        font-light uppercase tracker-[.2rem] block border-[1px] border-solid focus:outline-none'
        >
          <option className='border-[#ffd600]'>today</option>
          <option className='border-[#ffd600]'>all</option>
          {daysOfWeek.map((day) => (
            <option
              key={day.toLowerCase()}
              value={day.toLowerCase()}
              className='border-[#ffd600]'
            >
              {day}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center flex-wrap bg-[#191919] min-h-[380px] p-[10px]'>
        {filteredMangas?.length ? (
          filteredMangas.map((manga) => (
            <div
              className='flex-[0_0_calc(10%-15px)] p-[5px] min-w-[150px]'
              key={manga.title}
            >
              <a href={manga.title_src} target='_blank'>
                <img
                  src={manga.cover_src}
                  alt={manga.title}
                  className='w-full'
                />
                <div className='flex'>
                  <p className='mt-[4px] text-white font-[500] 	'>
                    {manga.title}
                  </p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className='flex'>
            <p className='mt-[4px] text-white	self-center'>No manga in list</p>
          </div>
        )}
      </div>
    </div>
  )

  // async function openSelectedDaysChapters() {
  //   const today = new Date().toISOString().split('T')[0]
  //   userMangas.forEach((manga) => {
  //     if (manga.latest_chapter_date === today) {
  //       window.open(manga.latest_chapter_src, '_blank')
  //     }
  //   })
  // }
}
