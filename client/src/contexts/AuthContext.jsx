import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState();
	const [status, setStatus] = useState("checking");
	useEffect(() => {
		const getAccessToken = async () => {
			const response = await fetch("/api/refresh", {
				method: "POST",
				credentials: "include",
			});
			if (!response.ok) {
				setAccessToken(null);
				setStatus("unauthenticated");
				return;
			}
			const data = await response.json();
			setAccessToken(data.accessToken);
			setStatus("authenticated");
		};
		getAccessToken();
	}, []);

	return (
		<AuthContext.Provider
			value={{ accessToken, setAccessToken, status, setStatus }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within AuthProvider");
	}
	return context;
};
