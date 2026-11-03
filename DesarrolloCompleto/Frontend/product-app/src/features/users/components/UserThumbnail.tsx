import type { User } from "../models/response/User";
import { getUserGradient, getUserInitials } from "../utils/userVisual";

type UserThumbnailProps = {
  user: Pick<User, "userResourceId" | "firstName" | "lastName">;
  className?: string;
  initialClassName?: string;
};

export default function UserThumbnail({
  user,
  className = "",
  initialClassName = "text-6xl",
}: UserThumbnailProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative isolate flex items-center justify-center overflow-hidden bg-linear-to-br ${getUserGradient(
        user.userResourceId,
      )} ${className}`}
    >
      <div className="absolute -top-1/4 -right-1/4 -z-10 size-3/4 rounded-full bg-white/20 blur-2xl" />
      <div className="absolute -bottom-1/3 -left-1/4 -z-10 size-3/4 rounded-full bg-black/15 blur-2xl" />

      <span
        className={`font-extrabold tracking-tight text-white drop-shadow-md ${initialClassName}`}
      >
        {getUserInitials(user.firstName, user.lastName)}
      </span>
    </div>
  );
}
