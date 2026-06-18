const Footer = () => {

    return (
        <footer className='bg-primary text-secundary pt-24 pb-12 px-6'>

            <div className='max-w-7xl mx-auto flex fflex-row justify-between items-start gap-12'>

                
                <div className='flex flex-col items-center'>
                    
                    

                    <h2 className='font-medium text-[1.8em] sm:text-[2em] md:text-[2.5em] font-sora text-white leading-none mt-2'>Pizzeria</h2>

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