import { useNavigate } from "react-router";
import { useState } from "react";

export const useAuth = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const handleSignup = async (username, password, password2) => {
        if (password !== password2)
            return setErrorMessage("Hasła nie są takie same")
        try {
            const response = await fetch("api/signup", {
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
            if (response.status === 409)
                return setErrorMessage("Nazwa użytkownika jest zajęta");
            if (response.status === 500)
                return setErrorMessage("Wystąpił błąd po stronie serwera.")
            navigate("/")
        } catch (err) {
            setErrorMessage(err)
        }

    }
    const handleLogin = async (username, password) => {
        try {
            const response = await fetch("api/login", {
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
            if (response.status === 401)
                return setErrorMessage("Nieprawidłowe hasło");
            if (response.status === 404)
                return setErrorMessage("Użytkownik nie istnieje")
            if (response.status === 500)
                return setErrorMessage("Wystąpił błąd po stronie serwera.")

            navigate("/")
        } catch (err) {
            setErrorMessage(err)
        }
    }
    const handleLogout = async () => {
        await fetch("api/logout", {
            method: "POST",
            credentials: "include"
        })
        navigate("/login")
    }
    return { handleLogin, errorMessage, handleLogout, handleSignup }
}