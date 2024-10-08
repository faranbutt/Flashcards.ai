import React from "react";
import { Vortex } from "../ui/vortex";

export function Thankyou() {
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Thankyou
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
          We have recieved your payment.You will receive and email with orders details shortly.
        </p>
      </Vortex>
    </div>
  );
}
