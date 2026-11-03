import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CircleAlert, Eye } from "lucide-react";

import { createUser } from "../services/UserService";
import type { NewUser } from "../models/request/User";
import { useForm, useWatch } from "react-hook-form";
import UserCard from "../components/UserCard";

// Datos que maneja el formulario
type UserFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

// Mismos largos que las columnas de la tabla User
const FIRST_NAME_MAX_LENGTH = 50;
const LAST_NAME_MAX_LENGTH = 50;
const EMAIL_MAX_LENGTH = 100;
const PHONE_NUMBER_MAX_LENGTH = 20;

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 shadow-sm transition outline-none placeholder:text-slate-400 focus:ring-4 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
  }`;

export default function CreateUser() {
  const navigate = useNavigate();

  const [serverError, setServerError] = useState<string | null>(null);

  // Se genera una sola vez para que la vista previa y el request usen el mismo ID
  const [userResourceId] = useState(() => crypto.randomUUID());

  // Configuración de React Hook Form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const [firstName, lastName, email, phoneNumber] = useWatch({
    control,
    name: ["firstName", "lastName", "email", "phoneNumber"],
  });

  // Se ejecuta cuando el usuario presiona Guardar
  const onSubmit = async (data: UserFormValues) => {
    setServerError(null);

    // Construimos el request que espera el backend C#
    const request: NewUser = {
      userResourceId,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      phoneNumber: data.phoneNumber.trim(),
    };

    try {
      // Llamamos al servicio que ejecuta el POST
      await createUser(request);

      // Regresamos al listado si se guardó correctamente
      navigate("/users");
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Error al registrar el usuario",
      );
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/users"
        className="mb-6 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-slate-500 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-600"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Volver a usuarios
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Agregar usuario
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Completa la información para registrar un nuevo usuario.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Nombre */}
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-slate-800">
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Ejemplo: María"
                  autoComplete="given-name"
                  maxLength={FIRST_NAME_MAX_LENGTH}
                  autoFocus
                  {...register("firstName", {
                    required: "El nombre es obligatorio",
                    validate: (value) =>
                      value.trim().length >= 2 ||
                      "El nombre debe tener al menos 2 caracteres",
                  })}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  className={inputClass(Boolean(errors.firstName))}
                />
                {errors.firstName && (
                  <p id="firstName-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                    <CircleAlert size={14} aria-hidden="true" />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-slate-800">
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Ejemplo: Rodríguez"
                  autoComplete="family-name"
                  maxLength={LAST_NAME_MAX_LENGTH}
                  {...register("lastName", {
                    required: "El apellido es obligatorio",
                    validate: (value) =>
                      value.trim().length >= 2 ||
                      "El apellido debe tener al menos 2 caracteres",
                  })}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  className={inputClass(Boolean(errors.lastName))}
                />
                {errors.lastName && (
                  <p id="lastName-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                    <CircleAlert size={14} aria-hidden="true" />
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Correo */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                Correo
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ejemplo: maria@correo.com"
                autoComplete="email"
                maxLength={EMAIL_MAX_LENGTH}
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingresa un correo válido",
                  },
                })}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={14} aria-hidden="true" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Número de teléfono */}
            <div>
              <label htmlFor="phoneNumber" className="mb-2 block text-sm font-semibold text-slate-800">
                Número de teléfono
              </label>
              <input
                id="phoneNumber"
                type="tel"
                placeholder="Ejemplo: +506 8888-8888"
                autoComplete="tel"
                maxLength={PHONE_NUMBER_MAX_LENGTH}
                {...register("phoneNumber", {
                  required: "El número de teléfono es obligatorio",
                  pattern: {
                    value: /^\+?[\d\s\-()]{7,20}$/,
                    message: "Ingresa un número válido (solo dígitos, espacios, guiones o +)",
                  },
                })}
                aria-invalid={Boolean(errors.phoneNumber)}
                aria-describedby={errors.phoneNumber ? "phoneNumber-error" : "phoneNumber-hint"}
                className={inputClass(Boolean(errors.phoneNumber))}
              />
              {errors.phoneNumber ? (
                <p id="phoneNumber-error" role="alert" className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={14} aria-hidden="true" />
                  {errors.phoneNumber.message}
                </p>
              ) : (
                <p id="phoneNumber-hint" className="mt-2 text-sm text-slate-500">
                  Incluye el código de país si es necesario.
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 block text-sm font-semibold text-slate-800">
                User Resource ID
              </p>
              <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 font-mono text-xs break-all text-slate-500">
                {userResourceId}
              </p>
              <p className="mt-2 text-sm text-slate-500">Se genera automáticamente.</p>
            </div>

            {/* Error devuelto por el servicio */}
            {serverError && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                <CircleAlert size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
                {serverError}
              </p>
            )}

            {/* Botones */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/users"
                className="rounded-xl border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : "Guardar usuario"}
              </button>
            </div>
          </form>
        </div>

        {/* Vista previa en vivo */}
        <aside aria-label="Vista previa" className="lg:sticky lg:top-24">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <Eye size={14} aria-hidden="true" />
            Vista previa
          </p>
          <UserCard
            preview
            user={{
              userResourceId,
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              email: email.trim(),
              phoneNumber: phoneNumber.trim(),
            }}
          />
          <p className="mt-3 text-xs text-slate-500">
            Así se verá el usuario en el listado.
          </p>
        </aside>
      </div>
    </div>
  );
}
