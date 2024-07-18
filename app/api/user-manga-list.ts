// pages/api/user-manga-list.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUserMangaList } from 'app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const userMangaList = await getAllUserMangaList(parseInt(userId as string));
    return res.status(200).json(userMangaList);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user manga list' });
  }
}
