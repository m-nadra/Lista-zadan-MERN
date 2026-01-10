import { useState } from "react";
import { Link, useNavigate } from "react-router"

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleLogin = async () => {
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
    return <div>
        <form action={handleLogin} method="POST">
            <label htmlFor="username">Nazwa użytkownika</label>
            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <input type="submit" value="Zaloguj się" />
        </form>
        <Link to="/signup">Załóż konto</Link>
        {errorMessage}
    </div>
}