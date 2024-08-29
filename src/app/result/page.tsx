"use client";
import { useEffect, useState } from "react";
import getStripe from "@/utils/get-stripe";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import CircularLoading from "@/components/main/circularLoading";
import { SparklesCore } from "@/components/ui/sparkles";
import { Thankyou } from "@/components/ui/thankyou";
export default function Result() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;
      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );
        const sessionData = await res.json();
        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occured");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <div className="mt-4 w-screen h-screen flex justify-center items-center gap-2">
        <CircularLoading />
        <h1 className="font-bold text-5xl">Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 w-screen h-screen flex justify-center items-center">
        <h1 className="font-bold text-5xl">{error}</h1>
      </div>
    );
  }
  return (
    <div className="mt-4 w-screen h-screen">
      {session.payment_status === "paid" ? (
        <div className="font-bold text-5xl">
          <Thankyou />
        </div>
      ) : (
        <div className="mt-10 font-bold text-5xl flex flex-col w-screen h-screen gap-10">
          <h1 className="text-black font-bold text-5xl flex text-center w-screen justify-center items-center">Payment Failed</h1>
          <h1 className="text-black font-light text-xl flex text-center w-screen justify-center items-center">Your payment was not successfull.Please try again.</h1>
            
        </div>
      )}
    </div>
  );
}
