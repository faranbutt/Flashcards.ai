"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSearchParams } from "next/navigation";

export default function FlashCard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;
      const colRef = collection(doc(collection(db, "users"), user.id),search);
      const docs = await getDocs(colRef);
      const flashcards:any = [];

     docs.forEach((doc)=>{
        flashcards.push({id:doc.id,...doc.data()})
     })
     setFlashcards(flashcards);
    }
    getFlashcard();
  }, [user,search]);

  const handleCardFlipped = (id: any) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn){
    return <></>;
  }
  return (
    <div className="w-screen h-screen">
      
      <div className="px-10 grid grid-cols-1 lg:grid-cols-3 gap-5 justify-center items-center">
              {flashcards.map((flashcard, index) => (
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
      </div>
  )
}
