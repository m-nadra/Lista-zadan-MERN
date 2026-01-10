import { Route, Routes, Navigate } from "react-router"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"

export default function App() {
    const user = localStorage.getItem("token")
    return (
        <Routes>
            {user && <Route path="/" element={<Main />} />}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    )
}