import { useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data.length > 0) {
            const timerId = setTimeout(() => {
                setError(null);
            }, 2000);
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [data]);
    const executeFetch = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const request = await fetchFunction();
            setData(request);
        } catch (error) {
            if (error.response && error.response.data) {
                const data = error.response.data;
                const firstErrorKey = Object.keys(data)[0];
                let errorMessage = data[firstErrorKey];
                if (Array.isArray(errorMessage)) {
                    errorMessage = errorMessage[0];
                }
                setError(errorMessage);
            } else {
                setError(error.message || "Ocurrió un error inesperado.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        executeFetch();
    }, [])

    return { data, isLoading, error, refetch: executeFetch };
}

