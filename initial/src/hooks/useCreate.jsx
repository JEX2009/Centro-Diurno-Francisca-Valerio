
import { useEffect, useState } from "react";

export default function useCreate(createFunction, actualizeFunction = null) {
    const [data, setData] = useState([]);
    const [succes, setSucces] = useState(false);
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
    }, [succes]);
    const handleCreate = async (dataToSend) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await createFunction(dataToSend);
            setData(response);
            if (actualizeFunction !== null) {
                actualizeFunction();
            }
            setSucces("Se a creado con exito");
            return response;
        } catch (error) {
            setError(error.response.data.username[0]);
        } finally {
            setIsLoading(false);
        }
    }
    return { data, isLoading, error, succes, handleCreate };
}