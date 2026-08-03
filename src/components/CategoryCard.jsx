import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  id,
  name,
  description,
  image,
}) {
  return (
    <Link
      href={`/category/${id}`}
      className="group relative min-h-64 w-full overflow-hidden rounded-xl"
    >
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/60 transition-colors duration-300 group-hover:bg-primary/65" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full min-h-64 flex-col justify-end p-6 text-secondary">
        <h2 className="font-sora text-3xl font-semibold">
          {name}
        </h2>

        <p className="mt-2 text-sm">
          {description || "Sin descripción"}
        </p>
      </div>
    </Link>
  );
}