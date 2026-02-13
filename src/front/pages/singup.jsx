import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) navigate("/login");
        else alert("Error al registrar");
    };

    return (
        <form onSubmit={handleSignup} className="container mt-5">
            <h2>Registro</h2>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2" />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="form-control mb-2" />
            <button className="btn btn-primary">Registrarse</button>
        </form>
    );
};