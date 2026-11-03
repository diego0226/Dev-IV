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

// El mismo usuario siempre obtiene el mismo color.
export function getUserGradient(userResourceId: string): string {
  let hash = 0;
  for (const char of userResourceId) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0;
  }
  return gradients[Math.abs(hash) % gradients.length];
}

export function getUserInitials(
  firstName?: string | null,
  lastName?: string | null,
): string {
  const initials = `${firstName?.trim().charAt(0) ?? ""}${lastName?.trim().charAt(0) ?? ""}`;
  return initials.toUpperCase() || "?";
}

export function getUserFullName(
  firstName?: string | null,
  lastName?: string | null,
): string {
  return [firstName?.trim(), lastName?.trim()].filter(Boolean).join(" ");
}

export function getUserCode(userResourceId: string): string {
  return userResourceId.replace(/-/g, "").slice(0, 8).toUpperCase();
}
