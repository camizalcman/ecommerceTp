import { getProductById } from "@/lib/products";
import { getToppings } from "@/lib/toppings";
import { getDoughs } from "@/lib/doughs";
import { getSizes } from "@/lib/sizes";
import { getMozzarellas } from "@/lib/mozzarellas";
import { getSauces } from "@/lib/sauces";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({ params }) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const isCustomizable = product.categories.some(
    (cat) => cat.name?.toLowerCase() === "armá tu pizza" || 
              cat.name?.toLowerCase() === "arma tu pizza"
  );

  let options = {};

 if (isCustomizable) {
    // personalizable: trae todo
    const [sizes, doughs, mozzarellas, sauces, toppings] = await Promise.all([
      getSizes(),
      getDoughs(),
      getSauces(),
      getMozzarellas(),
      getToppings(),
    ]);
    options = { sizes, doughs, mozzarellas, sauces, toppings };
  } else {
    // no personalizable: solo tamaño, masa y mozzarella
    const [sizes, doughs, mozzarellas] = await Promise.all([
      getSizes(),
      getDoughs(),
      getMozzarellas(),
    ]);
    options = { sizes, doughs, mozzarellas };
  }

  return (
    <ProductDetail
      product={product}
      isCustomizable={isCustomizable}
      options={options}
    />
  );
}