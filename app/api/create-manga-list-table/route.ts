import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE manga_list ( 
        title TEXT PRIMARY KEY, 
        cover_src TEXT NOT NULL, 
        title_src TEXT NOT NULL, 
        latest_chapter_src TEXT NOT NULL, 
        latest_chapter_date TEXT NOT NULL, 
        latest_chapter_date TEXT NOT NULL 
        update_day_of_week TEXT
        );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
