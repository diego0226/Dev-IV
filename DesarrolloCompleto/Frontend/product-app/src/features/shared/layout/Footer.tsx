import Logo from '../components/Logo'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-col gap-1">
          <Logo />
          <p className="text-sm text-slate-500">Tu catálogo, en un solo lugar.</p>
        </div>

        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} ProductHub. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
