import { pool } from '@/lib/db'
import { revalidatePath } from 'next/cache';

type Note = {
  id: number;
  title: string;
  content: string | null;
  created_at: Date;
}

async function addNote(formData: FormData) {
  "use server";
  const title = formData.get("title") as string;
  const content = formData.get("content" as string) || null;

  await pool.query(
    "INSERT INTO notes (title, content) VALUES ($1, $2)",
    [title, content]
  );

  revalidatePath("/");
}

export default async function Home() {
  const result = await pool.query<Note>(
    "SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC, id DESC;"
  );
  const notes = result.rows;
  return (
    <main>
      <form action={addNote}>
      <input name="title" required maxLength={100} /> 
      <textarea name="content" />
      <button type="submit">Add Note</button>
      </form>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content ?? "Empty"}</p>
            <small>{note.created_at.toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
