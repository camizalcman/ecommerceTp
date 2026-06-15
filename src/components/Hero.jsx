import Image from 'next/image';

const Hero = () => {
  return (
    <div className='flex'>
        <div>
            <h1>Hola</h1>
            <h2>Subtitulo</h2>
        </div>
        <div>
            <Image
                src="@/products/pizza.png"
                alt="Pizza"
                width={400}
                height={400}
                />
        </div>

    </div>
  )
}

export default Hero