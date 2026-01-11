import { useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { useTask } from "../hooks/useTask"

export default function Main() {
    const { handleLogout } = useAuth()
    const { tasks, getTasks, addTask, editTask, deleteTask} = useTask()
    useEffect(() => {
        getTasks()
    }, [getTasks])

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
                    <tr key={task._id}>
                        <td>{task.name}</td>
                        <td>{task.description}</td>
                        <td>{task.date}</td>
                        <td><button onClick={() => editTask(task._id)}>Edytuj</button></td>
                        <td><button onClick={() => deleteTask(task._id)}>Usuń</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={addTask}>Dodaj zadanie</button>
        <button onClick={handleLogout}>Wyloguj</button>
    </div>
}
