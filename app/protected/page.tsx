import { GetServerSideProps } from 'next';
import { auth } from 'app/auth';
import { getAllMangaList, getAllUserMangaList, insertUserManga, deleteUserMangaByTitle } from 'app/db';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await auth(context.req, context.res);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const [mangaList, userMangaList] = await Promise.all([
    getAllMangaList(),
    getAllUserMangaList(session.user.id),
  ]);

  return {
    props: {
      session,
      mangaList,
      userMangaList,
    },
  };
};

export default function ProtectedPage({ session, mangaList, userMangaList }) {
  async function handleMangaClick(mangaTitle) {
    const isInUserList = userMangaList.find((manga) => manga.manga_title === mangaTitle);
    if (isInUserList) {
      await fetch('/api/remove-user-manga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, mangaTitle }),
      });
    } else {
      await fetch('/api/add-user-manga', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, mangaTitle }),
      });
    }
    // Ideally, re-fetch user manga list here and update state
  }

  async function checkLatestChapters() {
    const today = new Date().toISOString().split('T')[0];
    userMangaList.forEach((manga) => {
      if (manga.latest_chapter_date === today) {
        window.open(manga.latest_chapter_src, '_blank');
      }
    });
  }

  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
        You are logged in as {session.user.email}
        Your id is {session.user.id}

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
