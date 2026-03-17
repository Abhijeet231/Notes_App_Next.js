import dbConnect from "@/app/lib/db.js";
import Note from "@/models/Note.js";

import { NextResponse } from "next/server";

// Get Notes
export async function GET() {
    try {
        await dbConnect();
        const notes = await Note.find({}).sort({ createdAt: -1 })
        
        return NextResponse.json({success:true, data: notes})
    } catch (error) {
        return NextResponse.json(
            {success: false, error: error.message},
            {status: 400}
        )
    }
}

// Create Notes
export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { title, content } = body;

   
    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content required" },
        { status: 400 }
      );
    }

    const note = await Note.create({ title, content });

    return NextResponse.json(
      { success: true, data: note },
      { status: 201 }
    );
  } catch (error) {
     console.error("FULL ERROR:", error);
    console.error("STACK:", error.stack);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}