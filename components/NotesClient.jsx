"use client";
import React, { useState } from "react";

const NotesClient = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();
    if(!title.trim() || !content.trim()) return;

    setLoading(true)
    try {
        const response = await fetch("/api/notes", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, content})
        })
        const result  = await response.json();
        console.log(result)
        setLoading(false)
    } catch (error) {
        console.error("Error while Creating Note:", error)
    }
  }

  return (
    <div className="space-y-6">
      <form
       onSubmit={createNote}
      className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-gray-800 font-semibold mb-4">
          Create New Note
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-purple-300 focus:ring-1 focus:ring-blue-500"
          ></textarea>

          <button
            disabled={loading}
            className="bg-blue-500 px-6 py-2 rounded-md text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating....." : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesClient;
