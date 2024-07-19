import { drizzle } from 'drizzle-orm/postgres-js'
import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  unique,
} from 'drizzle-orm/pg-core'
import { eq, and } from 'drizzle-orm'
import postgres from 'postgres'
import { genSaltSync, hashSync } from 'bcrypt-ts'

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`)

let db = drizzle(client)

export async function getUser(email: string) {
  const users = await ensureTableExists()
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists()
  let salt = genSaltSync(10)
  let hash = hashSync(password, salt)

  return await db.insert(users).values({ email, password: hash })
}

export async function getAllMangaList() {
  return db.select().from(mangaListTable)
}

const mangaListTable = pgTable('manga_list', {
  title: text('title').primaryKey(),
  cover_src: text('cover_src').notNull(),
  title_src: text('title_src').notNull(),
  latest_chapter_src: text('latest_chapter_src').notNull(),
  latest_chapter_date: text('latest_chapter_date').notNull(),
  update_day_of_week: text('update_day_of_week'),
})

export const userMangaListTable = pgTable(
  'user_manga_list',
  {
    user_id: integer('user_id').notNull(),
    manga_title: text('manga_title').notNull(),
  },
  (t) => ({
    unq: unique().on(t.user_id, t.manga_title),
  })
)

export async function getAllUserMangaList(userId: number) {
  return db
    .select({
      title: mangaListTable.title,
      cover_src: mangaListTable.cover_src,
      title_src: mangaListTable.title_src,
      latest_chapter_src: mangaListTable.latest_chapter_src,
      latest_chapter_date: mangaListTable.latest_chapter_date,
      update_day_of_week: mangaListTable.update_day_of_week,
    })
    .from(userMangaListTable)
    .innerJoin(
      mangaListTable,
      eq(userMangaListTable.manga_title, mangaListTable.title)
    )
    .where(eq(userMangaListTable.user_id, userId))
}

export async function insertUserMangaTitle(userId: number, mangaTitle: string) {
  return db
    .insert(userMangaListTable)
    .values({ user_id: userId, manga_title: mangaTitle })
}

export async function deleteUserMangaByTitle(
  userId: number,
  mangaTitle: string
) {
  return db
    .delete(userMangaListTable)
    .where(
      and(
        eq(userMangaListTable.user_id, userId),
        eq(userMangaListTable.manga_title, mangaTitle)
      )
    )
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );`
  }

  const table = pgTable('User', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
  })

  return table
}
