import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex max-w-xl flex-col items-center py-16 text-center sm:py-24"
    >
      <span
        aria-hidden="true"
        className="bg-linear-to-br from-indigo-500 to-fuchsia-500 bg-clip-text text-8xl font-extrabold tracking-tighter text-transparent sm:text-9xl"
      >
        404
      </span>

      <p className="mt-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase">
        Error 404 · Fuera de ruta
      </p>

      <h1
        id="not-found-title"
        className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
      >
        Esta página no existe
      </h1>

      <p className="mt-4 text-base leading-7 text-slate-500">
        La dirección puede haber cambiado o estar escrita incorrectamente.
        Vuelve al catálogo y sigue explorando tus productos.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Volver al inicio
        </Link>

        <Link
          to="/products"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Volver a productos
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
