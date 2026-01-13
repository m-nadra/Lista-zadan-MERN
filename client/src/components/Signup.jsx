import { useState } from "react";
import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth";
import '../styles/authPages.css'

export default function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const { handleSignup, errorMessage } = useAuth()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleSignup(username, password, password2)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Zarejestruj się</h1>
                <p>{errorMessage}</p>
                <label htmlFor="username">Nazwa użytkownika</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                <label htmlFor="password">Hasło</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <label htmlFor="password">Powtórz hasło</label>
                <input type="password" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} required />
                <input type="submit" value="Załóż konto" />
                <Link id="link" to="/login">Posiadasz konto? Zaloguj się</Link>
            </form>
        </div>
    )
}