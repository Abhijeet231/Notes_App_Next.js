import dbConnect from "@/app/lib/db.js";
import Note from "@/models/Note.js";
import { NextResponse } from "next/server";


export async function PUT(request, {params}) {
    try {
        const {id} = await params;
        await dbConnect();
        const body = await request.json();

        const note = await Note.findByIdAndUpdate(
            id,
            {...body},
            {new: true, runValidators: true}
        )

        if(!note) {
            return NextResponse.json(
                {success: false, error: "Note not found"},
                {status: 404}
            );
        }

        return NextResponse.json({success: true, data: note})

    } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400})
    }
}



export async function DELETE(request, {params}) {
     try {
        const {id} = await params;
        await dbConnect();
        const note = await Note.findByIdAndDelete(id);

        if(!note) {
            return NextResponse.json({success: false, error: "Note not found"}, {status: 404})
        }
       return NextResponse.json({success: true, data: {} }, {status: 200})
     } catch (error) {
        return NextResponse.json({success: false, error: error.message}, {status: 400})
     }
}