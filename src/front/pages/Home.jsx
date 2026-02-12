import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const validateUser = async () => {
		const token = sessionStorage.getItem("token");

		// 1. Si no hay token, redirigimos al login inmediatamente
		if (!token) {
			navigate("/login");
			return;
		}

		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL;
			
			// 2. Validamos el token con nuestro endpoint protegido /me
			const response = await fetch(`${backendUrl}/api/auth/me`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			});

			if (response.ok) {
				const data = await response.json();
				// Guardamos el usuario en el store global
				dispatch({ type: "set_user", payload: data });
			} else {
				// 3. Si el token es inválido o expiró, limpiamos y redirigimos
				sessionStorage.removeItem("token");
				dispatch({ type: "logout" });
				navigate("/login");
			}
		} catch (error) {
			console.error("Error en la validación:", error);
			navigate("/login");
		}
	};

	useEffect(() => {
		validateUser();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">¡Bienvenido, {store.user?.email || "Usuario"}!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" style={{ width: "200px" }} />
			</p>
			<div className="alert alert-success">
				{store.user ? (
					<span>Estás en una zona protegida. Tu token es válido.</span>
				) : (
					<span>Verificando credenciales...</span>
				)}
			</div>
		</div>
	);
};