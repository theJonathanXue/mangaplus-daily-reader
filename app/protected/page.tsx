import { useState, useEffect } from 'react';
import { auth, signOut } from 'app/auth';

export default function ProtectedPage() {
  const [session, setSession] = useState(null);
  const [mangaList, setMangaList] = useState([]);
  const [userMangaList, setUserMangaList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const sessionData = await auth();
      console.log(sessionData)
      setSession(sessionData);
      if (sessionData?.user?.id) {
        const [allMangaList, userManga] = await Promise.all([
          fetch('/api/manga-list').then((res) => res.json()),
          fetch(`/api/user-manga-list?userId=${sessionData.user.id}`).then((res) => res.json())
        ]);
        setMangaList(allMangaList);
        setUserMangaList(userManga);
      }
    }
    fetchData();
  }, []);

  async function handleMangaClick(mangaTitle) {
    if (userMangaList.find(manga => manga.manga_title === mangaTitle)) {
      await fetch('/api/remove-user-manga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, mangaTitle })
      });
    } else {
      await fetch('/api/add-user-manga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, mangaTitle })
      });
    }
    const updatedUserManga = await fetch(`/api/user-manga-list?userId=${session.user.id}`).then((res) => res.json());
    setUserMangaList(updatedUserManga);
  }

  async function checkLatestChapters() {
    const today = new Date().toISOString().split('T')[0];
    userMangaList.forEach(manga => {
      if (manga.latest_chapter_date === today) {
        window.open(manga.latest_chapter_src, '_blank');
      }
    });
  }

  if (!session) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
        You are logged in as {session?.user?.email}
        Your id is {session?.user?.id}

        <SignOut />

        <div className="carousel">
          {userMangaList.map((manga, index) => (
            <div key={index} className="carousel-item">
              <img src={manga.cover_src} alt={manga.title} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {mangaList.map((manga, index) => (
            <div key={index} onClick={() => handleMangaClick(manga.title)}>
              <img src={manga.cover_src} alt={manga.title} />
            </div>
          ))}
        </div>

        <button onClick={checkLatestChapters}>Check for Latest Chapters</button>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
}
