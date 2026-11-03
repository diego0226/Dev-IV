import { ArrowRight, Hash, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { getProductSku } from "../utils/productVisual";
import ProductThumbnail from "./ProductThumbnail";

type ProductCardProps = {
  product: Product;
  // En modo vista previa la tarjeta no navega (se usa en el formulario).
  preview?: boolean;
  onDelete?: (productResourceId: string) => void;
  isDeleting?: boolean;
  deleteDisabled?: boolean;
};

export default function ProductCard({
  product,
  preview = false,
  onDelete,
  isDeleting = false,
  deleteDisabled = false,
}: ProductCardProps) {
  const name = product.name || "Producto sin nombre";

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${
        preview
          ? ""
          : "transition duration-200 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80"
      } ${isDeleting ? "opacity-60" : ""}`}
    >
      <ProductThumbnail
        product={product}
        className="aspect-4/3"
        initialClassName="text-7xl transition-transform duration-300 ease-out group-hover:scale-110"
      />

      {onDelete && (
        <button
          type="button"
          onClick={() => onDelete(product.productResourceId)}
          disabled={deleteDisabled}
          title={`Eliminar ${name}`}
          aria-label={`Eliminar ${name}`}
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow-sm backdrop-blur transition hover:bg-white hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50 sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      )}

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="inline-flex items-center gap-1 text-xs font-medium tracking-wide text-slate-500">
          <Hash size={12} aria-hidden="true" />
          SKU {getProductSku(product.productResourceId)}
        </p>

        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {preview ? (
            name
          ) : (
            // El ::after cubre toda la tarjeta para que sea clicable sin anidar el botón de eliminar.
            <Link
              to={`/product/${product.productResourceId}`}
              className="outline-none after:absolute after:inset-0"
            >
              {name}
            </Link>
          )}
        </h3>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-medium">
          <span className="text-slate-600 transition-colors group-hover:text-indigo-600">
            {isDeleting ? "Eliminando..." : "Ver detalle"}
          </span>
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-indigo-600"
          />
        </div>
      </div>
    </article>
  );
}
