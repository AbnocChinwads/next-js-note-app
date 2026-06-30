"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<string[]>(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      return JSON.parse(savedNotes);
    }

    return [];
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

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

  function clearNotes() {
    setNotes([]);
  }

  return (
    <section className="flex justify-center bg-gray-50 dark:bg-black">
      <div className="w-full max-w-xl p-6">
        <div>
          <textarea
            className="border resize-none p-2 my-2 w-full"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div>
            <button className="border p-1" onClick={handleSubmit}>
              {editIndex !== null ? "Save" : "Add Note"}
            </button>
          </div>
        </div>
        {notes.length === 0 ? (
          <div>
            <p className="p-2 text-gray-500">No notes yet - add one above ^</p>
          </div>
        ) : (
          <div>
            <ol className="p-2">
              {notes.map((item, index) => (
                <li key={index}>
                  {item}
                  <button
                    className="ml-1"
                    onClick={() => {
                      setNote(item);
                      setEditIndex(index);
                    }}
                  >
                    Edit
                  </button>
                  <button className="ml-1" onClick={() => deleteNote(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ol>
            <button className="border p-1 ml-2" onClick={clearNotes}>
              Clear All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
