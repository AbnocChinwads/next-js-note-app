"use client";

import { useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  function handleSubmit() {
    if (!note.trim()) return;

    if (editIndex !== null) {
      const updatedNotes = notes.map((item, index) =>
        index === editIndex ? note : item,
      );

      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, note]);
    }

    setNote("");
  }

  function deleteNote(indexToRemove: number) {
    setNotes(
      notes.filter((_, index) => {
        return index !== indexToRemove;
      }),
    );
  }

  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <input
        type="text"
        className="border resize p-2 my-2"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="border p-1" onClick={handleSubmit}>
        {editIndex !== null ? "Save" : "Add Note"}
      </button>
      <ol className="p-2">
        {notes.map((item, index) => (
          <li key={index}>
            {item}
            <button className="ml-1"
              onClick={() => {
                setNote(item);
                setEditIndex(index);
              }}
            >
              Edit
            </button>
            <button className="ml-1" onClick={() => deleteNote(index)}>Delete</button>
          </li>
        ))}
      </ol>
    </main>
  );
}
