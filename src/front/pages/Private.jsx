import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        // VALIDACIÓN: Si no hay token en el store ni en el session, fuera.
        const token = store.token || sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [store.token, navigate]);

    return (
        <div className="container mt-5 text-center">
            <h1 style={{ color: "#74B9FF" }}>Área Privada</h1>
            <div className="p-5 rounded shadow-sm" style={{ backgroundColor: "white", border: "1px solid #DCDDE1" }}>
                <p className="lead">¡Bienvenido!</p>
            </div>
        </div>
    );
};