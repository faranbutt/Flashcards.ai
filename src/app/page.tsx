'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { BackgroundBoxesDemo } from "@/components/main/nameMain";
import Pricing from "@/components/main/pricing";
import Footer from "@/components/main/footer";
export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Head>
        <title>Cards AI</title>
        <meta name="description" content="Create Flashcards for your text" />
      </Head>
     
     <div className="w-full h-[400px]  flex justify-center p-10 flex-col gap-2">
      <BackgroundBoxesDemo />
     </div>

     <div className="">
        <div>
          <Pricing />
        </div>

     </div>
     <div className="mb-10">
      <Footer />
     </div>
     
    </main>
  );
}
