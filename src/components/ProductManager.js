"use client";

import {
  useCallback,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@/app/actions/products";

const initialForm = {
  name: "",
  description: "",
  image: "",
  categories: [],
  sizes: [
    { label: "Chica", price: "" },
    { label: "Mediana", price: "" },
    { label: "Grande", price: "" },
  ],
};

export default function ProductManager({
  initialCategories = [],
  initialProducts = [],
}) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, startRefreshTransition] = useTransition();

  const resetForm = useCallback(() => {
    setForm(initialForm);
    setEditingId("");
  }, []);

  const refreshProducts = useCallback(() => {
    startRefreshTransition(() => {
      router.refresh();
    });
  }, [router]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleCategoryChange(event) {
    const { checked, value } = event.target;

    setForm((current) => {
      const categories = checked
        ? [...current.categories, value]
        : current.categories.filter((categoryId) => categoryId !== value);

      return { ...current, categories };
    });
  }

  function handleSizeChange(index, value) {
    setForm((current) => {
      const sizes = current.sizes.map((size, i) =>
        i === index ? { ...size, price: value } : size
      );
      return { ...current, sizes };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("image", form.image);
    form.categories.forEach((id) => formData.append("categories", id));
    formData.append("sizes", JSON.stringify(form.sizes));

    const action = editingId ? updateProduct.bind(null, editingId) : createProduct;

    try {
      const result = await action(null, formData);
      setMessage(result.message);

      if (result.ok) {
        resetForm();
        refreshProducts();
      }
    } catch {
      setMessage("Ocurrio un error al guardar el producto.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleEdit(product) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      image: product.image || "",
      categories: (product.categories || []).map((category) =>
        typeof category === "string" ? category : category._id
      ),
      sizes: product.sizes?.length
        ? product.sizes.map((s) => ({ ...s, price: String(s.price) }))
        : initialForm.sizes,
    });
    setMessage("Editando producto.");
  }

  async function handleDelete(id) {
    const result = await deleteProduct(id);

    if (!result.ok) {
      setMessage(result.message || "No se pudo eliminar el producto.");
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    setMessage(result.message);
    refreshProducts();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          {editingId ? "Editar producto" : "Nuevo producto"}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Formulario simple para probar los endpoints del CRUD.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            name="description"
            placeholder="Descripcion"
            value={form.description}
            onChange={handleChange}
          />
          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none"
            name="image"
            placeholder="Nombre de imagen, ej: pizza.png"
            value={form.image}
            onChange={handleChange}
          />

          <fieldset className="rounded-lg border border-slate-300 px-4 py-3">
            <legend className="px-1 text-sm font-medium text-slate-700">
              Tamaños y precios
            </legend>
            <div className="grid gap-3">
              {form.sizes.map((size, index) => (
                <div key={size.label} className="flex items-center gap-3">
                  <span className="w-24 shrink-0 text-sm text-slate-700">{size.label}</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                    <input
                      className="w-full rounded-lg border border-slate-300 pl-7 pr-3 py-2 outline-none"
                      type="number"
                      min="0"
                      placeholder="0"
                      value={size.price}
                      onChange={(e) => handleSizeChange(index, e.target.value)}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-lg border border-slate-300 px-4 py-3">
            <legend className="px-1 text-sm font-medium text-slate-700">
              Categorias
            </legend>

            {initialCategories.length === 0 ? (
              <p className="py-2 text-sm text-slate-500">
                Crea una categoria antes de asociarla a productos.
              </p>
            ) : (
              <div className="grid gap-3">
                {initialCategories.map((category) => (
                  <label
                    key={category._id}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 px-3 py-2 hover:bg-slate-50"
                  >
                    <input
                      checked={form.categories.includes(category._id)}
                      className="mt-1 h-4 w-4"
                      name="categories"
                      type="checkbox"
                      value={category._id}
                      onChange={handleCategoryChange}
                    />
                    <span>
                      <span className="block text-sm font-medium text-slate-900">
                        {category.name}
                      </span>
                      {category.description ? (
                        <span className="mt-1 block text-xs text-slate-500">
                          {category.description}
                        </span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </fieldset>

          <div className="flex gap-3">
            <button
              className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
            </button>
            <button
              className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
              type="button"
              onClick={resetForm}
            >
              Limpiar
            </button>
          </div>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}
      </section>

      <section className="rounded-lg border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Productos</h2>
            <p className="mt-2 text-sm text-slate-600">
              Lista obtenida desde el container del dashboard.
            </p>
          </div>
          <button
            className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700"
            disabled={isRefreshing}
            type="button"
            onClick={refreshProducts}
          >
            {isRefreshing ? "Recargando..." : "Recargar"}
          </button>
        </div>

        {initialProducts.length === 0 ? (
          <p className="mt-6 text-slate-600">Todavia no hay productos cargados.</p>
        ) : (
          <div className="mt-6 grid gap-4">
            {initialProducts.map((product) => (
              <article
                key={product._id}
                className="rounded-lg border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <div className="text-right text-sm text-slate-700">
                    {product.sizes?.map((s) => (
                      <p key={s.label}>{s.label}: ${s.price}</p>
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {product.description || "Sin descripcion"}
                </p>

                <p className="mt-3 break-all text-xs text-slate-500">
                  ID: {product._id}
                </p>

                {product.categories?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <span
                        key={typeof category === "string" ? category : category._id}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                      >
                        {typeof category === "string" ? category : category.name}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex gap-3">
                  <button
                    className="rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900"
                    type="button"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-900"
                    type="button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
