import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleAlert,
  Copy,
  Hash,
  Trash2,
} from "lucide-react";
import type { User } from "../models/response/User";
import { deleteUser, getUserById } from "../services/UserService";
import UserThumbnail from "../components/UserThumbnail";
import { getUserCode, getUserFullName } from "../utils/userVisual";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Identificador de usuario no válido");
      setIsLoading(false);
      return;
    }

    let active = true;

    const loadUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getUserById(id);

        if (active) {
          setUser(data);
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Error al obtener el usuario",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadUser();

    return () => {
      active = false;
    };
  }, [id]);

  const handleCopy = async () => {
    if (!user) return;
    await navigator.clipboard.writeText(user.userResourceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      "¿Está seguro de que desea eliminar este usuario?",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setError(null);

    try {
      await deleteUser(user.userResourceId);
      navigate("/users");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el usuario",
      );
      setIsDeleting(false);
    }
  };

  const name = (user && getUserFullName(user.firstName, user.lastName)) || "Usuario sin nombre";

  return (
    <div className="space-y-6">
      <nav aria-label="Ruta de navegación">
        <ol className="flex items-center gap-1.5 text-sm text-slate-500">
          <li>
            <Link
              to="/users"
              className="rounded font-medium hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Usuarios
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight size={14} />
          </li>
          <li aria-current="page" className="truncate font-medium text-slate-900">
            {isLoading ? "Cargando..." : user ? name : "Detalle"}
          </li>
        </ol>
      </nav>

      {isLoading && (
        <div role="status" aria-label="Cargando usuario" className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-square animate-pulse rounded-3xl bg-slate-200" />
          <div className="space-y-5 py-2">
            <div className="h-6 w-28 animate-pulse rounded-full bg-slate-200" />
            <div className="h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
          </div>
        </div>
      )}

      {!isLoading && !user && (
        <div
          role="alert"
          className="rounded-3xl border border-red-200 bg-white px-6 py-14 text-center"
        >
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <CircleAlert size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-lg font-semibold text-slate-900">
            No pudimos cargar este usuario
          </h1>
          <p className="mt-1 text-sm text-slate-500">{error}</p>
          <Link
            to="/users"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a usuarios
          </Link>
        </div>
      )}

      {!isLoading && user && (
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <UserThumbnail
            user={user}
            className="aspect-square rounded-3xl shadow-xl shadow-slate-300/50"
            initialClassName="text-[8rem] sm:text-[11rem]"
          />

          <div className="flex flex-col">
            <p className="inline-flex w-fit items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700 ring-1 ring-indigo-100 ring-inset">
              <Hash size={12} aria-hidden="true" />
              ID {getUserCode(user.userResourceId)}
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight break-words text-slate-900 sm:text-4xl">
              {name}
            </h1>

            <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="grid gap-5 p-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    Nombre
                  </dt>
                  <dd className="mt-1.5 text-base font-medium text-slate-900">
                    {user.firstName || "—"}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    Apellido
                  </dt>
                  <dd className="mt-1.5 text-base font-medium text-slate-900">
                    {user.lastName || "—"}
                  </dd>
                </div>
              </div>

              <div className="p-5">
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Correo
                </dt>
                <dd className="mt-1.5 text-base font-medium break-all">
                  {user.email ? (
                    <a
                      href={`mailto:${user.email}`}
                      className="rounded text-indigo-600 hover:text-indigo-800 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                      {user.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>

              <div className="p-5">
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Número de teléfono
                </dt>
                <dd className="mt-1.5 text-base font-medium">
                  {user.phoneNumber ? (
                    <a
                      href={`tel:${user.phoneNumber.replace(/[^\d+]/g, "")}`}
                      className="rounded text-indigo-600 hover:text-indigo-800 hover:underline focus-visible:outline-2 focus-visible:outline-indigo-600"
                    >
                      {user.phoneNumber}
                    </a>
                  ) : (
                    "—"
                  )}
                </dd>
              </div>

              <div className="p-5">
                <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  User Resource ID
                </dt>
                <dd className="mt-1.5 flex items-center gap-3">
                  <code className="min-w-0 flex-1 font-mono text-sm break-all text-slate-700">
                    {user.userResourceId}
                  </code>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600"
                  >
                    {copied ? (
                      <Check size={14} aria-hidden="true" className="text-emerald-600" />
                    ) : (
                      <Copy size={14} aria-hidden="true" />
                    )}
                    <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
                  </button>
                </dd>
              </div>
            </dl>

            {error && (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                to="/users"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                Volver a usuarios
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={16} aria-hidden="true" />
                {isDeleting ? "Eliminando..." : "Eliminar usuario"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
