import { useAuthContext } from "../contexts/AuthContext";
import useApi from "./useApi";

export const useAuth = () => {
	const api = useApi();
	const { setAccessToken, setStatus } = useAuthContext();
	const handleSignup = async (username, password) => {
		try {
			const response = await fetch("api/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: username,
					password: password
				})
			});
			if (response.ok) {
				const data = await response.json();
				setAccessToken(data.accessToken);
				setStatus("authenticated");
			} else if (response.status === 409) return "Nazwa użytkownika jest zajęta";
			else {
				throw new Error();
			}
		} catch {
			return "Wystąpił błąd po stronie serwera.";
		}
	};
	const handleLogin = async (username, password) => {
		try {
			const response = await fetch("api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: username,
					password: password
				})
			});
			if (response.ok) {
				const data = await response.json();
				setAccessToken(data.accessToken);
				setStatus("authenticated");
			} else if (response.status === 401) {
				return "Nieprawidłowy login lub hasło";
			} else {
				throw new Error();
			}
		} catch {
			return "Wystąpił błąd po stronie serwera.";
		}
	};
	const handleLogout = async () => {
		await api.post("api/logout");
		setAccessToken(null);
		setStatus("unauthenticated");
	};
	return { handleLogin, handleLogout, handleSignup };
};
