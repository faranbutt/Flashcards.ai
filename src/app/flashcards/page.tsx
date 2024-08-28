"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  CollectionReference,
  getDoc,
  setDoc,
  doc,
  collection,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function Flashcards() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);
  if (!isLoaded || !isSignedIn) {
    return <></>;
  }
  const handleCardClick = (id: any) => {
    router.push(`/flashcard?id=${id}`);
  };

  return (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
        {flashcards.map((flashcard:any, index:any) => (
          <Card
            key={index}
            onClick={() => handleCardClick(flashcard.name)}
            className="bg-[#0F172A] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border-2 border-gray-300 hover:bg-blue-300"
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {flashcard.name}
              </h3>
              <p className="text-gray-400">Click to view flashcards</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
