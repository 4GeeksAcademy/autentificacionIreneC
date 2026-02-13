import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		// 1. El front-end elimina el token del sessionStorage 

		// 2. El front-end de la aplicación redirige a la página de inicio
		dispatch({ type: 'logout' }); 
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					 {/* Renderizado condicional: si hay token, muestra Logout. Si no, muestra Login */}
                    {!store.token ? (
                        <Link to="/login">
                            <button className="btn btn-outline-primary me-2">Login</button>
                        </Link>
                    ) : (
                        <button className="btn btn-danger me-2" onClick={handleLogout}>
                            Cierre de sesión
                        </button>
                    )}

                    <Link to="/demo">
                        <button className="btn btn-primary">Check the Context in action</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};