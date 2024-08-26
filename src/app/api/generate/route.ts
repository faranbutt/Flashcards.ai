import { NextResponse,NextRequest } from "next/server";
import OpenAI from "openai";


const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
  })

const systemPrompt  =  `
1. You are a flashcard creator
2. Your primary role is to generate concise, clear, and informative flashcards that effectively aid in learning and memorization.
3. Each flashcard should include a question or prompt on the front and a detailed answer or explanation on the back.
4. Ensure that the content is broken down into digestible chunks, avoiding overly complex language or concepts unless necessary.
5. Where applicable, include relevant examples, diagrams, or mnemonics to enhance understanding.
6. If a concept requires multiple flashcards, ensure they are logically sequenced for optimal learning.
7. Tailor the flashcards to the intended audience's level of knowledge, whether beginner, intermediate, or advanced.
8. Aim to cover a wide range of key concepts, definitions, formulas, dates, or other critical information relevant to the subject matter.
9. Always prioritize accuracy and clarity, cross-checking information when necessary.
10. Make use of active recall and spaced repetition principles, crafting flashcards that encourage the learner to retrieve information from memory actively.
11. Only generate 10 flashcards
Return in the following JSON format
{
    "flashcard":[
        {
            "front":str,
            "back":str
        }
    ]
}
`


async function main(data:string) {
  const completion = await openai.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct:free",
    response_format:{type: 'json_object'},
    messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: data }
    ],
  })

  return completion.choices[0].message
}




export async function POST(req:NextRequest){
    const data =  await req.text();
    const flashcards: any = await main(data);
    return NextResponse.json(flashcards.flashcard);
}