"use client";

import { useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  function addNote() {
    if (!note.trim()) return;

    setNotes([...notes, note]);
    setNote("");
  }

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <input type="text" className="border resize p-4" value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="border p-2" onClick={addNote}>
        Add note
      </button>
      <ol>
        {notes.map((item, index) => (
          <li key={index} className="p-2">{item}</li>
        ))}
      </ol>
    </main>
  );
}
