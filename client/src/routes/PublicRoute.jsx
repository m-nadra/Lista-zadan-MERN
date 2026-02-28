import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
	const { status } = useAuthContext();

	if (status === "checking") {
		return <div>Loading...</div>;
	}

	if (status === "authenticated") {
		return <Navigate to="/" replace />;
	}

	return children;
}
