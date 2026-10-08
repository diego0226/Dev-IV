import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }

        const result: T = await response.json();

        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Ocurrió un error");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
}
