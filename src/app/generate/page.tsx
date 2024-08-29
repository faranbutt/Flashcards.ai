"use client";
import React, { useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { collection, doc, getDoc, writeBatch, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { GenerateFlashCardLogo } from "@/components/main/generateFlashcardLogo";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const handleSubmit = () => {
    fetch("/api/generate", {
      method: "POST",
      body: text,
    })
      .then((res) => res.json())
      .then((data) => setFlashcards(data));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCardFlipped = (id: any) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert("Please enter a name");
      return;
    }
  
    if (!user) {
      alert("User not found. Please sign in.");
      return;
    }
    if (typeof window !== "undefined") {
      const batch = writeBatch(db);
    const userDocRef = doc(db, "users", user.id);
    const docSnap = await getDoc(userDocRef);
  
    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f: any) => f.name === name)) {
        alert("These flashcards with the collection name already exists");
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }
    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });
    await batch.commit();
    handleClose();
    router.push("/flashcards");
    }
    
  };
  
  return (
    <div className="w-screen h-screen flex flex-col gap-5">
      <div className="w-full h-[80px] justify-center items-center">
        <GenerateFlashCardLogo />
      </div>
      <div className="w-screen flex justify-center items-center flex-col gap-2">
        <Textarea
          onChange={(e) => setText(e.target.value)}
          className="flex items-center justify-center w-[500px]"
          placeholder="type your note here."
          rows={10}
          cols={40}
        />
        <button
          className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div>
        {flashcards.length > 0 && (
          <div className="my-10">
            <h2 className="w-screen flex justify-center items-center text-6xl font-bold my-5">
              FlashCards Preview
            </h2>
            <div className="px-10 grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-center">
              {flashcards.map((flashcard:{front:string,back:string}, index) => (
                <div
                  key={index}
                  onClick={() => handleCardFlipped(index)}
                  className="flex w-screen flex-col justify-center "
                >
                  <div className="group h-96 w-96 [perspective:1000px]">
                    <div
                      className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]`}
                    >
                      <div className="absolute inset-0 rounded-xl bg-black w-full h-full flex justify-center items-center bold text-white text-3xl border-2 border-white">
                        {flashcard.front}
                      </div>
                      <div className="absolute inset-0 h-full w-full rounded-xl px-12 text-center text-black [transform:rotateY(180deg)] [backface-visibility:hidden] bg-white flex justify-center items-center bold text-3xl p-4">
                        {flashcard.back}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-screen h-10 flex justify-center items-center my-10">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                    onClick={handleOpen}
                  >
                    Save
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Save Flashcards</DialogTitle>
                    <DialogDescription>
                      Please enter name of your flashcard collections
                    </DialogDescription>
                  </DialogHeader>
                  <div>
                    <Input value={name} onChange={(e)=>setName(e.target.value)} />
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </DialogClose>
                    <Button type="submit" onClick={saveFlashcards}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
