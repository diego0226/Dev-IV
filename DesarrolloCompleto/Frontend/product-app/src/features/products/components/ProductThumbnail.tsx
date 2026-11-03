import type { Product } from "../models/response/Product";
import { getProductGradient, getProductInitial } from "../utils/productVisual";

type ProductThumbnailProps = {
  product: Pick<Product, "productResourceId" | "name">;
  className?: string;
  initialClassName?: string;
};

export default function ProductThumbnail({
  product,
  className = "",
  initialClassName = "text-6xl",
}: ProductThumbnailProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate flex items-center justify-center overflow-hidden bg-linear-to-br ${getProductGradient(
        product.productResourceId,
      )} ${className}`}
    >
      <div className="absolute -top-1/4 -right-1/4 -z-10 size-3/4 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-1/3 -left-1/4 -z-10 size-3/4 rounded-full bg-black/15 blur-2xl" />

      <span
        className={`font-extrabold tracking-tight text-white drop-shadow-md ${initialClassName}`}
      >
        {getProductInitial(product.name)}
      </span>
    </div>
  );
}
