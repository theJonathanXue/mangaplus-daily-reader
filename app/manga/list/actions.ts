'use server'

import { deleteUserMangaByTitle, insertUserMangaTitle } from '../../lib/db'

export async function deleteUserManga(userId: number, mangaTitle: string) {
  await deleteUserMangaByTitle(userId, mangaTitle)
}

export async function insertUserManga(userId: number, mangaTitle: string) {
  await insertUserMangaTitle(userId, mangaTitle)
}
