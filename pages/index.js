/**
 * pages/index.js
 *
 * A demo login page.
 */
import axios from "axios";
import { useEffect, useState } from "react";
import { parse } from "cookie";

// The following getServerSideProps function demonstrates how to make
// API requests from the server. We basically take the auth-token cookie
// and from it create an HTTP header, just like the API Proxy does.
// Obtiene las cookies en el lado del servidor utilizando getServerSideProps
export async function getServerSideProps({ req }) {
	try {
		// Verifica si ya hay cookies disponibles en la solicitud
		const cookies = parse(req.headers.cookie || "");

		// Determina si el usuario ha iniciado sesión
		const loggedIn = cookies.isLoggedIn === "true";

		if (loggedIn) {
			// Si el usuario ya ha iniciado sesión, no es necesario realizar una solicitud a la API nuevamente.
			// Puedes realizar otras acciones o consultas necesarias en este punto.

			// Por ejemplo, si la API proporciona datos adicionales para usuarios autenticados,
			// podrías realizar una solicitud para obtener esos datos aquí y pasarlos como props.

			return {
				props: {
					cookies,
					loggedIn,
				},
			};
		}

		return {
			props: {
				cookies,
				loggedIn: false,
			},
		};
	} catch (error) {
		// Manejo de errores
		console.error("Error:", error);
		return {
			props: {
				cookies: {},
				loggedIn: false,
			},
		};
	}
}

export default function Homepage({ initialLoginStatus }) {
	const handleLogin = async () => {
		try {
			// Realiza la solicitud a la API para iniciar sesión
			const response = await axios.post("/api/auth/login", {
				username: "john",
				password: "changeme",
			});

			// Extrae las cookies de la respuesta
			const cookies = parse(response.headers["set-cookie"]);

			// Actualiza las cookies en el navegador
			Object.keys(cookies).forEach((name) => {
				const cookie = serialize(name, cookies[name]);
				document.cookie = cookie;
			});

			// Redirige o actualiza la página para reflejar el estado de inicio de sesión
			window.location.reload();
		} catch (error) {
			// Manejo de errores
			console.error("Error:", error);
		}
	};

	return (
		<>
			<button onClick={handleLogin}>DAleeeeeeeeeeeee</button>
		</>
	);
}
