"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🍕</div>
        <h1 className="text-3xl font-bold text-primary font-sora">¡Gracias por tu pedido!</h1>
        {orderNumber && (
          <p className="mt-4 text-lg text-slate-600">
            Tu número de orden es <span className="font-bold text-primary">#{orderNumber}</span>
          </p>
        )}
        <p className="mt-2 text-slate-500">En breve nos comunicamos para coordinar la entrega.</p>
        <Link
          href="/"
          className="mt-8 inline-block bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Volver al inicio
        </Link>
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