import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";
import useApi from "./useApi";

export const useAuth = () => {
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();
	const api = useApi();
	const { setAccessToken } = useAuthContext();
	const handleSignup = async (username, password, password2) => {
		if (password !== password2)
			return setErrorMessage("Hasła nie są takie same");
		try {
			const response = await api.post("api/signup", {
				username: username,
				password: password,
			});
			if (response.status === 409)
				return setErrorMessage("Nazwa użytkownika jest zajęta");
			if (response.status === 500)
				return setErrorMessage("Wystąpił błąd po stronie serwera.");

			const data = await response.json();
			setAccessToken(data.accessToken);
			navigate("/");
		} catch (err) {
			setErrorMessage(err);
		}
	};
	const handleLogin = async (username, password) => {
		try {
			const response = await api.post("api/login", {
				username: username,
				password: password,
			});
			if (response.status === 401)
				return setErrorMessage("Nieprawidłowe hasło");
			if (response.status === 404)
				return setErrorMessage("Użytkownik nie istnieje");
			if (response.status === 500)
				return setErrorMessage("Wystąpił błąd po stronie serwera.");

			const data = await response.json();
			setAccessToken(data.accessToken);
			navigate("/");
		} catch (err) {
			setErrorMessage(err);
		}
	};
	const handleLogout = async () => {
		await api.post("api/logout");
		navigate("/login");
	};
	return { handleLogin, errorMessage, handleLogout, handleSignup };
};
