// pages/api/manga-list.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllMangaList } from 'app/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const mangaList = await getAllMangaList();
    return res.status(200).json(mangaList);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch manga list' });
  }
}
