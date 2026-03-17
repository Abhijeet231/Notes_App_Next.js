import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true, 
  }
);

const Note = mongoose.models.Note ?? mongoose.model("Note", NoteSchema);
export default Note;
