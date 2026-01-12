import { Activity, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useTask } from "../hooks/useTask"
import AddTaskForm from "./AddTaskForm"

export default function Main() {
    const { handleLogout } = useAuth()
    const { tasks, getTasks, deleteTask, addTask } = useTask()
    const [showForm, setShowForm] = useState(false)
    useEffect(() => {
        getTasks()
    }, [])
    return (
        <div>
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
                    {tasks?.map(task => (
                        <tr key={task._id}>
                            <td>{task.name}</td>
                            <td>{task.description}</td>
                            <td>{task.date}</td>
                            <td><button onClick={() => { }}>Edytuj</button></td>
                            <td><button onClick={() => deleteTask(task._id)}>Usuń</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => { setShowForm(true) }}>Dodaj zadanie</button>
            <button onClick={handleLogout}>Wyloguj</button>
            <Activity mode={showForm ? "visible" : "hidden"}>
                <AddTaskForm onClose={setShowForm} addTask={addTask}/>
            </Activity>
        </div>
    )
}
