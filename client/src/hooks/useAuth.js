import { useNavigate } from "react-router";
import { useState } from "react";

export const useAuth = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const handleSignup = async (username, password, password2) => {
        if (password !== password2) {
            setErrorMessage("Hasła nie są takie same")
            return
        }
        try {
            const response = await fetch("http://localhost:3000/signup", {
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
                setErrorMessage("Nazwa użytkownika jest zajęta");
            } else {
                navigate("/")
            }
        } catch (err) {
            setErrorMessage(err)
        }

    }
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
            navigate("/login")
    }
    return { handleLogin, errorMessage, handleLogout, handleSignup }
}