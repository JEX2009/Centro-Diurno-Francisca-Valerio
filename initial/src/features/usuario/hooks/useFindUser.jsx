import { useState, useMemo, useEffect } from "react";
import { featchUser } from "../../../service/api/apiUser/";

export default function useFindUser() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { payload, tokenError } = useMemo(() => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                return { payload: null, tokenError: "No se encontró token." };
            }

            const parts = accessToken.split('.');
            const payloadString = parts[1];

            if (!payloadString) {
                throw new Error("Token malformado.");
            }

            const decodedPayload = atob(payloadString);
            const payloadObject = JSON.parse(decodedPayload);
            return { payload: payloadObject, tokenError: null };

        } catch (e) {
            console.error("Error al decodificar el token:", e);
            return { payload: null, tokenError: "Token inválido o corrupto." };
        }
    }, []);

    useEffect(() => {
        if (tokenError) {
            setError(tokenError);
            setIsLoading(false);
            return;
        }

        if (payload && payload.user_id) {
            
            const fetchUserData = async () => {
                try {
                    const response = await featchUser(payload.user_id);
                    setData(response);
                } catch (apiError) {
                    setError(apiError);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData();
            
        } else if (!tokenError) {
            setError("Token válido pero no contiene user_id.");
            setIsLoading(false);
        }

    }, [payload, tokenError]);

    return { data, isLoading, error };
}