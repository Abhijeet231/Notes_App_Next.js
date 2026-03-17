"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Create Note
  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("New Notes Created..");
        setTitle("");
        setContent("");
      }
      setLoading(false);
    } catch (error) {
      toast.error("EVERYTHING Went wrong, while creating Notes !!!!!");
      console.error("Error while Creating Note:", error);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Notes deleted successfully...");
      }
    } catch (error) {
      toast.error("Something went wrong while DELETING notes");
      console.error("Error while deleting notes", error);
    }
  };

  // Update Note
  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Notes Edited Successfully");
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        setEditingId(null);
        setEditContent("");
        setEditTitle("");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong while Editing Note!!");
      console.error("Error while updaing note:", error);
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = (note) => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
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
            placeholder="Enter Title"
          />

          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-md border border-gray-500 focus:outline-purple-300 focus:ring-1 focus:ring-blue-500 text-gray-800"
          ></textarea>

          <button
            disabled={loading}
            className="bg-blue-500 px-6 py-2 rounded-md text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating....." : "Create Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Notes {notes.length}</h2>

        {notes.length === 0 ? (
          <p> No Notes yet. Create Your first Note above</p>
        ) : (
          notes.map((note) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md text-gray-900"
              key={note._id}
            >
              {editingId === note._id ? (
                <>
                  <div className="space-y-5 ">
                    <input
                      type="text"
                      className="w-full p-3 rounded-md border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Enter Title"
                      required
                    />

                    <textarea
                      placeholder="Note Content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full p-3 rounded-md border border-gray-500 focus:outline-purple-300 focus:ring-1 focus:ring-blue-500 text-gray-800"
                    ></textarea>

                    <div className="flex gap-2">
                      <button
                        onClick={() => updateNote(note._id)}
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                      >
                        {loading ? "Saving....." : "Save"}
                      </button>

                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between mb-2 items-start">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="bg-blue-500 px-6 py-2 rounded-md text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteNote(note._id)}
                        className="bg-red-500 px-6 py-2 rounded-md text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">{note.content}</p>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
