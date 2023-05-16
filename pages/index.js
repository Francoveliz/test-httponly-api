import axios from "axios";
import { parse, serialize } from "cookie";
import Cookies from "cookies";
import { useEffect } from "react";

export async function getServerSideProps({ req , res }) {
	try {
		const cookies = parse(req.headers.cookie || "");
		const cookiesV2 = new Cookies(req, res)

	/* 	console.log('cookie desde el back' , cookies); */

		//esta logica no funciona en el cliente llega false cuando se loguea
		const loggedIn = cookies.isLoggedIn === "true";

		console.log(cookiesV2.get('Authentication'))

		if (loggedIn) {
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
		console.error("Error:", error);
		return {
			props: {
				cookies: {},
				loggedIn: false,
			},
		};
	}
}

export default function Homepage(props) {
	console.log(props);

	const handleLogin = async () => {
		try {
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

	const prueba = async () => {
		try {
			const response = await axios.get('/api/users', {
				headers:{
					Authorization : `Bearer ${props.cookies.Authentication}`
				}
			})
		console.log(response)
		} catch (error) {
			console.log(error);
		}
	}
	

	return (
		<>
			<button onClick={handleLogin}>DAleeeeeeeeeeeee</button>
			<button onClick={prueba}>lista de usuarios</button>
		</>
	);
}
