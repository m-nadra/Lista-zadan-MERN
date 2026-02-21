import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState();

	return (
		<AuthContext.Provider value={{ accessToken, setAccessToken }}>
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
