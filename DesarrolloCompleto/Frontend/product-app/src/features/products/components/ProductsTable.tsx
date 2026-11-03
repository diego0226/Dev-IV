import { ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../models/response/Product";
import { getProductSku } from "../utils/productVisual";
import ProductThumbnail from "./ProductThumbnail";

type ProductsTableProps = {
  products: Product[];
  onDelete: (productResourceId: string) => void;
  deletingId: string | null;
};

export default function ProductsTable({
  products,
  onDelete,
  deletingId,
}: ProductsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Lista de productos</caption>

          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th scope="col" className="px-5 py-3">Producto</th>
              <th scope="col" className="px-5 py-3">SKU</th>
              <th scope="col" className="hidden px-5 py-3 md:table-cell">
                Product Resource ID
              </th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {products.map((product) => {
              const name = product.name || "Producto sin nombre";

              return (
                <tr
                  key={product.productResourceId}
                  className={`transition-colors hover:bg-slate-50 ${
                    deletingId === product.productResourceId ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <ProductThumbnail
                        product={product}
                        className="size-10 shrink-0 rounded-lg"
                        initialClassName="text-base"
                      />
                      <Link
                        to={`/product/${product.productResourceId}`}
                        className="rounded font-semibold text-slate-900 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
                      >
                        {name}
                      </Link>
                    </div>
                  </td>

                  <td className="px-5 py-3 font-mono text-xs text-slate-600">
                    {getProductSku(product.productResourceId)}
                  </td>

                  <td className="hidden px-5 py-3 font-mono text-xs text-slate-500 md:table-cell">
                    {product.productResourceId}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onDelete(product.productResourceId)}
                        disabled={deletingId !== null}
                        title={`Eliminar ${name}`}
                        aria-label={`Eliminar ${name}`}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>

                      <Link
                        to={`/product/${product.productResourceId}`}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600"
                      >
                        Ver
                        <span className="sr-only"> {name}</span>
                        <ChevronRight size={16} aria-hidden="true" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
