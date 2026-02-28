import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login";
import Main from "./components/Main";
import Signup from "./components/Signup";
import { TaskProvider } from "./contexts/TaskContext";
import "./styles/globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<TaskProvider>
								<Main />
							</TaskProvider>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/signup"
					element={
						<PublicRoute>
							<Signup />
						</PublicRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
			</Routes>
		</AuthProvider>
	</BrowserRouter>,
);
