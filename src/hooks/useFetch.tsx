import { useEffect, useState } from "react";

export function useFetch<T>(url: string): { data: T | null, loading: boolean, error: string, totalCount?: number } {

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);

                    const total = response.headers.get("X-Total-Count");
                    if (total) {
                        setTotalCount(parseInt(total, 10));
                    }
                } else {
                    setError(response.statusText);
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : 'error desconocido');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error, totalCount };
}