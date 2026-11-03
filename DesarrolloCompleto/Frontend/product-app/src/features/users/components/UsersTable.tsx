import { ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { User } from "../models/response/User";
import { getUserFullName } from "../utils/userVisual";
import UserThumbnail from "./UserThumbnail";

type UsersTableProps = {
  users: User[];
  onDelete: (userResourceId: string) => void;
  deletingId: string | null;
};

export default function UsersTable({
  users,
  onDelete,
  deletingId,
}: UsersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Lista de usuarios</caption>

          <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th scope="col" className="px-5 py-3">Usuario</th>
              <th scope="col" className="hidden px-5 py-3 sm:table-cell">Correo</th>
              <th scope="col" className="hidden px-5 py-3 md:table-cell">Teléfono</th>
              <th scope="col" className="px-5 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {users.map((user) => {
              const name = getUserFullName(user.firstName, user.lastName) || "Usuario sin nombre";

              return (
                <tr
                  key={user.userResourceId}
                  className={`transition-colors hover:bg-slate-50 ${
                    deletingId === user.userResourceId ? "opacity-50" : ""
                  }`}
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <UserThumbnail
                        user={user}
                        className="size-10 shrink-0 rounded-full"
                        initialClassName="text-sm"
                      />
                      <Link
                        to={`/user/${user.userResourceId}`}
                        className="rounded font-semibold text-slate-900 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
                      >
                        {name}
                      </Link>
                    </div>
                  </td>

                  <td className="hidden px-5 py-3 text-slate-600 sm:table-cell">
                    {user.email}
                  </td>

                  <td className="hidden px-5 py-3 whitespace-nowrap text-slate-600 md:table-cell">
                    {user.phoneNumber}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => onDelete(user.userResourceId)}
                        disabled={deletingId !== null}
                        title={`Eliminar ${name}`}
                        aria-label={`Eliminar ${name}`}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>

                      <Link
                        to={`/user/${user.userResourceId}`}
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
