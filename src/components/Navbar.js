'use client'

import Link from "next/link";
import { useAppContext } from '@/contexts/AppContext'
import { Heart, ShoppingCart } from 'lucide-react';

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categorias" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
      const { favoritesQty, cartQty, openCart} = useAppContext()
      
  return (
    <header className="border-b border-slate-200 bg-primary text-secondary sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-semibold font-sora" href="/">
          Crusta
        </Link>

        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              className="rounded-lg px-3 py-2 text-sm font-mediumyar"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className='flex gap-12'>
            <Link href="/favorites" className='relative flex gap-1 justify-center items-center'>
                <Heart className="h-5 w-5" strokeWidth={1.5} />
                Favoritos
                {favoritesQty() > 0 && (
                    <span className="absolute -top-2 -right-6 bg-secondary text-xs text-primary rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesQty()}
                    </span>
                        )}
            </Link>

            <button onClick={openCart} className='relative flex gap-1 justify-center items-center'>
                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                Carrito
                {cartQty() > 0 && (
                    <span className="absolute -top-2 -right-6 bg-secondary text-xs text-primary rounded-full w-5 h-5 flex items-center justify-center">
                      {cartQty()}
                    </span>
                )}
            </button>
        </div>

        
      </nav>
    </header>
  );
}
