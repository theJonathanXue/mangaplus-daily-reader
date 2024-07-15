import { auth, signOut } from 'app/auth';
import { getAllMangaList } from 'app/db';
import { getAllUserMangaList } from 'app/db';
import { deleteUserMangaByTitle } from 'app/db';
import { insertUserManga } from 'app/db';

export default async function ProtectedPage() {
  let session = await auth();
  
  console.log("session: ", session)
  return (
    <div className="flex h-screen bg-black">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
        You are logged in as {session?.user?.email}
        
        Your id is {session?.user?.id}
        <SignOut />
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
