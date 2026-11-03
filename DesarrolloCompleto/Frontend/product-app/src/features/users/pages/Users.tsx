import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CircleAlert,
  LayoutGrid,
  List,
  RefreshCw,
  Search,
  Sparkles,
  UserPlus,
  Users as UsersIcon,
  X,
} from 'lucide-react'
import type { User } from '../models/response/User'
import { deleteUser, getUsers } from '../services/UserService'
import UserCard from '../components/UserCard'
import UsersTable from '../components/UsersTable'
import { getUserFullName } from '../utils/userVisual'

type View = 'grid' | 'list'
type Sort = 'az' | 'za'

const Users = () => {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('az')
  const [view, setView] = useState<View>('grid')

  useEffect(() => {
    let active = true

    const loadUsers = async () => {
      try {
        const data = await getUsers()
        if (active) {
          setUsers(data)
          setError(null)
        }
      } catch (error) {
        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : 'Error al obtener los usuarios',
          )
        }
      } finally {
        if (active) setIsLoading(false)
      }
    }

    loadUsers()

    return () => {
      active = false
    }
  }, [reloadKey])

  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    setReloadKey((key) => key + 1)
  }

  const handleDelete = async (userResourceId: string) => {
    const confirmed = window.confirm(
      '¿Está seguro de que desea eliminar este usuario?',
    )

    if (!confirmed) return

    setDeletingId(userResourceId)
    setError(null)

    try {
      await deleteUser(userResourceId)

      // Actualizar la lista sin recargar la página
      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.userResourceId !== userResourceId,
        ),
      )
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'No se pudo eliminar el usuario',
      )
    } finally {
      setDeletingId(null)
    }
  }

  const visibleUsers = useMemo(() => {
    const term = query.trim().toLowerCase()

    return users
      .filter(
        (user) =>
          !term ||
          getUserFullName(user.firstName, user.lastName).toLowerCase().includes(term) ||
          user.email?.toLowerCase().includes(term) ||
          user.phoneNumber?.toLowerCase().includes(term),
      )
      .sort((a, b) => {
        const result = getUserFullName(a.firstName, a.lastName).localeCompare(
          getUserFullName(b.firstName, b.lastName),
          'es',
          { sensitivity: 'base' },
        )
        return sort === 'az' ? result : -result
      })
  }, [users, query, sort])

  const hasUsers = users.length > 0

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <section
        aria-labelledby="users-title"
        className="relative isolate overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 shadow-xl sm:px-10 sm:py-14"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--color-indigo-500),transparent_55%),radial-gradient(ellipse_at_bottom_left,var(--color-fuchsia-600),transparent_50%)] opacity-70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-size-[36px_36px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-100 ring-1 ring-white/20 ring-inset">
              <Sparkles size={14} aria-hidden="true" />
              Administración de usuarios
            </p>

            <h1
              id="users-title"
              className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
            >
              Usuarios
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Consulta, agrega y administra los usuarios registrados.
            </p>

            <Link
              to="/users/new"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <UserPlus size={18} aria-hidden="true" />
              Agregar usuario
            </Link>
          </div>

          <dl className="rounded-2xl bg-white/10 px-6 py-5 ring-1 ring-white/15 backdrop-blur-sm ring-inset">
            <dt className="text-sm font-medium text-slate-300">
              Usuarios registrados
            </dt>
            <dd className="mt-1 text-4xl font-extrabold tracking-tight text-white tabular-nums">
              {isLoading ? '—' : users.length}
            </dd>
          </dl>
        </div>
      </section>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="flex items-start gap-2 text-sm text-red-700">
            <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
            <span>
              <span className="font-semibold">No pudimos completar la acción.</span>{' '}
              {error}
            </span>
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-medium text-red-700 shadow-sm ring-1 ring-red-200 transition hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-red-600"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Reintentar
          </button>
        </div>
      )}

      {/* Barra de herramientas */}
      {(isLoading || hasUsers) && (
        <section aria-label="Lista de usuarios" className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <label htmlFor="user-search" className="sr-only">
                Buscar usuarios
              </label>
              <Search
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
              />
              <input
                id="user-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre, correo o teléfono..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pr-10 pl-10 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-indigo-600"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="user-sort" className="sr-only">
                Ordenar usuarios
              </label>
              <select
                id="user-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className="rounded-xl border border-slate-200 bg-white py-2.5 pr-8 pl-3 text-sm font-medium text-slate-700 shadow-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="az">Nombre: A – Z</option>
                <option value="za">Nombre: Z – A</option>
              </select>

              <div
                role="group"
                aria-label="Tipo de vista"
                className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm"
              >
                {(
                  [
                    { value: 'grid', label: 'Vista en cuadrícula', Icon: LayoutGrid },
                    { value: 'list', label: 'Vista en lista', Icon: List },
                  ] as const
                ).map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setView(value)}
                    aria-pressed={view === value}
                    aria-label={label}
                    title={label}
                    className={`rounded-lg p-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600 ${
                      view === value
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!isLoading && (
            <p className="text-sm text-slate-500" aria-live="polite">
              Mostrando{' '}
              <span className="font-semibold text-slate-900">
                {visibleUsers.length}
              </span>{' '}
              de {users.length}{' '}
              {users.length === 1 ? 'usuario' : 'usuarios'}
            </p>
          )}

          {isLoading ? (
            <div
              role="status"
              aria-label="Cargando usuarios"
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {Array.from({ length: 8 }, (_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-4/3 animate-pulse bg-slate-200" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                    <div className="h-px bg-slate-100" />
                    <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : visibleUsers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <Search size={28} aria-hidden="true" className="mx-auto text-slate-400" />
              <h2 className="mt-4 text-base font-semibold text-slate-900">
                Sin resultados para “{query.trim()}”
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Prueba con otro nombre, correo o teléfono.
              </p>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mt-5 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-indigo-600"
              >
                Limpiar búsqueda
              </button>
            </div>
          ) : view === 'grid' ? (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleUsers.map((user) => (
                <li key={user.userResourceId} className="flex">
                  <div className="w-full">
                    <UserCard
                      user={user}
                      onDelete={handleDelete}
                      isDeleting={deletingId === user.userResourceId}
                      deleteDisabled={deletingId !== null}
                    />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <UsersTable
              users={visibleUsers}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          )}
        </section>
      )}

      {/* Sin usuarios */}
      {!isLoading && !error && !hasUsers && (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UsersIcon size={28} aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Todavía no hay usuarios
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
            Registra el primer usuario para empezar a administrarlos.
          </p>
          <Link
            to="/users/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <UserPlus size={18} aria-hidden="true" />
            Agregar usuario
          </Link>
        </section>
      )}
    </div>
  )
}

export default Users
