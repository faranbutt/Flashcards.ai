// import { loadStripe } from "@stripe/stripe-js";
// const public_key = process.env.STRIPE_PUBLIC_KEY
// console.log("PUBLIC_KEY",public_key)
// let stripePromise:any;
// const getStripe = () => {

//     if(!stripePromise){
        
//         stripePromise = loadStripe(public_key);
        
//     }
//     return stripePromise;
// }




import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const getStripe = () => stripePromise

export default getStripe;
