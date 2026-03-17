import Image from "next/image";
import dbConnect from "./lib/db.js";
import NotesClient from "@/components/NotesClient.jsx";

export default async function Home() {
  await dbConnect();
  return (
   <div className="container mx-auto p-4">

    <h1 className="text-3xl font-bold mb6">Notes App</h1>
      
      <NotesClient/>
 
   </div>
  );
}
