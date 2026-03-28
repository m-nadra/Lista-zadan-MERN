import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useApi from "./useApi";

export const useAuth = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const api = useApi();
	const { setAccessToken, setStatus } = useAuthContext();
	const handleSignup = async (username, password, password2) => {
		if (password !== password2) return setErrorMessage("Hasła nie są takie same");
		try {
			const response = await api.post("api/signup", {
				username: username,
				password: password
			});
			if (response.ok) {
				const data = await response.json();
				setAccessToken(data.accessToken);
				setStatus("authenticated");
			} else if (response.status === 409) setErrorMessage("Nazwa użytkownika jest zajęta");
			else setErrorMessage("Wystąpił błąd po stronie serwera.");
		} catch (err) {
			setErrorMessage(err.message);
		}
	};
	const handleLogin = async (username, password) => {
		try {
			const response = await api.post("api/login", {
				username: username,
				password: password
			});
			if (response.ok) {
				const data = await response.json();
				setAccessToken(data.accessToken);
				setStatus("authenticated");
			}
			if (response.status === 401) setErrorMessage("Nieprawidłowe hasło");
			else if (response.status === 404) setErrorMessage("Użytkownik nie istnieje");
			else setErrorMessage("Wystąpił błąd po stronie serwera.");
		} catch (err) {
			setErrorMessage(err.message);
		}
	};
	const handleLogout = async () => {
		await api.post("api/logout");
		setAccessToken(null);
		setStatus("unauthenticated");
	};
	return { handleLogin, errorMessage, handleLogout, handleSignup };
};
