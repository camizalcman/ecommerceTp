"use client";
import Image from 'next/image';
import Link from 'next/link'
import { useState } from "react";
import { MoveRight } from "lucide-react";

const pizzas = [
  { src: "/images/products/pizzaMuzza.png", alt: "Pizza de muzzarella" },
  { src: "/images/products/pizzaRuculaChampi.png", alt: "Pizza de rucula" },
  { src: "/images/products/pizzaCebolla.png", alt: "Pizza de cebolla" },
  { src: "/images/products/pizzaPeperoni.png", alt: "Pizza con pepperoni" },
  { src: "/images/products/pizzaPalmitos.png", alt: "Pizza con palmitos" },
  { src: "/images/products/pizzaEspinaca.png", alt: "Pizza de espinaca" },
  { src: "/images/products/pizzaHuevo.png", alt: "Pizza con huevo" },
  { src: "/images/products/pizzaJamon.png", alt: "Pizza con jamon" },
  { src: "/images/products/pizzaTomateChampi.png", alt: "Pizza de tomate" },
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
  <div className="flex flex-col lg:flex-row items-center py-8 lg:py-16 gap-8 lg:gap-0">    
    <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1">
      <h1 className="font-sora font-bold text-primary text-4xl sm:text-4xl md:text-5xl">
        Hechas a tu gusto

      </h1>

      <h2 className="font-sora font-semibold text-primary text-lg sm:text-xl md:text-2xl mt-6 max-w-md mx-auto lg:mx-0">Elegí tus ingredientes para armar una pizza única, preparada especialmente para vos.
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center lg:justify-start">
        <a
          href="#menu"
          className="bg-primary text-secondary text-center rounded-full px-8 md:px-12 py-3 transition-all duration-300 hover:opacity-90 hover:scale-105"
        >
          Ver menú
        </a>

        <Link
          href={`/product/6a378a5d20610ecf6443dfdf`}
          className="text-center inline-block border-2 border-primary text-primary rounded-full px-8 md:px-12 py-3 transition-all duration-300 hover:scale-105"
        >
          Creá tu pizza
        </Link>
      </div>
    </div>

    <div className="w-full lg:w-1/2 flex flex-col items-center gap-2 mt-10 lg:mt-0 order-1 lg:order-2">
      <button
        onClick={handleNext}
        className="text-primary hover:text-primary-hover transition-colors text-2xl md:text-3xl"
      >
        <MoveRight className="w-6 h-6 text-primary" />
      </button>

      <div className="relative w-[280px] h-[280px] sm:h-[350px] md:h-[450px] lg:w-[550px]">
        {pizzas.map((pizza, index) => (
          <Image
            key={index}
            src={pizza.src}
            alt={pizza.alt}
            width={550}
            height={550}
            className="absolute top-0 left-0 w-full h-full object-contain transition-all duration-800"
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