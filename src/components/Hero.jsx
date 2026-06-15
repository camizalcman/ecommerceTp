"use client";
import Image from 'next/image';
import { useState } from "react";

const pizzas = [
  { src: "/images/products/pizza.png", alt: "Pizza 1" },
  { src: "/images/products/pizza1.png", alt: "Pizza 2" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % pizzas.length);
      setAnimating(false);
    }, 600);
  };

  return (
    <div className="flex items-center">
      
      
      <div className="w-1/2 flex flex-col justify-center">
        <h1 className="font-sora font-bold text-primary text-5xl">
          Pizzas que se<br />hacen a tu manera.
        </h1>
        <h2 className="font-sora font-semibold text-primary text-2xl mt-4">
          Elegí tu pizza favorita o armá la tuya desde cero
        </h2>
      </div>

      
      <div className="w-1/2 flex flex-col items-center gap-4">
        
        
        <div className="relative w-[400px] h-[400px]">
          {pizzas.map((pizza, index) => (
            <Image
              key={index}
              src={pizza.src}
              alt={pizza.alt}
              width={400}
              height={400}
              className="absolute top-0 left-0 transition-all duration-600"
              style={{
                opacity: index === current
                  ? animating ? 0 : 1
                  : animating ? 1 : 0,
                transform: index === current
                    ? animating ? "rotate(30deg)" : "rotate(0deg)"   // sale: 0 → 30
                    : animating ? "rotate(0deg)" : "rotate(30deg)",  // entra: 30 → 0  
                    transition: animating 

              }}
            />
          ))}
        </div>

        
        <button
          onClick={handleNext}
          className="text-primary hover:text-primary-hover transition-colors text-3xl"
        >
          →
        </button>

      </div>
    </div>
  )
}

export default Hero