"use client";

import Link from "next/link";
import { useAppContext } from "@/contexts/AppContext";
import { Heart, ShoppingCart, User, LogOut } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categorías" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const { favoritesQty, cartQty, openCart, activeUser, logout } =
    useAppContext();

  return (
    <header className="sticky top-0 z-50 bg-primary text-secondary">
<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-3 sm:px-6">    {/* Logo */}
    <Link href="/" className="font-sora text-lg sm:text-xl lg:text-2xl font-semibold shrink-0">Crusta</Link>

    {/* Navegación */}
    <div className="flex items-center gap-2 sm:gap-5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm font-medium hover:opacity-80 transition"
        >
          {link.label}
        </Link>
      ))}
    </div>

    {/* Acciones */}
    <div className="flex items-center gap-3 sm:gap-5">
      <Link href="/favorites" className="relative flex items-center gap-1 text-sm">
        <Heart className="h-5 w-5" strokeWidth={1.8} />
        <span className="hidden md:inline">Favoritos</span>

        {favoritesQty() > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-primary">
            {favoritesQty()}
          </span>
        )}
      </Link>

      <button onClick={openCart} className="relative flex items-center gap-1 text-sm">
        <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
        <span className="hidden md:inline">Carrito</span>

        {cartQty() > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-primary">
            {cartQty()}
          </span>
        )}
      </button>

      {activeUser ? (
      <div className="flex items-center gap-3">
        <Link href="/user" className="flex items-center gap-1 text-sm">
          <User className="h-5 w-5" strokeWidth={1.8} />
          <span className="hidden sm:inline">{activeUser.name}</span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center gap-1 text-sm"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.8} />
          <span className="hidden md:inline">Salir</span>
        </button>
      </div>
    ) : (
      <Link href="/login" className="flex items-center gap-1 text-sm">
        <User className="h-5 w-5" strokeWidth={1.8} />
        <span className="hidden md:inline">Ingresar</span>
      </Link>
      )}
    </div>
  </nav>
</header>
  );
}