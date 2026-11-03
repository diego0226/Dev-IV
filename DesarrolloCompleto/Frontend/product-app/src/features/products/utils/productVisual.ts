// Clases completas para que Tailwind las detecte al compilar.
const gradients = [
  "from-indigo-500 to-violet-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-400 to-orange-500",
  "from-rose-500 to-pink-600",
  "from-fuchsia-500 to-purple-600",
  "from-cyan-500 to-sky-600",
  "from-lime-500 to-emerald-600",
];

// El mismo producto siempre obtiene el mismo color.
export function getProductGradient(productResourceId: string): string {
  let hash = 0;
  for (const char of productResourceId) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function getProductInitial(name?: string | null): string {
  return name?.trim().charAt(0).toUpperCase() || "?";
}

export function getProductSku(productResourceId: string): string {
  return productResourceId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
