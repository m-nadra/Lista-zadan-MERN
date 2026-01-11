import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

export default function Main() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState()
    const { handleLogout } = useAuth()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:3000/api/tasks", {
                method: "GET",
                credentials: "include"
            })
            if (response.status === 401) {
                return navigate("/login")
            }
            const data = await response.json()
            setTasks(data)
        }
        fetchData()
            .catch(() => {
                return navigate("/login")
            })
    }, [navigate])

    return <div>
        <h1>Lista zadań</h1>
        <table>
            <thead>
                <tr>
                    <th>Nazwa</th>
                    <th>Opis</th>
                    <th>Data wykonania</th>
                </tr>
            </thead>
            <tbody>
                {tasks && tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.date}</td>
                        <td><button>Edytuj</button></td>
                        <td><button>Usuń</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button>Dodaj zadanie</button>
        <button onClick={handleLogout}>Wyloguj</button>
    </div>
}
