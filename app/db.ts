import { drizzle } from 'drizzle-orm/postgres-js';
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';
import { eq } from 'drizzle-orm';
import postgres from 'postgres';
import { genSaltSync, hashSync } from 'bcrypt-ts';

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle
let client = postgres(`${process.env.POSTGRES_URL!}?sslmode=require`);
let db = drizzle(client);

export async function getUser(email: string) {
  const users = await ensureTableExists();
  return await db.select().from(users).where(eq(users.email, email));
}

export async function createUser(email: string, password: string) {
  const users = await ensureTableExists();
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await db.insert(users).values({ email, password: hash });
}

async function ensureTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'User'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "User" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(64),
        password VARCHAR(64)
      );`;
  }

  const table = pgTable('User', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 64 }),
    password: varchar('password', { length: 64 }),
  });

  return table;
}

export async function getAllMangaList() {
  const manga_list = await ensureMangaListTableExists();
  return await db.select().from(manga_list));
}

async function ensureMangaListTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'manga_list'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE "manga_list" (
        title TEXT PRIMARY KEY, 
        cover_src TEXT NOT NULL, 
        title_src TEXT NOT NULL, 
        latest_chapter_src TEXT NOT NULL, 
        latest_chapter_date TEXT NOT NULL, 
        update_day_of_week TEXT
      );`;
  }

  const table = pgTable('manga_list', {
    title: text('title').primaryKey(),
    cover_src: TEXT('cover_src').notNull(),
    title_src: TEXT('title_src').notNull(),
    latest_chapter_src: TEXT('latest_chapter_src').notNull(),
    latest_chapter_date: TEXT('latest_chapter_date').notNull(),
    update_day_of_week: TEXT('update_day_of_week'),
  });

  return table;
}

export async function getAllUserMangaList(id: integer) {
  const user_manga_list = await ensureUserMangaListTableExists();
  return await db.select().from(user_manga_list).where(eq(users.id, id));
}

async function ensureUserMangaListTableExists() {
  const result = await client`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'user_manga_list'
    );`;

  if (!result[0].exists) {
    await client`
      CREATE TABLE user_manga_list (
        user_id INTEGER REFERENCES "User"(id),
        manga_title TEXT REFERENCES manga_list(title),
        PRIMARY KEY (user_id, manga_title)
      );`;
  }

  const table = pgTable('user_manga_list', {
    user_id: INTEGER('user_id').primaryKey(),
    manga_title: TEXT('manga_title').primaryKey(),
  });

  return table;
}

export async function deleteUserMangaBytitle(user_id: integer, manga_title: string) {
  await db.delete(user_manga_list).where(
    and(
      eq(user_manga_list.user_id, user_id),
      eq(user_manga_list.manga_title, manga_title)
    )
  );
}

export async function insertUserManga(user_id: integer, manga_title: string) => {
  return db.insert(user_manga_list).values({ user_id, manga_title });
}
