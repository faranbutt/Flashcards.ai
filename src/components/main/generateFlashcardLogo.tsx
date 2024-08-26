"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";

export function GenerateFlashCardLogo() {
  const words = [
    {
      text: "Generate",
    },
    {
      text: "Flashcards",
    },
    {
      text: "with",
    },
    {
      text: "AI",
      className: "text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[100px]">
      <TypewriterEffect words={words} />
    </div>
    
  );
}
