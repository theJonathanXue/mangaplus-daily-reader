// pages/api/add-user-manga.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { insertUserManga } from 'app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, mangaTitle } = req.body;

  if (!userId || !mangaTitle) {
    return res.status(400).json({ error: 'User ID and manga title are required' });
  }

  try {
    await insertUserManga(parseInt(userId), mangaTitle);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add manga to user list' });
  }
}
