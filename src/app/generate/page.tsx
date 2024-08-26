'use client'
import React, { useRef } from 'react'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { GenerateFlashCardLogo } from '@/components/main/generateFlashcardLogo';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
export default function page() {
    const {isLoaded,isSignedIn,user} = useUser()
    const [flashcards,setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({});
    const [name, setName] = useState('');
    const [text,setText] = useState('');
    const [open,setOpen] = useState(false);
    const router = useRouter();
    const handleSubmit = () => {
        fetch('/api/generate',{
            method:'POST',
            body:text
        })
        .then((res)=>res.json())
        .then((data)=>setFlashcards(data))

    } 
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleCardFlipped = (id:any) => {
        setFlipped((prev)=>({
            ...prev,
            [id]:!prev[id]
        }))
    }

    const saveFlashcards  = async() => {
        if (!name){
            alert("Please enter a name")
            return
        }

        const batch  = writeBatch(db);
        const userDocRef = doc(collection(db,'users'),user.id)
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()){
            const collections = docSnap.data().flashcards || [];
            if (collections.find((f:any)=>f.name === name)){
                alert("These flashcards with the collection name already exists")
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef,{flashcards:collections},{merge:true})
            }
        }
        else{
            batch.set(userDocRef,{flashcards:[{name}]})
        }
        const colRef = collection(userDocRef,name)
        flashcards.forEach((flashcard)=>{
            const cardDocRef = doc(colRef);
            batch.set(cardDocRef,flashcard)
        })
        await batch.commit()
        handleClose();
        router.push('/flashcards')

    }



  return (
    <div className='w-screen h-screen flex flex-col gap-5'>
        <div className='w-full h-[80px] justify-center items-center'>
            <GenerateFlashCardLogo />
        </div>
        <div className='w-screen flex justify-center items-center flex-col gap-2'>
            <Textarea onChange={(e)=>setText(e.target.value)} className='flex items-center justify-center w-[500px]' placeholder='type your note here.' rows={10} cols={40} />
            <Button className='hover:bg-blue-500 border-2 hover:border-white hover:text-white'>Submit</Button>
        </div>
       <div>
        {flashcards.length > 0 && (<div>
            <h2>FlashCards Preview</h2>
        </div>)}
       </div>
    </div>
  )
}
