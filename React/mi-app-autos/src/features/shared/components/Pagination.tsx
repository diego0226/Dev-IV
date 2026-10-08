import "./Pagination.css";

type PaginationProps = {
 currentPage: number;
 totalPages: number;
 onPrevious: () => void;
 onNext: () => void;
};

const Pagination = ({onPrevious, currentPage, onNext, totalPages}: PaginationProps) => {
  return (
    <nav className="pagination" aria-label="Paginación del catálogo">
      <button type="button" onClick={onPrevious} disabled={currentPage <= 1}>
        <span aria-hidden="true">←</span>
        Anterior
      </button>

      <span
        className="pagination__status"
        aria-live="polite"
        aria-atomic="true"
      >
        Página <strong>{currentPage}</strong> de {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Siguiente
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
};

export default Pagination;
