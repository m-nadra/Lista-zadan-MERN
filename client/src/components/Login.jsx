import { useState } from "react";
import { Link } from "react-router"
import { useAuth } from "../hooks/useAuth";
import styles from '../styles/authPages.module.css'

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { handleLogin, errorMessage } = useAuth()
    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin(username, password)
    }
    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Zaloguj się</h1>
                <p className={styles.p}>{errorMessage}</p>
                <label htmlFor="username">Nazwa użytkownika</label>
                <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                <label htmlFor="password">Hasło</label>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="submit" value="Zaloguj się" />
                <Link className={styles.link} to="/signup">Załóż konto</Link>
            </form>
        </main>
    )
}