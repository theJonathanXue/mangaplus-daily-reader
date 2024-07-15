import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';
import { eq, and } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Database client setup
const client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
const db = drizzle(client);

// User Table Schema
const usersTable = pgTable('User', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull(),
  password: varchar('password', { length: 64 }).notNull(),
});

// Manga List Table Schema
const mangaListTable = pgTable('manga_list', {
  title: text('title').primaryKey(),
  cover_src: text('cover_src').notNull(),
  title_src: text('title_src').notNull(),
  latest_chapter_src: text('latest_chapter_src').notNull(),
  latest_chapter_date: text('latest_chapter_date').notNull(),
  update_day_of_week: text('update_day_of_week'),
});

// User Manga List Table Schema
const userMangaListTable = pgTable('user_manga_list', {
  user_id: integer('user_id').primaryKey(),
  manga_title: text('manga_title').primaryKey(),
});

// Ensure tables exist
async function ensureTableExists(tableName: string, createTableSQL: string) {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = ${tableName}
    );`;

  if (!result[0].exists) {
    await client.raw(createTableSQL);
  }
}

// Ensure User Table Exists
async function ensureUserTableExists() {
  await ensureTableExists('User', `
    CREATE TABLE "User" (
      id SERIAL PRIMARY KEY,
      email VARCHAR(64) NOT NULL,
      password VARCHAR(64) NOT NULL
    );`);
}

// Ensure Manga List Table Exists
async function ensureMangaListTableExists() {
  await ensureTableExists('manga_list', `
    CREATE TABLE "manga_list" (
      title TEXT PRIMARY KEY, 
      cover_src TEXT NOT NULL, 
      title_src TEXT NOT NULL, 
      latest_chapter_src TEXT NOT NULL, 
      latest_chapter_date TEXT NOT NULL, 
      update_day_of_week TEXT
    );`);
}

// Ensure User Manga List Table Exists
async function ensureUserMangaListTableExists() {
  await ensureTableExists('user_manga_list', `
    CREATE TABLE user_manga_list (
      user_id INTEGER REFERENCES "User"(id),
      manga_title TEXT REFERENCES manga_list(title),
      PRIMARY KEY (user_id, manga_title)
    );`);
}

// Get User
export async function getUser(email: string) {
  await ensureUserTableExists();
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
}

// Create User
export async function createUser(email: string, password: string) {
  await ensureUserTableExists();
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  return await db.insert(usersTable).values({ email, password: hash });
}

// Get All Manga List
export async function getAllMangaList() {
  await ensureMangaListTableExists();
  return await db.select().from(mangaListTable);
}

// Get All User Manga List
export async function getAllUserMangaList(userId: number) {
  await ensureUserMangaListTableExists();
  return await db.select().from(userMangaListTable).where(eq(userMangaListTable.user_id, userId));
}

// Delete User Manga by Title
export async function deleteUserMangaByTitle(userId: number, mangaTitle: string) {
  await ensureUserMangaListTableExists();
  return await db.delete(userMangaListTable).where(
    and(
      eq(userMangaListTable.user_id, userId),
      eq(userMangaListTable.manga_title, mangaTitle)
    )
  );
}

// Insert User Manga
export async function insertUserManga(userId: number, mangaTitle: string) {
  await ensureUserMangaListTableExists();
  return await db.insert(userMangaListTable).values({ user_id: userId, manga_title: mangaTitle });
}
