"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";

export default function RegisterPage() {
  const { login } = useAppContext();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data);
      router.push("/");
    } catch {
      setError("Ocurrió un error. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex">

      {/* Imagen izquierda */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/images/pizzaRegister.jpg"
          alt="Pizza"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/30" />
      </div>

      {/* Formulario derecha */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 bg-background">
        <div className="w-full max-w-lg">

          <h1 className="text-3xl font-bold text-primary font-sora">Crear cuenta</h1>
          <p className="mt-2 text-slate-600">Completá tus datos para registrarte.</p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary"
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-secondary mt-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Iniciá sesión
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}