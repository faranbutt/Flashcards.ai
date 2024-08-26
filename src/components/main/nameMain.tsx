"use client";
import React from "react";
import { Boxes } from "../ui/background-boxes";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
 
export function BackgroundBoxesDemo() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
 
      <Boxes />
      <div className="flex flex-col gap-4">
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Welcome to Cards AI
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        The easiest way to make flashcards from your text
      </p>
      <Button className="bg-black hover:bg-white"  >
        GET STARTED
      </Button>
    </div>
    </div>
  );
}
