import { pool } from '@/lib/db'

type Note = {
  id: number;
  title: string;
  content: string | null;
  created_at: Date;
}

export default async function Home() {
  const result = await pool.query<Note>(
    "SELECT id, title, content, created_at FROM notes ORDER BY created_at DESC, id DESC;"
  );
  const notes = result.rows;
  return (
    <main>
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
