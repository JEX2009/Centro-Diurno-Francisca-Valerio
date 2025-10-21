import { useEffect, useState } from "react";

export default function useUpdate(updateFunction) {
    const [data, setData] = useState([]);
    const [succes, setSucces] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (succes) {
            const timerId = setTimeout(() => {
                setSucces(false);
            }, 2000); 
            return () => {
                clearTimeout(timerId);
            };
        }
    }, [succes]);

    const handleUpdate = async (id, dataToSend) => {
        try {
            setError(null);
            setIsLoading(true);
            const response = await updateFunction(id, dataToSend);
            setData(response);
            setSucces(true);
            return response;
        } catch (error) {
            console.log()
            setError(false);
        } finally {
            setIsLoading(false);
        }
    }
    return { data, isLoading, error, succes, handleUpdate };
}