import { Activity, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useTask } from "../hooks/useTask"
import AddTaskForm from "./AddTaskForm"
import Task from "./Task"

export default function Main() {
    const { handleLogout } = useAuth()
    const { tasks, getTasks, deleteTask, addTask, editTask } = useTask()
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
                    {tasks?.map(task => ( <Task task={task} deleteTask={deleteTask} editTask={editTask} />))}
                </tbody>
            </table>
            <button onClick={() => { setShowForm(true) }}>Dodaj zadanie</button>
            <button onClick={handleLogout}>Wyloguj</button>
            <Activity mode={showForm ? "visible" : "hidden"}>
                <AddTaskForm onClose={setShowForm} addTask={addTask} />
            </Activity>
        </div>
    )
}
