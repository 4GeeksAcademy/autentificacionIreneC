import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const { dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            // guarda el token en el Store y en sessionStorage 
            dispatch({ type: "login", payload: data });
            // redirige a la página privada
            navigate("/private");
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleLogin} className="col-md-6 mx-auto p-4 border rounded">
                <h2 className="text-center">Login</h2>
                <input 
                    type="email" 
                    className="form-control mb-3" 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    className="form-control mb-3" 
                    placeholder="Contraseña" 
                    onChange={e => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
        </div>
    );
};