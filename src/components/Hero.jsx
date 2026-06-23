"use client";
import Image from 'next/image';
import Link from 'next/link'
import { useState } from "react";
import { MoveRight } from "lucide-react";

const pizzas = [
  { src: "/images/products/pizza.png", alt: "Pizza" },
  { src: "/images/products/pizza1.png", alt: "Pizza 1" },
  { src: "/images/products/pizza2.png", alt: "Pizza 2" },
  { src: "/images/products/pizza3.png", alt: "Pizza 3" },
  { src: "/images/products/pizza4.png", alt: "Pizza 4" },
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
    }, 500);
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

        <div className="flex gap-4 mt-8">
          <Link
            href={`/product/6a378a5d20610ecf6443dfdf`}
            className="bg-primary text-secondary rounded-full px-12 py-3 transition-all duration-300 hover:opacity-90 hover:scale-105"
          >
            Creá tu pizza
          </Link>

          <a href="#menu" className="inline-block border-2 border-primary text-primary rounded-full px-12 py-3 transition-all duration-300 hover:scale-105">Ver menú</a>
        </div>
      </div>

      
      <div className="w-1/2 flex flex-col items-center gap-2">
        
        <button
          onClick={handleNext}
          className="text-primary hover:text-primary-hover transition-colors text-3xl"
        >
          <MoveRight className="w-6 h-6 text-primary" />
        </button>

        <div className="relative w-[550px] h-[550px]">
          {pizzas.map((pizza, index) => (
            <Image
              key={index}
              src={pizza.src}
              alt={pizza.alt}
              width={550}
              height={550}
              className="absolute top-0 left-0 transition-all duration-800"
              style={{
                opacity:
                  index === current
                    ? (animating ? 0 : 1)
                    : (animating && index === (current + 1) % pizzas.length ? 1 : 0),

                transform:
                  index === current
                    ? (animating ? "rotate(30deg)" : "rotate(0deg)")
                    : (animating && index === (current + 1) % pizzas.length
                        ? "rotate(0deg)"
                        : "rotate(0deg)"),
              }}
            />
          ))}
        </div>


      </div>
    </div>
  )
}

export default Hero