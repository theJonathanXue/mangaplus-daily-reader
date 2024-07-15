import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE user_manga_list (
        user_id INTEGER REFERENCES "User"(id),
        manga_title TEXT REFERENCES manga_list(title),
        PRIMARY KEY (user_id, manga_title )
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
