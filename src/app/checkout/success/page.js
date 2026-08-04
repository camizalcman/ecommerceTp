"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main className="min-h-screen flex">
    
          {/* Imagen izquierda */}
          <div className="hidden lg:block w-1/2 relative">
            <Image
              src="/images/success.jpg"
              alt="Pizza"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-primary/30" />
          </div>
    
          {/* Mansaje de éxito */}
          <div className="w-full lg:w-1/2 flex items-center justify-start px-12 bg-background">
            <div className="text-start max-w-md">
              <h1 className="text-3xl font-bold text-primary font-sora">¡Gracias por tu pedido!</h1>
              {orderNumber && (
                <p className="mt-4 text-lg text-slate-600">
                  Tu número de orden es <span className="font-bold text-primary">#{orderNumber}</span>
                </p>
              )}
              <p className="mt-2 text-slate-500 text-lg">Tu pizza ya está en marcha. 
                En breve nos comunicamos para coordinar la entrega.</p>
              <Link
                href="/"
                className="mt-8 inline-block bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
  </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}