import Image from "next/image"
import Link from "next/link"

const links = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categorias" },
  { href: "/dashboard", label: "Dashboard" },
];

const Footer = () => {

    return (
        <footer className='bg-primary text-secondary pt-16 pb-12 px-6'>

            <div className='max-w-7xl mx-auto flex fflex-row justify-between items-start gap-12'>

                
                <div className='flex flex-col ml-12'>
                    
                    

                    <Image 
                        src="/images/mascota.png"
                        alt="Mascota de la marca"
                        width={250}
                        height={250}
                        />

                    
                    <h2 className='font-medium text-[1.8em] sm:text-[4.4em] md:text-[2.5em] font-sora leading-none mt-2'>Crusta</h2>

                </div>

                
                <div className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                        key={link.href}
                        className="rounded-lg px-3 py-2 text-sm font-medium"
                        href={link.href}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </div>

            </div>

        </footer>
    )
}

export default Footer