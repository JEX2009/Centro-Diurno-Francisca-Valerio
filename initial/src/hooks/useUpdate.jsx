import { useEffect, useState } from "react";

export default function useUpdate(updateFunction) {
    const [data, setData] = useState([]);
    const [succes, setSucces] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (succes || error) {
            const timerId = setTimeout(() => {
                setSucces(false);
                setError(null);
            }, 2000);
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [succes,error]);

    const handleUpdate = async (id, dataToSend) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await updateFunction(id, dataToSend);
            setData(response);
            setSucces(true);
            return response;
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
    }
    return { data, isLoading, error, succes, handleUpdate };
}