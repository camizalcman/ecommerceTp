import { getProductById } from "@/lib/products";
import { getToppings } from "@/lib/toppings";
import { getDoughs } from "@/lib/doughs";
import { getSizes } from "@/lib/sizes";
import { getMozzarellas } from "@/lib/mozzarellas";
import { getBoxes } from "@/lib/boxes";
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
    const [sizes, doughs, mozzarellas, toppings, boxes] = await Promise.all([
        getSizes(),
        getDoughs(),
        getMozzarellas(),
        getToppings(),
        getBoxes(),
    ]);

    options = { toppings, doughs, sizes, mozzarellas, boxes };
  } else {
    const sizes = await getSizes();
    options = { sizes };
  }

  return (
    <ProductDetail
      product={product}
      isCustomizable={isCustomizable}
      options={options}
    />
  );
}