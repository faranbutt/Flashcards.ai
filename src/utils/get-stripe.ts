import { loadStripe } from "@stripe/stripe-js";
const stripe_public_key:string = process.env.STRIPE_PUBlISHABLE_KEY!;

let stripePromise:any;
const getStripe = () => {

    if(!stripePromise){
        stripePromise = loadStripe(stripe_public_key);
        
    }
    return stripePromise;
}

export default getStripe;