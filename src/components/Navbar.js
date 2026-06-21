'use client'

import Link from "next/link";
import { useAppContext } from '@/contexts/AppContext'

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categorias" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
      const { favoritesQty } = useAppContext()
      
  return (
    <header className="border-b border-slate-200 bg-primary text-secondary sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-lg font-semibold font-sora" href="/">
          Pizzeria
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
        
        <div className='pt-6 border-t border-white/10'>
            <Link href="/" className='relative'>Favoritos
                {favoritesQty() > 0 && (
                    <span className="absolute -top-2 -right-6 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favoritesQty()}
                    </span>
                        )}
            </Link>
        </div>
      </nav>
    </header>
  );
}
