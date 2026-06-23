import Image from "next/image"

const Footer = () => {

    return (
        <footer className='bg-primary text-secondary pt-24 pb-12 px-6'>

            <div className='max-w-7xl mx-auto flex fflex-row justify-between items-start gap-12'>

                
                <div className='flex flex-col ml-12'>
                    
                    

                    <h2 className='font-medium text-[1.8em] sm:text-[2em] md:text-[2.5em] font-sora leading-none mt-2'>Crusta</h2>
                    <Image className="mt-6"
                        src="/images/mascota.png"
                        alt="Mascota de la marca"
                        width={250}
                        height={250}
                        />

                </div>

                
                <nav>
                    <ul className='flex flex-col items-start gap-4 text-neutral-300 text-sm font-medium'>
                        
                        <li>
                            <a href="/#" className='hover:text-white transition-colors'>
                                Categoría 1
                            </a>
                        </li>

                        <li>
                            <a href="/#" className='hover:text-white transition-colors'>
                                Categoría 2
                            </a>
                        </li>

                    </ul>
                </nav>

            </div>

        </footer>
    )
}

export default Footer