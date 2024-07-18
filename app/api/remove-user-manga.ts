// pages/api/remove-user-manga.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserMangaByTitle } from 'app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mangaTitle } = req.body;

  if (!userId || !mangaTitle) {
    return res.status(400).json({ error: 'User ID and manga title are required' });
  }

  try {
    await deleteUserMangaByTitle(parseInt(userId), mangaTitle);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove manga from user list' });
  }
}
