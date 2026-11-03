import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CircleAlert, Eye } from "lucide-react";

import { createProduct } from "../services/ProductService";
import type { NewProduct } from "../models/request/Product";
import { useForm, useWatch } from "react-hook-form";
import ProductCard from "../components/ProductCard";

// Datos que maneja el formulario
type ProductFormValues = {
  name: string;
};

const NAME_MAX_LENGTH = 50;

export default function CreateProduct() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);

  // Se genera una sola vez para que la vista previa y el request usen el mismo ID
  const [productResourceId] = useState(() => crypto.randomUUID());

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const name = useWatch({ control, name: "name" });

  // Se ejecuta cuando el usuario presiona Guardar
  const onSubmit = async (data: ProductFormValues) => {
    setServerError(null);

    // Construimos el request que espera el backend C#
    const request: NewProduct = {
      productResourceId,
      name: data.name.trim(),
    };

    try {
      // Llamamos al servicio que ejecuta el POST
      await createProduct(request);

      // Regresamos al listado si se guardó correctamente
      navigate("/products");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Error al registrar el producto",
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a productos
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Agregar producto
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Completa la información para agregar un producto al catálogo.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            {/* Nombre del producto */}
            <div>
              <div className="mb-2 flex items-baseline justify-between">
                <label htmlFor="name" className="block text-sm font-semibold text-slate-800">
                  Nombre del producto
                </label>
                <span className="text-xs text-slate-400 tabular-nums">
                  {name.length}/{NAME_MAX_LENGTH}
                </span>
              </div>

              <input
                id="name"
                type="text"
                placeholder="Ejemplo: Frijoles"
                maxLength={NAME_MAX_LENGTH}
                autoFocus
                {...register("name", {
                  required: "El nombre es obligatorio",
                  validate: (value) =>
                    value.trim().length >= 2 ||
                    "El nombre debe tener al menos 2 caracteres",
                })}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : "name-hint"}
                className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:ring-4 ${
                  errors.name
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                    : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                }`}
              />

              {/* Mensaje de validación */}
              {errors.name ? (
                <p id="name-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={14} aria-hidden="true" />
                  {errors.name.message}
                </p>
              ) : (
                <p id="name-hint" className="mt-2 text-sm text-slate-500">
                  Usa un nombre claro y fácil de encontrar.
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 block text-sm font-semibold text-slate-800">
                Product Resource ID
              </p>
              <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs break-all text-slate-500">
                {productResourceId}
              </p>
              <p className="mt-2 text-sm text-slate-500">Se genera automáticamente.</p>
            </div>

            {/* Error devuelto por el servicio */}
            {serverError && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                {serverError}
              </p>
            )}

            {/* Botones */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/products"
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar producto"}
              </button>
            </div>
          </form>
        </div>

        {/* Vista previa en vivo */}
        <aside aria-label="Vista previa" className="lg:sticky lg:top-24">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <Eye size={14} aria-hidden="true" />
            Vista previa
          </p>
          <ProductCard
            preview
            product={{ productResourceId, name: name.trim() }}
          />
          <p className="mt-3 text-xs text-slate-500">
            Así se verá el producto en el catálogo.
          </p>
        </aside>
      </div>
    </div>
  );
}
