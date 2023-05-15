import axios from "axios";
import { parse, serialize } from "cookie";

export async function getServerSideProps({ req }) {
	try {
		const cookies = parse(req.headers.cookie || "");

		const loggedIn = cookies.isLoggedIn === "true";

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

export default function Homepage({ initialLoginStatus }) {
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

	return (
		<>
			<button onClick={handleLogin}>DAleeeeeeeeeeeee</button>
		</>
	);
}
