import { useNavigate } from "react-router";
import { useState } from "react";

export const useAuth = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("")
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if (!response.ok) {
                setErrorMessage("Invalid username or password!");
            } else {
                navigate("/")
            }
        } catch (err) {
            setErrorMessage(err)
        }
    }
    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include"
        })
        if (response.ok)
            return navigate("/login")
    }
    return { handleLogin, errorMessage, handleLogout }
}