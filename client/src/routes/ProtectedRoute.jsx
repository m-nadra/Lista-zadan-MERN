import { Navigate } from "react-router";
import { useAuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
	const { status } = useAuthContext();

	if (status === "checking") return <div>Loading...</div>;

	if (status === "unauthenticated") {
		return <Navigate to="/login" replace />;
	}

	return children;
}
