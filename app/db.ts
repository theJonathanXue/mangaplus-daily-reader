// db.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Initialize drizzle and database connection
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
const db = drizzle(client);

// Define tables
const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
});

const mangaListTable = pgTable('manga_list', {
  title: text('title').primaryKey(),
  cover_src: text('cover_src').notNull(),
  title_src: text('title_src').notNull(),
  latest_chapter_src: text('latest_chapter_src').notNull(),
  latest_chapter_date: text('latest_chapter_date').notNull(),
  update_day_of_week: text('update_day_of_week'),
});

const userMangaListTable = pgTable('user_manga_list', {
  user_id: integer('user_id').notNull(),
  manga_title: text('manga_title').notNull(),
  primaryKey: ['user_id', 'manga_title'],
});

// Database functions
export async function getUser(email: string) {
  return db.select().from(usersTable).where(eq(usersTable.email, email));
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return db.insert(usersTable).values({ email, password: hash });
}

export async function getAllMangaList() {
  return db.select().from(mangaListTable);
}

export async function getAllUserMangaList(userId: number) {
  return db.select().from(userMangaListTable).where(eq(userMangaListTable.user_id, userId));
}

export async function insertUserManga(userId: number, mangaTitle: string) {
  return db.insert(userMangaListTable).values({ user_id: userId, manga_title: mangaTitle });
}

export async function deleteUserMangaByTitle(userId: number, mangaTitle: string) {
  return db.delete(userMangaListTable).where(
    eq(userMangaListTable.user_id, userId),
    eq(userMangaListTable.manga_title, mangaTitle)
  );
}
